const express = require("express");
const Student = require("../models/Student");
const router = express.Router();

// Add a student
router.post("/add", async (req, res) => {
  try {
    const { name, rollNumber, className, email } = req.body;
    const newStudent = new Student({ name, rollNumber, className, email });
    await newStudent.save();
    res.json({ message: "Student added successfully", student: newStudent });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
