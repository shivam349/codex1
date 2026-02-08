// Admin User Model
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    minlength: 6
  },
  name: {
    type: String,
    trim: true
  },
  image: {
    type: String
  },
  // Google OAuth
  googleId: {
    type: String,
    unique: true,
    sparse: true
  },
  // Email Verification
  emailVerified: {
    type: Date,
    default: null
  },
  verificationToken: {
    type: String
  },
  verificationTokenExpires: {
    type: Date
  },
  // User roles
  isAdmin: {
    type: Boolean,
    default: false
  },
  isUser: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    next();
  }
  
  // Only hash if password exists
  if (this.password) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  
  next();
});

// Compare password method
userSchema.methods.matchPassword = async function(enteredPassword) {
  if (!this.password) return false;
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
