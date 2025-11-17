import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '../store/store';
import {
  deleteBarber,
  getAllBarbers,
  getBarberById,
  saveBarber,
  updateBarber,
} from '../api/fetch';
import { barbers as BarberStore } from '../store';

interface BarberData {
  id?: string;
  fullName: string;
  email?: string;
  phone?: string;
  specialty?: string;
  imageUrl?: string;
  isActive?: boolean;
}

export const useBarberStore = () => {
  const { barbers, isLoadingBarbers, message, activeBarber } = useSelector(
    (state: any) => state.barber
  );
  const dispatch = useDispatch<AppDispatch>();

  // Start Setting Active Barber
  const startSetActiveBarber = (barber: any) => {
    dispatch(BarberStore.onSetActiveBarber(barber));
  };

  // Start Finding Barber
  const startFindBarber = async (id: string) => {
    const barber = await getBarberById(id);
    dispatch(BarberStore.onSetActiveBarber(barber));
  };

  // Loading Barbers
  const startLoadingBarbers = async () => {
    const allBarbers = await getAllBarbers();
    dispatch(BarberStore.onLoadBarbers(allBarbers));
  };

  // Start Creating/Update Barber
  const startSavingBarber = async (barber: BarberData) => {
    const { id, ...rest } = barber;

    // Update
    if (id) {
      const { barber: barberUpdated, message } = await updateBarber(id, rest);
      dispatch(BarberStore.onUpdateBarber({ barberUpdated, message }));
      setTimeout(() => {
        dispatch(BarberStore.onClearBarberMessage());
      }, 3);
      return;
    }

    // Create
    const { barber: barberSaved, message } = await saveBarber(rest);
    dispatch(BarberStore.onAddNewBarber({ barberSaved, message }));
    setTimeout(() => {
      dispatch(BarberStore.onClearBarberMessage());
    }, 3);
  };

  // Start Deleting
  const startDeleting = async (id: string) => {
    const message = await deleteBarber(id);
    dispatch(BarberStore.onDeleteBarber(message));
    setTimeout(() => {
      dispatch(BarberStore.onClearBarberMessage());
    }, 3);
  };

  return {
    // props
    barbers,
    isLoadingBarbers,
    message,
    activeBarber,

    // methods
    startLoadingBarbers,
    startSavingBarber,
    startSetActiveBarber,
    startFindBarber,
    startDeleting,
  };
};
