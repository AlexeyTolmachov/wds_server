const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

const db = require('./mysqlDB/database');

module.exports = app; 