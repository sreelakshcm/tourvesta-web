import { apiSlice } from '@app/api';
import { AUTH, USERS } from '@constants/services';
import {
  ApiSuccessResponse,
  AuthResponseType,
  LoginPayload,
  SignUpPayload,
  UpdatePasswordPayload,
} from 'types/api';
import { setToken } from './authSlice';
import { setSuccess } from '@features/UI/themeToggleSlice';

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signUp: builder.mutation<{ token: string }, SignUpPayload | FormData>({
      query: (payload) => ({
        url: `${USERS}/signup`,
        body: payload,
        method: 'POST',
      }),
      transformResponse: (response: AuthResponseType): { token: string } => {
        return { token: response.token };
      },
      invalidatesTags: ['Auth'],
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const {
            data: { token },
          } = await queryFulfilled;
          dispatch(setToken(token));
          dispatch(
            setSuccess({
              isSuccess: true,
              successMessage: 'User registered successfully!',
            }),
          );
        } catch (err) {
          // eslint-disable-next-line no-console
          console.error('Error while signing up:', err);
        }
      },
    }),
    login: builder.mutation<{ token: string }, LoginPayload>({
      query: (credentials: LoginPayload) => ({
        url: `${USERS}/login`,
        method: 'POST',
        body: credentials,
      }),
      transformResponse: (
        response: ApiSuccessResponse<{ token: string }>,
      ): { token: string } => {
        return { token: response.token as string };
      },
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const {
            data: { token },
          } = await queryFulfilled;
          dispatch(setToken(token));
          dispatch(
            setSuccess({
              isSuccess: true,
              successMessage: 'Login successfull!',
            }),
          );
        } catch (err) {
          // eslint-disable-next-line no-console
          console.error('Error while login:', err);
        }
      },
    }),
    sendLogout: builder.mutation({
      query: () => ({
        url: `${AUTH}/logout`,
        method: 'POST',
      }),
    }),
    refresh: builder.mutation({
      query: () => ({
        url: `${AUTH}/refresh`,
        method: 'GET',
      }),
    }),
    updatePassword: builder.mutation<{ token: string }, UpdatePasswordPayload>({
      query: (payload) => ({
        url: `${USERS}/updatePassword`,
        method: 'PATCH',
        body: payload,
      }),
      transformResponse: (response: AuthResponseType): { token: string } => ({
        token: response.token,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const {
            data: { token },
          } = await queryFulfilled;
          dispatch(setToken(token));
        } catch (err) {
          // eslint-disable-next-line no-console
          console.error('Error while updating password:', err);
        }
      },
    }),
  }),
});

export const {
  useSignUpMutation,
  useRefreshMutation,
  useSendLogoutMutation,
  useLoginMutation,
  useUpdatePasswordMutation,
} = authApi;
