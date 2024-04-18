require('dotenv').config(); // importando a biblioteca dotenv para acessar as variáveis de ambiente
const express = require('express'); // importando o express
const cors = require('cors'); // importando o cors
const router = require('./routes/routes'); // importando o gerenciador de rotas

const port = process.env.PORT || 3333;
const app = express();

const corsOptions = {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    //credentials: true
  };

app.use(express.json());
app.use(cors(corsOptions));
app.use(router);

app.listen(port, () => {
    console.log(`Server is running on port ${port}.`)
});
