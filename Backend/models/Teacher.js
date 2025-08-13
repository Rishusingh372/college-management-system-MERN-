const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
  // Link to the user account
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', // Connects to User model
    required: true 
  },
  
  // School information
  teacherId: { type: String, required: true, unique: true },
  department: { type: String, required: true },
  
  // Courses this teacher teaches
  coursesTeaching: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course' // Connects to Course model
  }],
  
  // Simple schedule
  availableDays: [String] // Like ["Monday", "Wednesday"]
});

module.exports = mongoose.model('Teacher', teacherSchema);