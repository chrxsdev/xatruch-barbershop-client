import xatruchBarberApi from '../clientApi';
import type { ApiResponse } from '../../types/api';
import type { Booking, BookingDetail } from '../../types/entities';

interface CreateBookingParams {
  barberId: string;
  scheduledDate: string;
  scheduledTime: string;
  serviceIds: string[];
  notes?: string;
}

interface CreateBookingResponse {
  sessionBooking: Booking;
  message: string;
}

// GET | User
export const getAllUserBookings = async (): Promise<Booking[]> => {
  const {
    data: { data },
  } = await xatruchBarberApi.get<ApiResponse<Booking[]>>('/bookings/orders/users');
  return data;
};

export const getUserBookingDetailById = async (id: string): Promise<BookingDetail[]> => {
  const {
    data: { data },
  } = await xatruchBarberApi.get<ApiResponse<BookingDetail[]>>(`/bookings/orders/users/${id}`);
  return data;
};

// GET | Admin
export const getAllBookings = async (): Promise<Booking[]> => {
  const {
    data: { data },
  } = await xatruchBarberApi.get<ApiResponse<Booking[]>>('/bookings/orders');
  return data;
};

export const getBookingDetailById = async (id: string): Promise<BookingDetail[]> => {
  const {
    data: { data },
  } = await xatruchBarberApi.get<ApiResponse<BookingDetail[]>>(`/bookings/orders/${id}`);
  return data;
};

// GET BARBERS Available
export const getBarbersAvailability = async (barberId: string, date: string): Promise<string[]> => {
  const {
    data: { data },
  } = await xatruchBarberApi.get<ApiResponse<string[]>>(
    `/bookings/orders/availability?barberId=${barberId}&date=${date}`
  );
  return data;
};

// POST - Create Order
export const createBooking = async (booking: CreateBookingParams): Promise<CreateBookingResponse> => {
  const {
    data: { data, message },
  } = await xatruchBarberApi.post<ApiResponse<Booking>>('/bookings/orders', booking);
  return {
    sessionBooking: data,
    message: message ?? '',
  };
};
