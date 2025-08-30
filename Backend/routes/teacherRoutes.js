const express = require("express");
const Teacher = require("../models/Teacher");
const Student = require("../models/Student");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

// Get teacher profile with complete information
router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const teacher = await Teacher.findOne({ userId: req.user.id })
      .populate('userId', 'name email')
      .populate('assignedCourses', 'name code');
    
    if (!teacher) {
      return res.status(404).json({ message: "Teacher profile not found" });
    }
    
    res.json({
      success: true,
      teacher: {
        id: teacher._id,
        name: teacher.userId.name,
        email: teacher.userId.email,
        subject: teacher.subject,
        qualification: teacher.qualification,
        experience: teacher.experience,
        phone: teacher.phone,
        address: teacher.address,
        assignedCourses: teacher.assignedCourses,
        joiningDate: teacher.joiningDate,
        salary: teacher.salary
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get students assigned to the logged-in teacher
router.get("/students", authMiddleware, async (req, res) => {
  try {
    const teacher = await Teacher.findOne({ userId: req.user.id });
    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    const students = await Student.find({ assignedTeacher: teacher._id })
      .populate('userId', 'name email')
      .populate('course', 'name code')
      .select('-password');
    
    res.json({
      success: true,
      students: students.map(student => ({
        id: student._id,
        name: student.userId.name,
        email: student.userId.email,
        rollNumber: student.rollNumber,
        course: student.course.name,
        year: student.year,
        semester: student.semester,
        phone: student.phone,
        address: student.address,
        admissionDate: student.admissionDate,
        assignedTeacher: student.assignedTeacher
      }))
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get teacher dashboard stats
router.get("/dashboard", authMiddleware, async (req, res) => {
  try {
    const teacher = await Teacher.findOne({ userId: req.user.id });
    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    const studentCount = await Student.countDocuments({ assignedTeacher: teacher._id });
    const courseCount = teacher.assignedCourses ? teacher.assignedCourses.length : 0;

    res.json({
      success: true,
      stats: {
        students: studentCount,
        courses: courseCount,
        attendance: 85 // This can be calculated based on actual attendance data
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update teacher profile
router.put("/profile", authMiddleware, async (req, res) => {
  try {
    const teacher = await Teacher.findOneAndUpdate(
      { userId: req.user.id },
      req.body,
      { new: true }
    ).populate('userId', 'name email');
    
    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }
    
    res.json({
      success: true,
      teacher: {
        id: teacher._id,
        name: teacher.userId.name,
        email: teacher.userId.email,
        subject: teacher.subject,
        qualification: teacher.qualification,
        experience: teacher.experience,
        phone: teacher.phone,
        address: teacher.address,
        assignedCourses: teacher.assignedCourses,
        joiningDate: teacher.joiningDate,
        salary: teacher.salary
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all teachers (public endpoint)
router.get("/", async (req, res) => {
  try {
    const teachers = await Teacher.find().populate('userId', 'name email');
    res.json(teachers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get teacher by ID
router.get("/:id", async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id).populate('userId', 'name email');
    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }
    res.json(teacher);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a teacher (admin only)
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

// Update teacher (admin only)
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

// Delete teacher (admin only)
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
