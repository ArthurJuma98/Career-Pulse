const express = require('express');
const { registerUser, logInUser } = require('../controllers/authController');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', logInUser);

module.exports = router;