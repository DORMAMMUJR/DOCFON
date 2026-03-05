-- Tabla de usuarios DOCFON
-- Ejecutar en la consola de la BD o con: psql $DATABASE_URL -f backend/db/migrate.sql
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'customer' CHECK (role IN ('admin', 'customer', 'franchise')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);
-- Índice para búsquedas por email (login)
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
-- Comentario: para crear el primer admin, ejecutar después del register:
-- UPDATE users SET role = 'admin' WHERE email = 'tu@email.com';