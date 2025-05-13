import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
const API_URL = process.env.REACT_APP_BACKEND_URL;
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  // useEffect(() => {
  //   const fetchUser = async () => {
  //     const token = localStorage.getItem("token");
  //     if (!token) return;

  //     try {
  //       const response = await axios.get(`${API_URL}/api/users/userData`, {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });
  //       setUser(response.data);
  //     } catch (err) {
  //       console.error("Failed to fetch user", err);
  //       logout();
  //     }
  //   };

  //   fetchUser();
  // }, []);

  const login = async userData => {
    try {
      
      const response = await axios.post(
        `${API_URL}/api/users/login`,
        userData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      const token = response.data.token;
      localStorage.setItem("token", token);
      const userResponse = await axios.get(`${API_URL}/api/users/userData`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
       console.log(userResponse.data);
       setUser(userResponse.data);
      window.location.href = "/";
    } catch (err) {
      console.error("Login failed", err);
    }
  };

  const signUp = userData => {
    localStorage.setItem("user", JSON.stringify(userData));
    window.location.href = "/";
  };

    const logout = () => {
      localStorage.removeItem("token"); 
      setUser(null);
      window.location.href = "/login";
    };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, signUp }}>
      {children}
    </AuthContext.Provider>
  );
};
