// Import modules for the server setup.
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

// Import routes
const userRolesRoutes = require('./routes/userRolesRoutes');
const shopItemRoutes = require('./routes/shopItemRoutes');
const ordersRoutes = require('./routes/ordersRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express(); // Initialize an Express application
const PORT = process.env.PORT || 5000; // Set the port number

// Middleware
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

// Routes middleware
app.use(userRolesRoutes);
app.use(shopItemRoutes);
app.use(ordersRoutes);
app.use(userRoutes);

// Send 'Hello World!' when the page is visited.
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start the server and listen on the PORT
app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
