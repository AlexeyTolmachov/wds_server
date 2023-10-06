const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../mysqlDB/model/userModel');

exports.login = async (req, res) => {
	const { username, password } = req.body;
	try {
		const user = await User.findUserByUsername(username);
		if (!user || !bcrypt.compareSync(password, user.password)) {
			return res.status(401).json({ error: 'Invalid credentials' });
		}
		const token = jwt.sign({ username: user.username, role: user.role }, 'secretkey');
		await User.updateUserToken(user.id, token);
		res.status(200).json({ userId: user.id, token });
	} catch (error) {
		console.error('Error logging in:', error);
		res.status(500).json({ error: 'Internal server error' });
	}
};


exports.createUser = async (req, res) => {
	const { username, password, role } = req.body;
	try {
		const hashedPassword = bcrypt.hashSync(password, 10);
		const userId = await User.createUser(username, hashedPassword, null, role);
		res.status(201).json({ userId });
	} catch (error) {
		console.error('Error creating user:', error);
		res.status(500).json({ error: 'Internal server error' });
	}
};

exports.logoutUser = async (req, res) => {
	const token = req.headers.authorization.replace("Bearer ", ""); // Извлекаем токен из заголовков
	if (!token) {
		return res.status(401).json({ error: "Not authenticated" });
	}
	try {
		const deletedRows = await User.deleteUserToken(token);
		console.log(deletedRows);
		if (deletedRows > 0) {
			res.status(200).json({ message: "User logged out successfully" });
		} else {
			res.status(500).json({ error: "Token not found" });
		}
	} catch (error) {
		console.error("Error logging out:", error);
		res.status(500).json({ error: "Internal server error" });
	}
};

