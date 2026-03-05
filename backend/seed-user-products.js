require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

const nuevosProductos = [
    {
        name: 'Microscopio Estereoscópico Trinocular Relife RTL-7Pro',
        category: 'Equipamiento',
        price: 5200,
        image: 'https://m.media-amazon.com/images/I/41-qSgWv+sL.jpg',
        description: 'Microscopio profesional super óptico con base de metal.',
        is_bulk: false
    },
    {
        name: 'Batería Original Samsung Galaxy S23 Ultra',
        category: 'Refacciones',
        price: 850,
        image: 'https://m.media-amazon.com/images/I/51A9a7S5C4L.jpg',
        description: 'Batería 100% original en empaque con garantía. EB-BS918ABY.',
        is_bulk: true
    },
    {
        name: 'Estación de Soldar Inteligente SUGON 8620DX-Pro',
        category: 'Herramientas',
        price: 3800,
        image: 'https://m.media-amazon.com/images/I/61M5QjZtD+L.jpg',
        description: 'Pistola de calor de precisión con canales de memoria.',
        is_bulk: false
    },
    {
        name: 'Kit de Desarmadores Profesionales 115 en 1',
        category: 'Herramientas',
        price: 350,
        image: 'https://m.media-amazon.com/images/I/71YvC288dEL.jpg',
        description: 'Set completo magnético para reparación de celulares.',
        is_bulk: true
    }
];

async function seedProducts() {
    try {
        console.log('Inyectando productos de Juan a la Base de Datos...');
        for (const prod of nuevosProductos) {
            await pool.query(
                'INSERT INTO products (name, category, price, image, description, is_bulk) VALUES ($1,$2,$3,$4,$5,$6)',
                [prod.name, prod.category, prod.price, prod.image, prod.description, prod.is_bulk]
            );
            console.log(`✅ Producto agregado: ${prod.name}`);
        }
        console.log('¡Todos los productos fueron agregados con éxito!');
    } catch (err) {
        console.error('Error insertando datos:', err);
    } finally {
        await pool.end();
    }
}

seedProducts();
