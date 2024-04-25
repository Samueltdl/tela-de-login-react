require('dotenv').config();
const { Pool } = require('pg');

let pool;

// cria a conexão com o banco de dados
async function connectDatabase() {
  console.log('Connecting to the database.')

  // se já possui uma conexão ativa então retorna ela mesma
  if (pool) {
    console.log("Successful connecting to the database.");
    return pool;
  }

  try {
    pool = new Pool({
      connectionString: process.env.CONNECTION_STRING
    });

    await pool.connect();
    console.log("Successful connecting to the database.");
    
    return pool;
  } catch (error) {
    console.error("Error connecting to the database:", error.message);
    throw error;
  }
}

module.exports = connectDatabase;