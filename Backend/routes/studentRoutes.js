const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { 
  getStudentProfile, 
  updateStudentProfile 
} = require('../controllers/studentController');

// Protect all routes
router.use(protect);

// GET /api/students/me
router.get('/me', getStudentProfile);

// PUT /api/students/me
router.put('/me', updateStudentProfile);

module.exports = router;