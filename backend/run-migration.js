require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

async function runMigration() {
    try {
        const sqlPath = path.join(__dirname, 'db', 'migrate.sql');
        const sql = fs.readFileSync(sqlPath, 'utf8');

        console.log('Ejecutando migración...');
        await pool.query(sql);
        console.log('Migración completada exitosamente. Tabla users creada.');
    } catch (err) {
        console.error('Error ejecutando migración:', err);
    } finally {
        await pool.end();
    }
}

runMigration();
