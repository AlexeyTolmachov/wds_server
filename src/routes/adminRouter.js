const express = require('express');
const router = express.Router();
const authController = require('../controllers/userController');


router.post('/login', authController.login);

router.post('/register', authController.createUser);

router.post('/logout', authController.logoutUser);

module.exports = router;
