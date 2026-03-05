require('dotenv').config();
const bcrypt = require('bcryptjs');
const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

async function createAdmin() {
    try {
        const password_hash = await bcrypt.hash('1234', 12);

        // Eliminar si ya existe
        await pool.query('DELETE FROM users WHERE email = $1', ['1234@docfon.mx']);

        const result = await pool.query(
            'INSERT INTO users (name, email, password_hash, role) VALUES ($1, $2, $3, $4) RETURNING id, name, email, role',
            ['Admin', '1234@docfon.mx', password_hash, 'admin']
        );

        console.log('✅ Usuario admin creado:');
        console.log('   📧 Email:    1234@docfon.mx');
        console.log('   🔑 Password: 1234');
        console.log('   👤 Rol:      admin');
        console.log('   ID:', result.rows[0].id);
    } catch (err) {
        console.error('❌ Error:', err.message);
    } finally {
        await pool.end();
    }
}

createAdmin();
