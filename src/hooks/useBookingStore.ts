import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '../store/store';
import {
  getAllBookings,
  getAllUserBookings,
  getBookingDetailById,
  getUserBookingDetailById,
} from '../api/fetch/bookings';
import { bookings as BookingStore } from '../store';

export const useBookingStore = () => {
  const {
    activeBooking,
    isLoadingDetail,
    userbookingDetail,
    isLoadingBookings,
    bookings,
    admin,
  } = useSelector((state: any) => state.booking);
  const dispatch = useDispatch<AppDispatch>();

  const startFindUserBookingDetail = async (id: string, admin: boolean) => {
    dispatch(BookingStore.onSetLoadingDetail(true));
    if (!admin) {
      const bookingUserDetails = await getUserBookingDetailById(id);
      dispatch(BookingStore.onSetActiveBooking(id));
      dispatch(BookingStore.onSetUserBookingDetail(bookingUserDetails));
      dispatch(BookingStore.onSetLoadingDetail(false));
      return;
    }
    const bookingDetails = await getBookingDetailById(id);
    dispatch(BookingStore.onSetActiveBooking(id));
    dispatch(BookingStore.onSetUserBookingDetail(bookingDetails));
    dispatch(BookingStore.onSetLoadingDetail(false));
  };

  const startLoadingBookings = async (adminView: boolean) => {
    dispatch(BookingStore.onSetLoadingDetail(true));
    if (!adminView) {
      const userBookings = await getAllUserBookings();
      dispatch(BookingStore.onLoadBookings(userBookings));
      dispatch(BookingStore.onSetView(false));
      dispatch(BookingStore.onSetLoadingDetail(false));
      return;
    }
    const allBookings = await getAllBookings();
    dispatch(BookingStore.onLoadBookings(allBookings));
    dispatch(BookingStore.onSetView(true));
    dispatch(BookingStore.onSetLoadingDetail(false));
  };

  return {
    // props
    userbookingDetail,
    isLoadingBookings,
    activeBooking,
    bookings,
    admin,
    isLoadingDetail,

    // methods
    startLoadingBookings,
    startFindUserBookingDetail,
  };
};
