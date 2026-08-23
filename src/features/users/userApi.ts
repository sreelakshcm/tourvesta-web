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

type UsersResponse = {
  status: 'success';
  data: User[];
};

type InvitationResponse = {
  status: 'success';
  data: {
    invitationId: string;
    email: string;
    role: Extract<User['role'], 'guide' | 'lead-guide'>;
    signupUrl?: string;
  };
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
    deleteMyPhoto: builder.mutation<User, void>({
      query: () => ({
        url: `${USERS}/deleteMyPhoto`,
        method: 'DELETE',
      }),
      transformResponse: (response: UpdateUserResponse) => response.data.user,
      invalidatesTags: ['User'],
    }),
    applyForGuide: builder.mutation<User, { message?: string }>({
      query: (body) => ({
        url: `${USERS}/apply-for-guide`,
        method: 'POST',
        body,
      }),
      transformResponse: (response: UpdateUserResponse) => response.data.user,
      invalidatesTags: ['User'],
    }),
    getGuideApplications: builder.query<User[], void>({
      query: () => `${USERS}/guide-applications`,
      transformResponse: (response: UsersResponse) => response.data,
      providesTags: ['User'],
    }),
    updateUserRole: builder.mutation<
      User,
      { id: string; role: User['role']; applicationStatus?: 'approved' | 'rejected' }
    >({
      query: ({ id, ...body }) => ({
        url: `${USERS}/${id}/role`,
        method: 'PATCH',
        body,
      }),
      transformResponse: (response: UpdateUserResponse) => response.data.user,
      invalidatesTags: ['User'],
    }),
    createRoleInvitation: builder.mutation<
      InvitationResponse['data'],
      { email: string; role: Extract<User['role'], 'guide' | 'lead-guide'> }
    >({
      query: (body) => ({
        url: `${USERS}/invitations`,
        method: 'POST',
        body,
      }),
      transformResponse: (response: InvitationResponse) => response.data,
    }),
  }),
});

export const {
  useGetMeQuery,
  useUpdateMeMutation,
  useDeleteMyPhotoMutation,
  useApplyForGuideMutation,
  useGetGuideApplicationsQuery,
  useUpdateUserRoleMutation,
  useCreateRoleInvitationMutation,
} = userApi;
