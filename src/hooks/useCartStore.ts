import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '../store/store';
import {
  addToCart,
  createBooking,
  CreateBookingParams,
  deleteFromCart,
  getBarbersAvailability,
  getCart,
} from '../api';
import { cart as cartSlice } from '../store';

interface BookingSession {
  barberId: string;
  bookingDate: string;
  bookingTime: string;
  serviceIds?: string[];
  notes?: string;
}

export const useCartStore = () => {
  const { cart, message, availableBarbers, sessionBooked, isProcessing } = useSelector(
    (state: any) => state.cart
  );
  const dispatch = useDispatch<AppDispatch>();

  // Start Loading Cart
  const startLoadingCart = async () => {
    const cartData = await getCart();
    dispatch(cartSlice.onLoadCart(cartData));
  };

  // Start Adding to Cart
  const startAddingToCart = async (id: string) => {
    const service = await addToCart(id);
    dispatch(cartSlice.onAddToCart(service));
  };

  // Start Deleting From Cart
  const startDeletingFromCart = async (id: string) => {
    const message = await deleteFromCart(id);
    dispatch(cartSlice.onDeleteFromCart({ id, message }));
    setTimeout(() => {
      dispatch(cartSlice.onClearMessage());
    }, 3);
  };

  // Check in Cart
  const checkServiceInCart = (id: string) => {
    return cart.some((item: any) => item.serviceId === id);
  };

  // Start Loading Barbers
  const startLoadingAvailableBarbers = async (barberId: string, date: string) => {
    const barbers = await getBarbersAvailability(barberId, date);
    dispatch(cartSlice.onLoadAvailableBarbers(barbers as any));
  };

  // Start Adding Booking Session
  const startAddingSession = async (session: BookingSession) => {
    dispatch(cartSlice.onProcessing());
    try {
      const { sessionBooking, message } = await createBooking(session as CreateBookingParams);
      dispatch(
        cartSlice.onAddSession({
          sessionBooked: sessionBooking,
          message,
        })
      );
      setTimeout(() => {
        dispatch(cartSlice.onClearMessage());
      }, 5000);
    } catch (error) {
      console.log({
        error
      });
    }
  };

  return {
    // props
    cart,
    message,
    availableBarbers,
    sessionBooked,
    isProcessing,

    // methods
    startAddingToCart,
    checkServiceInCart,
    startLoadingCart,
    startDeletingFromCart,
    startLoadingAvailableBarbers,
    startAddingSession,
  };
};
