import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type StepsType = 'checkout' | 'local' | 'sessions' | 'review';

export interface OnDeckPropType {
  [key: string]: any;
}

export interface OnDeckState {
  checkout: OnDeckPropType | {};
  local: OnDeckPropType | {};
  sessions: OnDeckPropType | {};
  sessionsResponse: OnDeckPropType | {};
  products: { [key: string]: { txVariant: string } };
  txVariant: string;
  isRedirect: boolean;
  activeStep: number;
  txvariant?: string;
  steps: StepsType[];
  [key: string]: any;
}

const initialState: OnDeckState = {
  checkout: {},
  local: {},
  sessions: {},
  sessionsResponse: {},
  products: {},
  txVariant: '',
  steps: ['checkout', 'local', 'sessions', 'review'],
  activeStep: 0,
  isRedirect: false
};

export const onDeckSlice = createSlice({
  name: 'onDeck',
  initialState,
  reducers: {
    updateCheckoutInfo: (state, action: PayloadAction<OnDeckPropType>) => {
      state.checkout = action.payload;
    },
    updateLocalInfo: (state, action: PayloadAction<OnDeckPropType>) => {
      state.local = action.payload;
    },
    updateSessionsInfo: (state, action: PayloadAction<OnDeckPropType>) => {
      state.sessions = action.payload;
    },
    updateSessionsResponseInfo: (state, action: PayloadAction<any>) => {
      state.sessionsResponse = action.payload;
    },
    updateProductsInfo: (state, action: PayloadAction<any>) => {
      state.products = action.payload;
    },
    updateTxVariant: (state, action: PayloadAction<string>) => {
      state.profile = action.payload;
    },
    updateSteps: (state, action: PayloadAction<any>) => {
      state.steps = action.payload;
    },
    updateActiveStep: (state, action: PayloadAction<any>) => {
      state.activeStep = action.payload;
    },
    updateRedirectInfo: (state, action: PayloadAction<any>) => {
      state.isRedirect = action.payload;
    },
    clearOnDeckInfo: state => {
      console.log('called');
      state = initialState;
      console.log(state);
    }
  }
});

export const { actions, reducer } = onDeckSlice;
