// importando todas as models
const { getUsersByPage, getUserById, getUserByUsername, getUserByEmail } = require('./getUserModel');
const createUser = require('./createUserModel');
const updateUser = require('./updateUserModel');
const deleteUser = require('./deleteUserModel');

module.exports = {
    getUsersByPage,
    getUserById,
    getUserByUsername,
    getUserByEmail,
    createUser,
    updateUser,
    deleteUser
}