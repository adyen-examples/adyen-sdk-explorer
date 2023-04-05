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
  [key: string]: any;
}

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
    clearOnDeckInfo: state => {
      state = initialState;
    }
  }
});

export const { actions, reducer } = onDeckSlice;
