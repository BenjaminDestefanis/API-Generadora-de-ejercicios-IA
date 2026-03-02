const { createExercise, countUserExercisesToday } = require('../models/exerciseModel');
const { findUserById } = require('../models/userModel');
const pool = require('../config/db');

const generateExercise = async (req, res) => {
  try {
    const userId = req.user.id;
    const { topicId, difficulty } = req.body;

    if (!topicId) {
      return res.status(400).json({ message: 'topicId es requerido' });
    }

    // Verificar que el topic exista
    const topicCheck = await pool.query(
      `SELECT * FROM topics WHERE id = $1`,
      [topicId]
    );

    if (topicCheck.rows.length === 0) {
      return res.status(404).json({ message: 'Topic no encontrado' });
    }

    const user = await findUserById(userId);

    // 🔥 Control plan free
    if (user.plan === 'free') {
      const todayCount = await countUserExercisesToday(userId);

      if (todayCount >= 3) {
        return res.status(403).json({
          message: 'Límite diario alcanzado (plan free)'
        });
      }
    }

    // 🤖 Simulación IA
    const topicName = topicCheck.rows[0].name;

    const question = `Explica el concepto principal de ${topicName}`;
    const solution = `El concepto principal de ${topicName} consiste en...`;

    const exercise = await createExercise(
      userId,
      topicId,
      question,
      solution,
      difficulty || 'medium'
    );

    res.json({
      message: 'Ejercicio generado correctamente',
      exercise
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  generateExercise
};