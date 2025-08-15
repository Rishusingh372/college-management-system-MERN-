const express = require("express");
const Teacher = require("../models/Teacher");
const router = express.Router();

// Get all teachers
router.get("/", async (req, res) => {
  try {
    const teachers = await Teacher.find();
    res.json(teachers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get teacher by ID
router.get("/:id", async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);
    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }
    res.json(teacher);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a teacher
router.post("/", async (req, res) => {
  try {
    const { name, subject, email, phone } = req.body;
    const newTeacher = new Teacher({ name, subject, email, phone });
    await newTeacher.save();
    res.json({ message: "Teacher added successfully", teacher: newTeacher });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update teacher
router.put("/:id", async (req, res) => {
  try {
    const { name, subject, email, phone } = req.body;
    const updatedTeacher = await Teacher.findByIdAndUpdate(
      req.params.id,
      { name, subject, email, phone },
      { new: true }
    );
    if (!updatedTeacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }
    res.json({ message: "Teacher updated successfully", teacher: updatedTeacher });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete teacher
router.delete("/:id", async (req, res) => {
  try {
    const deletedTeacher = await Teacher.findByIdAndDelete(req.params.id);
    if (!deletedTeacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }
    res.json({ message: "Teacher deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
