import type { RootState } from '../store';

export const selectUserState = (state: RootState) => state.user;

export const selectConfigurationState = (state: RootState) => state.configuration;
