const connectDatabase = require('./config/database');

const getAllUsers = async () => {
  try {
    const pool = await connectDatabase();
    const { rows } = await pool.query('SELECT * FROM users');
    return rows;
  } catch (error) {
    console.error("Error fetching all users:", error.message);
    throw error;
  }
};

const getUserById = async () => {

}

const createUser = async () => {

}

const editUser = async () => {

}

const deleteUser = async () => {

}

const login = async () => {

}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  editUser,
  deleteUser,
  login
};
