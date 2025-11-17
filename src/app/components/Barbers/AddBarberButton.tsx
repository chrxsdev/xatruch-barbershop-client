import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useUiStore, useBarberStore } from '../../../hooks';

export const AddBarberButton = () => {
  const { startOpenModal } = useUiStore();
  const { startSetActiveBarber } = useBarberStore();

  const onNewBarber = () => {
    startSetActiveBarber({
      fullName: '',
    });
    startOpenModal();
  };

  return (
    <button className="btn btn-dark btn-sm" onClick={onNewBarber}>
      <FontAwesomeIcon icon={faPlus} />
      &nbsp;Nuevo
    </button>
  );
};
