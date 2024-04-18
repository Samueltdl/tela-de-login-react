const express = require('express'); // importando o express
const userControllerInterface = require('../controllers/userControllerInterface'); // importando o controller
const { validateToken } = require('../utils/validators'); // importando o validador de token

const router = express.Router();

router.post('/login', userControllerInterface.login);
router.post('/user', userControllerInterface.createUser);

router.use(validateToken);
router.get('/user', userControllerInterface.getAllUsers);
router.put('/user', userControllerInterface.updateUser);
router.delete('/user', userControllerInterface.deleteUser);

module.exports = router