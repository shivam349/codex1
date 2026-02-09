// Fix Admin Login - Multiple Approaches
require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

async function fixAdminLogin() {
  try {
    console.log('🔧 Admin Login Fix Script');
    console.log('=' .repeat(50));
    
    // Approach 1: Try to connect to MongoDB and update password
    console.log('\n📍 Attempting to connect to MongoDB...');
    console.log('Database:', process.env.MONGO_URI?.substring(0, 50) + '...');
    
    try {
      await mongoose.connect(process.env.MONGO_URI, {
        serverSelectionTimeoutMS: 5000,
      });
      console.log('✅ Connected to MongoDB');
      
      // Find the admin user
      const User = mongoose.model('User', new mongoose.Schema({
        email: String,
        password: String,
        isAdmin: Boolean,
        emailVerified: Date,
      }));
      
      const admin = await User.findOne({ email: 'admin@mithilamakhana.com' });
      
      if (!admin) {
        console.log('❌ Admin user not found. Creating new admin...');
        
        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('admin123', salt);
        
        const newAdmin = await User.create({
          email: 'admin@mithilamakhana.com',
          password: hashedPassword,
          isAdmin: true,
          emailVerified: new Date()
        });
        
        console.log('✅ Admin user created!');
        console.log('📧 Email: admin@mithilamakhana.com');
        console.log('🔐 Password: admin123');
      } else {
        console.log('✅ Admin user found. Resetting password...');
        
        // Hash the new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('admin123', salt);
        
        admin.password = hashedPassword;
        admin.isAdmin = true;
        await admin.save({ validateBeforeSave: false });
        
        console.log('✅ Password reset complete!');
        console.log('📧 Email: admin@mithilamakhana.com');
        console.log('🔐 Password: admin123');
      }
      
      await mongoose.disconnect();
      process.exit(0);
      
    } catch (dbError) {
      console.error('❌ MongoDB connection failed:', dbError.message);
      console.log('\n' + '='.repeat(50));
      console.log('💡 SOLUTION: Update MongoDB Credentials');
      console.log('=' .repeat(50));
      console.log('\n1. Go to your MongoDB Atlas dashboard');
      console.log('2. Navigate to Database Access');
      console.log('3. Check/reset your database user password');
      console.log('4. Update MONGO_URI in backend/.env with the correct password');
      console.log('\nCurrent MONGO_URI format:');
      console.log('mongodb+srv://USERNAME:PASSWORD@cluster...mongodb.net/...');
      console.log('\n💡 Or run this script on your Render deployment:');
      console.log('   - It will use the correct MongoDB credentials from Render environment');
      
      process.exit(1);
    }
    
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

fixAdminLogin();
