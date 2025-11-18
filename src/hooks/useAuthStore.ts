import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '../store/store';
import { auth, reviews, bookings, setting, barbers, cart } from '../store';
import { fileUpload, renewToken, signUp, singIn, updateUser } from '../api';

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData {
  fullName: string;
  email: string;
  password: string;
}

interface UpdateProfileData {
  fullName: string;
  email: string;
}

import type { ValidationError } from '../types/store';

interface UseAuthStoreReturn {
  user: any;
  currentStatus: any;
  message: string | undefined;
  errors: ValidationError[];
  isLoadingPicture: boolean;
  startCheckingToken: () => Promise<void>;
  startLogin: (credentials: LoginCredentials) => Promise<void>;
  startLogout: () => void;
  startRegister: (data: RegisterData) => Promise<void>;
  startUploadingProfilePicture: (file: File) => Promise<void>;
  startUpdateAuthProfile: (data: UpdateProfileData) => Promise<void>;
}

export const useAuthStore = (): UseAuthStoreReturn => {
  const { user, isLoadingPicture, currentStatus, message, errors } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch<AppDispatch>();

  // Logout
  const startLogout = () => {
    const token = localStorage.getItem('token');
    if (!token) return dispatch(auth.onLogout());

    // If token exists...
    localStorage.removeItem('token');

    // Clean States...
    // Reviews
    dispatch(reviews.onLogoutReviews());
    // Bookings
    dispatch(bookings.onLogoutUserBookings());
    // Settings
    dispatch(setting.onLogoutSettings());
    // Barbers
    dispatch(barbers.onLogoutBarbers());
    // Cart
    dispatch(cart.onLogoutCart());

    // Logout the App
    dispatch(auth.onLogout());
  };

  // Login User
  const startLogin = async ({ email, password }: LoginCredentials) => {
    try {
      const { user, message } = await singIn(email, password);
      const { token, ...profile } = user;
      localStorage.setItem('token', token);
      dispatch(auth.onLogin({ profile, message }));
    } catch (error: any) {
      const { message, errors } = error.response.data;
      dispatch(auth.onSetAuthErrors({ message, errors }));
      setTimeout(() => {
        dispatch(auth.onClearAuthMessages());
      }, 1000);
      throw new Error(error);
    }
  };

  // Register User
  const startRegister = async ({ fullName, email, password }: RegisterData) => {
    try {
      const { user, message } = await signUp(fullName, email, password);
      const { token, ...profile } = user;
      localStorage.setItem('token', token);
      dispatch(auth.onLogin({ profile, message }));
    } catch (error: any) {
      const { message, errors } = error.response.data;
      dispatch(auth.onSetAuthErrors({ message, errors }));
      setTimeout(() => {
        dispatch(auth.onClearAuthMessages());
      }, 1000);
      throw new Error(error);
    }
  };

  // Check Token and Refresing Session
  const startCheckingToken = async () => {
    dispatch(auth.onChecking());
    const token = localStorage.getItem('token');
    if (!token) {
      dispatch(auth.onLogout());
      return;
    }
    try {
      const { user } = await renewToken();
      const { token: newToken, ...profile } = user;

      localStorage.setItem('token', newToken);

      dispatch(auth.onLogin({ profile, message: '' }));
    } catch (error) {
      localStorage.clear();
      dispatch(auth.onLogout());
    }
  };

  // Update Profile Url User
  const startUploadingProfilePicture = async (file: File) => {
    dispatch(auth.onSetLoadingProfileImage(true));
    try {
      const { profileUrl } = await fileUpload(file);
      dispatch(auth.onUpdateProfileImage(profileUrl));
    } catch (error: any) {
      dispatch(auth.onSetLoadingProfileImage(false));
      const { message, errors } = error.response.data;
      dispatch(auth.onSetAuthErrors({ message, errors }));
      setTimeout(() => {
        dispatch(auth.onClearAuthMessages());
      }, 5000);
      throw new Error(error);
    }
  };

  // Update Profile Data
  const startUpdateAuthProfile = async ({ fullName, email }: UpdateProfileData) => {
    try {
      const userData = await updateUser(fullName, email);
      const { token, ...profile } = userData;

      // if token, user updated email
      if (token) localStorage.setItem('token', token);

      dispatch(auth.onUpdateUser(profile));
    } catch (error: any) {
      const { message, errors } = error.response.data;
      dispatch(auth.onSetAuthErrors({ message, errors }));
      setTimeout(() => {
        dispatch(auth.onClearAuthMessages());
      }, 3000);
      throw new Error(error);
    }
  };

  return {
    // props
    user,
    currentStatus,
    message,
    errors,
    isLoadingPicture,

    // methods
    startCheckingToken,
    startLogin,
    startLogout,
    startRegister,
    startUploadingProfilePicture,
    startUpdateAuthProfile,
  };
};
