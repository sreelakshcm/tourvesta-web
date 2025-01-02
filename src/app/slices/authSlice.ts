import { RootState } from '@app/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';
import { CurrentUser } from 'types/tourTypes';

interface AuthState {
  token: string | null;
  user: CurrentUser | null;
}

const initialState: AuthState = {
  token: null,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    getUserDetails: (state) => {
      state.user = state.token ? jwtDecode(state.token) : null;
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
    },
  },
});

export const { setToken, logout, getUserDetails } = authSlice.actions;

export const getToken = (state: RootState): string | null => state.auth.token;
export const getUserData = (state: RootState): CurrentUser | null => state.auth.user;

export default authSlice.reducer;
