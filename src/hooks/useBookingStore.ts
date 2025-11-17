import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '../store/store';
import {
  getAllBookings,
  getAllUserBookings,
  getBookingDetailById,
  getUserBookingDetailById,
} from '../api/fetch/bookings';
import {
  onLoadBookings,
  onSetActiveBooking,
  onSetLoadingDetail,
  onSetUserBookingDetail,
  onSetView,
} from '../store';

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
    dispatch(onSetLoadingDetail(true));
    if (!admin) {
      const bookingUserDetails = await getUserBookingDetailById(id);
      dispatch(onSetActiveBooking(id));
      dispatch(onSetUserBookingDetail(bookingUserDetails));
      dispatch(onSetLoadingDetail(false));
      return;
    }
    const bookingDetails = await getBookingDetailById(id);
    dispatch(onSetActiveBooking(id));
    dispatch(onSetUserBookingDetail(bookingDetails));
    dispatch(onSetLoadingDetail(false));
  };

  const startLoadingBookings = async (adminView: boolean) => {
    dispatch(onSetLoadingDetail(true));
    if (!adminView) {
      const userBookings = await getAllUserBookings();
      dispatch(onLoadBookings(userBookings));
      dispatch(onSetView(false));
      dispatch(onSetLoadingDetail(false));
      return;
    }
    const bookings = await getAllBookings();
    dispatch(onLoadBookings(bookings));
    dispatch(onSetView(true));
    dispatch(onSetLoadingDetail(false));
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
