import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRotateLeft, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useSettingStore, useUiStore } from '../../../hooks';
import { alertInfo } from '../../../helpers';

interface ActionsProps {
  values: string;
}

export const Actions = ({ values }: ActionsProps) => {
  const { startFindSetting, startDeleteSetting, startSetSettingStatus } = useSettingStore();
  const { startOpenModal } = useUiStore();

  const onUpdate = (id: string) => {
    startFindSetting(id);
    startOpenModal();
  };

  const onDelete = (id: string) => {
    startFindSetting(id);
    const logoutInfo = alertInfo(
      '¿Seguro que desea eliminar la configuración de horario?',
      'info',
      'Si'
    );
    Swal.fire(logoutInfo).then((result) => {
      if (result.isConfirmed) startDeleteSetting(id);
    });
  };

  const onActivate = (id: string) => {
    startSetSettingStatus(id);
  };

  return (
    <>
      <button onClick={() => onUpdate(values)} className="btn btn-dark mr-2 mt-2">
        <FontAwesomeIcon icon={faEdit} />
      </button>
      <button
        onClick={() => onActivate(values)}
        className="btn btn-info mr-2 mt-2"
        title="Activar/Desactivar"
      >
        <FontAwesomeIcon icon={faArrowRotateLeft} />
      </button>
      <button onClick={() => onDelete(values)} className="btn btn-danger mr-2 mt-2">
        <FontAwesomeIcon icon={faTrash} />
      </button>
    </>
  );
};
