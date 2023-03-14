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
      return { ...state, ...action.payload };
    },
    clearConfigurationInfo: state => {
      return initialState;
    }
  }
});

export const { actions, reducer } = configurationSlice;
