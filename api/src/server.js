require('dotenv').config();
const express = require('express')
const router = require('./routes/routes')

const port = process.env.PORT || 3333;
const app = express();

app.use(express.json());
app.use(router);

app.listen(port, () => {
    console.log(`Server is running on port ${port}.`)
});
