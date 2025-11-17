import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './auth/authSlice';
import { bookingsSlice } from './bookings/bookingsSlice';
import { barbersSlice } from './barbers/barbersSlice';
import { cartSlice } from './cart/cartSlice';
import { serviceSlice } from './service/serviceSlice';
import { settingSlice } from './settings/settingSlice';
import { reviewsSlice } from './reviews/reviewsSlice';
import { uiSlice } from './ui/uiSlice';

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
