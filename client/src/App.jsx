import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignupPage from "./auth/SignupPage";
import LoginPage from "./auth/LoginPage";
import Dashboard from "./components/admin/Dashboard";
import HomePage from "./components/user/RoomPage";
import { Toaster } from "sonner";
import ResetPassPage from "./auth/ResetPassPage";
import CreateState from "./components/admin/State/CreateState";
import CreateCity from "./components/admin/City/CreateCity";
import CreateHotels from "./components/admin/Hotel/CreateHotels";
import AdminRoutes from "./protectedRoutes/AdminRoutes";
import CheckToken from "./protectedRoutes/CheckToken";
import MainLayout from "./layouts/MainLayout";
import CreateRoom from "./components/admin/Room/CreateRoom";
import EditCity from "./components/admin/City/EditCity";
import EditState from "./components/admin/State/EditState";
import EditHotel from "./components/admin/Hotel/EditHotel";
import EditRoom from "./components/admin/Room/EditRoom";
import RoomDetails from "./components/user/RoomDetails";
import AllHotels from "./components/user/AllHotels";
import BookRoom from "./components/user/BookRoom";

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
                <AllHotels />
              </CheckToken>
            }
          />
          <Route
            path="/roomPage/:id"
            element={
              <CheckToken>
                <HomePage />
              </CheckToken>
            }
          />

          <Route
            path="/roomsdetail/:id"
            element={
              <CheckToken>
                <RoomDetails />
              </CheckToken>
            }
          />
          <Route
            path="/bookRoom"
            element={
              <CheckToken>
                <BookRoom />
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
            <Route path="state/edit/:id" element={<EditState />} />
            <Route path="city" element={<CreateCity />} />
            <Route path="city/edit/:id" element={<EditCity />} />
            <Route path="hotel" element={<CreateHotels />} />
            <Route path="hotel/edit/:id" element={<EditHotel />} />
            <Route path="room" element={<CreateRoom />} />
            <Route path="room/edit/:id" element={<EditRoom />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
