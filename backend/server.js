require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const authRouter = require('./routes/auth');
const productsRouter = require('./routes/products');
const paymentsRouter = require('./routes/payments');
const webhooksRouter = require('./routes/webhooks');
const tradeInsRouter = require('./routes/trade-ins');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
    origin: [
        process.env.FRONTEND_URL || 'http://localhost:3000',
        'http://localhost:3000' // siempre permite localhost en dev
    ],
    credentials: true
}));

// ── Webhooks (Importante: antes del express.json) ──
// Stripe necesita el cuerpo en bruto para verificar firmas
app.use('/api/webhooks', express.raw({ type: 'application/json' }), webhooksRouter);

// ── Middlewares Generales ────────────────────────
app.use(express.json());

// Servir la carpeta uploads estáticamente
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ── Rutas ──────────────────────────────
app.use('/api/auth', authRouter);
app.use('/api/products', productsRouter);
app.use('/api/payments', paymentsRouter);
app.use('/api/trade-ins', tradeInsRouter);

// ── Healthcheck ────────────────────────
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(port, () => {
    console.log(`✅ Backend DOCFON corriendo en http://localhost:${port}`);
});
