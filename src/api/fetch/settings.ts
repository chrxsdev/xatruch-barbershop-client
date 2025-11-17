import xatruchBarberApi from '../clientApi';
import type { ApiResponse } from '../../types/api';
import type { Setting } from '../../types/entities';

interface CreateSettingParams {
  key: string;
  value: string;
  description?: string;
  startDailyAvailability?: string;
  endDailyAvailability?: string;
}

interface UpdateSettingParams {
  id: string;
  startDailyAvailability?: string;
  endDailyAvailability?: string;
}

interface SettingResponse {
  setting: Setting;
  message: string;
}

// GET
export const getAllSettings = async (): Promise<Setting[]> => {
  const {
    data: { data },
  } = await xatruchBarberApi.get<ApiResponse<Setting[]>>('/settings');
  return data;
};

// POST
export const createSetting = async (setting: CreateSettingParams): Promise<SettingResponse> => {
  const {
    data: { data, message },
  } = await xatruchBarberApi.post<ApiResponse<Setting>>('/settings', setting);
  return {
    setting: data,
    message: message ?? '',
  };
};

// POST - Activate/Desactivate Setting
export const activateSetting = async (id: string): Promise<SettingResponse> => {
  const {
    data: { data, message },
  } = await xatruchBarberApi.post<ApiResponse<Setting>>(`/settings/active/${id}`);
  return {
    setting: data,
    message: message ?? '',
  };
};

// PUT
export const updateSetting = async ({
  id,
  startDailyAvailability,
  endDailyAvailability,
}: UpdateSettingParams): Promise<SettingResponse> => {
  const {
    data: { data, message },
  } = await xatruchBarberApi.put<ApiResponse<Setting>>(`/settings/${id}`, {
    startDailyAvailability,
    endDailyAvailability,
  });
  return {
    setting: data,
    message: message ?? '',
  };
};

// DELETE
export const deleteSetting = async (id: string): Promise<string> => {
  const {
    data: { message },
  } = await xatruchBarberApi.delete<ApiResponse<null>>(`/settings/${id}`);
  return message ?? '';
};
