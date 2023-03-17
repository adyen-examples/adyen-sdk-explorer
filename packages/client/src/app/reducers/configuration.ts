import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ConfigurationState {
  id: string;
  owner: string;
  name: string;
  version: number;
  configuration: string;
}

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

export const { actions, reducer } = configurationSlice;
