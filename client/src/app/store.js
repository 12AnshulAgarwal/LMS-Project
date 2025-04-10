import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/features/authSlice.js";
import authApi from "@/features/api/authApi.js";
import { courseApi } from "@/features/api/courseApi";

const appStore = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [courseApi.reducerPath]: courseApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware,courseApi.middleware),
});

const initializeApp=async()=>{
  await appStore.dispatch(authApi.endpoints.loadUser.initiate({},{forceRefetch:true}))
}
initializeApp();
export default appStore;
