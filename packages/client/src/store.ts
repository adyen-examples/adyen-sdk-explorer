import { configureStore } from '@reduxjs/toolkit';
import { reducers } from './app';

export const store = configureStore({
  reducer: {
    user: reducers.userReducer,
    configuration: reducers.configurationReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
