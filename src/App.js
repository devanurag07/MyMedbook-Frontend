import "./App.css";
import AdminDashboard from "./UI/Layout/Dashboard/AdminDashboard";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import SignInSide from "./UI/Authentication/Login";

import PrivateRoute from "./routes/PrivateRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SignUp from "./UI/Authentication/SignUp.js";
import routes from "./routes/routes";
import { CssBaseline } from "@mui/material";
import uuid from "react-uuid";
import { useSelector } from "react-redux";
import AdminRoute from "./routes/AdminRoute";
import DoctorDashboard from "./UI/Layout/Dashboard/DoctorDashboard";

const PrivatePage = (Element) => {
  return <PrivateRoute>{<Element />}</PrivateRoute>;
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DoctorDashboard />}></Route>
          {/* <Route path="doctor" element={}></Route> */}
          <Route
            path="admin"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          ></Route>

          {routes.map((route) => {
            return (
              <Route
                path={route.path}
                key={uuid()}
                element={
                  route.public ? (
                    <route.element />
                  ) : (
                    <PrivateRoute>
                      <route.element key={uuid()} />
                    </PrivateRoute>
                  )
                }
              ></Route>
            );
          })}
        </Routes>
      </BrowserRouter>

      <ToastContainer />
      <CssBaseline />
    </div>
  );
}

export default App;
