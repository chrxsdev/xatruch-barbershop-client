import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '../store/store';
import {
  getAllServices,
  getServiceById,
  saveService,
  updateService,
} from '../api';
import {
  onLoadServices,
  onSetIsLoading,
  onFilterServices,
  onResetFilter,
  onSaveNewService,
  onClearMessage,
  onSetActiveService,
  onSetServiceErrors,
  onUpdateService,
} from '../store';

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
    dispatch(onSetIsLoading());
  };

  // Start Setting Active Service
  const startSetActiveService = (service: any) => {
    dispatch(onSetActiveService(service));
  };

  // Start Find Service
  const startFindService = async (id: string) => {
    const service = await getServiceById(id);
    dispatch(onSetActiveService(service));
  };

  // Start Saving Service
  const startSavingService = async (service: ServiceData) => {
    try {
      if (service.id) {
        // Updating Service...
        const { service: serviceUpdated, message } = await updateService(service as any);
        dispatch(onUpdateService({ serviceUpdated, message }));
        setTimeout(() => {
          dispatch(onClearMessage());
        }, 3000);
        return;
      }

      // Saving Service
      const { service: serviceSaved, message } = await saveService(service);
      dispatch(onSaveNewService({ serviceSaved, message }));
      setTimeout(() => {
        dispatch(onClearMessage());
      }, 3000);
    } catch (error: any) {
      const {
        response: {
          data: { errors },
        },
      } = error;
      dispatch(onSetServiceErrors(errors));
      throw new Error(errors);
    }
  };

  // Start Loading Services
  const startLoadingServices = async () => {
    const services = await getAllServices();
    dispatch(onLoadServices(services));
  };

  // Filtering Services
  const startFilteringServices = (serviceName = '') => {
    dispatch(onFilterServices(serviceName));

    /* Set Loading to False */
    dispatch(onSetIsLoading());
  };

  // Restore Services
  const startFilteringReset = () => {
    dispatch(onResetFilter());

    /* Set Loading to False */
    dispatch(onSetIsLoading());
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
