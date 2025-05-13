import React from "react";
import axios from "axios";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { useState, useEffect } from "react";
const API_URL = process.env.REACT_APP_BACKEND_URL;

const ProtectedRoute = ({ children }) => {
  const { user, logout, setUser } = React.useContext(AuthContext);

  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await axios.get(`${API_URL}/api/users/userData`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          setUser(response.data);
        } catch (error) {
          logout();
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, [setUser, logout]);

  useEffect(() => {
    if (user) {
      console.log("User has been set:", user);
    }
  }, [user]);


  if (loading) {
    return <div>Loading...</div>;
  }

  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
