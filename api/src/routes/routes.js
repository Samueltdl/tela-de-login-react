const express = require('express')
const userController = require('../controllers/userController')
const { validateToken } = require('../utils/validators');

const router = express.Router();

router.post('/login', userController.login);
router.post('/user', userController.createUser);

router.use(validateToken)
router.get('/user', userController.getAllUsers);
router.put('/user', userController.editUser);
router.delete('/user', userController.deleteUser);

module.exports = router