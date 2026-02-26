const pool = require('../config/db');

// Crear tema
const createTopic = async (name) => {
  const result = await pool.query(
    `INSERT INTO topics (name)
     VALUES ($1)
     RETURNING *;`,
    [name]
  );

  return result.rows[0];
};

// Obtener todos los temas
const getAllTopics = async () => {
  const result = await pool.query(
    'SELECT * FROM topics ORDER BY id ASC'
  );

  return result.rows;
};

// Buscar tema por id
const findTopicById = async (id) => {
  const result = await pool.query(
    'SELECT * FROM topics WHERE id = $1',
    [id]
  );

  return result.rows[0];
};

module.exports = {
  createTopic,
  getAllTopics,
  findTopicById
};