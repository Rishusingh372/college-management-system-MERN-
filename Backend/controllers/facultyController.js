const Faculty = require('../models/Faculty');

// Get faculty profile
const getFacultyProfile = async (req, res) => {
  try {
    const faculty = await Faculty.findOne({ user: req.user._id })
      .populate('user', 'name email')
      .populate('coursesTeaching', 'name code');
      
    res.json(faculty);
  } catch (error) {
    res.status(400).json({ message: 'Error getting profile' });
  }
};

// Update faculty profile
const updateFacultyProfile = async (req, res) => {
  try {
    const faculty = await Faculty.findOneAndUpdate(
      { user: req.user._id },
      req.body,
      { new: true }
    );
    res.json(faculty);
  } catch (error) {
    res.status(400).json({ message: 'Error updating profile' });
  }
};

module.exports = { getFacultyProfile, updateFacultyProfile };