import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@app/store';

interface ThemeState {
  theme: 'light' | 'dark';
  loading: boolean;
  isError: boolean;
  errorMessage: string | null;
}

const initialState: ThemeState = {
  theme: 'light',
  loading: false,
  errorMessage: null,
  isError: false,
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
      action: PayloadAction<{ isError: boolean; errorMessage: string | null }>,
    ) => {
      state.isError = action.payload.isError;
      state.errorMessage = action.payload.errorMessage;
    },
  },
});

export const { toggleTheme, setTheme, setLoading, setError } =
  themeSlice.actions;

export const selectTheme = (state: RootState): 'light' | 'dark' =>
  state.theme.theme;
export const getIsLoading = (state: RootState): boolean => state.theme.loading;

export default themeSlice.reducer;
