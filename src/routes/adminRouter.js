const express = require('express');
const router = express.Router();

router.get('/login', (req, res) => {
	res.send('get login');
});

router.post('/login', (req, res) => {
	res.send('post login')
});

router.get('/logout', (req, res) => {
	res.send('Logout')
});

module.exports = router;
