import { configureStore } from '@reduxjs/toolkit';
import { userReducer, configurationReducer } from './app';

export const store = configureStore({
  reducer: {
    user: userReducer,
    configuration: configurationReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
