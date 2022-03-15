import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { ConfigurationState } from '../types';

const initialState: ConfigurationState = {
  id: '',
  owner: '',
  name: '',
  version: 0,
  configuration: ''
};

export const configurationSlice = createSlice({
  name: 'configuration',
  initialState,
  reducers: {
    updateConfigurationInfo: (state, action: PayloadAction<ConfigurationState>) => {
      state = action.payload;
    },
    clearConfigurationInfo: state => {
      state = initialState;
    }
  }
});

export const { updateConfigurationInfo, clearConfigurationInfo } = configurationSlice.actions;

export default configurationSlice.reducer;
