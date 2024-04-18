require('dotenv').config(); // importando a biblioteca dotenv para acessar as variáveis de ambiente
const express = require('express');
const router = require('./routes/routes'); // importando o gerenciador de rotas

const port = process.env.PORT || 3333;
const app = express();

app.use(express.json());
app.use(router);

app.listen(port, () => {
    console.log(`Server is running on port ${port}.`)
});
