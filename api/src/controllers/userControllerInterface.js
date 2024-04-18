const { getAllUsers } = require('./getUserController');
const createUser = require('../controllers/createUserController');
const updateUser = require('../controllers/updateUserController');
const deleteUser = require('../controllers/deleteUserController');
const login = require('../controllers/loginController');

module.exports = {
    getAllUsers,
    createUser,
    updateUser,
    deleteUser,
    login
}
