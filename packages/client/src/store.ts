import { configureStore } from '@reduxjs/toolkit';
import { userReducer, onDeckReducer, descriptorReducer, configurationReducer } from './app';

export const store = configureStore({
  reducer: {
    user: userReducer,
    onDeck: onDeckReducer,
    descriptor: descriptorReducer,
    configuration: configurationReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
