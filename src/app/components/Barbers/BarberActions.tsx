import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faUserSlash } from '@fortawesome/free-solid-svg-icons';
import { useUiStore, useBarberStore } from '../../../hooks';
import { alertInfo } from '../../../helpers';

interface ActionsProps {
  values: string;
}

export const Actions = ({ values }: ActionsProps) => {
  const { startOpenModal } = useUiStore();
  const { startFindBarber, startDeleting } = useBarberStore();

  const onUpdate = (id: string) => {
    startFindBarber(id);
    startOpenModal();
  };

  const onDelete = (id: string) => {
    startFindBarber(id);
    const logoutInfo = alertInfo('¿Seguro que dar de baja al barbero?', 'info', 'Si');
    Swal.fire(logoutInfo).then((result) => {
      if (result.isConfirmed) return startDeleting(id);
    });
  };

  return (
    <>
      <button onClick={() => onUpdate(values)} className="btn btn-dark mr-2 mt-2">
        <FontAwesomeIcon icon={faEdit} />
      </button>
      <button className="btn btn-info mt-2" onClick={() => onDelete(values)} title="Deshabilitar">
        <FontAwesomeIcon icon={faUserSlash} />
      </button>
    </>
  );
};
