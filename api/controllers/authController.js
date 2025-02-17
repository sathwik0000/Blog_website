const { User } = require('../models');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const loginUser = async (req, res) => {
    const { username, password } = req.body;

    // Find user by username
    const user = await User.findOne({ where: { username } });
    if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Verify password using Argon2
    const isMatch = await argon2.verify(user.password, password);
    if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
        { id: user.id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: '8h' }
    );

    res.json({ token });
};

module.exports = { loginUser };
