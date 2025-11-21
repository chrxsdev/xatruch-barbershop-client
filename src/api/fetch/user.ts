import xatruchBarberApi from '../clientApi';
import type { ApiResponse } from '../../types/api';
import type { User } from '../../types/entities';

interface UpdatePasswordParams {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface UserWithToken extends User {
  token?: string;
}

// PUT
export const updateUser = async (fullName: string, email: string): Promise<UserWithToken> => {
  const {
    data: { data },
  } = await xatruchBarberApi.put<ApiResponse<UserWithToken>>('/users', {
    fullName,
    email,
  });
  return data;
};

export const updatePassword = async ({
  currentPassword,
  newPassword,
  confirmPassword,
}: UpdatePasswordParams): Promise<string> => {
  const {
    data: { message },
  } = await xatruchBarberApi.put<ApiResponse<null>>('/users/change-password', {
    currentPassword,
    newPassword,
    confirmPassword,
  });
  return message ?? '';
};
