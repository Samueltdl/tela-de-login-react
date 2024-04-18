const { getAllUsers, getUserById, getUserByUsername } = require('./getUserModel');
const createUser = require('./createUserModel');
const updateUser = require('./updateUserModel');
const deleteUser = require('./deleteUserModel');

module.exports = {
    getAllUsers,
    getUserById,
    getUserByUsername,
    createUser,
    updateUser,
    deleteUser
}