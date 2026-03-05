const express = require('express');
const Stripe = require('stripe');
const { Pool } = require('pg');

const router = express.Router();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2023-10-16', // Versión fija por seguridad
});

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

// ────────────────────────────────────────
// POST /api/payments/create-checkout-session
// ────────────────────────────────────────
router.post('/create-checkout-session', async (req, res) => {
    // 1. Recibe carrito y datos de envío desde el frontend
    const { items, shippingAddress, userId = null } = req.body;

    if (!items || items.length === 0) {
        return res.status(400).json({ error: 'El carrito está vacío.' });
    }

    try {
        // 2. Formatear los line_items para Stripe
        const lineItems = items.map(item => ({
            price_data: {
                currency: 'mxn',
                product_data: {
                    name: item.name,
                    images: item.image ? [item.image] : [],
                },
                unit_amount: Math.round(item.price * 100), // Stripe usa centavos
            },
            quantity: item.quantity,
        }));

        // 3. Calcular total exacto (opcional, para la BD en MXN)
        const totalAmount = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

        // 4. Crear la sesión en Stripe
        const baseUrl = process.env.FRONTEND_URL || 'http://localhost:3000';

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card', 'oxxo'],
            line_items: lineItems,
            mode: 'payment',
            success_url: `${baseUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${baseUrl}/checkout`,
            // Opcional: pasar metadata extra
            metadata: {
                shipping_address: JSON.stringify(shippingAddress),
                user_id: userId ? String(userId) : 'guest'
            }
        });

        // 5. Crear la orden "Pendiente" en la BD con el ID de sesión
        await pool.query(
            'INSERT INTO orders (id, user_id, total, status, shipping_address) VALUES ($1, $2, $3, $4, $5)',
            [session.id, userId, totalAmount, 'pending', JSON.stringify(shippingAddress)]
        );

        // 6. Guardar los ítems
        for (const item of items) {
            await pool.query(
                'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ($1, $2, $3, $4)',
                [session.id, Number(item.id), item.quantity, item.price]
            );
        }

        // 7. Devolver URL Hosted Checkout de Stripe
        res.json({ url: session.url });

    } catch (err) {
        console.error('Error creando checkout session:', err);
        res.status(500).json({ error: 'Error del servidor al iniciar pago.' });
    }
});

module.exports = router;
