import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // { role: "admin"|"teacher"|"student", token: "..." }
  const navigate = useNavigate();

  const login = (role, token) => {
    setUser({ role, token });
    localStorage.setItem("user", JSON.stringify({ role, token }));
    if (role === "admin") navigate("/admin");
    if (role === "teacher") navigate("/teacher");
    if (role === "student") navigate("/student");
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
