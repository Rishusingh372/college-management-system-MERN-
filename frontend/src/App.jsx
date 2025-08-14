import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import LoginAdmin from "./components/LoginAdmin";
import LoginUser from "./components/LoginUser";
import DashboardAdmin from "./components/DashboardAdmin";
import DashboardTeacher from "./components/DashboardTeacher";
import DashboardStudent from "./components/DashboardStudent";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login-admin" element={<LoginAdmin />} />
          <Route path="/login-user" element={<LoginUser />} />
          <Route path="/admin" element={<ProtectedRoute role="admin"><DashboardAdmin /></ProtectedRoute>} />
          <Route path="/teacher" element={<ProtectedRoute role="teacher"><DashboardTeacher /></ProtectedRoute>} />
          <Route path="/student" element={<ProtectedRoute role="student"><DashboardStudent /></ProtectedRoute>} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
