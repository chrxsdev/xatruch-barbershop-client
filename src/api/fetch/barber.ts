import xatruchBarberApi from '../clientApi';
import type { ApiResponse } from '../../types/api';
import type { Barber } from '../../types/entities';

interface SaveBarberParams {
  fullName: string;
  email?: string;
  phone?: string;
  specialty?: string;
  imageUrl?: string;
  isActive?: boolean;
}

interface UpdateBarberParams extends SaveBarberParams {}

interface BarberResponse {
  barber: Barber;
  message: string;
}

// GET
export const getAllBarbers = async (): Promise<Barber[]> => {
  const {
    data: { data },
  } = await xatruchBarberApi.get<ApiResponse<Barber[]>>('/barbers');
  return data;
};

// GET BY ID
export const getBarberById = async (id: string): Promise<Barber> => {
  const {
    data: { data },
  } = await xatruchBarberApi.get<ApiResponse<Barber>>(`/barbers/${id}`);
  return data;
};

// POST
export const saveBarber = async (barberData: SaveBarberParams): Promise<BarberResponse> => {
  const {
    data: { data, message },
  } = await xatruchBarberApi.post<ApiResponse<Barber>>('/barbers', barberData);
  return {
    barber: data,
    message: message ?? '',
  };
};

// PUT
export const updateBarber = async (id: string, barberData: UpdateBarberParams): Promise<BarberResponse> => {
  const {
    data: { data, message },
  } = await xatruchBarberApi.put<ApiResponse<Barber>>(`/barbers/${id}`, barberData);
  return {
    barber: data,
    message: message ?? '',
  };
};

// DELETE
export const deleteBarber = async (id: string): Promise<string> => {
  const {
    data: { message },
  } = await xatruchBarberApi.delete<ApiResponse<null>>(`/barbers/${id}`);
  return message ?? '';
};
