import { RootState } from '@app/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface NavbarState {
  searchQuery: string;
  isSearch: 'tours' | 'users' | null;
}

const initialState: NavbarState = {
  searchQuery: '',
  isSearch: null,
};

const navbarSlice = createSlice({
  name: 'navbar',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setIsSearch: (state, action: PayloadAction<'tours' | 'users' | null>) => {
      state.isSearch = action.payload;
    },
  },
});

export const { setSearchQuery, setIsSearch } = navbarSlice.actions;
export default navbarSlice.reducer;

export const getSearchQuery = (state: RootState): string =>
  state.navbar.searchQuery;

export const isSearch = (state: RootState): 'tours' | 'users' | null =>
  state.navbar.isSearch;
