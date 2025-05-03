import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignupPage from "./auth/SignupPage";
import LoginPage from "./auth/LoginPage";
import Dashboard from "./components/admin/Dashboard";
import HomePage from "./components/user/HomePage";
import { Toaster } from "sonner";
import ResetPassPage from "./auth/ResetPassPage";
import CreateState from "./components/admin/CreateState";
import CreateCity from "./components/admin/CreateCity";
import CreateHotels from "./components/admin/CreateHotels";
import AdminRoutes from "./protectedRoutes/AdminRoutes";
import CheckToken from "./protectedRoutes/CheckToken";
import MainLayout from "./layouts/MainLayout";
import CreateRoom from "./components/admin/CreateRoom";

const App = () => {
  return (
    <BrowserRouter>
      <Toaster />
      <Routes>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/" element={<LoginPage />} />
        <Route path="/reset" element={<ResetPassPage />} />

        <Route element={<MainLayout />}>
          <Route
            path="/home"
            element={
              <CheckToken>
                <HomePage />
              </CheckToken>
            }
          />

          <Route
            path="/admin"
            element={
              <AdminRoutes>
                <Dashboard />
              </AdminRoutes>
            }
          >
            <Route index element={<CreateState />} />
            <Route path="city" element={<CreateCity />} />
            <Route path="hotel" element={<CreateHotels />} />
            <Route path="room" element={<CreateRoom />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
