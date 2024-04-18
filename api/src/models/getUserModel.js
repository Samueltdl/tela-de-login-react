const connectDatabase = require('../database/db');

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

module.exports = {
    getAllUsers,
    getUserById,
    getUserByUsername
}