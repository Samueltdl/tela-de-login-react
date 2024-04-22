const bcrypt = require('bcrypt'); // biblioteca para encriptar a senha
const userModelInterface = require('../models/userModelInterface') // importando a model
const { validateEmail } = require('../utils/validators'); // função que valida o email

// cria um novo usuário
const createUser = async (req, res) => {
    console.log('Starting createUser controller.');
  
    const userData = req.body;
  
    // verificando se todos os dados foram preenchidos antes de prosseguir
    if (!userData || !userData.name || !userData.email || !userData.username || !userData.password || !userData.confirmPassword) {
      return res.status(400).json({ message: 'Dados inválidos ou não preenchidos.' });
    }
  
    // Validar o formato do email
    if (!validateEmail(userData.email)) {
      return res.status(400).json({ message: 'Formato de email inválido.' });
    }
  
    // verificando se as senhas coincidem
    if (userData.password !== userData.confirmPassword){
      return res.status(400).json({message: 'As senhas não coincidem.'});
    }
  
    // removendo o campo de confirmPassword do json antes de chamar a model
    delete userData.confirmPassword;
  
    try {
      // pesquisando o username fornecido para verificar se já existe
      const existingUser = await userModelInterface.getUserByUsername(userData.username);
      if (existingUser) {
        return res.status(400).json({ message: 'Username já existente.' });
      }
  
      // encripta o password antes de armazenar no banco de dados
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(userData.password, salt);
  
      // atualiza o userData com o password encriptado
      userData.password = hashedPassword;
  
      await userModelInterface.createUser(userData);
      return res.status(201).json({ message: "Cadastro efetuado com sucesso." });
  
    } catch (error) {
      console.error("Error creating user:", error.message);
      return res.status(500).json({ message: 'Erro ao criar usuário.' });
    }  
  };

module.exports = createUser;
