const express = require('express')

const router = express.Router();

router.get('/user', (request, response) => response.status(200).send('aqui vão estar as infos do usuário'));

router.post('/user', (request, response) => response.status(200).send('aqui vão estar as infos do usuário'));

router.put('/user', (request, response) => response.status(200).send('aqui vão estar as infos do usuário'));

router.delete('/user', (request, response) => response.status(200).send('aqui vão estar as infos do usuário'));

router.post('/login', (request, response) => response.status(200).send('aqui vão estar as infos do usuário'))

module.exports = router