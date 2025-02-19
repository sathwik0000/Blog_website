const { User } = require('../models');
const argon2 = require('argon2');
const { Op } = require('sequelize');

const createUser = async (req, res) => {
    const { username, email, password } = req.body;

    // Check if username or email already exists
    const existingUser = await User.findOne({
        where: {
            [Op.or]: [{ username }, { email }]
        }
    });

    if (existingUser) {
        if (existingUser.username === username) {
            return res.status(400).json({ message: 'Username already taken' });
        }
        return res.status(400).json({ message: 'Email already registered' });
    }

    const hashedPassword = await argon2.hash(password);

    const newUser = await User.create({ username, email, password: hashedPassword });

    res.status(201).json({
        message: 'User registered successfully',
        user: { id: newUser.id, username: newUser.username, email: newUser.email }
    });
};

const getUserById = async (req, res) => {
    const user = await User.findByPk(req.params.id, {
        attributes: ['id', 'username', 'email']
    });

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
};

module.exports = {
    createUser,
    getUserById,
};
