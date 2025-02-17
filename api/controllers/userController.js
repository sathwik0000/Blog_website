const { User } = require('../models');
const argon2 = require('argon2');

// Create a new user (Register)
const createUser = async (req, res) => {
    const { username, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
        return res.status(400).json({ message: 'Email already registered' });
    }

    const hashedPassword = await argon2.hash(password);

    const newUser = await User.create({ username, email, password: hashedPassword });

    res.status(201).json({ message: 'User registered successfully', user: newUser });
};

// Get user by ID
const getUserById = async (req, res) => {
    const user = await User.findByPk(req.params.id);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
};

module.exports = {
    createUser,
    getUserById,
};
