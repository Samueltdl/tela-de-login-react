const bcrypt = require('bcrypt'); // biblioteca para encriptar a senha
const userModelInterface = require('../models/userModelInterface') // importando a model
const { validateEmail } = require('../utils/validators'); // função que valida o email

// edita as informações de um usuário (o usuário pode editar somente suas próprias informações)
const updateUser = async (req, res) => {
    console.log('Starting editUser controller.');
    
    const userData = req.body;
  
    // verificando se todos os dados foram preenchidos antes de prosseguir
    if (!userData || !userData.name || !userData.email || !userData.username || !userData.password || !userData.confirmPassword) {
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
  
    // removendo o campo de confirmPassword do json antes de chamar a model
    delete userData.confirmPassword;
  
    try {
      // pesquisando o username fornecido para verificar se já existe e é diferente do username antigo caso tenha sido alterado
      const user = await userModelInterface.getUserById(userData.id);
      const existingUser = await userModelInterface.getUserByUsername(userData.username);
      if (existingUser && existingUser.username !== user.username) {
        return res.status(400).json({ message: 'Username já existente.' });
      }
  
      // caso a senha tenha sido alterada, ela será encriptada antes de prosseguir
      if (userData.password !== user.password) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(userData.password, salt);
        userData.password = hashedPassword;
      };
  
      const newUser = await userModelInterface.updateUser(userData);
      return res.status(201).json(newUser);
  
    } catch (error) {
      console.error("Error editing user:", error.message);
      return res.status(500).json({ message: 'Erro ao editar usuário.' });
    }
  };

module.exports = updateUser;
