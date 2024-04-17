// Verifica o formato do email usando regex
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Email inválido.' });
  }
}

module.exports = {
    validateEmail
}