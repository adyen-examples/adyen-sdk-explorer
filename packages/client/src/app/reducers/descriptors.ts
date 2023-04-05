import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Descriptor {
  name: string;
  description: string;
  properties?: [];
  items?: { type: string } | [];
  type?: string;
  format?: string;
  [key: string]: any;
}

export interface DescriptorList {
  checkout: Descriptor[] | [];
  local: Descriptor[] | [];
  sessions: Descriptor[] | [];
  [key: string]: Descriptor[] | [];
}

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
      state.checkout = [...new Set([...action.payload.checkoutConfig])];
      state.local = [...new Set([...action.payload.localConfig])];
      state.sessions = [...new Set([...action.payload.sessionsConfig])];
    },
    clearDescriptorInfo: state => {
      state = initialState;
    }
  }
});

export const { actions, reducer } = descriptorsSlice;
