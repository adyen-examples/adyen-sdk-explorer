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
      const checkout = [...new Set([...state.checkout, ...action.payload.checkoutConfig])];
      const local = [...new Set([...state.local, ...action.payload.localConfig])];
      const sessions = [...new Set([...state.sessions, ...action.payload.sessionsConfig])];
      console.log(checkout, local, sessions);
      return { ...state, checkout, local, sessions };
    },
    clearDescriptorInfo: state => {
      return initialState;
    }
  }
});

export const { actions, reducer } = descriptorsSlice;
