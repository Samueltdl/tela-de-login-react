const userModelInterface = require('../models/userModelInterface') // importando a model

// retorna todos os usuários
const getAllUsers = async (req, res) => {
    console.log('Starting getAllUsers controller.');
    try {
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
  const userId = req.params.id;

  try {
    const user = await userModelInterface.getUserById(userId);

    // caso não encontre o usuário correspondente ao id então retorna uma mensagem informando que o usuário não foi encontrado
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    return res.status(200).json(user);

  } catch (error) {
    console.error("Error fetching user by ID:", error.message);
    return res.status(500).json({ message: 'Erro ao buscar usuário.' });
  }
};

module.exports = {
  getAllUsers,
  getUserById
}
