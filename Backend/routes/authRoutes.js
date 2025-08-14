// backend/routes/authRoutes.js
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Teacher = require("../models/Teacher");
const Student = require("../models/Student");

const router = express.Router();

const signJwt = (payload) =>
  jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });

/**
 * Admin login
 * POST /api/auth/admin-login
 * body: { username, password }
 */
router.post("/admin-login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username, role: "admin" });
    if (!user) return res.status(404).json({ message: "Admin not found" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(400).json({ message: "Invalid credentials" });

    const token = signJwt({ id: user._id, role: user.role, username: user.username });
    return res.json({ token });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

/**
 * Teacher/Student login
 * POST /api/auth/user-login
 * body: { username, password }
 * returns: { token, role }
 */
router.post("/user-login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username, role: { $in: ["teacher", "student"] } });
    if (!user) return res.status(404).json({ message: "User not found" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(400).json({ message: "Invalid credentials" });

    // Optionally attach profile id for convenience on the frontend
    let profileId = null;
    if (user.role === "teacher") {
      const t = await Teacher.findOne({ userId: user._id });
      profileId = t?._id ?? null;
    } else if (user.role === "student") {
      const s = await Student.findOne({ userId: user._id });
      profileId = s?._id ?? null;
    }

    const token = signJwt({
      id: user._id,
      role: user.role,
      username: user.username,
      profileId,
    });

    return res.json({ token, role: user.role });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

module.exports = router;
