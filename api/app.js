const express = require('express');
const app = express();
require('express-async-errors');

const login = require('./routes/login');
const users = require('./routes/users');

app.use(express.json());
app.use('/', users);
app.use('/login', login);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Started backend on port ${PORT}`);
});
