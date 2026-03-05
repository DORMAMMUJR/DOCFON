const express = require('express');
const { body, validationResult } = require('express-validator');
const { Pool } = require('pg');
const { verifyToken, isAdmin } = require('../middleware/auth');

const router = express.Router();
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

// ────────────────────────────────────────
// GET /api/products
// Soporta: ?search=display&category=Displays&page=1&limit=20
// ────────────────────────────────────────
router.get('/', async (req, res) => {
    const { search = '', category = '', page = 1, limit = 20 } = req.query;

    const pageNum = Math.max(1, parseInt(page));
    const limitNum = Math.min(100, Math.max(1, parseInt(limit)));
    const offset = (pageNum - 1) * limitNum;

    const conditions = [];
    const values = [];

    if (search) {
        values.push(`%${search}%`);
        conditions.push(`(name ILIKE $${values.length} OR description ILIKE $${values.length})`);
    }

    if (category) {
        values.push(category);
        conditions.push(`category = $${values.length}`);
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

    try {
        // Total de resultados (para paginación en el frontend)
        const countQuery = `SELECT COUNT(*) FROM products ${whereClause}`;
        const countResult = await pool.query(countQuery, values);
        const total = parseInt(countResult.rows[0].count);

        // Resultados paginados
        values.push(limitNum);
        values.push(offset);
        const dataQuery = `SELECT * FROM products ${whereClause} ORDER BY id ASC LIMIT $${values.length - 1} OFFSET $${values.length}`;
        const dataResult = await pool.query(dataQuery, values);

        res.json({
            data: dataResult.rows,
            pagination: {
                page: pageNum,
                limit: limitNum,
                total,
                totalPages: Math.ceil(total / limitNum),
            }
        });
    } catch (err) {
        console.error('Error fetching products:', err);
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
});

// ────────────────────────────────────────
// POST /api/products — Solo admin
// ────────────────────────────────────────
router.post('/', verifyToken, isAdmin, [
    body('name').trim().notEmpty(),
    body('price').isFloat({ min: 0 }),
    body('category').trim().notEmpty(),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { name, category, price, image, description, is_bulk } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO products (name, category, price, image, description, is_bulk) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *',
            [name, category, price, image || null, description || null, is_bulk || false]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error('Error creating product:', err);
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
});

// ────────────────────────────────────────
// PUT /api/products/:id — Solo admin
// ────────────────────────────────────────
router.put('/:id', verifyToken, isAdmin, async (req, res) => {
    const { id } = req.params;
    const { name, category, price, image, description, is_bulk } = req.body;
    try {
        const result = await pool.query(
            `UPDATE products SET
                name        = COALESCE($1, name),
                category    = COALESCE($2, category),
                price       = COALESCE($3, price),
                image       = COALESCE($4, image),
                description = COALESCE($5, description),
                is_bulk     = COALESCE($6, is_bulk)
             WHERE id = $7 RETURNING *`,
            [name, category, price, image, description, is_bulk, id]
        );
        if (result.rows.length === 0) return res.status(404).json({ error: 'Producto no encontrado.' });
        res.json(result.rows[0]);
    } catch (err) {
        console.error('Error updating product:', err);
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
});

// ────────────────────────────────────────
// DELETE /api/products/:id — Solo admin
// ────────────────────────────────────────
router.delete('/:id', verifyToken, isAdmin, async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM products WHERE id = $1 RETURNING id', [id]);
        if (result.rows.length === 0) return res.status(404).json({ error: 'Producto no encontrado.' });
        res.json({ message: 'Producto eliminado.', id: result.rows[0].id });
    } catch (err) {
        console.error('Error deleting product:', err);
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
});

module.exports = router;
