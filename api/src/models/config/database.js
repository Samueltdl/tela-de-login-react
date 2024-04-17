require('dotenv').config();
const { Pool } = require('pg');

let pool;

async function connectDatabase() {
  if (pool) {
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