// importando todos os controllers
const { getAllUsers, getUserByUsername, getUserLoged } = require('./getUserController');
const createUser = require('../controllers/createUserController');
const updateUser = require('../controllers/updateUserController');
const deleteUser = require('../controllers/deleteUserController');
const login = require('../controllers/loginController');

module.exports = {
    getAllUsers,
    getUserByUsername,
    getUserLoged,
    createUser,
    updateUser,
    deleteUser,
    login
}
