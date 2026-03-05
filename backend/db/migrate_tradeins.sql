-- Tabla de solicitudes Vende tu Teléfono (Trade-ins)
-- Ejecutar con run-migration-tradeins.js
CREATE TABLE IF NOT EXISTS trade_ins (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE
    SET NULL,
        -- Null si cotiza como invitado
        brand VARCHAR(100) NOT NULL,
        model VARCHAR(100) NOT NULL,
        condition VARCHAR(50) NOT NULL,
        description TEXT,
        images JSONB NOT NULL DEFAULT '[]',
        -- Array con nombres de archivo locales
        contact_name VARCHAR(100),
        contact_phone VARCHAR(20),
        contact_email VARCHAR(150),
        status VARCHAR(50) NOT NULL DEFAULT 'pending' CHECK (
            status IN (
                'pending',
                'reviewed',
                'accepted',
                'rejected',
                'completed'
            )
        ),
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
);