/* 
    Funcion del middleware:
    1. Extraer token
    2. Verificarlo
    3. Si es valido -> permite continuar
    4. Si no -> bloquea Acceso
*/

const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).json({ message: 'Token requerido' });
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token inválido' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded; // guardamos el id del usuario
    next();

  } catch (error) {
    return res.status(403).json({ message: 'Token inválido o expirado' });
  }
};

module.exports = authenticateToken;

