const express = require("express");
const Student = require("../models/Student");
const Teacher = require("../models/Teacher");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Get own details
router.get("/me", authMiddleware(["teacher"]), async (req, res) => {
  const teacher = await Teacher.findById(req.user.id);
  res.json(teacher);
});

// Update student marks
router.put("/updateMarks/:studentId", authMiddleware(["teacher"]), async (req, res) => {
  const { subject, score } = req.body;
  const student = await Student.findById(req.params.studentId);

  if (!student) return res.status(404).json({ msg: "Student not found" });

  const markIndex = student.marks.findIndex(m => m.subject === subject);
  if (markIndex >= 0) {
    student.marks[markIndex].score = score;
  } else {
    student.marks.push({ subject, score });
  }

  await student.save();
  res.json(student);
});

// Update student attendance
router.put("/updateAttendance/:studentId", authMiddleware(["teacher"]), async (req, res) => {
  const { attendance } = req.body;
  const student = await Student.findByIdAndUpdate(req.params.studentId, { attendance }, { new: true });
  res.json(student);
});

module.exports = router;
