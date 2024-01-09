// userRolesRoutes.js in the routes folder
const express = require('express');

const router = express.Router();
// Import the database query data function to get the data
const { dbQueryWithData } = require('../helper');

// Create a new user role
router.get('/api/user_roles', async (req, res) => {
  const sql = 'SELECT * FROM user_roles';
  // Execute the query
  try {
    const [roles] = await dbQueryWithData(sql);
    res.status(200).json(roles);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving user roles', error: error.message });
  }
});

module.exports = router;
