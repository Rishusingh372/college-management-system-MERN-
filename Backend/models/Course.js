const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  // Basic course info
  name: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  
  // Who teaches this course
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher' // Connects to Teacher model
  },
  
  // When the class meets
  schedule: {
    days: [String], // Like ["Tuesday", "Thursday"]
    time: String    // Like "10:00 AM"
  },
  
  // Simple assignments
  assignments: [{
    name: String,
    dueDate: Date
  }]
});

module.exports = mongoose.model('Course', courseSchema);