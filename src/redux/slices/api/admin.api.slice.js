import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const adminApiSlice = createApi({
  reducerPath: "adminApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BACKEND_ADMIN_URL }),
  endpoints: (builder) => ({
    addTable: builder.mutation({
      query: (tableData) => ({
        url: "add-table",
        method: "POST",
        body: tableData,
      }),
    }),
    getTables: builder.query({
      query: () => "get-tables",
      transformResponse: (response) => response || [],
    }),
    removeTable: builder.mutation({
      query: (tableId) => ({
        url: "remove-table",
        method: "DELETE",
        body: { tableId },
      }),
    }),
    getAnalytics: builder.query({
      query: () => "get-analytics",
      transformResponse: (response) => response || {},
    }),
    getChefs: builder.query({
      query: () => "get-chefs",
      transformResponse: (response) => response || [],
    }),
    getTodayOrderSummary: builder.query({
      query: () => "get-today-order-summary",
      transformResponse: (response) => response || [],
    }),
    getMonthlyOrderSummary: builder.query({
      query: () => "get-monthly-order-summary",
      transformResponse: (response) => response || [],
    }),
    getYearlyOrderSummary: builder.query({
      query: () => "get-yearly-order-summary",
      transformResponse: (response) => response || [],
    }),
    getWeeklyRevenueSummary: builder.query({
      query: () => "get-weekly-revenue-summary",
      transformResponse: (response) => response || [],
    }),
    getMonthlyRevenueSummary: builder.query({
      query: () => "get-monthly-revenue-summary",
      transformResponse: (response) => response || [],
    }),
    getYearlyRevenueSummary: builder.query({
      query: () => "get-yearly-revenue-summary",
      transformResponse: (response) => response || [],
    })
  }),
});

export const {
  useAddTableMutation,
  useGetTablesQuery,
  useRemoveTableMutation,
  useGetAnalyticsQuery,
  useGetChefsQuery,
  useGetTodayOrderSummaryQuery,
  useGetMonthlyOrderSummaryQuery,
  useGetYearlyOrderSummaryQuery,
  useGetWeeklyRevenueSummaryQuery,
  useGetMonthlyRevenueSummaryQuery,
  useGetYearlyRevenueSummaryQuery
} = adminApiSlice;
