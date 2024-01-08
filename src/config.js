// Import the dotenv module to read the .env file.
require('dotenv').config();

// Import the mysql module.
const mysql = require('mysql2/promise');

// Use .env values to set up the database connection.
const dbConfig = mysql.createPool({
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
});

// Export the configuration.
module.exports = {
  dbConfig,
};
