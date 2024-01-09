const express = require('express');

const router = express.Router();
// Import the database query data function to get the data
const { dbQueryWithData } = require('../helper');

// Register a new user
router.post('/api/auth/register', async (req, res) => {
  const { name, email, password } = req.body;

  // Create the SQL query with the parameter placeholders
  const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
  // Execute the query
  const [result, error] = await dbQueryWithData(sql, [name, email, password]);

  // Check for errors
  if (error) {
    res
      .status(500)
      .json({ message: 'Error registering user', error: error.message });
  } else {
    res.status(201).json({
      message: 'User successfully registered',
      userId: result.insertId,
    });
  }
});

// Login a user
router.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;

  // Create the SQL query with the parameter placeholders
  const sql = 'SELECT * FROM users WHERE email = ?';
  // Execute the query
  const [users, error] = await dbQueryWithData(sql, [email]);

  // Check for errors
  if (error) {
    return res
      .status(500)
      .json({ message: 'Error logging in', error: error.message });
  }
  // Check if a email or password is not provided
  if (users.length === 0) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  // Check if the password is correct
  const user = users[0];
  if (password === user.password) {
    return res.status(200).json({ message: 'Login successful', userId: user.id });
  }
  return res.status(401).json({ message: 'Invalid email or password' });
});

module.exports = router;
