import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
const API_URL = process.env.REACT_APP_BACKEND_URL;
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await axios.get(`${API_URL}/api/users/getUserData`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
      } catch (err) {
        console.error("Failed to fetch user", err);
        logout();
      }
    };

    fetchUser();
  }, []);

  const login = async userData => {
    console.log("Token token: " , userData);
    localStorage.setItem("token", userData);
    try {
      const response = await axios.post(`${API_URL}/api/users/login`, {
        headers: {
          Authorization: `Bearer ${userData.token}`,
        },
      });
      setUser(response.data);
    } catch (err) {
      console.error("Failed to fetch user after login", err);
    }
  };

  const signUp = userData => {
    localStorage.setItem("user", JSON.stringify(userData));
    window.location.href = "/";
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, signUp }}>
      {children}
    </AuthContext.Provider>
  );
};
