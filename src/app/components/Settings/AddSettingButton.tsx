import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useUiStore, useSettingStore } from '../../../hooks';

export const AddSettingButton = () => {
  const { startOpenModal } = useUiStore();
  const { startSetActiveSetting } = useSettingStore();

  const onNewSetting = () => {
    startSetActiveSetting({});
    startOpenModal();
  };

  return (
    <button className="btn btn-dark btn-sm" onClick={onNewSetting}>
      <FontAwesomeIcon icon={faPlus} />
      &nbsp;Nuevo
    </button>
  );
};
