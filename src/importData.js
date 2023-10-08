const fs = require('fs');
const csv = require('csv-parser');
const db = require('./mysqlDB/database');
const path = require('path');


const Company = require('./mysqlDB/model/companyModel');

async function importDataFromCSV(filePath) {
	try {
		fs.createReadStream(filePath)
			.pipe(csv())
			.on('data', async (row) => {
				const existingRecord = await db.promise().query(
					'SELECT * FROM testimonials WHERE unique_employee_number = ?',
					[row.Unique_employee_number]
				);
				if (existingRecord[0].length === 0) {
					const companyId = await Company.findOrCreate(row.Company, row["Company description"]);
					await db.promise().query(
						'INSERT INTO testimonials (Reviewer, Email, Review, Rating, Employee, employee_position, Unique_employee_number, CompanyId) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
						[
							row.Reviewer,
							row.Email,
							row.Review,
							row.Rating,
							row.Employee,
							row.Employees_position,
							row.Unique_employee_number,
							companyId
						]
					);

					console.log(`Added a new entry for unique_employee_number: ${row.Unique_employee_number}`);
				} else {
					console.log(`Record from unique_employee_number: ${row.Unique_employee_number} already exists. Skipped.`);
				}
			})
			.on('end', () => {
				console.log('Import complete.');

				fs.unlink(filePath, (err) => {
					if (err) {
						console.error('An error occurred while deleting the file:', err);
					} else {
						console.log('File deleted successfully.');
					}
				});

			});
	} catch (error) {
		console.error('An error occurred while importing data:', error);
	}
}

const importDataFromCSVController = async (req, res) => {
	try {
		const directoryPath = path.resolve(__dirname, '../uploads/');
		const files = fs.readdirSync(directoryPath);
		const csvFiles = files.filter((file) => file.endsWith('.csv'));
		if (csvFiles.length === 0) {
			return res.status(400).json({ error: 'No CSV files found in the directory' });
		}
		const filePath = path.join(directoryPath, csvFiles[0]);
		await importDataFromCSV(filePath);
		res.status(200).json({ message: 'Data imported successfully' });
	} catch (error) {
		console.error('An error occurred while importing data:', error);
		res.status(500).json({ error: 'Internal server error', details: error.message });
	}
};

module.exports = importDataFromCSVController;

