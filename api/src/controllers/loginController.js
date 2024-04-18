require('dotenv').config(); // biblioteca para acessar as variáveis de ambiente
const bcrypt = require('bcrypt'); // biblioteca para encriptar a senha
const jwt = require('jsonwebtoken'); // biblioteca para gerar o token do usuário
const userModel = require('../models/userModel'); // importando a model

// login e autenticação
const login = async (req, res) => {
    console.log('Starting login controller.');
  
    const userData = req.body;
  
    // verificando se todos os dados foram preenchidos antes de prosseguir
    if (!userData || !userData.username || !userData.password) {
      return res.status(400).json({ message: 'Dados inválidos ou não preenchidos.' });
    }

    try {
      // pesquisando o username fornecido para verificar se o usuário existe
      const existingUser = await userModel.getUserByUsername(userData.username);
      if (!existingUser) {
        return res.status(404).json({ message: 'Usuário não encontrado.' });
      }
  
      // Compara o password fornecido com o password armazenado no banco de dados usando bcrypt
      const isPasswordValid = await bcrypt.compare(userData.password, existingUser.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Senha incorreta.' });
      }
  
      // gerar token JWT
      const token = jwt.sign(
        { userId: userData.id, username: userData.username },
        process.env.TOKEN_SECRET_KEY, // chave secreta de autenticação do token
        { expiresIn: '1h' } // tempo de expiração do token
      );
    
      // se está tudo válido então retorna um status 200 e uma mensagem de login bem sucedido e o token
      return res.status(200).json({ message: 'Login efetuado com sucesso.', token });
  
    } catch (error) {
      console.error("Error logging in:", error.message);
      return res.status(500).json({ message: 'Erro ao fazer login.' });
    }
  };

module.exports = login;