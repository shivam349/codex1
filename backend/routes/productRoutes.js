const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const { protect, admin, simpleAdminAuth } = require("../middleware/auth");

// @route   GET /api/products
// @desc    Get all products (Public)
// @access  Public
router.get("/", async (req, res) => {
  try {
    const { category, featured, inStock } = req.query;
    
    let filter = {};
    if (category) filter.category = category;
    if (featured) filter.featured = featured === 'true';
    if (inStock) filter.inStock = inStock === 'true';

    const products = await Product.find(filter).sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/products/:id
// @desc    Get single product
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/products
// @desc    Create a product (Admin only)
// @access  Private/Admin
router.post("/", simpleAdminAuth, async (req, res) => {
  try {
    const product = new Product({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      compareAtPrice: req.body.compareAtPrice,
      image: req.body.image,
      images: req.body.images || [],
      category: req.body.category,
      stock: req.body.stock || 0,
      weight: req.body.weight,
      origin: req.body.origin,
      featured: req.body.featured || false,
      inStock: req.body.inStock !== undefined ? req.body.inStock : true,
      rating: req.body.rating || 5,
      reviews: req.body.reviews || 0
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @route   PUT /api/products/:id
// @desc    Update a product (Admin only)
// @access  Private/Admin
router.put("/:id", simpleAdminAuth, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      product.name = req.body.name || product.name;
      product.description = req.body.description || product.description;
      product.price = req.body.price !== undefined ? req.body.price : product.price;
      product.compareAtPrice = req.body.compareAtPrice !== undefined ? req.body.compareAtPrice : product.compareAtPrice;
      product.image = req.body.image || product.image;
      product.images = req.body.images || product.images;
      product.category = req.body.category || product.category;
      product.stock = req.body.stock !== undefined ? req.body.stock : product.stock;
      product.weight = req.body.weight || product.weight;
      product.origin = req.body.origin || product.origin;
      product.featured = req.body.featured !== undefined ? req.body.featured : product.featured;
      product.inStock = req.body.inStock !== undefined ? req.body.inStock : product.inStock;
      product.rating = req.body.rating || product.rating;
      product.reviews = req.body.reviews || product.reviews;

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @route   DELETE /api/products/:id
// @desc    Delete a product (Admin only)
// @access  Private/Admin
router.delete("/:id", simpleAdminAuth, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      await product.deleteOne();
      res.json({ message: "Product removed" });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
