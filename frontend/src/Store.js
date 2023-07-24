import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import notificationReducer from "./slices/notificationSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    notification: notificationReducer,
  },
});