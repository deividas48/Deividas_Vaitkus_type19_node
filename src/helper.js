// Import the mysql module
const mysql = require('mysql2/promise');
// Import the dbConfig
const { dbConfig } = require('./config');

// Create a helper function to execute the query
async function dbQueryWithData(sql, argArr = []) {
  let conn;
  try {
    // Connect to the database
    conn = await mysql.createConnection(dbConfig);
    // Execute the query
    const [rows] = await conn.execute(sql, argArr);
    // Return the results
    return [rows, null];
  } catch (error) {
    return [null, error];
  } finally {
    // Close the connection
    if (conn) conn.end();
  }
}

// Export the helper function
module.exports = {
  dbQueryWithData,
};
