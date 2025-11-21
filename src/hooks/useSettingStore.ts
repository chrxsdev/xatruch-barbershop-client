import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '../store/store';
import {
  activateSetting,
  createSetting,
  deleteSetting,
  getAllSettings,
  updateSetting,
} from '../api/fetch';
import { setting } from '../store';

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
    dispatch(setting.onFindSetting({ id }));
  };

  // Set Active Setting
  const startSetActiveSetting = (settingData: any) => {
    dispatch(setting.onSetActiveSetting(settingData));
  };

  // Load All Settings
  const startLoadingSettings = async () => {
    const allSettings = await getAllSettings();
    dispatch(setting.onLoadSettings(allSettings));
  };

  // Set Setting Status
  const startSetSettingStatus = async (id: string) => {
    const { setting: settingData, message } = await activateSetting(id);
    dispatch(setting.onSetSettingStatus({ setting: settingData, message }));
    setTimeout(() => {
      dispatch(setting.onClearMessage());
    }, 1000);
  };

  // Saving Setting
  const startSavingSetting = async (settingData: SettingData) => {
    if (settingData.id) {
      // update
      const { setting: schedule, message } = await updateSetting(settingData as any);
      dispatch(setting.onUpdateSetting({ schedule, message }));
      setTimeout(() => {
        dispatch(setting.onClearMessage());
      }, 3000);
      return;
    }
    // Save Setting
    const { setting: schedule, message } = await createSetting(settingData as any);
    dispatch(setting.onAddNewSetting({ schedule, message }));
    setTimeout(() => {
      dispatch(setting.onClearMessage());
    }, 3000);
  };

  // Star Deleting Setting
  const startDeleteSetting = async (id: string) => {
    try {
      const message = await deleteSetting(id);
      dispatch(setting.onDeleteSetting(message));
      setTimeout(() => {
        dispatch(setting.onClearMessage());
      }, 3000);
    } catch (error: any) {
      const {
        response: {
          data: { errors },
        },
      } = error;
      dispatch(setting.onSetErrors(errors));
      setTimeout(() => {
        dispatch(setting.onClearErrors());
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
