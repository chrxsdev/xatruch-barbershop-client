import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { CartState } from '../../types/store';

type CartItemType = CartState['cart'][number];
type BarberType = CartState['availableBarbers'][number];

const initialState: CartState = {
  cart: [],
  availableBarbers: [],
  sessionBooked: null,
  isProcessing: false,
  message: undefined,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    onAddToCart: (state, { payload }: PayloadAction<CartItemType>) => {
      state.cart.push(payload);
    },
    onProcessing: (state) => {
      state.isProcessing = true;
    },
    onAddSession: (
      state,
      { payload }: PayloadAction<{ sessionBooked: CartState['sessionBooked']; message: string }>
    ) => {
      state.sessionBooked = payload.sessionBooked;
      state.message = payload.message;
      state.isProcessing = false;
      state.cart = [];
    },
    onDeleteFromCart: (state, { payload }: PayloadAction<{ id: string; message: string }>) => {
      state.cart = state.cart.filter((servCart) => servCart.serviceId !== payload.id);
      state.message = payload.message;
    },
    onLoadCart: (state, { payload }: PayloadAction<CartItemType[]>) => {
      payload.forEach((item) => {
        const exists = state.cart.some((inCart) => inCart.serviceId === item.serviceId);
        if (!exists) state.cart.push(item);
      });
    },
    onLoadAvailableBarbers: (state, { payload }: PayloadAction<BarberType[]>) => {
      state.availableBarbers = payload;
    },
    onClearMessage: (state) => {
      state.message = undefined;
    },
    onLogoutCart: (state) => {
      state.cart = [];
      state.availableBarbers = [];
      state.message = undefined;
      state.sessionBooked = null;
      state.isProcessing = false;
    },
  },
});

export const {
  onAddSession,
  onAddToCart,
  onClearMessage,
  onDeleteFromCart,
  onLoadAvailableBarbers,
  onLoadCart,
  onLogoutCart,
  onProcessing,
} = cartSlice.actions;
