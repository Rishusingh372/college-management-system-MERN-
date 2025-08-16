// backend/routes/adminRoutes.js
const express = require("express");
const bcrypt = require("bcryptjs");
const auth = require("../middleware/authMiddleware");
const User = require("../models/User");
const Student = require("../models/Student");
const Teacher = require("../models/Teacher");

const router = express.Router();

/**
 * Helpers
 */
const ensureUser = async ({ username, password, role }) => {
  // Creates/updates a User with given username|role. If password is provided, (re)hash it
  let user = await User.findOne({ username, role });
  const toSet = { role, username };
  if (password) {
    const hash = await bcrypt.hash(password, 10);
    toSet.password = hash;
  }
  if (!user) user = await User.create(toSet);
  else if (password) {
    user.password = toSet.password;
    await user.save();
  }
  return user;
};

/**
 * STUDENTS
 */
router.get("/students", auth(["admin"]), async (_req, res) => {
  const list = await Student.find();
  return res.json(list);
});

router.post("/students", auth(["admin"]), async (req, res) => {
  try {
    const { name, rollNumber, course, username, password, feeStatus = "unpaid" } = req.body;

    if (!name || !rollNumber || !course || !username || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Create/ensure auth user (optional but handy)
    const user = await ensureUser({ username, password, role: "student" });

    const created = await Student.create({
      name,
      rollNumber,
      course,
      feeStatus,
      attendance: 0,
      password, // Store password directly in Student model
      marks: [],
      userId: user._id,
    });

    return res.json(created);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

router.put("/students/:id", auth(["admin"]), async (req, res) => {
  try {
    const updated = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Student not found" });
    return res.json(updated);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

router.delete("/students/:id", auth(["admin"]), async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not found" });
    // (Optional) also delete linked user
    await User.deleteOne({ _id: student.userId }).catch(() => {});
    return res.json({ message: "Student deleted" });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

/**
 * TEACHERS
 */
router.get("/teachers", auth(["admin"]), async (_req, res) => {
  const list = await Teacher.find();
  return res.json(list);
});

router.post("/teachers", auth(["admin"]), async (req, res) => {
  try {
    const { name, subject, salary, username, password } = req.body;

    if (!name || !subject || !salary || !username || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Create/ensure auth user (optional)
    const user = await ensureUser({ username, password, role: "teacher" });

    const created = await Teacher.create({
      name,
      subject,
      salary,
      password, // Store password directly in Teacher model
      attendance: 0,
      assignedCourses: subject ? [subject] : [],
      userId: user._id,
    });

    return res.json(created);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

router.put("/teachers/:id", auth(["admin"]), async (req, res) => {
  try {
    const updated = await Teacher.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Teacher not found" });
    return res.json(updated);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

router.delete("/teachers/:id", auth(["admin"]), async (req, res) => {
  try {
    const teacher = await Teacher.findByIdAndDelete(req.params.id);
    if (!teacher) return res.status(404).json({ message: "Teacher not found" });
    // (Optional) also delete linked user
    await User.deleteOne({ _id: teacher.userId }).catch(() => {});
    return res.json({ message: "Teacher deleted" });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

module.exports = router;
