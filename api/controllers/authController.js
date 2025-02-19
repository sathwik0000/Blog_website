const { User } = require('../models');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
require('dotenv').config();

const loginUser = async (req, res) => {
    const { identifier, password } = req.body;

    if (!identifier || !password) {
        return res.status(400).json({ message: 'Username or email and password are required' });
    }

    const user = await User.findOne({
        where: {
            [Op.or]: [{ username: identifier }, { email: identifier }]
        }
    });

    if (!user) {
        return res.status(401).json({ message: 'Invalid username or password' });
    }

    const isMatch = await argon2.verify(user.password, password);
    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Ensure JWT secret is set
    if (!process.env.JWT_SECRET) {
        console.error("JWT_SECRET is missing from environment variables");
        return res.status(500).json({ message: "Server error" });
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
