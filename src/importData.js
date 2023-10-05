const fs = require('fs');
const csv = require('csv-parser');
const db = require('./mysqlDB/database');

async function importDataFromCSV(filePath) {
	try {
		fs.createReadStream(filePath)
			.pipe(csv())
			.on('data', async (row) => {

				const existingRecord = await db.promise().query('SELECT * FROM testimonials WHERE unique_employee_number = ?', [row.Unique_employee_number]);
				if (existingRecord[0].length === 0) {
					await db.promise().query('INSERT INTO testimonials (Reviewer, Email, Review, Rating, Employee, employee_position, Unique_employee_number, Company, company_description) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [
						row.Reviewer,
						row.Email,
						row.Review,
						row.Rating,
						row.Employee,
						row.Employees_position,
						row.Unique_employee_number,
						row.Company,
						row["Company description"]
					]);
					console.log(`Added a new entry for unique_employee_number: ${row.Unique_employee_number}`);
				} else {
					console.log(`Record from unique_employee_number: ${row.Unique_employee_number} already exists Skipped.`);
				}
			})
			.on('end', () => {
				console.log('Import complete.');
			});
	} catch (error) {
		console.error('An error occurred while importing data:', error);
	}
}

const csvFilePath = '../reviews.csv';
importDataFromCSV(csvFilePath);
