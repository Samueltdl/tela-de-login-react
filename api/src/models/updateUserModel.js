const connectDatabase = require('../database/db'); // importando conexão com o banco de dados

// edita o usuário especficado na requisição no banco
const updateUser = async (user) => {
    const { id, name, email, username, password } = user;
  
    try {
      const pool = await connectDatabase();
      
      const query = `
        UPDATE users
        SET name = $1, email = $2, username = $3
        WHERE id = $4
        RETURNING *
      `;
  
      const values = [name, email, username, id];
  
      // Se a senha foi fornecida, atualize-a
      if (password) {
        query.replace('SET', 'SET password = $5,');
      }
  
      const { rows } = await pool.query(query, values);
      return rows[0];
  
    } catch (error) {
      throw new Error(`Error updating user: ${error.message}`);
    }
  };

module.exports = updateUser;