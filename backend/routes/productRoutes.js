const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// Get products
router.get("/", async (req,res)=>{
  const products = await Product.find();
  res.json(products);
});

// Add product (admin)
router.post("/", async (req,res)=>{
  const product = new Product(req.body);
  await product.save();
  res.json(product);
});

module.exports = router;
