require('dotenv').config(); // biblioteca para acessar as variáveis de ambiente
const bcrypt = require('bcrypt'); // biblioteca para encriptar a senha
const jwt = require('jsonwebtoken'); // biblioteca para gerar o token do usuário
const userModel = require('../models/userModel'); // importando a model
const { validateEmail } = require('../utils/validators'); // função que valida o email

// retorna todos os usuários
const getAllUsers = async (req, res) => {
  console.log('Starting getAllUsers controller.');
  try {
    const users = await userModel.getAllUsers();

    if (!users || users.length === 0) {
      return res.status(404).json({ message: 'Nenhum usuário encontrado.' });
    }

    return res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching all users:", error.message);
    return res.status(500).json({ message: 'Erro ao buscar usuários.' });
  }
};

// retorna somente o usuário com o id especificado na requisição
const getUserById = async (req, res) => {
  console.log('Starting getUserById controller.');
  const userId = req.params.id;

  try {
    const user = await userModel.getUserById(userId);

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user by ID:", error.message);
    return res.status(500).json({ message: 'Erro ao buscar usuário.' });
  }
};

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
    const existingUser = await userModel.getUserByUsername(userData.username);
    if (existingUser) {
      return res.status(400).json({ message: 'Username já existente.' });
    }

    // encripta o password antes de armazenar no banco de dados
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userData.password, salt);

    // atualiza o userData com o password encriptado
    userData.password = hashedPassword;

    const newUser = await userModel.createUser(userData);
    return res.status(201).json(newUser);

  } catch (error) {
    console.error("Error creating user:", error.message);
    return res.status(500).json({ message: 'Erro ao criar usuário.' });
  }  
};

// edita as informações de um usuário (o usuário pode editar somente suas próprias informações)
const editUser = async (req, res) => {
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
    const user = await userModel.getUserById(userData.id);
    const existingUser = await userModel.getUserByUsername(userData.username);
    if (existingUser && existingUser.username !== user.username) {
      return res.status(400).json({ message: 'Username já existente.' });
    }

    // caso a senha tenha sido alterada, ela será encriptada antes de prosseguir
    if (userData.password !== user.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(userData.password, salt);
      userData.password = hashedPassword;
    };

    const newUser = await userModel.editUser(userData);
    return res.status(201).json(newUser);

  } catch (error) {
    console.error("Error editing user:", error.message);
    return res.status(500).json({ message: 'Erro ao editar usuário.' });
  }
};

// deleta seu próprio usuário
const deleteUser = async (req, res) => {
  console.log('Starting deleteUser controller.');
    
};

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

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  editUser,
  deleteUser,
  login
};
