import React, { use } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../auth/Login";
import SignUp from "../auth/SignUp";
import MainLayout from "../Layouts/MainLayout";
import ProtectedRoute from "../Layouts/ProtectedRoute";
import { Navigate } from "react-router-dom";
import ToolBar from "../components/Toolbar";
import CreatePost from "../pages/CreatePost";

function AppRoutes() {
  const [user, setUser] = React.useState(() => {
    return JSON.parse(localStorage.getItem("user")) || null;
  });

  React.useEffect(() => {
    const handleStorageChange = () => {
      const storedUser = localStorage.getItem("user");
      setUser(storedUser ? JSON.parse(storedUser) : null);
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <div>
      <Routes>
        <Route element={<MainLayout />}>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/sign-in" element={<SignUp />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<div>Dashboard</div>} />
            <Route path="/createPost" element={<CreatePost />} />
          </Route>

          {/* Catch all */}
          <Route path="*" element={<Navigate to={user ? "/" : "/login"} />} />
        </Route>
      </Routes>
    </div>
  );
}

export default AppRoutes;
