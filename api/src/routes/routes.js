const express = require('express')
const userController = require('../controllers/userController')

const router = express.Router();

router.get('/users', userController.getAllUsers);
router.get('/user', userController.getUserById);
router.post('/user', userController.createUser);
router.put('/user', userController.editUser);
router.delete('/user', userController.deleteUser);
router.post('/login', userController.login);

module.exports = router