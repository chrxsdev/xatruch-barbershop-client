import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { BookingState } from '../../types/store';
import type { BookingDetail, UserBookingDetail, Booking } from '../../types/entities';

const initialState: BookingState = {
  bookings: [],
  userbookingDetail: [],
  activeBooking: null,
  bookingDetail: [],
  admin: false,
  isLoadingBookings: true,
  isLoadingDetail: false,
};

export const bookingsSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    onLoadBookings: (state, { payload }: PayloadAction<Booking[]>) => {
      state.bookings = payload;
      state.isLoadingBookings = false;
    },
    onSetLoadingDetail: (state, { payload }: PayloadAction<boolean>) => {
      state.isLoadingDetail = payload;
    },
    onSetUserBookingDetail: (state, { payload }: PayloadAction<BookingDetail[]>) => {
      state.userbookingDetail = payload.map((detail): UserBookingDetail => ({
        ...detail,
        serviceName: detail.service?.serviceName || 'Unknown Service',
      }));
    },
    onSetActiveBooking: (state, { payload }: PayloadAction<string>) => {
      state.activeBooking = state.bookings.find((booking: Booking) => booking.id === payload) ?? null;
    },
    onSetView: (state, { payload }: PayloadAction<boolean>) => {
      state.admin = payload;
    },
    onLogoutUserBookings: (state) => {
      state.userbookingDetail = [];
      state.bookings = [];
      state.bookingDetail = [];
      state.activeBooking = null;
      state.isLoadingBookings = true;
    },
  },
});

export const {
  onLoadBookings,
  onLogoutUserBookings,
  onSetActiveBooking,
  onSetUserBookingDetail,
  onSetView,
  onSetLoadingDetail,
} = bookingsSlice.actions;
