const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Test automático de conexión
pool.connect()
  .then(client => {
    console.log('✅ Conectado a PostgreSQL');
    client.release();
  })
  .catch(err => {
    console.error('❌ Error de conexión:', err.message);
  });

module.exports = pool;