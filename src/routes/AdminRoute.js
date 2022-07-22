import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Navigate, useNavigate, Outlet } from "react-router-dom";
import {
  useGetCurrentUserQuery,
  useLazyGetCurrentUserQuery,
} from "../redux/features/auth/authApiSlice";
import { logout, setUserDetails } from "../redux/features/auth/authSlice";
import { isUserAuthenticated } from "../utils/auth/authUtils";
import PrivateRoute from "./PrivateRoute";

const AdminRoute = ({ children }) => {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.is_admin) {
      return navigate("/");
    }
  }, [user.is_admin, navigate]);

  return (
    <PrivateRoute>
      <h1>Admin Dashboard</h1>
      <Outlet />
    </PrivateRoute>
  );
};

export default AdminRoute;
