const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Create a new user (Registration)
router.post('/register', userController.createUser);

module.exports = router;
