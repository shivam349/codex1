// Script to initialize database with sample products
// Run with: node backend/scripts/seedDb.js

require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Product = require('../models/Product');
const User = require('../models/User');
const Order = require('../models/Order');

const sampleProducts = [
  {
    name: 'Premium Makhana',
    description: 'Handpicked premium quality makhana (fox nuts) from the heart of Mithila. Roasted to perfection with traditional methods.',
    price: 299,
    compareAtPrice: 399,
    image: 'https://images.unsplash.com/photo-1599909533843-d4bad336ab7b?w=500',
    images: [
      'https://images.unsplash.com/photo-1599909533843-d4bad336ab7b?w=500',
      'https://images.unsplash.com/photo-1608481337062-4093bf3ed404?w=500'
    ],
    category: 'premium',
    stock: 50,
    weight: '250g',
    origin: 'Mithila, India',
    featured: true,
    inStock: true,
    rating: 5,
    reviews: 124
  },
  {
    name: 'Organic Makhana',
    description: '100% organic lotus seeds, naturally grown without pesticides. Perfect healthy snack for your family.',
    price: 349,
    compareAtPrice: 449,
    image: 'https://images.unsplash.com/photo-1599909533843-d4bad336ab7b?w=500',
    category: 'organic',
    stock: 30,
    weight: '250g',
    origin: 'Mithila, India',
    featured: true,
    inStock: true,
    rating: 5,
    reviews: 89
  },
  {
    name: 'Roasted Makhana',
    description: 'Crunchy roasted makhana with a hint of salt. Ready to eat, perfect for snacking anytime.',
    price: 249,
    compareAtPrice: 299,
    image: 'https://images.unsplash.com/photo-1599909533843-d4bad336ab7b?w=500',
    category: 'standard',
    stock: 100,
    weight: '200g',
    origin: 'Mithila, India',
    featured: false,
    inStock: true,
    rating: 4.5,
    reviews: 67
  },
  {
    name: 'Masala Makhana',
    description: 'Spicy and flavorful makhana with authentic Indian spices. A perfect tea-time snack.',
    price: 279,
    image: 'https://images.unsplash.com/photo-1599909533843-d4bad336ab7b?w=500',
    category: 'flavoured',
    stock: 45,
    weight: '200g',
    origin: 'Mithila, India',
    featured: true,
    inStock: true,
    rating: 4.8,
    reviews: 92
  },
  {
    name: 'Peri Peri Makhana',
    description: 'Tangy peri peri flavored makhana for those who love a spicy kick.',
    price: 299,
    image: 'https://images.unsplash.com/photo-1599909533843-d4bad336ab7b?w=500',
    category: 'flavoured',
    stock: 35,
    weight: '200g',
    origin: 'Mithila, India',
    featured: false,
    inStock: true,
    rating: 4.7,
    reviews: 54
  },
  {
    name: 'Cheese & Herbs Makhana',
    description: 'Gourmet cheese and herb flavored makhana. A fusion of health and taste.',
    price: 329,
    image: 'https://images.unsplash.com/photo-1599909533843-d4bad336ab7b?w=500',
    category: 'flavoured',
    stock: 25,
    weight: '200g',
    origin: 'Mithila, India',
    featured: false,
    inStock: true,
    rating: 4.6,
    reviews: 38
  }
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✓ Connected to MongoDB');

    // Clear existing data
    console.log('Clearing existing data...');
    await Product.deleteMany({});
    await User.deleteMany({});
    await Order.deleteMany({});
    console.log('✓ Cleared existing data');

    // Insert Products
    console.log('Inserting products...');
    const products = await Product.insertMany(sampleProducts);
    console.log(`✓ Inserted ${products.length} products`);

    // Create Admin User
    console.log('Creating admin user...');
    const salt = await bcrypt.genSalt(10);
    const adminPassword = await bcrypt.hash('admin123', salt);
    
    const admin = await User.create({
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@mithilamakhana.com',
      phone: '9876543210',
      password: adminPassword,
      isAdmin: true,
      address: {
        street: '123 Admin Street',
        city: 'Darbhanga',
        state: 'Bihar',
        postalCode: '846004',
        country: 'India'
      }
    });
    console.log('✓ Created admin user');

    // Create Sample Guest User
    const guestPassword = await bcrypt.hash('guest123', salt);
    const guest = await User.create({
      firstName: 'Guest',
      lastName: 'User',
      email: 'guest@example.com',
      phone: '9876543211',
      password: guestPassword,
      isAdmin: false
    });
    console.log('✓ Created guest user');

    // Create Sample Order
    console.log('Creating sample order...');
    const sampleOrder = await Order.create({
      orderNumber: 'MM-SAMPLE-001',
      user: guest._id,
      items: [
        {
          product: products[0]._id,
          quantity: 2,
          price: products[0].price,
          size: '250g'
        },
        {
          product: products[3]._id,
          quantity: 1,
          price: products[3].price,
          size: '200g'
        }
      ],
      totalPrice: (products[0].price * 2) + products[3].price,
      shippingPrice: 50,
      taxPrice: 30,
      status: 'pending',
      paymentStatus: 'pending',
      shippingAddress: {
        firstName: 'Guest',
        lastName: 'User',
        email: 'guest@example.com',
        phone: '9876543211',
        address: '456 Main Street',
        city: 'Mumbai',
        state: 'Maharashtra',
        postalCode: '400001',
        country: 'India'
      },
      paymentMethod: 'credit_card'
    });
    console.log('✓ Created sample order');

    console.log('\n✅ Database seeded successfully!');
    console.log('\n=== Admin Credentials ===');
    console.log('Email: admin@mithilamakhana.com');
    console.log('Password: admin123');
    console.log('\n=== Guest User ===');
    console.log('Email: guest@example.com');
    console.log('Password: guest123');
    console.log('\n=== Sample Data ===');
    console.log(`Products: ${products.length}`);
    console.log(`Order: ${sampleOrder.orderNumber}`);
    console.log('\n=== API Endpoints ===');
    console.log('Products: http://localhost:5000/api/products');
    console.log('Orders: http://localhost:5000/api/orders');
    console.log('Users: http://localhost:5000/api/users');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error.message);
    process.exit(1);
  }
}

seedDatabase();
