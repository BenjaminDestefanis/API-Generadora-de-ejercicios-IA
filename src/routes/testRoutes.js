const express = require('express');
const router = express.Router();
const pool = require('../config/db');

router.get('/db-test', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({
      message: 'Base de datos funcionando ✅',
      time: result.rows[0]
    });
  } catch (error) {
    res.status(500).json({
      error: 'Error consultando la base de datos',
      details: error.message
    });
  }
});

module.exports = router;