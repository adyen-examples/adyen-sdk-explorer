import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface sdkExplorerState {
  txvariant: string;
  steps: [];
  activeStep: number;
  [key: string]: any;
}

const initialState: sdkExplorerState = {
  txvariant: '',
  steps: [],
  activeStep: 0
};

export const sdkExplorerSlice = createSlice({
  name: 'sdkExplorer',
  initialState,
  reducers: {
    updateExplorer: (state, action: PayloadAction<any>) => {
      return { ...state, ...action.payload };
    },
    updateTxVariantInfo: (state, action: PayloadAction<any>) => {
      return { ...state, txvariant: action.payload };
    },
    updateStepsInfo: (state, action: PayloadAction<any>) => {
      return { ...state, steps: action.payload };
    },
    updateActiveStepInfo: (state, action: PayloadAction<any>) => {
      return { ...state, activeStep: action.payload };
    },
    clearExplorer: state => {
      return initialState;
    }
  }
});

export const { actions, reducer } = sdkExplorerSlice;
