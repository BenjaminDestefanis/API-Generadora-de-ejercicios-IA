const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authMiddleware');
const { generateExercise } = require('../controllers/exerciseController');

router.post('/generate', authenticateToken, generateExercise);

module.exports = router;