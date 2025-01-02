import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  navigateTo: '',
};

const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    setNavigateTo: (state, action) => {
      state.navigateTo = action.payload;
    },
    clearNavigateTo: (state) => {
      state.navigateTo = '';
    },
  },
});

export const { setNavigateTo, clearNavigateTo } = navigationSlice.actions;

export default navigationSlice.reducer;
