import type { RootState } from '../store';

export const selectUserState = (state: RootState) => state.user;

export const selectOnDeckState = (state: RootState) => state.onDeck;

export const selectDescriptorState = (state: RootState) => state.descriptor;

export const selectConfigurationState = (state: RootState) => state.configuration;
