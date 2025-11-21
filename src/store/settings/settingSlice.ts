import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { SettingState, ValidationError } from '../../types/store';

type SettingType = SettingState['settings'][number];

const initialState: SettingState = {
  settings: [],
  activeSetting: null,
  isLoadingSetting: true,
  message: undefined,
  settingErrors: [],
};

export const settingSlice = createSlice({
  name: 'setting',
  initialState,
  reducers: {
    onAddNewSetting: (state, { payload }: PayloadAction<{ schedule: SettingType; message: string }>) => {
      state.settings.push(payload.schedule);
      state.message = payload.message;
    },
    onUpdateSetting: (state, { payload }: PayloadAction<{ schedule: SettingType; message: string }>) => {
      state.settings = state.settings.map((setting) => {
        if (setting.id === payload.schedule.id) return payload.schedule;
        return setting;
      });
      state.message = payload.message;
    },
    onFindSetting: (state, { payload }: PayloadAction<{ id: string }>) => {
      state.activeSetting = state.settings.find((setting) => setting.id === payload.id) ?? null;
    },
    onDeleteSetting: (state, { payload }: PayloadAction<string>) => {
      state.settings = state.settings.filter((setting) => {
        if (state.activeSetting && setting.id !== state.activeSetting.id) return setting;
        return false;
      });
      state.message = payload;
    },
    onSetSettingStatus: (state, { payload }: PayloadAction<{ setting: SettingType; message: string }>) => {
      state.settings = state.settings.map((setting) => {
        if (setting.id === payload.setting.id) return payload.setting;
        setting.isActive = false;
        return setting;
      });
      state.message = payload.message;
    },
    onSetActiveSetting: (state, { payload }: PayloadAction<SettingType | null>) => {
      state.activeSetting = payload;
    },
    onLoadSettings: (state, { payload }: PayloadAction<SettingType[]>) => {
      payload.forEach((setting) => {
        const exists = state.settings.some((settingInStore) => settingInStore.id === setting.id);
        if (!exists) state.settings.push(setting);
      });
      state.isLoadingSetting = false;
    },
    onSetErrors: (state, { payload }: PayloadAction<ValidationError[]>) => {
      state.settingErrors = payload;
    },
    onClearMessage: (state) => {
      state.message = undefined;
      state.settingErrors = [];
    },
    onClearErrors: (state) => {
      state.settingErrors = [];
    },
    onLogoutSettings: (state) => {
      state.settings = [];
      state.activeSetting = null;
      state.isLoadingSetting = true;
      state.message = undefined;
      state.settingErrors = [];
    },
  },
});

export const {
  onAddNewSetting,
  onClearErrors,
  onClearMessage,
  onDeleteSetting,
  onFindSetting,
  onLoadSettings,
  onLogoutSettings,
  onSetActiveSetting,
  onSetErrors,
  onSetSettingStatus,
  onUpdateSetting,
} = settingSlice.actions;
