import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { User } from './tourTypes';

export type ApiErrorResponse = FetchBaseQueryError & {
  data: {
    status: 'fail' | 'error';
    error: {
      statusCode: number;
      status: 'fail' | 'error';
      isOperational: boolean;
    };
    message: string;
    stack: string;
  };
} & {
  status?: 'FETCH_ERROR' | 'PARSING_ERROR' | 'CUSTOM_ERROR' | number;
};

export type ApiSuccessResponse<T> = {
  status: 'success';
  data?: T;
  [key: string]: string | undefined | number;
};

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

export type SignUpPayload = {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

export type LoginPayload = Pick<SignUpPayload, 'email' | 'password'>;

export type AuthData = Pick<User, 'name' | 'role' | 'email' | 'active'>;

export type AuthResponseType = ApiResponse & {
  token: string;
};

export type ErrorDetails = {
  status: 'fail' | 'error';
  error: {
    statusCode: number;
    status: Pick<ErrorDetails, 'status'>;
    isOperational: boolean;
  };
  message: string;
  stack: string;
};

export type ErrorResponseType = ApiResponse<ErrorDetails>;
