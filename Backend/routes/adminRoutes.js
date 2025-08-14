const express = require("express");
const Student = require("../models/Student");
const Teacher = require("../models/Teacher");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// CRUD for Students
router.post("/students", authMiddleware(["admin"]), async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.json(student);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

router.get("/students", authMiddleware(["admin"]), async (req, res) => {
  const students = await Student.find();
  res.json(students);
});

router.put("/students/:id", authMiddleware(["admin"]), async (req, res) => {
  const updated = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

router.delete("/students/:id", authMiddleware(["admin"]), async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.json({ msg: "Student deleted" });
});

// CRUD for Teachers
router.post("/teachers", authMiddleware(["admin"]), async (req, res) => {
  const teacher = new Teacher(req.body);
  await teacher.save();
  res.json(teacher);
});

router.get("/teachers", authMiddleware(["admin"]), async (req, res) => {
  const teachers = await Teacher.find();
  res.json(teachers);
});

router.put("/teachers/:id", authMiddleware(["admin"]), async (req, res) => {
  const updated = await Teacher.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

router.delete("/teachers/:id", authMiddleware(["admin"]), async (req, res) => {
  await Teacher.findByIdAndDelete(req.params.id);
  res.json({ msg: "Teacher deleted" });
});

module.exports = router;
