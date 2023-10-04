const express = require('express');
const bodyParser = require('body-parser');
const testimonialsRoutes = require('./routes/testimonialsRoutes');

const app = express();

app.use(bodyParser.json());
app.use('/api/testimonials', testimonialsRoutes);

module.exports = app; 