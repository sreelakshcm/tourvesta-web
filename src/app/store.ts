import { configureStore } from '@reduxjs/toolkit';
import { apiReducer } from './api';
import toursReducer from '@features/tours/tourSlice';
import themeReducer from '@features/UI/themeToggleSlice';
import navbarReducer from '@features/UI/navbarSlice';
import authReducer from '@features/auth/authSlice';
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
    [apiReducer.reducerPath]: apiReducer.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(apiReducer.middleware),
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
