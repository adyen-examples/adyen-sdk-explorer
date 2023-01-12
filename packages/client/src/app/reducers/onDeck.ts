import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { OnDeckState } from '../types';

const initialState: OnDeckState = {
  profile: {
    product: 'dropin'
  },
  checkout: {},
  local: {},
  sessions: {},
  sessionsResponse: {},
  isRedirect: false,
  activeStep: 0
};

export const onDeckSlice = createSlice({
  name: 'onDeck',
  initialState,
  reducers: {
    updateProfileInfo: (state, action: PayloadAction<OnDeckState>) => {
      const profile = { ...state.profile, ...action.payload };
      return { ...state, profile };
    },
    updateCheckoutInfo: (state, action: PayloadAction<OnDeckState>) => {
      return { ...state, checkout: action.payload };
    },
    updateLocalInfo: (state, action: PayloadAction<OnDeckState>) => {
      return { ...state, local: action.payload };
    },
    updateSessionsInfo: (state, action: PayloadAction<OnDeckState>) => {
      return { ...state, sessions: action.payload };
    },
    updateRedirectInfo: (state, action: PayloadAction<any>) => {
      return { ...state, isRedirect: action.payload };
    },
    updateStep: (state, action: PayloadAction<any>) => {
      return { ...state, activeStep: action.payload };
    },
    updateSessionsResponseInfo: (state, action: PayloadAction<any>) => {
      return { ...state, sessionsResponse: action.payload };
    },
    clearOnDeckInfo: state => {
      return initialState;
    }
  }
});

export const { actions, reducer } = onDeckSlice;
