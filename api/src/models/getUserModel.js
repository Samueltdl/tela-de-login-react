const connectDatabase = require('../database/db'); // importando conexão com o banco de dados

// retorna os usuários paginados do banco
const getUsersByPage = async (page, perPage) => {
  console.log('Starting getUsersByPage model.');
  try {
      const pool = await connectDatabase();
      const offset = (page - 1) * perPage;
      const query = {
          text: 'SELECT name, username FROM users ORDER BY user_id OFFSET $1 LIMIT $2',
          values: [offset, perPage]
      };
      const { rows } = await pool.query(query);
      return rows;
  } catch (error) {
      console.error("Error fetching users by page:", error.message);
      throw error;
  }
};

// retorna somente o usuário do banco com o id especificado na requisição
const getUserById = async (userId) => {
  console.log('Starting getUserById model.')
  try {
    const pool = await connectDatabase();
    const { rows } = await pool.query('SELECT * FROM users WHERE user_id = $1', [userId]);
    
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

// retorna um usuário caso já exista com o email requisitado
const getUserByEmail = async (email) => {
  console.log('Starting getUserByEmail model.')
  try {
    const pool = await connectDatabase();
    
    const query = `
      SELECT * FROM users WHERE email = $1;
    `;

    const { rows } = await pool.query(query, [email]);

    if (rows && rows.length > 0) {
      return rows[0];
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching user by email:", error.message);
    throw error;
  }
};

module.exports = {
    getUsersByPage,
    getUserById,
    getUserByUsername,
    getUserByEmail
}
