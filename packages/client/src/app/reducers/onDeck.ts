import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { OnDeckState } from '../types';

const initialState: OnDeckState = {
  profile: {},
  global: {},
  local: {},
  sessions: {}
};

export const onDeckSlice = createSlice({
  name: 'onDeck',
  initialState,
  reducers: {
    updateProfileInfo: (state, action: PayloadAction<OnDeckState>) => {
      const profile = { ...state.profile, ...action.payload };
      return { ...state, profile };
    },
    updateGlobalInfo: (state, action: PayloadAction<OnDeckState>) => {
      const global = { ...state.global, ...action.payload };
      return { ...state, global };
    },
    updateLocalInfo: (state, action: PayloadAction<OnDeckState>) => {
      const local = { ...state.local, ...action.payload };
      return { ...state, local };
    },
    updateSessionsInfo: (state, action: PayloadAction<OnDeckState>) => {
      const sessions = { ...state.sessions, ...action.payload };
      return { ...state, sessions };
    },
    clearOnDeckInfo: state => {
      return initialState;
    }
  }
});

export const { actions, reducer } = onDeckSlice;
