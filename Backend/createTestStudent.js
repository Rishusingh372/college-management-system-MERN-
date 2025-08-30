const mongoose = require('mongoose');
const Student = require('./models/Student');
const dotenv = require('dotenv');

dotenv.config();
require('./config/db');

const createTestStudent = async () => {
  try {
    // Create a test student
    const testStudent = new Student({
      name: "Raj Kumar",
      number: "9876543210",
      emailId: "raj@student.com",
      rollNumber: "CS2024001",
      course: "Computer Science",
      attendance: 85,
      password: "student123",
      marks: [
        { subject: "Mathematics", score: 85 },
        { subject: "Physics", score: 78 },
        { subject: "Chemistry", score: 92 }
      ],
      feeStatus: "paid"
    });

    await testStudent.save();
    console.log('Test student created successfully:', testStudent._id);
    console.log('Student ID:', testStudent._id.toString());
    
    process.exit(0);
  } catch (error) {
    console.error('Error creating test student:', error);
    process.exit(1);
  }
};

createTestStudent();
