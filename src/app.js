const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const testimonialsRoutes = require('./routes/testimonialsRoutes');
const adminRouter = require('./routes/adminRouter')
const app = express();

const allowedOrigins = ['http://localhost:3000'];

app.use(cors({
	origin: function (origin, callback) {
		if (allowedOrigins.indexOf(origin) !== -1) {
			callback(null, true);
		} else {
			callback(new Error('Not allowed by CORS'));
		}
	},
}));
app.use(bodyParser.json());
app.use('/api/testimonials', testimonialsRoutes);
app.use('/api/', adminRouter);
module.exports = app;
