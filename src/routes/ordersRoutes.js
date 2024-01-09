/* eslint-disable max-len */
/* eslint-disable camelcase */
const express = require('express');

const router = express.Router();
// Import the database query data function to get the data
const { dbQueryWithData } = require('../helper');

// Post a new order
router.post('/api/orders', async (req, res) => {
  const {
    user_id, shop_item_id, quantity, total_price, status,
  } = req.body;
  // Create the SQL query with the parameter placeholders
  const sql = `
      INSERT INTO orders (user_id, shop_item_id, quantity, total_price, status) 
      VALUES (?, ?, ?, ?, ?)
    `;
    // Execute the query
  try {
    const [result] = await dbQueryWithData(sql, [
      user_id,
      shop_item_id,
      quantity,
      total_price,
      status,
    ]);
    return res
      .status(201)
      .json({
        message: 'Order created successfully',
        orderId: result.insertId,
      });
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Error creating order', error: error.message });
  }
});

// Retrieve all orders with user name, item name,unit price
router.get('/api/orders', async (req, res) => {
  // Create the SQL query
  const sql = `
      SELECT o.*, u.name as user_name, si.name as item_name, si.price as unit_price 
      FROM orders o
      JOIN users u ON o.user_id = u.id
      JOIN shop_items si ON o.shop_item_id = si.id
    `;
    // Execute the query
  try {
    const [orders] = await dbQueryWithData(sql);
    return res.status(200).json(orders);
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Error retrieving orders', error: error.message });
  }
});

// Retrieve a single order by its ID
router.get('/api/orders/:id', async (req, res) => {
  const { id } = req.params;
  // Create the SQL query with the parameter placeholder
  const sql = `
      SELECT o.*, u.name as user_name, si.name as item_name, si.price as unit_price 
      FROM orders o
      JOIN users u ON o.user_id = u.id
      JOIN shop_items si ON o.shop_item_id = si.id
      WHERE o.id = ?
    `;
    // Execute the query
  try {
    const [order] = await dbQueryWithData(sql, [id]);
    if (order.length === 0) {
      return res.status(404).json({ message: 'Order not found' });
    }
    return res.status(200).json(order[0]);
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Error retrieving order', error: error.message });
  }
});

// Retrieve all orders for a specific user with user name and item name and unit price
router.get('/api/orders/user/:user_id', async (req, res) => {
  const { user_id } = req.params;
  // Create the SQL query with the parameter placeholder
  const sql = `
      SELECT o.*, u.name as user_name, si.name as item_name, si.price as unit_price 
      FROM orders o
      JOIN users u ON o.user_id = u.id
      JOIN shop_items si ON o.shop_item_id = si.id
      WHERE o.user_id = ?
    `;
    // Execute the query
  try {
    const [orders] = await dbQueryWithData(sql, [user_id]);
    return res.status(200).json(orders);
  } catch (error) {
    return res
      .status(500)
      .json({
        message: 'Error retrieving orders for user',
        error: error.message,
      });
  }
});

module.exports = router;
