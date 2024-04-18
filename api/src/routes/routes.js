const express = require('express')
//const userController = require('../controllers/userController')
const { validateToken } = require('../utils/validators');

const { getAllUsers, getUserById } = require('../controllers/getUserController');
const createUser = require('../controllers/createUserController');
const updateUser = require('../controllers/updateUserController');
const deleteUser = require('../controllers/deleteUserController');
const login = require('../controllers/loginController');

const router = express.Router();

router.post('/login', login);
router.post('/user', createUser);

router.use(validateToken)
router.get('/user', getAllUsers);
router.put('/user', updateUser);
router.delete('/user', deleteUser);

module.exports = router