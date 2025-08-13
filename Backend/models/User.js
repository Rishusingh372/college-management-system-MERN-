const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  // Basic user information
  name: { type: String, required: true },
  email: { 
    type: String, 
    required: true, 
    unique: true // No duplicate emails
  },
  password: { 
    type: String, 
    required: true,
    select: false // Never show password in queries
  },
  
  // What type of user this is
  role: { 
    type: String, 
    required: true,
    enum: ['admin', 'teacher', 'student'] // Only these 3 roles allowed
  },
  
  // When account was created
  createdAt: { type: Date, default: Date.now }
});

// Automatically hash passwords before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  // Turn plain password into secure hash
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Method to check if password is correct
userSchema.methods.checkPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema);