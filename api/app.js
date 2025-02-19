const express = require('express');
const cors = require('cors');
const app = express();
require('express-async-errors');

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

const login = require('./routes/login');
const users = require('./routes/users');
const posts = require('./routes/posts');

app.use(express.json());
app.use('/login', login);
app.use('/', users);
app.use('/posts', posts);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Started backend on port ${PORT}`);
});
