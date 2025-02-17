const { Post, User, Comment } = require('../models');

const createPost = async (req, res) => {
    const { title, content } = req.body;

    if (!title || !content) {
        return res.status(400).json({ message: 'Title and content are required.' });
    }

    Post.create({
        title,
        content,
        userId: req.user.id,
    })
        .then(newPost => {
            res.status(201).json(newPost);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ message: 'Server error' });
        });
};

const getPosts = async (req, res) => {
    Post.findAll({
        include: [
            {
                model: User,
                attributes: ['username'],
            },
            {
                model: Comment,
                attributes: ['content'],
                include: [
                    {
                        model: User,
                        attributes: ['username'],
                    }
                ]
            }
        ]
    })
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ message: 'Server error' });
        });
};

module.exports = {
    getPosts,
    createPost
};
