import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-blue-600 p-4 text-white flex justify-between">
      <div className="flex space-x-4">
        <Link to="/" className="hover:underline">Home</Link>
        {user?.role === "admin" && <Link to="/admin" className="hover:underline">Admin Dashboard</Link>}
        {user?.role === "teacher" && <Link to="/teacher" className="hover:underline">Teacher Dashboard</Link>}
        {user?.role === "student" && <Link to="/student" className="hover:underline">Student Dashboard</Link>}
      </div>
      <div>
        {user ? (
          <button onClick={logout} className="bg-red-500 px-4 py-1 rounded">Logout</button>
        ) : (
          <>
            <Link to="/login-admin" className="bg-green-500 px-4 py-1 rounded mr-2">Admin Login</Link>
            <Link to="/login-user" className="bg-yellow-500 px-4 py-1 rounded">User Login</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
