import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

const DashboardTeacher = () => {
  const { user } = useAuth();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all students
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/students`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        const data = await res.json();
        setStudents(data);
      } catch (error) {
        console.error("Error fetching students:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user && user.role === "teacher") {
      fetchStudents();
    }
  }, [user]);

  // Update marks or attendance
  const handleUpdate = async (id, field, value) => {
    try {
      await fetch(`http://localhost:5000/api/students/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ [field]: value }),
      });

      setStudents((prev) =>
        prev.map((student) =>
          student.id === id ? { ...student, [field]: value } : student
        )
      );
    } catch (error) {
      console.error("Error updating student:", error);
    }
  };

  if (loading) {
    return <p className="text-center mt-10 text-gray-500">Loading students...</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4 text-blue-600">Teacher Dashboard</h1>
      <p className="mb-6">View and update student marks & attendance.</p>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg p-4">
        <table className="min-w-full border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Attendance (%)</th>
              <th className="p-3 border">Marks</th>
              <th className="p-3 border">Fee Status</th>
              <th className="p-3 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id} className="text-center">
                <td className="p-3 border">{student.name}</td>
                <td className="p-3 border">
                  <input
                    type="number"
                    className="w-20 p-1 border rounded"
                    value={student.attendance}
                    onChange={(e) =>
                      handleUpdate(student.id, "attendance", e.target.value)
                    }
                  />
                </td>
                <td className="p-3 border">
                  <input
                    type="number"
                    className="w-20 p-1 border rounded"
                    value={student.marks}
                    onChange={(e) =>
                      handleUpdate(student.id, "marks", e.target.value)
                    }
                  />
                </td>
                <td className="p-3 border">
                  {student.feePaid ? "Paid ✅" : "Pending ❌"}
                </td>
                <td className="p-3 border">
                  <button
                    onClick={() => alert("Changes saved automatically")}
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                  >
                    Save
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardTeacher;
