import { SERVICE_BASE_URL } from '@constants/services';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from './store';

export const apiReducer = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: SERVICE_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      // If we have a token, set it in the headers
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['User', 'Tours', 'Reviews'],
  endpoints: (_builder) => ({}),
});
