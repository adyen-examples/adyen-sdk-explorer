import { configureStore } from '@reduxjs/toolkit';
import { onDeckReducer, descriptorsReducer, configurationReducer, sdkExplorerReducer } from './app';

export const store = configureStore({
  reducer: {
    onDeck: onDeckReducer,
    descriptors: descriptorsReducer,
    configuration: configurationReducer,
    sdkExplorer: sdkExplorerReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
