import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userLoggedIn } from "@/features/authSlice.js";
const BASE_URL = "http://localhost:8080/api/v1/user";

const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (inputData) => ({
        url: "register",
        method: "POST",
        body: inputData,
      }),
    }),

    loginUser: builder.mutation({
      query: (inputData) => ({
        url: "login",
        method: "POST",
        body: inputData,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(userLoggedIn({ user: result.data.user }));
        } catch (err) {
          console.error("Login error:", err);
        }
      },
    }),
   loadUser:builder.query({
    query:()=>({
      url: "profile",
      method: "GET",
    })
   })
  }),
});

// ✅ Ensure correct export names (camelCase)
export const { useRegisterUserMutation, useLoginUserMutation ,useLoadUserQuery} = authApi;
export default authApi;
