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
        const sqlPath = path.join(__dirname, 'db', 'migrate_orders.sql');
        const sql = fs.readFileSync(sqlPath, 'utf8');

        console.log('Ejecutando migración de órdenes...');
        await pool.query(sql);
        console.log('Migración completada exitosamente. Tablas orders y order_items creadas.');
    } catch (err) {
        console.error('Error ejecutando migración:', err);
    } finally {
        await pool.end();
    }
}

runMigration();
