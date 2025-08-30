const express = require("express");
const Student = require("../models/Student");
const { mockStudent } = require('../mockStudentData');
const router = express.Router();

// Check if MongoDB is connected
let isMongoConnected = false;
const mongoose = require('mongoose');

mongoose.connection.on('connected', () => {
  isMongoConnected = true;
  console.log('MongoDB connected - using real database');
});

mongoose.connection.on('error', () => {
  isMongoConnected = false;
  console.log('MongoDB not connected - using mock data');
});

// Add a student
router.post("/add", async (req, res) => {
  try {
    if (!isMongoConnected) {
      return res.status(503).json({ message: "Database not available. Please check MongoDB connection." });
    }
    
    const { name, rollNumber, className, email } = req.body;
    const newStudent = new Student({ name, rollNumber, className, email });
    await newStudent.save();
    res.json({ message: "Student added successfully", student: newStudent });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get student by ID
router.get("/:id", async (req, res) => {
  try {
    if (!isMongoConnected) {
      // Return mock data for testing
      if (req.params.id === "507f1f77bcf86cd799439011") {
        return res.json(mockStudent);
      }
      return res.status(404).json({ message: "Student not found" });
    }

    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.json(student);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all students
router.get("/", async (req, res) => {
  try {
    if (!isMongoConnected) {
      // Return mock data for testing
      return res.json([mockStudent]);
    }

    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
