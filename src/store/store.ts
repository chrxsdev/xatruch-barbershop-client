import { configureStore } from '@reduxjs/toolkit';

import {
  authSlice,
  serviceSlice,
  uiSlice,
  reviewsSlice,
  bookingsSlice,
  settingSlice,
  barbersSlice,
  cartSlice,
} from './';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    booking: bookingsSlice.reducer,
    barber: barbersSlice.reducer,
    cart: cartSlice.reducer,
    service: serviceSlice.reducer,
    setting: settingSlice.reducer,
    review: reviewsSlice.reducer,
    ui: uiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
