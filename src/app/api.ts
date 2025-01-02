import { AUTH, SERVICE_BASE_URL, tags } from '@constants/services';
import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import { RootState } from './store';
import { logout, setToken } from '@slices/authSlice';
import {
  clearAlertErrorState,
  setAlertError,
  setError,
} from '@slices/themeToggleSlice';
import { ApiErrorResponse } from 'types/api';
import { setNavigateTo } from '@slices/navigationSlice';

const baseQuery = fetchBaseQuery({
  baseUrl: SERVICE_BASE_URL,
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error) {
    const errData = result.error as ApiErrorResponse;

    if ((errData as FetchBaseQueryError).status === 'FETCH_ERROR') {
      api.dispatch(clearAlertErrorState());
      api.dispatch(setNavigateTo('/network-error'));
    } else if (errData.status === 403) {
      api.dispatch(clearAlertErrorState());
      const refreshResult = await baseQuery(
        `${AUTH}/refresh`,
        api,
        extraOptions,
      );
      if (refreshResult?.data) {
        const { token = '' } = refreshResult.data as { token: string };
        api.dispatch(setToken(token));
        result = await baseQuery(args, api, extraOptions);
      } else {
        if (refreshResult?.error?.status === 403) {
          const errorData = refreshResult.error.data as { message: string };
          errorData.message = 'Your login has expired!';
        }
        api.dispatch(logout());
        api.dispatch(
          setError({
            isError: true,
            errorMessage: 'Your token has expired. Please Login again!',
            status: 401,
          }),
        );
        return refreshResult;
      }
    } else {
      errData.status !== 401 &&
        errData.status !== 500 &&
        api.dispatch(
          setAlertError({
            isError: true,
            errorMessage: errData?.data?.message || '',
          }),
        );
      api.dispatch(
        setError({
          isError: true,
          errorMessage: errData?.data?.message || '',
          status: +errData?.data?.error?.statusCode || +errData.status,
        }),
      );
    }
  }

  return result;
};

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: tags,
  endpoints: (_builder) => ({}),
});
