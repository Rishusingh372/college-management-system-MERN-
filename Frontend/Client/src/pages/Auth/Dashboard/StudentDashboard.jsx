import { useState, useEffect } from "react";
import axiosInstance from "/api/axios.js";
import { useNavigate } from "react-router-dom";

const StudentDashboard = () => {
  const [studentData, setStudentData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const res = await axiosInstance.get("/students/me");
        setStudentData(res.data);
      } catch (err) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    };
    fetchStudentData();
  }, []);

  if (!studentData) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Welcome, {studentData.user.name}!</h1>
      <div className="mt-4">
        <h2 className="text-xl">Your Courses:</h2>
        <ul className="list-disc pl-6 mt-2">
          {studentData.courses.map((course) => (
            <li key={course._id}>{course.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default StudentDashboard;