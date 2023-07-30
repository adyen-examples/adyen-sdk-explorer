import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { defaultDropinStyle, defaultComponentStyle } from '../../components/EditorBar/Tabs/StyleTab/defaultStyles';

export interface OnDeckPropType {
  [key: string]: any;
}

export type StepsType = 'checkout' | 'local' | 'sessions' | 'review';

export interface OnDeckState {
  checkout: OnDeckPropType | {};
  local: OnDeckPropType | {};
  sessions: OnDeckPropType | {};
  defaultSessionProps: OnDeckPropType | {};
  sessionsResponse: OnDeckPropType | {};
  products: { [key: string]: { txVariant: string } };
  txVariant: string;
  isRedirect: boolean;
  activeStep: number;
  style: OnDeckPropType | {};
  adyenState: OnDeckPropType | {};
  txvariant?: string;
  theme?: string;
  steps: StepsType[];
  [key: string]: any;
}

const initialState: OnDeckState = {
  checkout: {},
  local: {},
  sessions: {},
  defaultSessionProps: {},
  sessionsResponse: {},
  products: {},
  txVariant: '',
  steps: ['sessions', 'checkout', 'local', 'review'],
  activeStep: 0,
  isRedirect: false,
  style: {},
  adyenState: {},
  theme: localStorage.getItem('style') || 'dark'
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
    updateDefaultSessionProps: (state, action: PayloadAction<OnDeckPropType>) => {
      console.log('updateDefaultSessionProps', action.payload);
      state.defaultSessionProps = action.payload;
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
      state.style = action.payload;
    },
    updateAdyenStateInfo: (state, action: PayloadAction<any>) => {
      state.adyenState = action.payload;
    },
    updateProductsInfo: (state, action: PayloadAction<any>) => {
      state.products = action.payload;
    },
    updateTheme: (state, action: PayloadAction<any>) => {
      localStorage.setItem('style', action.payload);
      state.theme = action.payload;
    },
    resetOnDeckInfo: state => {
      const { defaultSessionProps, products, txVariant, theme } = state;
      const style = txVariant === 'dropin' ? defaultDropinStyle : defaultComponentStyle;
      // console.log('resetOnDeckInfo', state.defaultSessionProps);
      // state.sessions = { sessions: defaultSessionProps };
      return { ...initialState, defaultSessionProps, theme, style, products, txVariant };
    },
    clearOnDeckInfo: state => {
      let { products } = state;
      return { ...initialState, products };
    }
  }
});

export const { actions, reducer } = onDeckSlice;
