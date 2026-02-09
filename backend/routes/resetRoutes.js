// One-time admin reset endpoint - REMOVE AFTER USE
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// @route   POST /api/reset/force-admin-reset
// @desc    Force reset admin password (ONE TIME USE ONLY)
// @access  Public (SHOULD BE REMOVED AFTER USE)
router.post('/force-admin-reset', async (req, res) => {
  try {
    const { secret } = req.body;
    
    // Simple secret check - change this to something secure
    if (secret !== 'mithila-reset-2024') {
      return res.status(403).json({
        success: false,
        message: 'Invalid secret key'
      });
    }

    // Find or create admin user
    let admin = await User.findOne({ email: 'admin@mithilamakhana.com' });
    
    if (!admin) {
      console.log('Creating new admin user...');
      // Create new admin with proper hashing via the model
      admin = new User({
        email: 'admin@mithilamakhana.com',
        password: 'admin123',
        isAdmin: true,
        emailVerified: new Date()
      });
      await admin.save(); // This will trigger the pre-save hook to hash the password
    } else {
      console.log('Admin exists, resetting password...');
      // Reset password - set it directly and save (pre-save hook will hash it)
      admin.password = 'admin123';
      admin.isAdmin = true;
      admin.emailVerified = new Date();
      await admin.save(); // This will trigger the pre-save hook to hash the password
    }

    // Verify the password works
    const testMatch = await admin.matchPassword('admin123');
    
    res.json({
      success: true,
      message: 'Admin password reset successfully!',
      data: {
        email: 'admin@mithilamakhana.com',
        password: 'admin123',
        passwordTestPassed: testMatch,
        userId: admin._id
      }
    });

  } catch (error) {
    console.error('Force reset error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;
