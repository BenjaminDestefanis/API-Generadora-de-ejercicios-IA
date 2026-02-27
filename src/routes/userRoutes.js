// Ruta solo para usuarios que esten autentucados

const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authMiddleware');
const { findUserById } = require('../models/userModel');

router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const user = await findUserById(req.user.id);

    res.json({
      message: 'Perfil obtenido correctamente',
      user
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;