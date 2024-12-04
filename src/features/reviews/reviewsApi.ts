import { apiReducer } from '@app/api';
import { REVIEWS } from '@constants/services';
import { ApiResponse } from 'types/api';
import { Review } from 'types/tourTypes';

export const reviewsApi = apiReducer.injectEndpoints({
  endpoints: (builder) => ({
    getAllReviews: builder.query<Review[], string>({
      query: () => REVIEWS,
      transformResponse: (response: ApiResponse<Review[]>): Review[] => {
        return response.data;
      },
      providesTags: ['Reviews'],
    }),
  }),
});

export const { useGetAllReviewsQuery } = reviewsApi;
