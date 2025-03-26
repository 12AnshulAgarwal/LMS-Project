import { combineReducers } from "@reduxjs/toolkit"
import authReducer from "@/features/authSlice.js"
import  authApi  from "@/features/api/authApi.js"

const rootReducer=combineReducers({
    [authApi.reducerPath]:authApi.reducer,
    auth:authReducer
});

export default rootReducer;