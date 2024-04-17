require('dotenv').config(); // biblioteca dotenv para acessar as variáveis de ambiente
const jwt = require('jsonwebtoken');

// Verifica o formato do email usando regex
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Email inválido.' });
  }
}

const validateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Token não fornecido.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
    req.userId = decoded.userId;
    req.username = decoded.username;
    next();
  } catch (error) {
    console.error("Error verifying token:", error.message);
    return res.status(403).json({ message: 'Token inválido.' });
  }
};

module.exports = {
    validateEmail,
    validateToken
}
