import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApiSlice = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BACKEND_USER_URL }),
  endpoints: (builder) => ({
    addUser: builder.mutation({
      query: (userData) => ({
        url: "/add-user",
        method: "POST",
        body: userData,
      }),
    }),
    getUser: builder.query({
      query: (phone) => ({
        url: `/get-user`,
        method: "GET",
        body: { phone },
      }),
    }),
  }),
});

export const { useAddUserMutation, useGetUserQuery } = userApiSlice;