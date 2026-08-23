import { apiSlice } from '@app/api';
import { REVIEWS } from '@constants/services';
import { ApiSuccessResponse } from 'types/api';
import { Review } from 'types/tourTypes';

export type CreateReviewPayload = {
  review: string;
  rating: number;
  tour: string;
};

export type UpdateReviewPayload = Pick<CreateReviewPayload, 'review' | 'rating'> & {
  id: string;
};

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
    getMyReviews: builder.query<Review[], void>({
      query: () => `${REVIEWS}/me`,
      transformResponse: (response: ApiSuccessResponse<Review[]>): Review[] =>
        response.data || [],
      providesTags: ['Reviews'],
    }),
    createReview: builder.mutation<Review, CreateReviewPayload>({
      query: (payload) => ({
        url: REVIEWS,
        method: 'POST',
        body: payload,
      }),
      transformResponse: (response: ApiSuccessResponse<{ data: Review }>): Review =>
        response.data?.data as Review,
      invalidatesTags: ['Reviews', 'Tours'],
    }),
    updateReview: builder.mutation<Review, UpdateReviewPayload>({
      query: ({ id, ...payload }) => ({
        url: `${REVIEWS}/${id}`,
        method: 'PATCH',
        body: payload,
      }),
      transformResponse: (response: ApiSuccessResponse<{ data: Review }>): Review =>
        response.data?.data as Review,
      invalidatesTags: ['Reviews', 'Tours'],
    }),
    deleteReview: builder.mutation<void, string>({
      query: (id) => ({
        url: `${REVIEWS}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Reviews', 'Tours'],
    }),
  }),
});

export const {
  useGetAllReviewsQuery,
  useGetReviewByUserIdQuery,
  useGetMyReviewsQuery,
  useCreateReviewMutation,
  useUpdateReviewMutation,
  useDeleteReviewMutation,
} = reviewsApi;
