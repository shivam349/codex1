// Script to initialize database with sample products
// Run with: node scripts/seedDb.js

require('dotenv').config({ path: '../.env' });
const mongoose = require('mongoose');
const Product = require('../models/Product');

const sampleProducts = [
  {
    name: 'Classic Makhana',
    slug: 'classic-makhana',
    description: 'Pure roasted makhana with natural salt. Experience the authentic taste of Mithila with our classic collection.',
    price: 499,
    originalPrice: 599,
    category: 'classic',
    rating: 4.8,
    reviews: 245,
    features: [
      'Lightly roasted to perfection',
      'Natural Himalayan salt',
      '100% organic, no pesticides',
      'High in protein and calcium',
      'Crunchy and delightful taste',
      'Vacuum sealed for freshness'
    ],
    nutritionFacts: {
      caloriesPer100g: 347,
      protein: 14.5,
      fat: 3.2,
      carbs: 63.1,
      fiber: 4.2
    },
    sizes: [
      { size: '250g', price: 299, stock: 100 },
      { size: '500g', price: 499, stock: 150 },
      { size: '1kg', price: 899, stock: 200 },
      { size: '2kg', price: 1699, stock: 100 }
    ],
    inStock: true
  },
  {
    name: 'Masala Makhana',
    slug: 'masala-makhana',
    description: 'Traditional spiced roasted makhana with an authentic blend of Indian spices. Perfect for those who love bold flavors.',
    price: 599,
    originalPrice: 699,
    category: 'masala',
    rating: 4.9,
    reviews: 312,
    features: [
      'Aromatic spice blend',
      'Traditional recipe',
      'Low fat content',
      'No artificial flavors',
      'Rich in antioxidants',
      'Perfectly spiced'
    ],
    nutritionFacts: {
      caloriesPer100g: 360,
      protein: 15.2,
      fat: 3.8,
      carbs: 62.5,
      fiber: 4.1
    },
    sizes: [
      { size: '250g', price: 349, stock: 80 },
      { size: '500g', price: 599, stock: 120 },
      { size: '1kg', price: 999, stock: 150 },
      { size: '2kg', price: 1899, stock: 80 }
    ],
    inStock: true
  },
  {
    name: 'Premium Organic',
    slug: 'premium-organic',
    description: 'Certified organic makhana harvested fresh from the pristine wetlands of Mithila. Premium quality assurance.',
    price: 799,
    originalPrice: 999,
    category: 'premium',
    rating: 5.0,
    reviews: 189,
    features: [
      'Certified organic',
      'Direct from farmers',
      'Premium selection',
      'Vacuum sealed',
      'Farm fresh quality',
      'Zero pesticides'
    ],
    nutritionFacts: {
      caloriesPer100g: 342,
      protein: 16.1,
      fat: 2.9,
      carbs: 64.2,
      fiber: 4.5
    },
    sizes: [
      { size: '250g', price: 449, stock: 60 },
      { size: '500g', price: 799, stock: 100 },
      { size: '1kg', price: 1299, stock: 120 },
      { size: '2kg', price: 2199, stock: 60 }
    ],
    inStock: true
  },
  {
    name: 'Honey Makhana',
    slug: 'honey-makhana',
    description: 'Lightly sweetened with natural honey and roasted to golden perfection. A perfect healthy snack for the whole family.',
    price: 699,
    originalPrice: 799,
    category: 'honey',
    rating: 4.7,
    reviews: 156,
    features: [
      'Natural honey coating',
      'Healthy snack',
      'No preservatives',
      'Rich in nutrients',
      'Perfect for kids',
      'Organic ingredients'
    ],
    nutritionFacts: {
      caloriesPer100g: 375,
      protein: 13.8,
      fat: 4.2,
      carbs: 68.5,
      fiber: 4.0
    },
    sizes: [
      { size: '250g', price: 399, stock: 90 },
      { size: '500g', price: 699, stock: 130 },
      { size: '1kg', price: 1199, stock: 180 },
      { size: '2kg', price: 2099, stock: 90 }
    ],
    inStock: true
  }
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/mithila-makhana');
    console.log('✓ Connected to MongoDB');

    // Clear existing products
    await Product.deleteMany({});
    console.log('✓ Cleared existing products');

    // Insert sample products
    const inserted = await Product.insertMany(sampleProducts);
    console.log(`✓ Inserted ${inserted.length} products`);

    // Display inserted products
    console.log('\n📦 Products in database:');
    const products = await Product.find();
    products.forEach(p => {
      console.log(`  - ${p.name} (₹${p.price}) - Stock: ${p.sizes[1]?.stock || 0}`);
    });

    console.log('\n✅ Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error.message);
    process.exit(1);
  }
}

seedDatabase();
