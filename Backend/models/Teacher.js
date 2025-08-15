const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema({
  name: String,
  teacherId: String,
  email: String,
  phone: String,
  subject: String,
  salary: Number,
  attendance: Number,
  password: { type: String, required: true },
  assignedCourses: [String]

});

module.exports = mongoose.model("Teacher", teacherSchema);
