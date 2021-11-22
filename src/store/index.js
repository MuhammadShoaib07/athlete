import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./user/user-slice";

const store = configureStore({
  reducer: {
    users: userSlice.reducer,
  },
});

export default store;
