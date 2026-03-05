// webhook.js
const express = require('express');
const Stripe = require('stripe');
const { Pool } = require('pg');

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2023-10-16',
});

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

// ────────────────────────────────────────
// POST /api/webhooks/stripe
// ────────────────────────────────────────
// Nota crucial: Stripe necesita el raw body para verificar la firma,
// por lo que express.raw() debe usarse ANTES del express.json()
// Este archivo espera que server.js maneje el body parser correctamente.
router.post('/stripe', express.raw({ type: 'application/json' }), async (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
        console.error('Webhook signature verification failed.', err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Manejar eventos
    switch (event.type) {
        case 'checkout.session.completed':
            const session = event.data.object;
            // session.id coincide con el order_id que guardamos en BD
            console.log(`✅ Pago exitoso para sesión: ${session.id}`);

            try {
                await pool.query(
                    'UPDATE orders SET status = $1, updated_at = NOW() WHERE id = $2',
                    ['paid', session.id]
                );
            } catch (err) {
                console.error('Error actualizando BD en webhook:', err);
                return res.status(500).send('Error interno gestionando webhook');
            }
            break;

        case 'checkout.session.expired':
            const expiredSession = event.data.object;
            try {
                await pool.query(
                    'UPDATE orders SET status = $1, updated_at = NOW() WHERE id = $2',
                    ['failed', expiredSession.id]
                );
            } catch (err) {
                console.error('Error actualizando BD en webhook:', err);
                return res.status(500).send('Error interno gestionando webhook');
            }
            break;

        // Opcional: manejar otros eventos si se desea

        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    // Return a 200 response to acknowledge receipt of the event
    res.send();
});

module.exports = router;
