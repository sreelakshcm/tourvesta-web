import { apiSlice } from '@app/api';
import { TOURS } from '@constants/services';
import { ApiSuccessResponse } from 'types/api';
import { Tour } from 'types/tourTypes';

export const toursApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllTours: builder.query<Tour[], string>({
      query: () => TOURS,
      transformResponse: (response: ApiSuccessResponse<Tour[]>): Tour[] => {
        return response.data || [];
      },
      providesTags: ['Tours'],
    }),
    getTourById: builder.query<Tour, string>({
      query: (id) => `${TOURS}/${id}`,
      transformResponse: (response: ApiSuccessResponse<Tour>): Tour => {
        return response.data || ({} as Tour);
      },
      providesTags: ['Tours'],
    }),
  }),
});

export const { useGetAllToursQuery, useGetTourByIdQuery } = toursApi;
