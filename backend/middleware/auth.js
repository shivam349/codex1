// JWT Authentication Middleware
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Protect routes - Admin only
const protect = async (req, res, next) => {
  let token;

  // Check for Bearer token in headers
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from token (exclude password)
      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        return res.status(401).json({ 
          success: false, 
          message: 'User not found' 
        });
      }

      // Check if user is admin
      if (!req.user.isAdmin) {
        return res.status(403).json({ 
          success: false, 
          message: 'Access denied. Admin only.' 
        });
      }

      next();
    } catch (error) {
      console.error('Auth error:', error);
      res.status(401).json({ 
        success: false, 
        message: 'Not authorized, token invalid' 
      });
    }
  } else {
    res.status(401).json({ 
      success: false, 
      message: 'Not authorized, no token' 
    });
  }
};

module.exports = { protect };
