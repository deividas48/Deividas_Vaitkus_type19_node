// Import the mysql module
const mysql = require('mysql2/promise');
// Import the dbConfig
const { dbConfig } = require('./config');

// Create a connection pool
const pool = mysql.createPool(dbConfig);

// Create a function to query the database with data
async function dbQueryWithData(sql, argArr = []) {
  try {
    const [rows] = await pool.query(sql, argArr);
    return [rows, null];
  } catch (error) {
    return [null, error];
  }
}

module.exports = {
  dbQueryWithData,
};
