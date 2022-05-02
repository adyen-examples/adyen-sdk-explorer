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
      return { ...state, global: action.payload };
    },
    updateLocalInfo: (state, action: PayloadAction<OnDeckState>) => {
      return { ...state, local: action.payload };
    },
    updateSessionsInfo: (state, action: PayloadAction<OnDeckState>) => {
      return { ...state, sessions: action.payload };
    },
    clearOnDeckInfo: state => {
      return initialState;
    }
  }
});

export const { actions, reducer } = onDeckSlice;
