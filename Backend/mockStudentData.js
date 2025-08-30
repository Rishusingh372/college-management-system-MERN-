// Mock student data for testing when MongoDB is not available
const mockStudent = {
  _id: "507f1f77bcf86cd799439011",
  name: "Raj Kumar",
  number: "9876543210",
  emailId: "raj@student.com",
  rollNumber: "CS2024001",
  course: "Computer Science",
  attendance: 85,
  marks: [
    { subject: "Mathematics", score: 85 },
    { subject: "Physics", score: 78 },
    { subject: "Chemistry", score: 92 }
  ],
  feeStatus: "paid"
};

// Mock API endpoints for testing
const mockStudentRoutes = (req, res) => {
  const { id } = req.params;
  
  if (id === "507f1f77bcf86cd799439011") {
    return res.json(mockStudent);
  }
  
  return res.status(404).json({ message: "Student not found" });
};

module.exports = { mockStudent, mockStudentRoutes };
