import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { DescriptorList } from '../types';

const initialState: DescriptorList = {
  checkout: [],
  local: [],
  sessions: []
};

export const descriptorsSlice = createSlice({
  name: 'descriptors',
  initialState,
  reducers: {
    updateDescriptors: (state, action: PayloadAction<DescriptorList>) => {
      const checkout = [...new Set([...action.payload.checkoutConfig])];
      const local = [...new Set([...action.payload.localConfig])];
      const sessions = [...new Set([...action.payload.sessionsConfig])];
      return { ...state, checkout, local, sessions };
    },
    clearDescriptorInfo: state => {
      return initialState;
    }
  }
});

export const { actions, reducer } = descriptorsSlice;
