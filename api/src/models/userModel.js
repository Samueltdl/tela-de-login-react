const connectDatabase = require('./config/database');
const { v4: uuidv4 } = require('uuid');

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

const editUser = async () => {
  console.log('Starting editUser model.')
}

const deleteUser = async () => {
  console.log('Starting deleteUser model.')
}

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
