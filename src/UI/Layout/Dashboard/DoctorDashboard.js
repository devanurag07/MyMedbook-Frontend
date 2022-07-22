import { makeStyles } from "@mui/styles";
import React, { useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import {
  Routes,
  Route,
  Link,
  BrowserRouter,
  Outlet,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import admin_links from "../Sidebar/Links/AdminLinks";
import doctor_links from "../Sidebar/Links/DoctorLinks";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    padding: "0",
  },
  sidebar: {
    width: "250px",
    height: "100vh",
    // background: "white",
  },
  mainPage: {
    width: "80%",
  },
}));

const DoctorDashboard = () => {
  const classes = useStyles();

  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  useEffect(() => {}, [""]);

  return (
    <div className={classes.root}>
      <div className={classes.sidebar}>
        <Sidebar links={doctor_links} />
      </div>
      <div className={classes.mainPage}>
        <Navbar />
        <div className="main">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
