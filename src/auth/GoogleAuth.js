import axios from "axios";
import React from "react";
//import { AuthContext } from "../Context/AuthContext";
const API_URL = process.env.REACT_APP_BACKEND_URL;
const decodeJWT = token => {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  return JSON.parse(atob(base64));
};

export const handleFailure = error => {
  console.log("Google login error:", error);
};

export const handleSuccess = async response => {
  //const { login } = React.useContext(AuthContext);
  const token = response.credential;
  const userData = decodeJWT(token);
  const data = {
    firstName: userData.given_name,
    lastName: userData.family_name,
    email: userData.email,
  };
  try {
    const response = await axios.post(`${API_URL}/api/users/googleauth`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.data) {
      //login(response.data);
      window.location.href = "/dashboard";
    } else {
      console.log("Sign-in failed. Please check your credentials.");
    }
  } catch (error) {
    console.error("Error:", error);
  }
};
