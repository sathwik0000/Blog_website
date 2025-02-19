const express = require('express');
const authenticateUser = require('../middleware/authMiddleware');
const { createPost, getPosts, updatePost, deletePost } = require('../controllers/postController');
const router = express.Router();

router.post('/', authenticateUser, createPost);
router.get('/', getPosts);
router.put('/:id', authenticateUser, updatePost);
router.delete('/:id', authenticateUser, deletePost);

module.exports = router;