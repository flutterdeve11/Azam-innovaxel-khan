const express = require('express');
const connectDB = require('./database');
const urlRoutes = require('./routes/urlRoutes');

const app = express();
const PORT = process.env.PORT || 3000;
