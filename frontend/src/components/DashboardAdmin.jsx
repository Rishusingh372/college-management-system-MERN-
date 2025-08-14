import React, { useEffect, useState } from "react";
import axios from "axios";

const DashboardAdmin = () => {
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);
  const [teacherForm, setTeacherForm] = useState({ name: "", email: "" });
  const [studentForm, setStudentForm] = useState({ name: "", rollNo: "" });

  const token = localStorage.getItem("token");

  // Fetch Teachers & Students
  const fetchData = async () => {
    try {
      const tRes = await axios.get("http://localhost:5000/api/teachers", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTeachers(tRes.data);

      const sRes = await axios.get("http://localhost:5000/api/students", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStudents(sRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Add Teacher
  const addTeacher = async () => {
    try {
      await axios.post("http://localhost:5000/api/teachers", teacherForm, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTeacherForm({ name: "", email: "" });
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  // Delete Teacher
  const deleteTeacher = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/teachers/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  // Add Student
  const addStudent = async () => {
    try {
      await axios.post("http://localhost:5000/api/students", studentForm, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStudentForm({ name: "", rollNo: "" });
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  // Delete Student
  const deleteStudent = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/students/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* Teachers Section */}
      <div className="bg-white p-4 rounded-lg shadow mb-8">
        <h2 className="text-2xl font-semibold mb-4">Manage Teachers</h2>
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Name"
            value={teacherForm.name}
            onChange={(e) => setTeacherForm({ ...teacherForm, name: e.target.value })}
            className="border p-2 rounded w-1/3"
          />
          <input
            type="email"
            placeholder="Email"
            value={teacherForm.email}
            onChange={(e) => setTeacherForm({ ...teacherForm, email: e.target.value })}
            className="border p-2 rounded w-1/3"
          />
          <button
            onClick={addTeacher}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Teacher
          </button>
        </div>
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {teachers.map((t) => (
              <tr key={t._id}>
                <td className="p-2 border">{t.name}</td>
                <td className="p-2 border">{t.email}</td>
                <td className="p-2 border">
                  <button
                    onClick={() => deleteTeacher(t._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Students Section */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-4">Manage Students</h2>
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Name"
            value={studentForm.name}
            onChange={(e) => setStudentForm({ ...studentForm, name: e.target.value })}
            className="border p-2 rounded w-1/3"
          />
          <input
            type="text"
            placeholder="Roll No"
            value={studentForm.rollNo}
            onChange={(e) => setStudentForm({ ...studentForm, rollNo: e.target.value })}
            className="border p-2 rounded w-1/3"
          />
          <button
            onClick={addStudent}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Add Student
          </button>
        </div>
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Roll No</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s) => (
              <tr key={s._id}>
                <td className="p-2 border">{s.name}</td>
                <td className="p-2 border">{s.rollNo}</td>
                <td className="p-2 border">
                  <button
                    onClick={() => deleteStudent(s._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
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

export default DashboardAdmin;
