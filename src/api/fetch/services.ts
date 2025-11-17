import xatruchBarberApi from '../clientApi';
import type { ApiResponse } from '../../types/api';
import type { Service } from '../../types/entities';

interface SaveServiceParams {
  serviceName: string;
  price: number;
  description?: string;
  duration?: number;
  imageUrl?: string;
  isActive?: boolean;
}

interface UpdateServiceParams extends SaveServiceParams {
  id: string;
}

interface ServiceResponse {
  service: Service;
  message: string;
}

// GET
export const getAllServices = async (): Promise<Service[]> => {
  const { data } = await xatruchBarberApi.get<ApiResponse<Service[]>>('/services');
  return data.data;
};

// GET BY ID
export const getServiceById = async (id: string): Promise<Service> => {
  const {
    data: { data },
  } = await xatruchBarberApi.get<ApiResponse<Service>>(`/services/${id}`);
  return data;
};

// POST
export const saveService = async ({ serviceName, price, ...rest }: SaveServiceParams): Promise<ServiceResponse> => {
  const {
    data: { data, message },
  } = await xatruchBarberApi.post<ApiResponse<Service>>('/services', {
    serviceName,
    price,
    ...rest,
  });
  return {
    service: data,
    message: message ?? '',
  };
};

// PUT
export const updateService = async ({ serviceName, price, id, ...rest }: UpdateServiceParams): Promise<ServiceResponse> => {
  const {
    data: { data, message },
  } = await xatruchBarberApi.put<ApiResponse<Service>>(`/services/${id}`, {
    serviceName,
    price,
    ...rest,
  });
  return {
    service: data,
    message: message ?? '',
  };
};
