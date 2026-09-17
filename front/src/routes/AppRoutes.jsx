import { useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "../components/AppLayout";
import Dashboard from "../pages/Dashboard";
import Events from "../pages/Events";
import History from "../pages/History";
import Login from "../pages/Login";
import Participants from "../pages/Participants";
import Reception from "../pages/Reception";
import Tickets from "../pages/Tickets";
import PrivateRoutes from "./PrivateRoutes";
import RegisterUser from "../pages/RegisterUser";
import EventCreate from "../pages/EventCreate";
import PublicEvents from "../pages/PublicEvents";
import Purchase from "../pages/Purchase";
import Users from "../pages/Users";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/public/events" element={<PublicEvents />} />
        <Route path="/public/events/:id" element={<Purchase />} />
        <Route path="/login"
          element={
            <Login />
          }
        />

        <Route element={
            <PrivateRoutes allowedRoles={[ 1, 2 ]}>
              <AppLayout />
            </PrivateRoutes>
          }>
            <Route path="/dashboard"
              element={
                <PrivateRoutes allowedRoles={[ 1, 2 ]}>
                  <Dashboard />
                </PrivateRoutes>
              }
            />
            <Route path="/events"
              element={
                <PrivateRoutes allowedRoles={[ 1, 2 ]}>
                  <Events />
                </PrivateRoutes>
              }
            />
            <Route path="/users" element={
              <PrivateRoutes allowedRoles={[1]}>
                <Users />
              </PrivateRoutes>} 
            />
            <Route path="/users/new" element={
              <PrivateRoutes allowedRoles={[1]}>
                <RegisterUser />
              </PrivateRoutes>} 
            />
            <Route path="/events/new" element={
              <PrivateRoutes allowedRoles={[2]}>
                <EventCreate />
              </PrivateRoutes>} />
            <Route path="/participants"
              element={
                <PrivateRoutes allowedRoles={[ 1 ]}>
                  <Participants />
                </PrivateRoutes>
              }
            />
            <Route path="/tickets"
              element={
                <PrivateRoutes allowedRoles={[ 1 ]}>
                  <Tickets />
                </PrivateRoutes>
              }
            />
            <Route path="/reception"
              element={
                <PrivateRoutes allowedRoles={[ 2 ]}>
                  <Reception />
                </PrivateRoutes>
              }
            />
            <Route path="/history"
              element={
                <PrivateRoutes allowedRoles={[ 2 ]}>
                  <History />
                </PrivateRoutes>
              }
            />
        </Route>

        <Route path="*"
          element={
            <Navigate to={ localStorage.getItem("token") ? "/dashboard" : "/login" } replace />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;