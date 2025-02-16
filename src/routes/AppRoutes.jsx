import React, { use } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../auth/Login";
import SignUp from "../auth/SignUp";
import MainLayout from "../Layouts/MainLayout";
import ProtectedRoute from "../Layouts/ProtectedRoute";
import { Navigate } from "react-router-dom";

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
          <Route path="/login" element={<Login />} />
          <Route path="/sign-in" element={<SignUp />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute isAuthenticated={!!user}>
                <div>Dashboard</div>
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/login" />} />
        </Route>
      </Routes>
    </div>
  );
}

export default AppRoutes;
