const express = require('express')
const userController = require('../controllers/userController')

const router = express.Router();

router.get('/user', userController.getAllUsers);

module.exports = router