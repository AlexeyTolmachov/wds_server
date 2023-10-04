const express = require('express');
const bodyParser = require('body-parser');
const testimonialsRoutes = require('./routes/testimonialsRoutes');
const adminRouter = require('./routes/adminRouter')
const app = express();

app.use(bodyParser.json());
app.use('/api/testimonials', testimonialsRoutes);
app.use('/api/', adminRouter);
module.exports = app;
