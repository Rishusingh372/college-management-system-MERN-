import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register.jsx";
import StudentDashboard from "./pages/Auth/Dashboard/StudentDashboard.jsx";
import FacultyDashboard from "./pages/Auth/Dashboard/FacultyDashboard";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes (Require Login) */}
        <Route element={<ProtectedRoute />}>
          <Route path="/student" element={<StudentDashboard />} />
          <Route path="/faculty" element={<FacultyDashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;