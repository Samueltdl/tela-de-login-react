const connectDatabase = require('../database/db'); // importando conexão com o banco de dados
const { v4: uuidv4 } = require('uuid'); // biblioteca uuid

// cadastra um novo usuário no banco
const createUser = async (userData) => {
    console.log('Starting createUser model.');
    const { name, email, username, password } = userData;
    const userId = uuidv4();
  
    try {
      const pool = await connectDatabase();
      
      const query = `
        INSERT INTO users (id, name, email, username, password, registrationdate, isactive)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *;
      `;
      
      const { rows } = await pool.query(query, [userId, name, email, username, password, new Date(), true]);
  
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

module.exports = createUser;