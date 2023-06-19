import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface OnDeckPropType {
  [key: string]: any;
}

export type StepsType = 'checkout' | 'local' | 'sessions' | 'review';

export interface OnDeckState {
  checkout: OnDeckPropType | {};
  local: OnDeckPropType | {};
  sessions: OnDeckPropType | {};
  sessionsResponse: OnDeckPropType | {};
  products: { [key: string]: { txVariant: string } };
  txVariant: string;
  isRedirect: boolean;
  activeStep: number;
  style: OnDeckPropType | {};
  adyenState: OnDeckPropType | {};
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
  steps: ['sessions', 'checkout', 'local', 'review'],
  activeStep: 0,
  isRedirect: false,
  style: {},
  adyenState: {}
};

const onDeckSlice = createSlice({
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
    updateRedirectInfo: (state, action: PayloadAction<any>) => {
      state.isRedirect = action.payload;
    },
    updateTxVariant: (state, action: PayloadAction<string>) => {
      state.txVariant = action.payload;
    },
    updateSteps: (state, action: PayloadAction<any>) => {
      state.steps = action.payload;
    },
    updateActiveStep: (state, action: PayloadAction<any>) => {
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
    updateProductsInfo: (state, action: PayloadAction<any>) => {
      state.products = action.payload;
    },
    resetOnDeckInfo: state => {
      let { style, txVariant } = state;
      return { ...initialState, style, txVariant };
    },
    clearOnDeckInfo: () => initialState
  }
});

export const { actions, reducer } = onDeckSlice;
