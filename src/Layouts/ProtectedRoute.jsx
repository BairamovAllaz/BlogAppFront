import React from "react";
import axios from "axios";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { useState,useEffect } from "react";
const API_URL = process.env.REACT_APP_BACKEND_URL;

const ProtectedRoute = ({ children }) => {
  const { user, logout } = React.useContext(AuthContext);

 const [loading, setLoading] = React.useState(true);

 useEffect(() => {
   const checkAuth = async () => {
     const token = localStorage.getItem("token");
     if (token) {
       try {
         await axios.get(`${API_URL}/api/users/userData`, {
           headers: {
             Authorization: `Bearer ${token}`,
           },
         });
         setLoading(false);
       } catch (error) {
         setLoading(false);
         logout();
       }
     } else {
       setLoading(false);
     }
   };

   checkAuth();
 }, [logout]);

  if (loading) {
    return <div>Loading...</div>;
  }
  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
