import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/features/authSlice.js";
import authApi from "@/features/api/authApi.js";

const appStore = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

export default appStore;
