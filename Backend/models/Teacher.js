const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema({
  name: String,
  subject: String,
  salary: Number,
  attendance: Number,
  assignedCourses: [String]
});

module.exports = mongoose.model("Teacher", teacherSchema);
