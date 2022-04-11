import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { OnDeckState } from '../types';

const initialState: OnDeckState = {
  profile: {},
  optional: {
    global: {},
    local: {}
  },
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
    updateOptionalInfo: (state, action: PayloadAction<OnDeckState>) => {
      const { global, local } = action.payload.optional;
      Object.assign({}, state.optional, {
        global,
        local
      });
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
