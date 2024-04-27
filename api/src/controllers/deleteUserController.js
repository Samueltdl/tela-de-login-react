const userModelInterface = require('../models/userModelInterface'); // importando a model
const bcrypt = require('bcrypt'); // biblioteca para encriptar a senha
const { validateEmail } = require('../utils/validators'); // função que valida o email

// deleta seu próprio usuário
const deleteUser = async (req, res) => {
  console.log('Starting deleteUser controller.');

  const userData = req.body;

  // verificando se todos os dados foram preenchidos antes de prosseguir
  if (!userData || !userData.email || !userData.password || !userData.confirmPassword) {
    return res.status(400).json({ message: 'Dados inválidos ou não preenchidos.' });
  }

  // validar o formato do email
  if (!validateEmail(userData.email)) {
    return res.status(400).json({ message: 'Formato de email inválido.' });
  }

  // verificando se as senhas coincidem
  if (userData.password !== userData.confirmPassword){
    return res.status(400).json({message: 'As senhas não coincidem.'});
  }

  try {
    // pesquisando o email fornecido para verificar se já existe e é diferente do username antigo caso tenha sido alterado
    const existingUser = await userModelInterface.getUserById(userData.userId);

    if (existingUser.email !== userData.email) {
      // Aqui retorna email ou senha incorretos propositalmente para dificultar o acesso de pessoas que não o proprietário da conta
      return res.status(401).json({ message: 'E-mail ou senha incorretos.' });
    }

    // Compara o password fornecido com o password armazenado no banco de dados usando bcrypt
    const isPasswordValid = await bcrypt.compare(userData.password, existingUser.password);
    if (!isPasswordValid) {
      // Aqui é o mesmo caso da verificação de email acima, retorna email ou senha incorretos para dificultar o acesso de terceiros
      return res.status(401).json({ message: 'E-mail ou senha incorretos.' });
    }

    // verifica se o usuário está ativo para ser possível prosseguir, isso previne que um usuário possa fazer diversas requisições para deletar sua conta
    if (existingUser.is_active === false) {
      return res.status(404).json({ message: 'Usuário não encontrado.' })
    }

    await userModelInterface.deleteUser(userData.userId);
    return res.status(200).json({ message: 'Usuário deletado com sucesso.' });

  } catch (error) {
    console.error("Error deleting user:", error.message);
    return res.status(500).json({ message: 'Erro ao deletar usuário.' });
  }
};

module.exports = deleteUser
