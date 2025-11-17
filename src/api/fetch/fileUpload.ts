import xatruchBarberApi from '../clientApi';
import type { ApiResponse } from '../../types/api';

interface FileUploadResponse {
  url: string;
}

interface ProfileUrlResponse {
  profileUrl: string;
}

export const fileUpload = async (file: File): Promise<ProfileUrlResponse> => {
  const formData = new FormData();
  formData.append('image', file);

  const {
    data: {
      data: { url },
    },
  } = await xatruchBarberApi.post<ApiResponse<FileUploadResponse>>('/users/profile-img', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return {
    profileUrl: url,
  };
};
