const express = require('express');
const connectDB = require('./database');
const urlRoutes = require('./routes/urlRoutes');

const app = express();
const PORT = process.env.PORT || 3000;
// Middleware
app.use(express.json());

// Database connection
connectDB();

// Routes
app.use('/shorten', urlRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
