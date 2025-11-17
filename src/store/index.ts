import * as auth from './auth/authSlice';
import * as bookings from './bookings/bookingsSlice';
import * as reviews from './reviews/reviewsSlice';
import * as service from './service/serviceSlice';
import * as setting from './settings/settingSlice';
import * as ui from './ui/uiSlice';
import * as barbers from './barbers/barbersSlice';
import * as cart from './cart/cartSlice';

export { auth, bookings, reviews, service, setting, ui, barbers, cart };
export * from './store';
