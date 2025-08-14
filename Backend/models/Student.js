const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: String,
  rollNumber: String,
  course: String,
  attendance: Number,
  marks: [
    {
      subject: String,
      score: Number
    }
  ],
  feeStatus: String
});

module.exports = mongoose.model("Student", studentSchema);
