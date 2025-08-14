import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

const DashboardStudent = () => {
  const { user } = useAuth();
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/students/${user.id}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        const data = await res.json();
        setStudentData(data);
      } catch (error) {
        console.error("Error fetching student data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user && user.role === "student") {
      fetchStudentData();
    }
  }, [user]);

  if (loading) {
    return <p className="text-center mt-10 text-gray-500">Loading your data...</p>;
  }

  if (!studentData) {
    return <p className="text-center mt-10 text-red-500">No data found.</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4 text-blue-600">Student Dashboard</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Welcome, {studentData.name}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-green-100 p-4 rounded-lg shadow">
            <h3 className="text-lg font-bold">Attendance</h3>
            <p className="text-gray-700">{studentData.attendance}%</p>
          </div>

          <div className="bg-blue-100 p-4 rounded-lg shadow">
            <h3 className="text-lg font-bold">Marks</h3>
            <p className="text-gray-700">{studentData.marks}</p>
          </div>

          <div className="bg-yellow-100 p-4 rounded-lg shadow">
            <h3 className="text-lg font-bold">Fee Status</h3>
            <p className="text-gray-700">
              {studentData.feePaid ? "Paid ✅" : "Pending ❌"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardStudent;
