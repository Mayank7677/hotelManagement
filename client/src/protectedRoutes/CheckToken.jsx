import React from "react";
import { Navigate } from "react-router-dom";

const CheckToken = ({ children }) => {
    const isLoggedIn = JSON.parse(localStorage.getItem("data")).token === null;

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default CheckToken;
