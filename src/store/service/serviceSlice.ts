import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { ServiceState, MessageInfo } from '../../types/store';

type ServiceType = ServiceState['allServices'][number];

const initialState: ServiceState = {
  allServices: [],
  services: [],
  isLoadingServices: true,
  activeService: null,
  serviceErrors: [],
  message: undefined,
};

export const serviceSlice = createSlice({
  name: 'service',
  initialState,
  reducers: {
    onSaveNewService: (state, { payload }: PayloadAction<{ serviceSaved: ServiceType; message: string }>) => {
      state.allServices.push(payload.serviceSaved);
      state.message = { text: payload.message, type: 'success' };
      state.serviceErrors = [];
    },
    onUpdateService: (state, { payload }: PayloadAction<{ serviceUpdated: ServiceType; message: string }>) => {
      state.allServices = state.allServices.map((serv) => {
        if (serv.id !== payload.serviceUpdated.id) return serv;
        return payload.serviceUpdated;
      });
      state.message = { text: payload.message, type: 'success' };
      state.serviceErrors = [];
    },
    onLoadServices: (state, { payload }: PayloadAction<ServiceType[]>) => {
      payload.forEach((service) => {
        const exists = state.allServices.some((current) => current.id === service.id);
        if (!exists) state.allServices.push(service);
      });
      state.services = state.allServices;
      state.isLoadingServices = false;
    },
    onFilterServices: (state, { payload }: PayloadAction<string>) => {
      state.isLoadingServices = true;
      state.services = state.allServices.filter((serv) =>
        serv.serviceName.toLowerCase().includes(payload.toLowerCase())
      );
    },
    onResetFilter: (state) => {
      state.isLoadingServices = true;
      state.services = state.allServices;
    },
    onSetActiveService: (state, { payload }: PayloadAction<ServiceType | null>) => {
      state.activeService = payload;
    },
    onSetServiceErrors: (state, { payload }: PayloadAction<string[]>) => {
      state.serviceErrors = payload;
    },
    onClearMessage: (state) => {
      state.message = undefined;
    },
    onClearErrors: (state) => {
      state.serviceErrors = [];
    },
    onSetIsLoading: (state) => {
      state.isLoadingServices = false;
    },
    onSetMessage: (state, { payload }: PayloadAction<MessageInfo>) => {
      state.message = payload;
      state.isLoadingServices = false;
    },
  },
});

export const {
  onClearErrors,
  onClearMessage,
  onFilterServices,
  onLoadServices,
  onUpdateService,
  onSetServiceErrors,
  onSetActiveService,
  onResetFilter,
  onSaveNewService,
  onSetIsLoading,
  onSetMessage,
} = serviceSlice.actions;
