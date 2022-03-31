import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { DescriptorList } from '../types';

const initialState: DescriptorList = {
  global: [],
  local: [],
  sessions: []
};

export const descriptorSlice = createSlice({
  name: 'descriptor',
  initialState,
  reducers: {
    updateDescriptors: (state, action: PayloadAction<DescriptorList>) => {
      const global = [...new Set([...state.global, ...action.payload.globalConfig])];
      const local = [...new Set([...state.local, ...action.payload.localConfig])];
      const sessions = [...new Set([...state.sessions, ...action.payload.sessionsConfig])];
      return { ...state, global, local, sessions };
    },
    clearDescriptorInfo: state => {
      return initialState;
    }
  }
});

export const { actions, reducer } = descriptorSlice;
