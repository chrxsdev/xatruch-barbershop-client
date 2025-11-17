import xatruchBarberApi from '../clientApi';
import type { ApiResponse } from '../../types/api';
import type { CartItem } from '../../types/entities';

// GET CART
export const getCart = async (): Promise<CartItem[]> => {
  const {
    data: { data },
  } = await xatruchBarberApi.get<ApiResponse<CartItem[]>>('/bookings/cart/my-cart');
  return data;
};

// POST
export const addToCart = async (serviceId: string): Promise<CartItem> => {
  const {
    data: { data },
  } = await xatruchBarberApi.post<ApiResponse<CartItem>>(`/bookings/cart/my-cart?serviceId=${serviceId}`);
  return data;
};

// DELETE
export const deleteFromCart = async (serviceId: string): Promise<string> => {
  const {
    data: { message },
  } = await xatruchBarberApi.delete<ApiResponse<null>>(`/bookings/cart/my-cart/delete/${serviceId}`);
  return message ?? '';
};
