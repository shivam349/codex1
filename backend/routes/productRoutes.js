// Product Routes
const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { protect } = require('../middleware/auth');

// @route   GET /api/products
// @desc    Get all products
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { category, limit = 50, page = 1 } = req.query;
    
    let filter = {};
    if (category) {
      filter.category = category;
    }

    // Add pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    // Use lean() for better performance - returns plain JS objects
    const products = await Product.find(filter)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip(skip)
      .lean()
      .select('-__v'); // Exclude version key
    
    const total = await Product.countDocuments(filter);
    
    // Set cache headers - cache for 5 minutes
    res.set('Cache-Control', 'public, max-age=300, s-maxage=600, stale-while-revalidate=86400');
    
    res.json({
      success: true,
      count: products.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / parseInt(limit)),
      data: products
    });
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/products/:id
// @desc    Get single product by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    // Use lean() for better performance
    const product = await Product.findById(req.params.id)
      .lean()
      .select('-__v');
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Cache product details for 10 minutes
    res.set('Cache-Control', 'public, max-age=600, s-maxage=1200, stale-while-revalidate=86400');

    res.json({
      success: true,
      data: product
    });
  } catch (error) {
    console.error('Get product error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   POST /api/products
// @desc    Add new product (Admin only)
// @access  Private (Admin)
router.post('/', protect, async (req, res) => {
  try {
    const { name, price, image, description, category, stock } = req.body;

    // Validation
    if (!name || !price || !image || !description || !category) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }

    const product = await Product.create({
      name,
      price,
      image,
      description,
      category,
      stock: stock || 0
    });

    res.status(201).json({
      success: true,
      data: product
    });
  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   PUT /api/products/:id
// @desc    Update product (Admin only)
// @access  Private (Admin)
router.put('/:id', protect, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    const { name, price, image, description, category, stock } = req.body;

    product.name = name || product.name;
    product.price = price || product.price;
    product.image = image || product.image;
    product.description = description || product.description;
    product.category = category || product.category;
    product.stock = stock !== undefined ? stock : product.stock;

    const updatedProduct = await product.save();

    res.json({
      success: true,
      data: updatedProduct
    });
  } catch (error) {
    console.error('Update product error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   DELETE /api/products/:id
// @desc    Delete product (Admin only)
// @access  Private (Admin)
router.delete('/:id', protect, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    await product.deleteOne();

    res.json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

module.exports = router;
