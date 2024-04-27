require('dotenv').config(); // biblioteca para acessar as variáveis de ambiente
const bcrypt = require('bcrypt'); // biblioteca para encriptar a senha
const jwt = require('jsonwebtoken'); // biblioteca para gerar o token do usuário
const userModelInterface = require('../models/userModelInterface'); // importando a model
const { validateEmail } = require('../utils/validators'); // função que valida o email

// login e autenticação
const login = async (req, res) => {
    console.log('Starting login controller.');
  
    const userData = req.body;
  
    // verificando se todos os dados foram preenchidos antes de prosseguir
    if (!userData || !userData.email || !userData.password) {
      return res.status(400).json({ message: 'Dados inválidos ou não preenchidos.' });
    }

    // Validar o formato do email
    if (!validateEmail(userData.email)) {
      return res.status(400).json({ message: 'Formato de email inválido.' });
    }

    try {
      // pesquisando o email fornecido para verificar se o usuário existe
      const existingUser = await userModelInterface.getUserByEmail(userData.email);
      if (!existingUser) {
        // Aqui retorna email ou senha incorretos propositalmente para dificultar o acesso de pessoas que não o proprietário da conta
        return res.status(401).json({ message: 'E-mail ou senha incorretos.' });
      }
  
      // Compara o password fornecido com o password armazenado no banco de dados usando bcrypt
      const isPasswordValid = await bcrypt.compare(userData.password, existingUser.password);
      if (!isPasswordValid) {
        // Aqui é o mesmo caso da verificação de email acima, retorna email ou senha incorretos para dificultar o acesso de terceiros
        return res.status(401).json({ message: 'E-mail ou senha incorretos.' });
      }
      
      // verifica se o usuário está ativo para ser possível efetuar o login
      if (existingUser.is_active === false) {
        return res.status(404).json({ message: 'Usuário não encontrado.' })
      }
      
      const token = jwt.sign(
        { userId: existingUser.user_id, email: userData.email }, // dados a serem armazenados no token
        process.env.TOKEN_SECRET_KEY, // obtendo chave secreta da variável de ambiente
        { expiresIn: '1h' } // tempo de expiração do token
      );

      // se está tudo válido então retorna um status 200 e uma mensagem de login bem sucedido, o id do usuário e o token
      return res.status(200).json({ 
        message: 'Login efetuado com sucesso.',
        userId: `${existingUser.user_id}`,
        token });
  
    } catch (error) {
      console.error("Error logging in:", error.message);
      return res.status(500).json({ message: 'Erro ao fazer login.' });
    }
  };

module.exports = login;
