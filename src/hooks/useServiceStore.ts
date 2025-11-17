import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '../store/store';
import {
  getAllServices,
  getServiceById,
  saveService,
  updateService,
} from '../api';
import { service } from '../store';

interface ServiceData {
  id?: string;
  serviceName: string;
  price: number;
  description?: string;
  duration?: number;
  imageUrl?: string;
  isActive?: boolean;
}

interface UseServiceStoreReturn {
  services: any[];
  allServices: any[];
  activeService: any | null;
  isLoadingServices: boolean;
  message: string | undefined;
  serviceErrors: string[];
  startLoadingServices: () => Promise<void>;
  startFilteringServices: (serviceName?: string) => void;
  startFilteringReset: () => void;
  startSetIsLoading: () => void;
  startSavingService: (service: ServiceData) => Promise<void>;
  startSetActiveService: (service: any) => void;
  startFindService: (id: string) => Promise<void>;
}

export const useServiceStore = (): UseServiceStoreReturn => {
  const dispatch = useDispatch<AppDispatch>();

  const {
    services,
    allServices,
    activeService,
    isLoadingServices,
    message,
    serviceErrors,
  } = useSelector((state: any) => state.service);

  // Set it Loading
  const startSetIsLoading = () => {
    dispatch(service.onSetIsLoading());
  };

  // Start Setting Active Service
  const startSetActiveService = (serviceData: any) => {
    dispatch(service.onSetActiveService(serviceData));
  };

  // Start Find Service
  const startFindService = async (id: string) => {
    const serviceData = await getServiceById(id);
    dispatch(service.onSetActiveService(serviceData));
  };

  // Start Saving Service
  const startSavingService = async (serviceData: ServiceData) => {
    try {
      if (serviceData.id) {
        // Updating Service...
        const { service: serviceUpdated, message } = await updateService(serviceData as any);
        dispatch(service.onUpdateService({ serviceUpdated, message }));
        setTimeout(() => {
          dispatch(service.onClearMessage());
        }, 3000);
        return;
      }

      // Saving Service
      const { service: serviceSaved, message } = await saveService(serviceData);
      dispatch(service.onSaveNewService({ serviceSaved, message }));
      setTimeout(() => {
        dispatch(service.onClearMessage());
      }, 3000);
    } catch (error: any) {
      const {
        response: {
          data: { errors },
        },
      } = error;
      dispatch(service.onSetServiceErrors(errors));
      throw new Error(errors);
    }
  };

  // Start Loading Services
  const startLoadingServices = async () => {
    const allServices = await getAllServices();
    dispatch(service.onLoadServices(allServices));
  };

  // Filtering Services
  const startFilteringServices = (serviceName = '') => {
    dispatch(service.onFilterServices(serviceName));

    /* Set Loading to False */
    dispatch(service.onSetIsLoading());
  };

  // Restore Services
  const startFilteringReset = () => {
    dispatch(service.onResetFilter());

    /* Set Loading to False */
    dispatch(service.onSetIsLoading());
  };

  return {
    // props
    services,
    isLoadingServices,
    message,
    serviceErrors,
    allServices,
    activeService,

    // methods
    startLoadingServices,
    startFilteringServices,
    startFilteringReset,
    startSetIsLoading,
    startSavingService,
    startSetActiveService,
    startFindService,
  };
};
