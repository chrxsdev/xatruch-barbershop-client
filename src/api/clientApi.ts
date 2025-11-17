import axios, { type AxiosInstance, type InternalAxiosRequestConfig } from 'axios';
import { getEnvVariables } from '../helpers';

const { VITE_API_URL } = getEnvVariables();

const xatruchBarberApi: AxiosInstance = axios.create({
  baseURL: VITE_API_URL,
});

// Interceptors
xatruchBarberApi.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };
  }
  return config;
});

export default xatruchBarberApi;
