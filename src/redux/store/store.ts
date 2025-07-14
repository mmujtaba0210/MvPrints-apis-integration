// redux store
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice/authSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;
