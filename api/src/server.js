const app = require('./app/app')
require('dotenv').config();

const port = process.env.PORT

app.listen(port || 3333, () => {
    console.log(`Server is running on port ${port ? port : 3333}.`)
});