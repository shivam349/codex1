const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const User = require('../models/User');
const Product = require('../models/Product');
const { protect, admin, simpleAdminAuth } = require('../middleware/auth');

// Generate unique order number
const generateOrderNumber = () => {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substr(2, 5);
  return `MM-${timestamp}-${random}`.toUpperCase();
};

// @route   POST /api/orders
// @desc    Create new order
// @access  Public (simplified) or Protected
router.post('/', async (req, res) => {
  try {
    const {
      items,
      shippingAddress,
      paymentMethod,
      shippingPrice,
      taxPrice,
      totalPrice,
      userEmail,
      notes
    } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'No order items' });
    }

    // Find or create guest user
    let user;
    if (req.user) {
      user = req.user;
    } else {
      // For guest checkout, create/find user by email
      user = await User.findOne({ email: userEmail || shippingAddress.email });
      
      if (!user) {
        // Create guest user
        const bcrypt = require('bcryptjs');
        const salt = await bcrypt.genSalt(10);
        const tempPassword = await bcrypt.hash(Math.random().toString(36), salt);
        
        user = await User.create({
          firstName: shippingAddress.firstName,
          lastName: shippingAddress.lastName,
          email: shippingAddress.email,
          phone: shippingAddress.phone,
          password: tempPassword,
          isAdmin: false
        });
      }
    }

    // Validate products and calculate total
    let calculatedTotal = 0;
    for (let item of items) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.status(404).json({ message: `Product ${item.product} not found` });
      }
      calculatedTotal += product.price * item.quantity;
    }

    const order = new Order({
      orderNumber: generateOrderNumber(),
      user: user._id,
      items,
      shippingAddress,
      paymentMethod: paymentMethod || 'credit_card',
      shippingPrice: shippingPrice || 0,
      taxPrice: taxPrice || 0,
      totalPrice: totalPrice || calculatedTotal,
      notes
    });

    const createdOrder = await order.save();
    
    // Populate product details
    await createdOrder.populate('items.product');
    
    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @route   GET /api/orders
// @desc    Get all orders (Admin only)
// @access  Private/Admin
router.get('/', simpleAdminAuth, async (req, res) => {
  try {
    const { status, limit = 50 } = req.query;
    
    let query = {};
    if (status) query.status = status;

    const orders = await Order.find(query)
      .populate('user', 'firstName lastName email')
      .populate('items.product', 'name price image')
      .sort({ createdAt: -1 })
      .limit(parseInt(limit));
    
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/orders/:id
// @desc    Get order by ID
// @access  Public (with order number) or Private
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('user', 'firstName lastName email phone')
      .populate('items.product', 'name price image description');

    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/orders/number/:orderNumber
// @desc    Get order by order number
// @access  Public
router.get('/number/:orderNumber', async (req, res) => {
  try {
    const order = await Order.findOne({ orderNumber: req.params.orderNumber })
      .populate('user', 'firstName lastName email phone')
      .populate('items.product', 'name price image description');

    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   PUT /api/orders/:id/status
// @desc    Update order status (Admin only)
// @access  Private/Admin
router.put('/:id/status', simpleAdminAuth, async (req, res) => {
  try {
    const { status, paymentStatus } = req.body;
    
    const order = await Order.findById(req.params.id);

    if (order) {
      if (status) order.status = status;
      if (paymentStatus) order.paymentStatus = paymentStatus;
      order.updatedAt = Date.now();

      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @route   PUT /api/orders/:id
// @desc    Update order (Admin only)
// @access  Private/Admin
router.put('/:id', simpleAdminAuth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (order) {
      order.status = req.body.status || order.status;
      order.paymentStatus = req.body.paymentStatus || order.paymentStatus;
      order.notes = req.body.notes !== undefined ? req.body.notes : order.notes;
      order.updatedAt = Date.now();

      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @route   DELETE /api/orders/:id
// @desc    Delete order (Admin only)
// @access  Private/Admin
router.delete('/:id', simpleAdminAuth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (order) {
      await order.deleteOne();
      res.json({ message: 'Order removed' });
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/orders/user/:email
// @desc    Get orders by user email
// @access  Public (simplified)
router.get('/user/:email', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const orders = await Order.find({ user: user._id })
      .populate('items.product', 'name price image')
      .sort({ createdAt: -1 });
    
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
