const app = require("./app");
const db = require('./mysqlDB/database');

const PORT = process.env.PORT || 5000;
const server = async () => {
	try {
		await db.connect()
		app.listen(PORT, () => {
			console.log(`server is up in port ${PORT}`);
		});

	} catch (error) {
		console.log(error);
	}
};
server();