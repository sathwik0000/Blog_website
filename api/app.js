const express = require('express');
const app = express();
app.use(express.json());

const PORT = process.env.BLOG_API || 8080;

app.listen(PORT, () => {
    console.log('Started backend');
});