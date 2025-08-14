const express = require("express");
const Teacher = require("../models/Teacher");
const router = express.Router();

// Add a teacher
router.post("/add", async (req, res) => {
  try {
    const { name, subject, email, phone } = req.body;
    const newTeacher = new Teacher({ name, subject, email, phone });
    await newTeacher.save();
    res.json({ message: "Teacher added successfully", teacher: newTeacher });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
