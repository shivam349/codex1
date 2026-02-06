// Seed script to create admin user
require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const mongoose = require('mongoose');
const User = require('../models/User');

async function seedAdmin() {
  try {
    console.log('🔌 Connecting to MongoDB...');
    console.log('📍 Database:', process.env.MONGO_URI.substring(0, 50) + '...');
    
    // Connect to MongoDB with timeout
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 10000,
    });
    console.log('✅ Connected to MongoDB');

    // Check if admin already exists
    const adminExists = await User.findOne({ email: 'admin@mithilamakhana.com' });
    
    if (adminExists) {
      console.log('✅ Admin user already exists');
      console.log('📧 Email:', adminExists.email);
      console.log('🔐 Password: admin123');
      await mongoose.disconnect();
      process.exit(0);
      return;
    }

    // Create admin user
    console.log('➕ Creating admin user...');
    const admin = await User.create({
      email: 'admin@mithilamakhana.com',
      password: 'admin123',
      isAdmin: true
    });

    console.log('✅ Admin user created successfully!');
    console.log('📧 Email:', admin.email);
    console.log('🔐 Password: admin123');
    console.log('🔑 ID:', admin._id);

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding admin:', error.message);
    console.error('💡 Make sure MongoDB URI is correct in backend/.env');
    process.exit(1);
  }
}

seedAdmin();
