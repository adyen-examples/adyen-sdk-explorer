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
      console.log('UPDATING', action);
      const global = [...new Set([...state.global, ...action.payload.globalConfig])];
      const local = [...new Set([...state.local, ...action.payload.localConfig])];
      const sessions = [...new Set([...state.sessions, ...action.payload.sessionsConfig])];
      state = { ...initialState, global, local, sessions };
      console.log('STATE', state);
    },
    clearDescriptorInfo: state => {
      state = initialState;
    }
  }
});

export const { actions, reducer } = descriptorSlice;
