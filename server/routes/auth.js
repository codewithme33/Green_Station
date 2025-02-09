const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();


router.post('/auth0-login', authController.auth0Login);


router.post('/register', authController.register);

module.exports = router;