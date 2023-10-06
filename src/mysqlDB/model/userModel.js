const db = require('../database');

class User {

	static async updateUserToken(userId, newToken) {
		try {
			const result = await db
				.promise()
				.query('UPDATE users SET token = ? WHERE id = ?', [newToken, userId]);

			return result[0].affectedRows;
		} catch (error) {
			throw error;
		}
	}
	static async findUserByUsername(username) {
		try {
			const [users] = await db.promise().query('SELECT * FROM users WHERE username = ?', [username]);
			return users[0];
		} catch (error) {
			throw error;
		}
	}



	static async createUser(username, password, token, role) {
		try {
			const result = await db.promise().query('INSERT INTO users (username, password, token, role) VALUES (?, ?, ?, ?)', [
				username,
				password,
				token,
				role
			]);
			return result[0].insertId;
		} catch (error) {
			throw error;
		}
	}



	static async deleteUserToken(token) {
		try {
			const [users] = await db
				.promise()
				.query('SELECT * FROM users WHERE token = ?', [token]);
			if (users.length > 0) {
				const result = await db
					.promise()
					.query('UPDATE users SET token = NULL WHERE token = ?', [token]);
				console.log(`Updated rows: ${result[0].affectedRows}`);
				return result[0].affectedRows;
			} else {
				return 0;
			}
		} catch (error) {
			throw error;
		}
	}



}



module.exports = User;