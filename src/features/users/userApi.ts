import { apiSlice } from '@app/api';
import { USERS } from '@constants/services';
import { User } from 'types/tourTypes';

type UserResponse = {
  status: 'success';
  data: User;
};

type UpdateUserResponse = {
  status: 'success';
  data: { user: User };
};

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMe: builder.query<User, void>({
      query: () => `${USERS}/me`,
      transformResponse: (response: UserResponse) => response.data,
      providesTags: ['User'],
    }),
    updateMe: builder.mutation<User, FormData>({
      query: (formData) => ({
        url: `${USERS}/updateMe`,
        method: 'PATCH',
        body: formData,
      }),
      transformResponse: (response: UpdateUserResponse) => response.data.user,
      invalidatesTags: ['User'],
    }),
  }),
});

export const { useGetMeQuery, useUpdateMeMutation } = userApi;
