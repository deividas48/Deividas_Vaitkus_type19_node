/* eslint-disable camelcase */
/* eslint-disable max-len */
const express = require('express');

const router = express.Router();
// Import the database query data function to get the data
const { dbQueryWithData } = require('../helper');

// Create a new shop item
router.post('/api/shop_items', async (req, res) => {
  const {
    name, price, description, image, item_type_id,
  } = req.body;
  // Create the SQL query with the parameter placeholders
  const sql = 'INSERT INTO shop_items (name, price, description, image, item_type_id) VALUES (?, ?, ?, ?, ?)';
  // Execute the query
  const [result, error] = await dbQueryWithData(sql, [
    name,
    price,
    description,
    image,
    item_type_id,
  ]);

  // Check for errors
  if (error) {
    return res
      .status(500)
      .json({ message: 'Error creating shop item', error: error.message });
  }
  return res
    .status(201)
    .json({
      message: 'Shop item created successfully',
      itemId: result.insertId,
    });
});

// Update a shop item
router.get('/api/shop_items', async (req, res) => {
  // Create the SQL query
  const sql = 'SELECT * FROM shop_items';
  const [items, error] = await dbQueryWithData(sql);

  // Check for errors
  if (error) {
    return res
      .status(500)
      .json({ message: 'Error retrieving shop items', error: error.message });
  }
  return res.status(200).json(items);
});

// Get all shop items by item id
router.get('/api/shop_items/:id', async (req, res) => {
  const { id } = req.params;
  // Create the SQL query with the parameter placeholder
  const sql = 'SELECT * FROM shop_items WHERE id = ?';
  const [item, error] = await dbQueryWithData(sql, [id]);

  // Check for errors
  if (error) {
    return res
      .status(500)
      .json({
        message: 'Error retrieving the shop item',
        error: error.message,
      });
  }
  if (item.length === 0) {
    return res.status(404).json({ message: 'Shop item not found' });
  }
  return res.status(200).json(item[0]);
});

// Delete a shop item
router.delete('/api/shop_items/:id', async (req, res) => {
  const { id } = req.params;
  // Create the SQL query with the parameter placeholder
  const sql = 'DELETE FROM shop_items WHERE id = ?';
  const [result, error] = await dbQueryWithData(sql, [id]);

  // Check for errors
  if (error) {
    return res
      .status(500)
      .json({ message: 'Error deleting the shop item', error: error.message });
  }
  if (result.affectedRows === 0) {
    return res.status(404).json({ message: 'Shop item not found' });
  }
  return res.status(200).json({ message: 'Shop item deleted successfully' });
});

module.exports = router;
