import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { OnDeckState } from '../types';

const initialState: OnDeckState = {
  global: {},
  local: {},
  sessions: {}
};

export const onDeckSlice = createSlice({
  name: 'onDeck',
  initialState,
  reducers: {
    updateGlobalInfo: (state, action: PayloadAction<OnDeckState>) => {
      const global = { ...state.global, ...action.payload };
      state = { ...initialState, global };
    },
    updateLocalInfo: (state, action: PayloadAction<OnDeckState>) => {
      const local = { ...state.local, ...action.payload };
      state = { ...initialState, local };
    },
    updateSessionsInfo: (state, action: PayloadAction<OnDeckState>) => {
      const sessions = { ...state.sessions, ...action.payload };
      state = { ...initialState, sessions };
    },
    clearOnDeckInfo: state => {
      state = initialState;
    }
  }
});

export const { actions, reducer } = onDeckSlice;
