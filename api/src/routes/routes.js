const express = require('express')

const router = express.Router();

router.get('/user', (req, res) => {
    res.status(200).json({
        username: "fulano",
        message: "get de usuários"
    })
});

router.post('/user', (req, res) => res.status(200).send('aqui vão estar as infos do usuário'));

router.put('/user', (req, res) => res.status(200).send('aqui vão estar as infos do usuário'));

router.delete('/user', (req, res) => res.status(200).send('aqui vão estar as infos do usuário'));

router.post('/login', (req, res) => res.status(200).send('aqui vão estar as infos do usuário'))

module.exports = router