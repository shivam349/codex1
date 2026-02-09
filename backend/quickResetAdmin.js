#!/usr/bin/env node

/**
 * Quick Admin Password Reset Script
 * Run this directly with: node quickResetAdmin.js
 * 
 * This script will:
 * 1. Connect to MongoDB using your .env credentials
 * 2. Find or create the admin user
 * 3. Reset the password to 'admin123'
 */

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: require('path').join(__dirname, '.env') });

// Simple User Schema (matching your model)
const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
  isAdmin: Boolean,
  emailVerified: Date,
  name: String,
  googleId: String,
  image: String,
  isUser: Boolean,
  verificationToken: String,
  verificationTokenExpires: Date,
  createdAt: { type: Date, default: Date.now }
});

async function quickReset() {
  try {
    console.log('\n🔧 Quick Admin Password Reset');
    console.log('='.repeat(50));
    
    // Connect to MongoDB
    console.log('\n📍 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000,
    });
    console.log('✅ Connected successfully!\n');
    
    const User = mongoose.model('User', UserSchema);
    
    // Find admin user
    let admin = await User.findOne({ email: 'admin@mithilamakhana.com' });
    
    if (!admin) {
      console.log('➕ Admin user not found. Creating new admin...\n');
      
      // Hash password manually
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('admin123', salt);
      
      admin = await User.create({
        email: 'admin@mithilamakhana.com',
        password: hashedPassword,
        isAdmin: true,
        emailVerified: new Date(),
        name: 'Admin',
        createdAt: new Date()
      });
      
      console.log('✅ Admin user created successfully!');
    } else {
      console.log('✅ Admin user found. Resetting password...\n');
      
      // Hash new password manually
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('admin123', salt);
      
      // Update directly without triggering pre-save hooks
      await User.updateOne(
        { _id: admin._id },
        { 
          $set: { 
            password: hashedPassword,
            isAdmin: true,
            emailVerified: new Date()
          }
        }
      );
      
      console.log('✅ Password reset successfully!');
    }
    
    // Verify the password works
    console.log('\n🧪 Testing password...');
    const updatedAdmin = await User.findOne({ email: 'admin@mithilamakhana.com' });
    const passwordMatch = await bcrypt.compare('admin123', updatedAdmin.password);
    
    if (passwordMatch) {
      console.log('✅ Password test PASSED! You can now login.\n');
    } else {
      console.log('❌ Password test FAILED. Please try again.\n');
    }
    
    console.log('='.repeat(50));
    console.log('📧 Email: admin@mithilamakhana.com');
    console.log('🔐 Password: admin123');
    console.log('='.repeat(50));
    console.log('\n✅ You can now login to the admin panel!\n');
    
    await mongoose.disconnect();
    process.exit(0);
    
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    console.error('\n💡 Troubleshooting:');
    console.error('   1. Check your MongoDB URI in backend/.env');
    console.error('   2. Ensure your MongoDB user has read/write permissions');
    console.error('   3. Check if your IP is whitelisted in MongoDB Atlas\n');
    process.exit(1);
  }
}

quickReset();
