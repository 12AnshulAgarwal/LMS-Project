import { combineReducers } from "@reduxjs/toolkit"
import authReducer from "@/features/authSlice.js"
import  authApi  from "@/features/api/authApi.js"
import { courseApi } from "@/features/api/courseApi";

const rootReducer=combineReducers({
    [authApi.reducerPath]:authApi.reducer,
    [courseApi.reducerPath]:courseApi.reducer,
    auth:authReducer
});

export default rootReducer;