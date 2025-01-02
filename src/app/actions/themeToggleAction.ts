import { RootState } from '@app/store';
import { createSelector } from '@reduxjs/toolkit';

export const selectTheme = (state: RootState): 'light' | 'dark' =>
  state.theme.theme;

export const getIsLoading = (state: RootState): boolean => state.theme.loading;

export const getErrors = createSelector(
  (state: RootState) => state.theme.isError,
  (state: RootState) => state.theme.errorMessage,
  (state: RootState) => state.theme.errorStatus,
  (isError, errorMessage, errorStatus) => ({
    isError,
    errorMessage,
    errorStatus,
  }),
);

export const getAlertErrors = createSelector(
  (state: RootState) => state.theme.alertType,
  (state: RootState) => state.theme.alertMessage,
  (alertType, errorMessage) => ({
    isError: alertType === 'error',
    errorMessage,
  }),
);

export const getSuccess = createSelector(
  (state: RootState) => state.theme.isSuccess,
  (state: RootState) => state.theme.successMessage,
  (isSuccess, successMessage) => ({
    isSuccess,
    successMessage,
  }),
);
