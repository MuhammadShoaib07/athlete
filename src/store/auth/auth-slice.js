import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
    auth: false,
  },
  reducers: {
    setToken(state, action) {
      return (state.token = action.payload);
    },
    getToken(state) {
      return state.token;
    },
    isAuthenticated(state) {
      return state.auth;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
