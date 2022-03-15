import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { UserState } from '../types';

const initialState: UserState = {
  id: '',
  username: '',
  configurations: []
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUserInfo: (state, action: PayloadAction<UserState>) => {
      state = action.payload;
    },
    clearUserInfo: state => {
      state = initialState;
    }
  }
});

export const { updateUserInfo, clearUserInfo } = userSlice.actions;

export default userSlice.reducer;
