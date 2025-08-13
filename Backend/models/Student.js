const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  // Link to the user account
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', // Connects to User model
    required: true 
  },
  
  // School information
  rollNumber: { type: String, required: true, unique: true },
  class: { type: String, required: true }, // Like "10th Grade"
  
  // List of courses the student is taking
  courses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course' // Connects to Course model
  }],
  
  // Simple attendance tracker
  attendance: [{
    date: { type: Date, default: Date.now },
    present: { type: Boolean, default: false }
  }]
});

module.exports = mongoose.model('Student', studentSchema);