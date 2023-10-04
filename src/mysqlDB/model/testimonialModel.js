
const db = require('../database');

class Testimonial {
	static async getAllTestimonials() {
		try {
			const [rows] = await db.promise().query('SELECT * FROM testimonials');
			return rows;
		} catch (error) {
			throw error;
		}
	}

	static async deleteAllTestimonials() {
		try {
			const result = await db.promise().query('DELETE FROM testimonials');
			return result[0].affectedRows;
		} catch (error) {
			throw error;
		}
	}
}

module.exports = Testimonial;
