import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { BarberState } from '../../types/store';

type BarberType = BarberState['barbers'][number];

const initialState: BarberState = {
  activeBarber: null,
  barbers: [],
  isLoadingBarbers: true,
  message: undefined,
};

export const barbersSlice = createSlice({
  name: 'barber',
  initialState,
  reducers: {
    onLoadBarbers: (state, { payload }: PayloadAction<BarberType[]>) => {
      payload.forEach((barber) => {
        const exists = state.barbers.some((barberInStore) => barberInStore.id === barber.id);
        if (!exists) state.barbers.push(barber);
      });
      state.isLoadingBarbers = false;
    },
    onAddNewBarber: (state, { payload }: PayloadAction<{ barberSaved: BarberType; message: string }>) => {
      state.barbers.push(payload.barberSaved);
      state.message = payload.message;
    },
    onUpdateBarber: (state, { payload }: PayloadAction<{ barberUpdated: BarberType; message: string }>) => {
      state.barbers = state.barbers.map((barber) => {
        if (barber.id === payload.barberUpdated.id) return payload.barberUpdated;
        return barber;
      });
      state.message = payload.message;
    },
    onDeleteBarber: (state, { payload }: PayloadAction<string>) => {
      state.barbers = state.barbers.filter((barber) => {
        if (state.activeBarber && barber.id !== state.activeBarber.id) return barber;
        return false;
      });
      state.message = payload;
    },
    onSetActiveBarber: (state, { payload }: PayloadAction<BarberType | null>) => {
      state.activeBarber = payload;
    },
    onClearBarberMessage: (state) => {
      state.message = undefined;
    },
    onLogoutBarbers: (state) => {
      state.activeBarber = null;
      state.barbers = [];
      state.isLoadingBarbers = true;
      state.message = undefined;
    },
  },
});

export const {
  onAddNewBarber,
  onClearBarberMessage,
  onDeleteBarber,
  onLoadBarbers,
  onSetActiveBarber,
  onUpdateBarber,
  onLogoutBarbers,
} = barbersSlice.actions;
