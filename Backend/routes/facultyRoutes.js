const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { 
  getFacultyProfile, 
  updateFacultyProfile 
} = require('../controllers/facultyController');

// Protect all routes
router.use(protect);

// GET /api/faculty/me
router.get('/me', getFacultyProfile);

// PUT /api/faculty/me
router.put('/me', updateFacultyProfile);

module.exports = router;