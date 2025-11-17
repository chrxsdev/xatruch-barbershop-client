import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '../store/store';
import { onCloseModal, onOpenModal } from '../store';

export const useUiStore = () => {
  const { isModalOpen } = useSelector((state: any) => state.ui);
  const dispatch = useDispatch<AppDispatch>();

  const startOpenModal = () => dispatch(onOpenModal());
  const startCloseModal = () => dispatch(onCloseModal());

  return {
    // props
    isModalOpen,

    // methods
    startOpenModal,
    startCloseModal,
  };
};
