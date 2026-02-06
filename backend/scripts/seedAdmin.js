// Seed script to create admin user
require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const mongoose = require('mongoose');
const User = require('../models/User');

async function seedAdmin() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('📁 Connected to MongoDB');

    // Check if admin already exists
    const adminExists = await User.findOne({ email: 'admin@mithilamakhana.com' });
    
    if (adminExists) {
      console.log('✅ Admin user already exists');
      console.log('📧 Email:', adminExists.email);
      console.log('🔐 Password: admin123');
      await mongoose.disconnect();
      return;
    }

    // Create admin user
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
  } catch (error) {
    console.error('❌ Error seeding admin:', error);
    process.exit(1);
  }
}

seedAdmin();
