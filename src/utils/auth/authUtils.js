import store from "../../redux/store";
import jwtDecode from "jwt-decode";

const getUserToken = () => {
  const state = store.getState();
  const stateToken = state.auth.user.token;
  const localToken = localStorage.getItem("token");

  const token = stateToken || localToken;

  return token && token != "undefined" ? token : null;
};

export const isUserAuthenticated = () => {
  const token = getUserToken();
  if (!token) {
    return false;
  }

  return true;
};
