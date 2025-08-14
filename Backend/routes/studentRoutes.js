const express = require("express");
const Student = require("../models/Student");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Get own details
router.get("/me", authMiddleware(["student"]), async (req, res) => {
  const student = await Student.findById(req.user.id);
  res.json(student);
});

module.exports = router;
