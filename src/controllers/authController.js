const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { createUser, findUserByEmail } = require('../models/userModel');

const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Verificar si ya existe
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'Usuario ya existe' });
    }

    // Encriptar password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear usuario
    const user = await createUser(email, hashedPassword);

    res.status(201).json({
      message: 'Usuario creado correctamente',
      user
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(400).json({ message: 'Credenciales inválidas' });
    }

    // Comparar password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Credenciales inválidas' });
    }

    // Crear token
    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({
      message: 'Login exitoso',
      token
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  register,
  login
};