import { apiSlice } from '@app/api';
import { REVIEWS } from '@constants/services';
import { ApiSuccessResponse } from 'types/api';
import { Review } from 'types/tourTypes';

export const reviewsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllReviews: builder.query<Review[], string>({
      query: () => REVIEWS,
      transformResponse: (response: ApiSuccessResponse<Review[]>): Review[] => {
        return response.data || [];
      },
      providesTags: ['Reviews'],
    }),
    getReviewByUserId: builder.query<Review[], string>({
      query: (userId) => `${REVIEWS}/user/${userId}`,
      transformResponse: (response: ApiSuccessResponse<Review[]>): Review[] => {
        return response.data || [];
      },
      providesTags: ['Reviews'],
    }),
  }),
});

export const { useGetAllReviewsQuery, useGetReviewByUserIdQuery } = reviewsApi;
