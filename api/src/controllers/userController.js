const userModel = require('../models/userModel');

// função que valida o email
const { validateEmail } = require('../utils/validators');

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

  // chamando o validador de email
  validateEmail(userData.email)

  // verificando se as senhas coincidem
  if (userData.password !== userData.confirmPassword){
    return res.status(400).json({message: 'As senhas não coincidem.'});
  }

  // removendo o campo de confirmPassword do json antes de chamar a model
  delete userData.confirmPassword;

  try {
    const existingUser = await userModel.getUserByUsername(userData.username);
    
    if (existingUser) {
      return res.status(400).json({ message: 'Username já existente.' });
    }

    const newUser = await userModel.createUser(userData);
    return res.status(201).json(newUser);
  } catch (error) {
    console.error("Error creating user:", error.message);
    return res.status(500).json({ message: 'Erro ao criar usuário.' });
  }  
};

// edita as informações de um usuário (o usuário pode somente editar suas próprias informações)
const editUser = async (req, res) => {
  console.log('Starting editUser controller.');
    
};

// deleta seu próprio usuário
const deleteUser = async (req, res) => {
  console.log('Starting deleteUser controller.');
    
};

// login e autenticação
const login = async (req, res) => {
  console.log('Starting login controller.');
    
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  editUser,
  deleteUser,
  login
};
