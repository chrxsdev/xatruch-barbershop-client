import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Modal from 'react-modal';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faFloppyDisk, faUserGear } from '@fortawesome/free-solid-svg-icons';

import { useUiStore, useBarberStore } from '../../../hooks';
import { customStyles } from '../../../helpers/ModalCustomStyles';
import { fullNameValidations } from '../../../helpers/formValidations';
import { alertSuccess } from '../../../helpers';

Modal.setAppElement('#root');

interface BarberModalFormData {
  fullName: string;
}

const initForm: BarberModalFormData = {
  fullName: '',
};

export const BarbersModal = () => {
  const {
    register,
    handleSubmit,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm<BarberModalFormData>({ defaultValues: initForm });

  const { message, activeBarber, startSavingBarber } = useBarberStore();
  const { isModalOpen, startCloseModal } = useUiStore();

  const closeModalAndClean = () => {
    reset();
    clearErrors();
    startCloseModal();
  };

  useEffect(() => {
    if (message !== undefined) {
      const successInfo = alertSuccess(message, 'success');
      Swal.fire(successInfo);
    }
  }, [message]);

  useEffect(() => {
    if (activeBarber !== null) reset(activeBarber as any);
  }, [activeBarber]);

  const onSubmit = async (data: BarberModalFormData) => {
    startSavingBarber(data as any);
    reset();
    startCloseModal();
  };

  return (
    <Modal
      className="modal"
      overlayClassName="modal-fondo"
      isOpen={isModalOpen}
      onRequestClose={closeModalAndClean}
      style={customStyles}
    >
      <div>
        <div className="modal-header">
          <h5 className="modal-title">
            <FontAwesomeIcon icon={faUserGear} />
            &nbsp;BARBEROS
          </h5>
          <button
            type="button"
            onClick={closeModalAndClean}
            className="close"
            aria-label="Close"
          >
            <FontAwesomeIcon icon={faCircleXmark} />
          </button>
        </div>

        <div className="modal-body">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-2">
              <label htmlFor="fullName" className="form-label">
                Nombre Completo{' '}
              </label>
              <input
                type="text"
                className={`form-control ${errors.fullName ? 'is-invalid' : ''}`}
                id="fullName"
                placeholder="John Doe..."
                {...register('fullName', fullNameValidations)}
                autoFocus
              />
              <small className="invalid-feedback text-left">
                {errors.fullName && errors.fullName.message}
              </small>
            </div>
            <button type="submit" className="btn btn-dark mt-2">
              <FontAwesomeIcon icon={faFloppyDisk} /> Guardar
            </button>
          </form>
        </div>
      </div>
    </Modal>
  );
};
