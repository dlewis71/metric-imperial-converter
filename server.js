require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const apiRoutes = require('./routes/api');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
app.use('/api', apiRoutes);

// Only start server if run directly
if (!module.parent) {
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}

// Export app for FCC testing
module.exports = app;
