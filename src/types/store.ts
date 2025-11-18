// Redux store types will be exported from store.ts file directly

export type MessageType = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';

export interface MessageInfo {
  text: string;
  type?: MessageType;
}

export interface ValidationError {
  field?: string;
  message: string;
}

// Auth state
export interface AuthState {
  currentStatus: 'checking' | 'authenticated' | 'not-authenticated';
  user: {
    id?: string;
    fullName?: string;
    email?: string;
    profileUrl?: string;
    role?: 'USER' | 'ADMIN';
  };
  message?: string;
  errors: ValidationError[];
  isLoadingPicture: boolean;
}

// Service state
export interface ServiceState {
  allServices: Array<{
    id: string;
    serviceName: string;
    description: string;
    price: number;
    duration: number;
    imageUrl?: string;
    isActive: boolean;
  }>;
  services: Array<{
    id: string;
    serviceName: string;
    description: string;
    price: number;
    duration: number;
    imageUrl?: string;
    isActive: boolean;
  }>;
  isLoadingServices: boolean;
  activeService: {
    id: string;
    serviceName: string;
    description: string;
    price: number;
    duration: number;
    imageUrl?: string;
    isActive: boolean;
  } | null;
  serviceErrors: string[];
  message?: MessageInfo;
}

import type { UserBookingDetail, ActiveBookingDisplay, CartItem } from './entities';

// Cart state
export interface CartState {
  cart: CartItem[];
  availableBarbers: Array<{
    id: string;
    fullName: string;
    email: string;
    phone: string;
    specialty?: string;
    imageUrl?: string;
    isActive: boolean;
  }>;
  sessionBooked: {
    id: string;
    barberId: string;
    scheduledDate: string;
    scheduledTime: string;
    totalAmount: number;
  } | null;
  isProcessing: boolean;
  message?: string;
}

import type { Booking } from './entities';

// Booking state
export interface BookingState {
  bookings: Booking[];
  userbookingDetail: UserBookingDetail[];
  activeBooking: ActiveBookingDisplay | null;
  bookingDetail: Array<{
    id: string;
    bookingId: string;
    serviceId: string;
    price: number;
  }>;
  admin: boolean;
  isLoadingBookings: boolean;
  isLoadingDetail: boolean;
}

// Barber state
export interface BarberState {
  barbers: Array<{
    id: string;
    fullName: string;
    email: string;
    phone: string;
    specialty?: string;
    imageUrl?: string;
    isActive: boolean;
  }>;
  activeBarber: {
    id: string;
    fullName: string;
    email: string;
    phone: string;
    specialty?: string;
    imageUrl?: string;
    isActive: boolean;
  } | null;
  isLoadingBarbers: boolean;
  message?: string;
}

// Review state
export interface ReviewState {
  reviews: Array<{
    id: string;
    userId: string;
    bookingId: string;
    rating: number;
    comment: string;
    isApproved?: boolean;
    createdAt?: string;
  }>;
  approvedReviews: Array<{
    id: string;
    userId: string;
    bookingId: string;
    rating: number;
    comment: string;
    isApproved?: boolean;
    createdAt?: string;
  }>;
  activeReview: {
    id: string;
    userId: string;
    bookingId: string;
    rating: number;
    comment: string;
  } | null;
  isLoadingReviews: boolean;
  reviewsToApprove: string[];
  message?: string;
}

// Setting state
export interface SettingState {
  settings: Array<{
    id: string;
    key: string;
    value: string;
    description?: string;
    isActive?: boolean;
  }>;
  activeSetting: {
    id: string;
    key: string;
    value: string;
    description?: string;
    isActive?: boolean;
  } | null;
  isLoadingSetting: boolean;
  settingErrors: ValidationError[];
  message?: string;
}

// UI state
export interface UiState {
  isModalOpen: boolean;
  modalType?: string;
  isLoading: boolean;
}
