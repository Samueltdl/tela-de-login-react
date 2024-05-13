const userModelInterface = require('../models/userModelInterface') // importando a model

// retorna todos os usuários paginados
const getUsersByPage = async (req, res) => {
  console.log('Starting getUsersByPage controller.');

  try {
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 8;
    
    const users = await userModelInterface.getUsersByPage(page, perPage);
    
    // se não houver usuários na página especificada, retorna uma mensagem informando que nenhum usuário foi encontrado
    if (!users || users.length === 0) {
      return res.status(404).json({ message: 'Nenhum usuário encontrado nesta página.' });
    }

    return res.status(200).json(users); // retorna os usuários da página selecionada

  } catch (error) {
    console.error("Error fetching users by page:", error.message);
    return res.status(500).json({ message: 'Erro ao buscar usuários.' });
  }
};

// retorna somente o usuário com o id especificado na requisição
const getUserById = async (req, res) => {
  console.log('Starting getUserById controller.');

  const searchId = req.body.searchId;

  try {
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

  const searchUsername = req.body.searchUsername;

  try {
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

// retorna somente o usuário com o id especificado na requisição
const getUserLoged = async (req, res) => {
  console.log('Starting getUserLoged controller.');

  const user = req.user;

  try {
    const searchUser = await userModelInterface.getUserById(user.userId);

    // caso não encontre o usuário correspondente ao id então retorna uma mensagem informando que o usuário não foi encontrado
    if (!searchUser) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    return res.status(200).json({
      userId:searchUser.user_id,
      name:searchUser.name,
      email:searchUser.email,
      username:searchUser.username,
      registrationDate:searchUser.registration_date
    });

  } catch (error) {
    console.error("Error fetching user by ID:", error.message);
    return res.status(500).json({ message: 'Erro ao buscar usuário.' });
  }
};

module.exports = {
  getUsersByPage,
  getUserById,
  getUserByUsername,
  getUserLoged
}
