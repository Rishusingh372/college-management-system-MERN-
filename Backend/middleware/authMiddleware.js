const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Simple protection middleware - just checks if user is logged in
const protect = async (req, res, next) => {
  try {
    // 1. Get token from header
    const token = req.header('Authorization').replace('Bearer ', '');
    
    // 2. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // 3. Find user and attach to request
    req.user = await User.findById(decoded.id).select('-password');
    
    next();
  } catch (error) {
    res.status(401).json({ message: 'Not authorized' });
  }
};

// Check if user is admin
const admin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access required' });
  }
  next();
};

module.exports = { protect, admin };