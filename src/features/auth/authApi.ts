import { apiSlice } from '@app/api';
import { AUTH, USERS } from '@constants/services';
import {
  ApiSuccessResponse,
  AuthResponseType,
  LoginPayload,
  SignUpPayload,
} from 'types/api';
import { logout, setToken } from './authSlice';
import { setSuccess } from '@features/UI/themeToggleSlice';

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signUp: builder.mutation<{ token: string }, SignUpPayload>({
      query: (payload) => ({
        url: `${USERS}/signup`,
        body: payload,
        method: 'POST',
      }),
      transformResponse: (response: AuthResponseType): { token: string } => {
        return { token: response.token };
      },
      invalidatesTags: ['Auth'],
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
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(logout());
          dispatch(apiSlice.util.resetApiState());
        } catch (err) {
          // eslint-disable-next-line no-console
          console.error('Error sending logout request:', err);
        }
      },
    }),
    refresh: builder.mutation({
      query: () => ({
        url: `${AUTH}/refresh`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useSignUpMutation,
  useRefreshMutation,
  useSendLogoutMutation,
  useLoginMutation,
} = authApi;
