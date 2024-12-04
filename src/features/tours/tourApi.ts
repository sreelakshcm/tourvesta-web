import { apiReducer } from '@app/api';
import { TOURS } from '@constants/services';
import { ApiResponse } from 'types/api';
import { Tour } from 'types/tourTypes';

export const toursApi = apiReducer.injectEndpoints({
  endpoints: (builder) => ({
    getAllTours: builder.query<Tour[], string>({
      query: () => TOURS,
      transformResponse: (response: ApiResponse<Tour[]>): Tour[] => {
        return response.data;
      },
      providesTags: ['Tours'],
    }),
    getTourById: builder.query<Tour, string>({
      query: (id) => `${TOURS}/${id}`,
      transformResponse: (response:  ApiResponse<Tour> ): Tour => {
        return response.data;
      },
      providesTags: ['Tours'],
    }),
  }),
});

export const { useGetAllToursQuery, useGetTourByIdQuery } = toursApi;
