import React from "react";
import SignInSide from "../UI/Authentication/Login";
import Logout from "../UI/Authentication/Logout";
import SignUp from "../UI/Authentication/SignUp";
import VerifyEmail from "../UI/Authentication/VerifyEmail";
import AdminDashboard from "../UI/Layout/Dashboard/AdminDashboard";
import PrivateRoute from "./PrivateRoute";

const routes = [
  {
    path: "/login",
    element: SignInSide,
    public: true,
  },

  {
    path: "/logout",
    element: Logout,
    public: false,
  },

  {
    path: "/signup",
    element: SignUp,
    public: true,
  },

  {
    path: "/verify-email",
    element: VerifyEmail,
    public: true,
  },
];

export default routes;
