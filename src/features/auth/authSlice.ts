import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';
import { User } from 'types/tourTypes';

interface AuthState {
  token: string | null;
  user: Omit<User, 'role'> | null;
}

const initialState: AuthState = {
  token: null,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (
      state,
      action: PayloadAction<{ token: string; }>,
    ) => {
      state.token = action.payload.token;
      state.user = jwtDecode(action.payload.token);
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;

export default authSlice.reducer;
