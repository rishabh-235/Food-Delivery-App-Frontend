import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const orderApiSlice = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BACKEND_ORDER_URL }),
  endpoints: (builder) => ({
    placeOrder: builder.mutation({
      query: (orderData) => ({
        url: "/add-order",
        method: "POST",
        body: orderData,
      }),
    }),
    getOrders: builder.query({
      query: () => `/get-orders`,
    }),
  }),
});

export const { usePlaceOrderMutation, useGetOrdersQuery } = orderApiSlice;