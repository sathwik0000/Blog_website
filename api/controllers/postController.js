const { Post, User, Comment } = require('../models');

const createPost = async (req, res) => {
    const { title, content } = req.body;

    if (!title || !content) {
        return res.status(400).json({ message: 'Title and content are required.' });
    }

    const newPost = await Post.create({
        title,
        content,
        userId: req.user.id,
    });

    res.status(201).json(newPost);
};

const getPosts = async (req, res) => {
    const posts = await Post.findAll({
        include: [
            {
                model: User,
                attributes: ['username'],
            },
            {
                model: Comment,
                attributes: ['username', 'content'],
            }
        ]
    });

    res.status(200).json(posts);
};

const updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, content, userId } = req.body;

    if (!title || !content) {
        return res.status(400).json({ message: 'Title and Content are required.' });
    }

    const post = await Post.findByPk(id);

    if (!post) {
        return res.status(404).json({ message: 'Post not found' });
    }

    if (post.userId !== req.user.id) {
        return res.status(403).json({ message: 'Unauthorized to update this post.' });
    }

    await post.update({ title, content });
    res.json({ message: 'Post updated successfully', post });
};

const deletePost = async (req, res) => {
    const { id } = req.params;
    const post = await Post.findByPk(id);

    if (!post) {
        return res.status(404).json({ message: 'Post not found.' });
    }

    await post.destroy();
    res.status(200).json({ message: 'Post deleted successfully.' });
};

module.exports = {
    getPosts,
    createPost,
    updatePost,
    deletePost
};
