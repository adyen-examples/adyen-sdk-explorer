import { configureStore } from '@reduxjs/toolkit';
import { onDeckReducer, descriptorsReducer, configurationReducer } from './app';

export const store = configureStore({
  reducer: {
    onDeck: onDeckReducer,
    descriptors: descriptorsReducer,
    configuration: configurationReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
