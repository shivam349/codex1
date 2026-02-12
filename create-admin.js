require('dotenv').config({ path: require('path').join(__dirname, 'backend', '.env') });
const mongoose = require('mongoose');

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

// Hash password before saving
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    next();
  }
  
  if (this.password) {
    const bcrypt = require('bcryptjs');
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  
  next();
});

async function createAdmin() {
  try {
    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000,
    });
    console.log('✅ Connected to MongoDB');
    
    const User = mongoose.model('User', UserSchema);
    
    // Check if admin exists
    let admin = await User.findOne({ email: 'admin@mithilamakhana.com' });
    
    if (admin) {
      console.log('✅ Admin already exists');
      console.log('📧 Email: admin@mithilamakhana.com');
      console.log('🔐 Password: admin123');
    } else {
      console.log('➕ Creating admin user...');
      admin = new User({
        email: 'admin@mithilamakhana.com',
        password: 'admin123',
        isAdmin: true,
        emailVerified: new Date()
      });
      
      await admin.save();
      console.log('✅ Admin created successfully!');
      console.log('📧 Email: admin@mithilamakhana.com');
      console.log('🔐 Password: admin123');
    }
    
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

createAdmin();
