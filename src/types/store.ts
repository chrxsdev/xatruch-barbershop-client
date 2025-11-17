// Redux store types will be exported from store.ts file directly

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
  errors: string[];
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
  message?: string;
}

// Cart state
export interface CartState {
  cart: Array<{
    serviceId: string;
    serviceName: string;
    price: number;
    duration: number;
    imageUrl?: string;
  }>;
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

// Booking state
export interface BookingState {
  bookings: Array<{
    id: string;
    userId: string;
    barberId: string;
    scheduledDate: string;
    scheduledTime: string;
    status: string;
    totalAmount: number;
  }>;
  userbookingDetail: Array<{
    id: string;
    bookingId: string;
    serviceId: string;
    price: number;
  }>;
  activeBooking: {
    id: string;
    userId: string;
    barberId: string;
    scheduledDate: string;
    scheduledTime: string;
    status: string;
    totalAmount: number;
  } | null;
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
  settingErrors: string[];
  message?: string;
}

// UI state
export interface UiState {
  isModalOpen: boolean;
  modalType?: string;
  isLoading: boolean;
}
