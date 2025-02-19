const express = require('express');
const authenticateUser = require('../middleware/authMiddleware');
const { createPost, getPosts, updatePost, deletePost } = require('../controllers/postController');
const { createComment } = require('../controllers/commentController');

const router = express.Router();

router.post('/', authenticateUser, createPost);
router.get('/', getPosts);
router.put('/:id', authenticateUser, updatePost);
router.delete('/:id', authenticateUser, deletePost);
router.post('/:postId/comments', authenticateUser, createComment);

module.exports = router;