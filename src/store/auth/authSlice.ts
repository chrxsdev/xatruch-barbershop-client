import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { authStatus } from '../../data/data';
import type { AuthState, ValidationError } from '../../types/store';

const initialState: AuthState = {
  currentStatus: authStatus[0],
  user: {},
  message: undefined,
  errors: [],
  isLoadingPicture: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    onChecking: (state) => {
      state.currentStatus = authStatus[0];
      state.user = {};
      state.message = undefined;
      state.errors = [];
    },
    onLogin: (state, { payload }: PayloadAction<{ profile: AuthState['user']; message: string }>) => {
      state.currentStatus = authStatus[1];
      state.user = payload.profile;
      state.message = payload.message;
      state.errors = [];
    },
    onLogout: (state) => {
      state.currentStatus = authStatus[2];
      state.user = {};
      state.message = undefined;
      state.errors = [];
    },
    onSetAuthErrors: (state, { payload }: PayloadAction<{ errors: ValidationError[]; message: string }>) => {
      state.errors = payload.errors;
      state.message = payload.message;
    },
    onClearAuthMessages: (state) => {
      state.message = undefined;
      state.errors = [];
    },
    onUpdateProfileImage: (state, { payload }: PayloadAction<string>) => {
      state.user.profileUrl = payload;
      state.isLoadingPicture = false;
    },
    onUpdateUser: (state, { payload }: PayloadAction<AuthState['user']>) => {
      state.user = payload;
    },
    onSetLoadingProfileImage: (state, { payload }: PayloadAction<boolean>) => {
      state.isLoadingPicture = payload;
    },
  },
});

export const {
  onChecking,
  onClearAuthMessages,
  onLogin,
  onLogout,
  onSetAuthErrors,
  onSetLoadingProfileImage,
  onUpdateProfileImage,
  onUpdateUser,
} = authSlice.actions;
