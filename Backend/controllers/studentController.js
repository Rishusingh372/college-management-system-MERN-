const Student = require('../models/Student');

// Get student profile
const getStudentProfile = async (req, res) => {
  try {
    const student = await Student.findOne({ user: req.user._id })
      .populate('user', 'name email')
      .populate('courses', 'name code');
      
    res.json(student);
  } catch (error) {
    res.status(400).json({ message: 'Error getting profile' });
  }
};

// Update student profile
const updateStudentProfile = async (req, res) => {
  try {
    const student = await Student.findOneAndUpdate(
      { user: req.user._id },
      req.body,
      { new: true }
    );
    res.json(student);
  } catch (error) {
    res.status(400).json({ message: 'Error updating profile' });
  }
};

module.exports = { getStudentProfile, updateStudentProfile };