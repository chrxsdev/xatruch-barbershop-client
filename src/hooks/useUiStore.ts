import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '../store/store';
import { ui } from '../store';

export const useUiStore = () => {
  const { isModalOpen } = useSelector((state: any) => state.ui);
  const dispatch = useDispatch<AppDispatch>();

  const startOpenModal = () => dispatch(ui.onOpenModal());
  const startCloseModal = () => dispatch(ui.onCloseModal());

  return {
    // props
    isModalOpen,

    // methods
    startOpenModal,
    startCloseModal,
  };
};
