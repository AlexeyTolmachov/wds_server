const mysql = require('mysql2');

const db = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'password',
	database: 'testimonials',
});

db.connect((err) => {
	if (err) {
		console.error('Database connection error:', err);
	} else {
		console.log('Connected to database MySQL');

		const createTableQuery = `
CREATE TABLE IF NOT EXISTS testimonials (
  id INT AUTO_INCREMENT PRIMARY KEY,
  reviewer VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  review TEXT NOT NULL,
  rating FLOAT NOT NULL,
  employee VARCHAR(255),
  employee_position VARCHAR(255) DEFAULT NULL, 
  unique_employee_number VARCHAR(255),
  CompanyId INT, 
  company_description TEXT,
  FOREIGN KEY (CompanyId) REFERENCES companies(id)
)
`;


		const createTableUsersQuery = `
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        token VARCHAR(255) ,
        role VARCHAR(255) NOT NULL
      )
    `;

		const createTableCompaniesQuery = `
CREATE TABLE IF NOT EXISTS companies (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT
)
`;
		db.query(createTableCompaniesQuery, (err, results) => {
			if (err) {
				console.error('Error creating "companies" table:', err);
			} else {
				console.log('The "companies" table has been created or already exists');
			}
		});

		db.query(createTableQuery, (err, results) => {
			if (err) {
				console.error('Error creating table:', err);
			} else {
				console.log('The "reviews" table has been created or already exists');
			}
		});
		db.query(createTableUsersQuery, (err, results) => {
			if (err) {
				console.error('Error creating "users" table:', err);
			} else {
				console.log('The "users" table has been created or already exists');
			}
		});
	}
});



module.exports = db;