const express = require('express');
const multer = require('multer');
const path = require('path');
const { Pool } = require('pg');
const { isAdmin, verifyToken } = require('../middleware/auth');

const router = express.Router();
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

// Configuración de Multer para almacenar las imágenes en backend/uploads/
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../uploads'));
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // límite de 5MB por imagen
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Solo se permiten imágenes (JPEG, PNG, WebP, GIF).'));
        }
    }
});

// ────────────────────────────────────────
// POST /api/trade-ins — Recibe la solicitud pública
// ────────────────────────────────────────
// Accepta hasta 5 fotos en el campo "images"
router.post('/', upload.array('images', 5), async (req, res) => {
    try {
        const {
            brand,
            model,
            condition,
            description,
            contact_name,
            contact_phone,
            contact_email,
            user_id
        } = req.body;

        // Extraer los nombres de archivo generados por multer
        const uploadedFiles = req.files ? req.files.map(file => `/uploads/${file.filename}`) : [];

        const result = await pool.query(
            `INSERT INTO trade_ins 
            (brand, model, condition, description, contact_name, contact_phone, contact_email, user_id, images, status) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, 'pending') RETURNING *`,
            [
                brand, model, condition, description || '',
                contact_name || '', contact_phone || '', contact_email || '',
                user_id ? Number(user_id) : null,
                JSON.stringify(uploadedFiles)
            ]
        );

        res.status(201).json({ success: true, tradeIn: result.rows[0] });
    } catch (err) {
        console.error('Error procesando el trade-in:', err);
        res.status(500).json({ error: 'Error del servidor procesando la solicitud.' });
    }
});

// ────────────────────────────────────────
// GET /api/trade-ins — (ADMIN ONLY) Listar solicitudes
// ────────────────────────────────────────
router.get('/', verifyToken, isAdmin, async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM trade_ins ORDER BY created_at DESC');
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching trade-ins:', err);
        res.status(500).json({ error: 'Error obteniendo solicitudes.' });
    }
});

// ────────────────────────────────────────
// PUT /api/trade-ins/:id/status — (ADMIN ONLY) Actualizar estado
// ────────────────────────────────────────
router.put('/:id/status', verifyToken, isAdmin, async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const result = await pool.query(
            'UPDATE trade_ins SET status = $1, updated_at = NOW() WHERE id = $2 RETURNING *',
            [status, id]
        );
        if (result.rows.length === 0) return res.status(404).json({ error: 'Cotización no encontrada.' });
        res.json(result.rows[0]);
    } catch (err) {
        console.error('Error updating trade-in status:', err);
        res.status(500).json({ error: 'Error actualizando el estado.' });
    }
});

module.exports = router;
