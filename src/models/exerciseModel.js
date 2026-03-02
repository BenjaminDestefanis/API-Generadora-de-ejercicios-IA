const pool = require('../config/db');

// Crear ejercicio
const createExercise = async (userId, topicId, question, solution, difficulty) => {
  const query = `
    INSERT INTO exercises (user_id, topic_id, question, solution, difficulty)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
  `;

  const values = [userId, topicId, question, solution, difficulty];
  const result = await pool.query(query, values);

  return result.rows[0];
};

// Obtener ejercicios por usuario
const getExercisesByUser = async (userId) => {
  const result = await pool.query(
    `SELECT e.*, t.name AS topic_name
     FROM exercises e
     JOIN topics t ON e.topic_id = t.id
     WHERE e.user_id = $1
     ORDER BY e.created_at DESC`,
    [userId]
  );

  return result.rows;
};

// Obtener ejercicio por id
const getExerciseById = async (id) => {
  const result = await pool.query(
    `SELECT * FROM exercises WHERE id = $1`,
    [id]
  );

  return result.rows[0];
};


const countUserExercisesToday = async (userId) => {
    const result = await pool.query(
    `SELECT COUNT(*) FROM exercises
     WHERE user_id = $1
     AND created_at::date = CURRENT_DATE`,
    [userId]
  );
  return parseInt(result.rows[0].count);    
    
};
module.exports = {
  createExercise,
  getExercisesByUser,
  getExerciseById,
  countUserExercisesToday
};