const { Post, Comment } = require('../models');

const createComment = async (req, res) => {
    const { postId } = req.params;
    const { content, username } = req.body;

    const post = await Post.findByPk(postId);
    if (!post) {
        return jres.status(404).json({ message: 'Post not found' });
    }

    const comment = await Comment.create({
        postId,
        username,
        content,
    });

    res.status(201).json(comment);
};

module.exports = { createComment };
