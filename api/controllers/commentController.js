const { Post, Comment, User } = require('../models');

// Add a comment to a post
const createComment = async (req, res) => {
    const { postId } = req.params;
    const { content } = req.body;

    // Ensure post exists
    const post = await Post.findByPk(postId);
    if (!post) {
        return res.status(404).json({ message: 'Post not found' });
    }

    // Create a new comment
    const comment = await Comment.create({
        postId,
        userId: req.user.id,
        content,
    });

    res.status(201).json(comment);
};

module.exports = { createComment };
