import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '../store/store';
import {
  activateSetting,
  createSetting,
  deleteSetting,
  getAllSettings,
  updateSetting,
} from '../api/fetch';
import {
  onAddNewSetting,
  onFindSetting,
  onLoadSettings,
  onSetActiveSetting,
  onClearErrors,
  onClearMessage,
  onDeleteSetting,
  onSetErrors,
  onSetSettingStatus,
  onUpdateSetting,
} from '../store';

interface SettingData {
  id?: string;
  key?: string;
  value?: string;
  description?: string;
  startDailyAvailability?: string;
  endDailyAvailability?: string;
}

export const useSettingStore = () => {
  const { settings, message, activeSetting, settingErrors, isLoadingSetting } = useSelector(
    (state: any) => state.setting
  );

  const dispatch = useDispatch<AppDispatch>();

  // Find Setting
  const startFindSetting = (id: string) => {
    dispatch(onFindSetting({ id }));
  };

  // Set Active Setting
  const startSetActiveSetting = (setting: any) => {
    dispatch(onSetActiveSetting(setting));
  };

  // Load All Settings
  const startLoadingSettings = async () => {
    const settings = await getAllSettings();
    dispatch(onLoadSettings(settings));
  };

  // Set Setting Status
  const startSetSettingStatus = async (id: string) => {
    const { setting, message } = await activateSetting(id);
    dispatch(onSetSettingStatus({ setting, message }));
    setTimeout(() => {
      dispatch(onClearMessage());
    }, 1000);
  };

  // Saving Setting
  const startSavingSetting = async (setting: SettingData) => {
    if (setting.id) {
      // update
      const { setting: schedule, message } = await updateSetting(setting as any);
      dispatch(onUpdateSetting({ schedule, message }));
      setTimeout(() => {
        dispatch(onClearMessage());
      }, 3000);
      return;
    }
    // Save Setting
    const { setting: schedule, message } = await createSetting(setting as any);
    dispatch(onAddNewSetting({ schedule, message }));
    setTimeout(() => {
      dispatch(onClearMessage());
    }, 3000);
  };

  // Star Deleting Setting
  const startDeleteSetting = async (id: string) => {
    try {
      const message = await deleteSetting(id);
      dispatch(onDeleteSetting(message));
      setTimeout(() => {
        dispatch(onClearMessage());
      }, 3000);
    } catch (error: any) {
      const {
        response: {
          data: { errors },
        },
      } = error;
      dispatch(onSetErrors(errors));
      setTimeout(() => {
        dispatch(onClearErrors());
      }, 4000);
    }
  };

  return {
    // props
    settings,
    activeSetting,
    isLoadingSetting,
    message,
    settingErrors,
    // methods
    startLoadingSettings,
    startSavingSetting,
    startSetActiveSetting,
    startFindSetting,
    startDeleteSetting,
    startSetSettingStatus,
  };
};
