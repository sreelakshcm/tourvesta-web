import { apiSlice } from '@app/api';
import { setToken } from '@app/slices/authSlice';
import { setSuccess } from '@app/slices/themeToggleSlice';
import { USERS } from '@constants/services';
import { ApiSuccessResponse } from 'types/api';
import { User } from 'types/tourTypes';

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateMe: builder.mutation<
      User,
      { email: string; name: string; photo?: string }
    >({
      query: (payload) => ({
        url: `${USERS}/updateMe`,
        method: 'PATCH',
        body: payload,
      }),
      transformResponse: (response: ApiSuccessResponse<User>): User =>
        response.data || ({} as User),
      invalidatesTags: ['Users'],
    }),
    updatePassword: builder.mutation<
      { status: string; token: string },
      {
        currentPassword: string;
        newPassword: string;
        newPasswordConfirm: string;
      }
    >({
      query: (payload) => ({
        url: `${USERS}/updatePassword`,
        method: 'PATCH',
        body: payload,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        const { data: response } = await queryFulfilled;
        if (response.token) {
          dispatch(setToken(response.token));
        }
        dispatch(setSuccess({ isSuccess: true, successMessage: 'Password updated Successfully!' }));
      },
      transformResponse: (
        response: { status: string; token: string },
      ): { status: string; token: string } => {
        return response;
      },
      invalidatesTags: ['Users'],
    }),
  }),
});

export const { useUpdateMeMutation, useUpdatePasswordMutation } = userApi;
