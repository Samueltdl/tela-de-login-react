const userModelInterface = require('../models/userModelInterface') // importando a model

// retorna todos os usuários
const getAllUsers = async (req, res) => {
  console.log('Starting getAllUsers controller.');

  const userData = req.body

  try {
    const existingUser = await userModelInterface.getUserById(userData.userId);
    // verifica se o usuário existe e está ativo para ser possível prosseguir
    if (!existingUser || existingUser.is_active === false) {
      return res.status(404).json({ message: 'Usuário inválido.' })
    }

    const users = await userModelInterface.getAllUsers();
    
    // se não possui nenhum usuário no banco então retorna uma mensagem informando que nenhum usuári foi encontrado
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

  const userData = req.body
  const searchId = req.body.searchId;

  try {
    const existingUser = await userModelInterface.getUserById(userData.userId);
    // verifica se o usuário existe e está ativo para ser possível prosseguir
    if (!existingUser || existingUser.is_active === false) {
      return res.status(404).json({ message: 'Usuário inválido.' })
    }

    const searchUser = await userModelInterface.getUserById(searchId);

    // caso não encontre o usuário correspondente ao id então retorna uma mensagem informando que o usuário não foi encontrado
    if (!searchUser) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    return res.status(200).json({
      userId:searchUser.user_id,
      name:searchUser.name,
      username:searchUser.username,
      registrationDate:searchUser.registration_date
    });

  } catch (error) {
    console.error("Error fetching user by ID:", error.message);
    return res.status(500).json({ message: 'Erro ao buscar usuário.' });
  }
};

// retorna somente o usuário com o id especificado na requisição
const getUserByUsername = async (req, res) => {
  console.log('Starting getUserByUsername controller.');

  const userData = req.body
  const searchUsername = req.body.searchUsername;

  try {
    const existingUser = await userModelInterface.getUserById(userData.userId);
    // verifica se o usuário existe e está ativo para ser possível prosseguir
    if (!existingUser || existingUser.is_active === false) {
      return res.status(404).json({ message: 'Usuário inválido.' })
    }

    const searchUser = await userModelInterface.getUserByUsername(searchUsername);

    // caso não encontre o usuário correspondente ao username então retorna uma mensagem informando que o usuário não foi encontrado
    if (!searchUser) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    return res.status(200).json({
      userId:searchUser.user_id,
      name:searchUser.name,
      username:searchUser.username,
      registrationDate:searchUser.registration_date
    });

  } catch (error) {
    console.error("Error fetching user by username:", error.message);
    return res.status(500).json({ message: 'Erro ao buscar usuário.' });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  getUserByUsername
}
