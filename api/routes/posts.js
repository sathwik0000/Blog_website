const express = require('express');
const authenticateUser = require('../middleware/authMiddleware');
const { createPost, getPosts } = require('../controllers/postController');
const router = express.Router();

router.post('/', authenticateUser, createPost);
router.get('/', getPosts);

module.exports = router;