// Core entity types for the barbershop application

export interface User {
  id: string;
  fullName: string;
  email: string;
  password?: string;
  profileUrl?: string;
  role: 'USER' | 'ADMIN';
  createdAt?: string;
  updatedAt?: string;
}

export interface Service {
  id: string;
  serviceName: string;
  description: string;
  price: number;
  duration: number;
  imageUrl?: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Barber {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  specialty?: string;
  imageUrl?: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}


export interface Booking {
  id: string;
  userId: string;
  barberId: string;
  bookingDate: string;
  bookingTime: string;
  scheduledDate: string;
  scheduledTime: string;
  barber: string;
  user: string;
  status: string;
  totalAmount: number;
}

export interface BookingDetail {
  id: string;
  bookingId: string;
  serviceId: string;
  service?: Service;
  price: number;
  createdAt?: string;
}

export interface UserBookingDetail {
  id: string;
  bookingId: string;
  serviceId: string;
  serviceName: string;
  price: number;
  service?: Service;
  createdAt?: string;
}

export interface ActiveBookingDisplay {
  id: string;
  userId: string;
  barberId: string;
  bookingDate: string;
  bookingTime: string;
  barber: string;
  user: string;
  status: string;
  totalAmount: number;
}

export interface CartItem {
  serviceId: string;
  serviceName: string;
  price: number;
  duration: number;
  imageUrl?: string;
}

export interface SessionBooked {
  id: string;
  barberId: string;
  scheduledDate: string;
  scheduledTime: string;
  services: Service[];
  totalAmount: number;
  totalDuration: number;
}

export interface BookingSession {
  scheduledDate: string;
  scheduledTime: string;
  barberId: string;
}

export interface Review {
  id: string;
  userId: string;
  bookingId: string;
  title: string;
  review: string;
  rating: number;
  comment: string;
  user?: User;
  createdAt?: string;
  updatedAt?: string;
}

export interface Setting {
  id: string;
  key: string;
  value: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

export type AuthStatus = 'checking' | 'authenticated' | 'not-authenticated';
