import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getItemById } from '../../../../../Backend/controllers/item.controller';

export const menuItemApiSlice = createApi({
  reducerPath: 'menuItemApi',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BACKEND_ORDER_URL }),
  endpoints: (builder) => ({
    getItemsByCategory: builder.query({
      query: (category) => ({
        url: 'getitemsbycategory',
        method: 'POST',
        body: { category },
      }),
    }),
    getItem: builder.query({
      query: (itemId) => ({
        url: 'get-item',
        method: 'POST',
        body: { itemId },
      }),
    }),
  }),
});

export const { useGetItemsByCategoryQuery, useGetItemQuery } = menuItemApiSlice;