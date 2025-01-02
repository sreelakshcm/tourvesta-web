import { createSlice, PayloadAction } from '@reduxjs/toolkit/react';
import { Tour } from 'types/tourTypes';

const initialState: {
  tours: Tour[];
} = {
  tours: [],
};

export const toursSlice = createSlice({
  initialState,
  name: 'tours',
  reducers: {
    setTours: (state, action: PayloadAction<Tour[]>) => {
      state.tours = action.payload;
    },
  },
});

export const { setTours } = toursSlice.actions;

export default toursSlice.reducer;
