const userModel = require('../models/userModel');

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

const createUser = async (req, res) => {
  console.log('Starting createUser controller.');
  const userData = req.body;

  if (!userData || !userData.name || !userData.email || !userData.username || !userData.password) {
    return res.status(400).json({ message: 'Dados inválidos.' });
  }

  try {
    const existingUser = await userModel.getUserByUsername(userData.username);
    
    if (existingUser) {
      return res.status(400).json({ message: 'Username já existe.' });
    }

    const newUser = await userModel.createUser(userData);
    return res.status(201).json(newUser);
  } catch (error) {
    console.error("Error creating user:", error.message);
    return res.status(500).json({ message: 'Erro ao criar usuário.' });
  }  
};

const editUser = async (req, res) => {
  console.log('Starting editUser controller.');
    
};

const deleteUser = async (req, res) => {
  console.log('Starting deleteUser controller.');
    
};

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
