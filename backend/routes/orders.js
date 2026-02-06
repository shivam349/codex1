const express = require('express');
const router = express.Router();

// Get all orders
router.get('/', (req, res) => {
  res.json({ message: 'Get all orders' });
});

// Get single order
router.get('/:id', (req, res) => {
  res.json({ message: `Get order ${req.params.id}` });
});

// Create order
router.post('/', (req, res) => {
  res.json({ message: 'Create order' });
});

// Update order status
router.put('/:id', (req, res) => {
  res.json({ message: `Update order ${req.params.id}` });
});

// Delete order
router.delete('/:id', (req, res) => {
  res.json({ message: `Delete order ${req.params.id}` });
});

module.exports = router;
