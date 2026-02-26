const pool = require('../config/db');

// Crear usuario
const createUser = async (email, password) => {
  const query = `
    INSERT INTO users (email, password)
    VALUES ($1, $2)
    RETURNING id, email, plan, created_at;
  `;

  const values = [email, password];
  const result = await pool.query(query, values);

  return result.rows[0];
};

// Buscar usuario por email
const findUserByEmail = async (email) => {
  const result = await pool.query(
    'SELECT * FROM users WHERE email = $1',
    [email]
  );

  return result.rows[0];
};

// Buscar usuario por id
const findUserById = async (id) => {
  const result = await pool.query(
    'SELECT id, email, plan, created_at FROM users WHERE id = $1',
    [id]
  );

  return result.rows[0];
};

module.exports = {
  createUser,
  findUserByEmail,
  findUserById
};