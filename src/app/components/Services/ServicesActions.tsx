import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { useUiStore, useServiceStore } from '../../../hooks';

interface ActionsProps {
  values: string;
}

export const Actions = ({ values }: ActionsProps) => {
  const { startOpenModal } = useUiStore();
  const { startFindService } = useServiceStore();

  const onUpdate = (id: string) => {
    startFindService(id);
    startOpenModal();
  };

  return (
    <>
      <button onClick={() => onUpdate(values)} className="btn btn-dark mr-2 mt-2">
        <FontAwesomeIcon icon={faEdit} />
      </button>
    </>
  );
};
