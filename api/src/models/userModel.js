const connectDatabase = require('../database/db');
const { v4: uuidv4 } = require('uuid');

// retorna todos os usuários do banco
const getAllUsers = async () => {
  console.log('Starting getAllUsers model.')
  try {
    const pool = await connectDatabase();
    const { rows } = await pool.query('SELECT * FROM users');
    return rows;
  } catch (error) {
    console.error("Error fetching all users:", error.message);
    throw error;
  }
};

// retorna somente o usuário do banco com o id especificado na requisição
const getUserById = async (userId) => {
  console.log('Starting getUserById model.')
  try {
    const pool = await connectDatabase();
    const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [userId]);
    
    if (rows && rows.length > 0) {
      return rows[0];
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching user by ID:", error.message);
    throw error;
  }
};

// retorna um usuário caso já exista com o username requisitado
// utilizado como um método interndo na api na hora de cadastrar um novo usuário, já que o username é chave única
const getUserByUsername = async (username) => {
  console.log('Starting getUserByUsername model.')
  try {
    const pool = await connectDatabase();
    
    const query = `
      SELECT * FROM users WHERE username = $1;
    `;

    const { rows } = await pool.query(query, [username]);

    if (rows && rows.length > 0) {
      return rows[0];
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching user by username:", error.message);
    throw error;
  }
};

// cadastra um novo usuário no banco
const createUser = async (userData) => {
  console.log('Starting createUser model.')
  const { name, email, username, password } = userData;
  const userId = uuidv4();

  try {
    const pool = await connectDatabase();
    
    const query = `
      INSERT INTO users (id, name, email, username, password)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;
    
    const { rows } = await pool.query(query, [userId, name, email, username, password]);

    if (rows && rows.length > 0) {
      return rows[0];
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error creating user:", error.message);
    throw error;
  }
}

// edita o usuário especficado na requisição no banco
const editUser = async () => {
  console.log('Starting editUser model.')
}

// delete o usuário especificado na requisição do banco
const deleteUser = async () => {
  console.log('Starting deleteUser model.')
}

// acessa o banco para verificar as credenciais do usuário que está realizando login
const login = async () => {
  console.log('Starting login model.')
}

module.exports = {
  getAllUsers,
  getUserById,
  getUserByUsername,
  createUser,
  editUser,
  deleteUser,
  login
};
