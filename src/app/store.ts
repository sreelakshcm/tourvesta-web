import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './api';
import toursReducer from '@slices/tourSlice';
import themeReducer from '@slices/themeToggleSlice';
import navbarReducer from '@slices/navbarSlice';
import navigationReducer from '@slices/navigationSlice';
import authReducer from '@slices/authSlice';
import { setupListeners } from '@reduxjs/toolkit/query';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'auth',
  storage,
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: {
    tours: toursReducer,
    theme: themeReducer,
    navbar:navbarReducer,
    auth: persistedAuthReducer,
    navigation: navigationReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(apiSlice.middleware),
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
