import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface OnDeckPropType {
  [key: string]: any;
}

export interface OnDeckState {
  profile: OnDeckPropType;
  checkout: OnDeckPropType | {};
  local: OnDeckPropType | {};
  sessions: OnDeckPropType | {};
  sessionsResponse: OnDeckPropType | {};
  isRedirect: boolean;
  activeStep: number;
  style: OnDeckPropType | {};
  adyenState: OnDeckPropType | {};
  [key: string]: any;
}

const initialState: OnDeckState = {
  profile: {},
  checkout: {},
  local: {},
  sessions: {},
  sessionsResponse: {},
  isRedirect: false,
  activeStep: 0,
  style: {},
  adyenState: {}
};

const onDeckSlice = createSlice({
  name: 'onDeck',
  initialState,
  reducers: {
    updateProfileInfo: (state, action: PayloadAction<OnDeckPropType>) => {
      state.profile = action.payload;
    },
    updateCheckoutInfo: (state, action: PayloadAction<OnDeckPropType>) => {
      state.checkout = action.payload;
    },
    updateLocalInfo: (state, action: PayloadAction<OnDeckPropType>) => {
      state.local = action.payload;
    },
    updateSessionsInfo: (state, action: PayloadAction<OnDeckPropType>) => {
      state.sessions = action.payload;
    },
    updateRedirectInfo: (state, action: PayloadAction<any>) => {
      state.isRedirect = action.payload;
    },
    updateStep: (state, action: PayloadAction<any>) => {
      state.activeStep = action.payload;
    },
    updateSessionsResponseInfo: (state, action: PayloadAction<any>) => {
      state.sessionsResponse = action.payload;
    },
    updateStyleInfo: (state, action: PayloadAction<any>) => {
      state.style = { ...state.style, ...action.payload };
    },
    updateAdyenStateInfo: (state, action: PayloadAction<any>) => {
      state.adyenState = action.payload;
    },
    clearOnDeckInfo: () => initialState
  }
});

export const { actions, reducer } = onDeckSlice;
