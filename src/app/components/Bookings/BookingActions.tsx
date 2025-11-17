import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useUiStore, useBookingStore } from '../../../hooks';

interface ActionsProps {
  values: string;
}

export const Actions = ({ values }: ActionsProps) => {
  const { startFindUserBookingDetail, admin } = useBookingStore();
  const { startOpenModal } = useUiStore();

  const onBookingDetail = (values: string) => {
    startFindUserBookingDetail(values, admin);
    startOpenModal();
  };

  return (
    <>
      <button onClick={() => onBookingDetail(values)} className="btn btn-dark mr-2 mt-2">
        <FontAwesomeIcon icon={faInfoCircle} />
      </button>
    </>
  );
};
