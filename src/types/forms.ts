// Form types for React Hook Form integration

export interface LoginFormData {
  email: string;
  password: string;
}

export interface SignUpFormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

export interface ServiceFormData {
  serviceName: string;
  description: string;
  price: number;
  duration: number;
  imageUrl?: string;
  isActive: boolean;
}

export interface BarberFormData {
  fullName: string;
  email: string;
  phone: string;
  specialty?: string;
  imageUrl?: string;
  isActive: boolean;
}

export interface BookingFormData {
  barberId: string;
  scheduledDate: string;
  scheduledTime: string;
  notes?: string;
}

export interface ReviewFormData {
  bookingId: string;
  rating: number;
  comment: string;
}

export interface ProfileFormData {
  fullName: string;
  email: string;
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
}

export interface SettingFormData {
  key: string;
  value: string;
  description?: string;
}

// Form validation error type
export interface FormErrors {
  [key: string]: string | undefined;
}
