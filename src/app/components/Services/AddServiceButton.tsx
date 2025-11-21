import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useUiStore, useServiceStore } from '../../../hooks';

export const AddServiceButton = () => {
  const { startOpenModal } = useUiStore();
  const { startSetActiveService } = useServiceStore();

  const onNewService = () => {
    startSetActiveService({
      serviceName: '',
      price: 0,
    });
    startOpenModal();
  };

  return (
    <button className="btn btn-dark btn-sm" onClick={onNewService}>
      <FontAwesomeIcon icon={faPlus} />
      &nbsp;Nuevo
    </button>
  );
};
