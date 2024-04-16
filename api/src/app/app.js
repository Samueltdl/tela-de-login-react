const express = require('express')
const router = require('../routes/routes')
const db = require('../config/database')

const app = express();

app.use(router);

module.exports = app;
