const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: String,
  number: String,
  emailId: String,
  rollNumber: String,
  course: String,
  attendance: Number,
  password: { type: String, required: true },
  marks: [
    {
      subject: String,
      score: Number
    }
  ],
  feeStatus: String
});

module.exports = mongoose.model("Student", studentSchema);
