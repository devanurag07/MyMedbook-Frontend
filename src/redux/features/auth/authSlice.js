import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {},
  },
  reducers: {
    setUserDetails: (state, action) => {
      const user = action.payload;
      state.user = user;
    },
    logout: (state, action) => {
      state.user = null;
      localStorage.clear();
    },
  },
});

export const { setUserDetails, logout } = authSlice.actions;

export default authSlice.reducer;
