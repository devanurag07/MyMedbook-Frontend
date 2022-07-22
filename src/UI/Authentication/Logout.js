import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../../redux/features/auth/authApiSlice";
import { logout } from "../../redux/features/auth/authSlice";

const Logout = () => {
  const [logout_] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    logout_().then((resp) => {
      console.log(resp);
      dispatch(logout());
      return navigate("/login");
    });
  }, [""]);

  return <div>Logout</div>;
};

export default Logout;
