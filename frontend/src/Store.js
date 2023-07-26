import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import bookSlice from "./slices/bookSlice";
import followerSlice from "./slices/followerSlice";
import notificationReducer from "./slices/notificationSlice";
import reviewSlice from "./slices/reviewSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    book: bookSlice,
    follower: followerSlice,
    notification: notificationReducer,
    review: reviewSlice,
  },
});