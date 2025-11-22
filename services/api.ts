import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// This is a placeholder for the actual API integration
// In a real app, baseUrl would point to your backend
export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: 'login',
        method: 'POST',
        body: credentials,
      }),
    }),
    getCollections: builder.query({
      query: () => 'collections',
    }),
  }),
});

export const { useLoginMutation, useGetCollectionsQuery } = api;