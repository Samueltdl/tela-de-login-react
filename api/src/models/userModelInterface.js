// importando todas as models
const { getAllUsers, getUserById, getUserByUsername, getUserByEmail } = require('./getUserModel');
const createUser = require('./createUserModel');
const updateUser = require('./updateUserModel');
const deleteUser = require('./deleteUserModel');

module.exports = {
    getAllUsers,
    getUserById,
    getUserByUsername,
    getUserByEmail,
    createUser,
    updateUser,
    deleteUser
}