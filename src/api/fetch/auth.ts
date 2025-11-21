import xatruchBarberApi from '../clientApi';
import type { ApiResponse } from '../../types/api';

interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  profileUrl?: string;
  role: 'USER' | 'ADMIN';
  token: string;
}

interface SignInResponse {
  user: UserProfile;
  message: string;
}

interface SignUpResponse {
  user: UserProfile;
  message: string;
}

interface RenewTokenResponse {
  user: UserProfile;
}

// GET
export const renewToken = async (): Promise<RenewTokenResponse> => {
  const {
    data: { data },
  } = await xatruchBarberApi.get<ApiResponse<UserProfile>>('/auth/refresh-token');
  return {
    user: data,
  };
};

// POST
export const singIn = async (email: string, password: string): Promise<SignInResponse> => {
  const {
    data: { message, data },
  } = await xatruchBarberApi.post<ApiResponse<UserProfile>>('/auth/signin', {
    email,
    password,
  });
  return {
    user: data,
    message: message ?? '',
  };
};

export const signUp = async (fullName: string, email: string, password: string): Promise<SignUpResponse> => {
  const {
    data: { message, data },
  } = await xatruchBarberApi.post<ApiResponse<UserProfile>>('/auth/signup', {
    fullName,
    email,
    password,
  });
  return {
    user: data,
    message: message ?? '',
  };
};
