// verifica o formato do email usando regex
export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

//Validação do tamanho da senha, que deve ter no mínimo 8 caracteres
export const validateLenPassword = (password) => {
    return password?.toString().length >= 8 ? true : alert("A senha precisa ter no mínimo 8 caracteres!")
}

//Validar se no cadastro ou edição de usuário a senha e a confirmação de senha coincidem
export const validatePassword = (password, confirmPassword) => {
  return password === confirmPassword ? true : alert("As senhas não coincidem!")
}