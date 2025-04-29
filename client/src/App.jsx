import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignupPage from "./auth/SignupPage";
import LoginPage from "./auth/LoginPage";
import Dashboard from "./components/admin/Dashboard";
import HomePage from "./components/user/HomePage";
import { Toaster } from "sonner";
import ResetPassPage from "./auth/ResetPassPage";

const App = () => {
  return (
    <BrowserRouter>
      <Toaster />
      <Routes>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/" element={<LoginPage />} />
        <Route path="/reset" element={<ResetPassPage />} />
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
