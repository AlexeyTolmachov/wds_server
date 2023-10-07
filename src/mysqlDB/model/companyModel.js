const db = require('../database');
class Company {
	static async findOrCreate(companyName, companyDescription) {
		try {
			const [rows] = await db.promise().query(
				'SELECT * FROM companies WHERE name = ?',
				[companyName]
			);

			if (rows.length === 0) {

				const [result] = await db.promise().query(
					'INSERT INTO companies (name, description) VALUES (?, ?)',
					[companyName, companyDescription]
				);

				return result.insertId;
			} else {

				return rows[0].id;
			}
		} catch (error) {
			throw error;
		}
	}
}
module.exports = Company;