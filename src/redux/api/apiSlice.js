import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logout } from "../features/auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:8000",
  credentials: "include",
  prepareHeaders: (headers, { getState, endpoint }) => {
    const token = getState().auth.user.token;
    const skipUrls = ["login", "signup"];

    if (skipUrls.includes(endpoint)) {
      return headers;
    }
    if (token) {
      headers.set("authorization", `Token ${token}`);
    } else {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("authorization", `Token ${token}`);
      }
    }
    return headers;
  },
});

const baseQueryReAuth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  console.log(result);
  if (result?.error?.originalStatus == 401) {
    console.log("hello");
    api.dispatch(logout());
  }
  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryReAuth,
  endpoints: (builder) => ({}),
});
