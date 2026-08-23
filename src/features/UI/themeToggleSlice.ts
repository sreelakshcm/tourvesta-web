import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@app/store';

interface ThemeState {
  theme: 'light' | 'dark';
  loading: boolean;
  isError: boolean;
  errorStatus: number;
  alertType: 'success' | 'error' | 'warning' | 'info' | null;
  alertMessage: string | null;
  errorMessage: string | null;
  isSuccess: boolean;
  successMessage: string | null;
}

const initialState: ThemeState = {
  theme: 'light',
  loading: false,
  alertType: 'success',
  errorStatus: 200,
  errorMessage: null,
  isError: false,
  successMessage: null,
  isSuccess: false,
  alertMessage: '',
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (
      state,
      action: PayloadAction<{
        isError: boolean;
        errorMessage: string | null;
        status: number;
      }>,
    ) => {
      state.isSuccess = false;
      state.successMessage = null;
      state.isError = action.payload.isError;
      state.errorMessage = action.payload.errorMessage;
      state.errorStatus = action.payload.status;
      state.alertMessage = null;
      state.alertType = null;
    },
    setAlertError: (
      state,
      action: PayloadAction<{
        isError: boolean;
        errorMessage: string | null;
      }>,
    ) => {
      state.isSuccess = false;
      state.successMessage = null;
      state.alertMessage = action.payload.errorMessage;
      state.alertType = state.isError ? 'error' : 'success';
    },
    setSuccess: (
      state,
      action: PayloadAction<{
        isSuccess: boolean;
        successMessage: string | null;
      }>,
    ) => {
      state.isSuccess = action.payload.isSuccess;
      state.successMessage = action.payload.successMessage;
      state.isError = false;
      state.errorMessage = null;
      state.errorStatus = 200;
    },
    clearErrorState: (state) => {
      state.isError = false;
      state.errorMessage = null;
      state.errorStatus = 200;
    },
    clearAlertErrorState: (state) => {
      state.alertType = null;
      state.alertMessage = null;
    },
    clearSuccessState: (state) => {
      state.isSuccess = false;
      state.successMessage = null;
    },
  },
});

export const {
  toggleTheme,
  setTheme,
  setLoading,
  setError,
  clearErrorState,
  setSuccess,
  clearSuccessState,
  clearAlertErrorState,
  setAlertError,
} = themeSlice.actions;

export const selectTheme = (state: RootState): 'light' | 'dark' =>
  state.theme.theme;

export const getIsLoading = (state: RootState): boolean => state.theme.loading;

export const getErrors = (
  state: RootState,
): {
  isError: boolean;
  errorMessage: string | null;
  errorStatus: number;
} => ({
  isError: state.theme.isError,
  errorMessage: state.theme.errorMessage,
  errorStatus: state.theme.errorStatus,
});

export const getAlertErrors = (
  state: RootState,
): {
  isError: boolean;
  errorMessage: string | null;
} => ({
  isError: state.theme.alertType === 'error',
  errorMessage: state.theme.alertMessage,
});

export const getSuccess = (
  state: RootState,
): {
  isSuccess: boolean;
  successMessage: string | null;
} => ({
  isSuccess: state.theme.isSuccess,
  successMessage: state.theme.successMessage,
});

export default themeSlice.reducer;
