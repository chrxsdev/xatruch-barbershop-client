import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '../store/store';
import {
  addToCart,
  createBooking,
  deleteFromCart,
  getBarbersAvailability,
  getCart,
} from '../api';
import {
  onAddToCart,
  onDeleteFromCart,
  onLoadCart,
  onAddSession,
  onClearMessage,
  onLoadAvailableBarbers,
  onProcessing,
} from '../store';

interface BookingSession {
  barberId: string;
  scheduledDate: string;
  scheduledTime: string;
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
    const cart = await getCart();
    dispatch(onLoadCart(cart));
  };

  // Start Adding to Cart
  const startAddingToCart = async (id: string) => {
    const service = await addToCart(id);
    dispatch(onAddToCart(service));
  };

  // Start Deleting From Cart
  const startDeletingFromCart = async (id: string) => {
    const message = await deleteFromCart(id);
    dispatch(onDeleteFromCart({ id, message }));
    setTimeout(() => {
      dispatch(onClearMessage());
    }, 3);
  };

  // Check in Cart
  const checkServiceInCart = (id: string) => {
    return cart.some((item: any) => item.serviceId === id);
  };

  // Start Loading Barbers
  const startLoadingAvailableBarbers = async (barberId: string, date: string) => {
    const barbers = await getBarbersAvailability(barberId, date);
    dispatch(onLoadAvailableBarbers(barbers as any));
  };

  // Start Adding Booking Session
  const startAddingSession = async (session: BookingSession) => {
    dispatch(onProcessing());
    try {
      const { sessionBooking, message } = await createBooking(session as any);
      dispatch(
        onAddSession({
          sessionBooked: sessionBooking,
          message,
        })
      );
      setTimeout(() => {
        dispatch(onClearMessage());
      }, 5000);
    } catch (error) {
      console.log(error);
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
