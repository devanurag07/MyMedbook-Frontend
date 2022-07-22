import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Navigate } from "react-router-dom";
import {
  useGetCurrentUserQuery,
  useLazyGetCurrentUserQuery,
} from "../redux/features/auth/authApiSlice";
import { logout, setUserDetails } from "../redux/features/auth/authSlice";
import { isUserAuthenticated } from "../utils/auth/authUtils";

const PrivateRoute = ({ children }) => {
  const [is_authenticated, setIsAuthenticated] = useState(
    isUserAuthenticated()
  );

  const [getCurrentUser] = useLazyGetCurrentUserQuery();
  const dispatch = useDispatch();

  const getUser = async () => {
    const data = await getCurrentUser();
    console.log(data);

    if (data.isSuccess) {
      // dispatch(setUserDetails());
      if (data.data.status == true) {
        setIsAuthenticated(true);
        const user = data.data.response;
        const userToken = data.data.token;

        dispatch(setUserDetails({ ...user, token: userToken }));
        setIsAuthenticated(true);
      } else {
        dispatch(logout())
      }
      console.log(data);
    } else {
      setIsAuthenticated(false);
    }
    return data;
  };

  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (user.token == undefined) {
      getUser();
    }
  }, [""]);

  return <>{is_authenticated ? children : <Navigate to={"/login"} />}</>;
};

export default PrivateRoute;
