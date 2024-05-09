// verifica o formato do email usando regex
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

//Validação do tamanho da senha, que deve ter no mínimo 8 caracteres
const validateLenPassword = (password) => {
  return password?.toString().length >= 8 ? true : false
}

module.exports = {
    validateEmail,
    validateLenPassword,
}
