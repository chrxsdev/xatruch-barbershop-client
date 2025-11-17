import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Modal from 'react-modal';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faFloppyDisk, faList } from '@fortawesome/free-solid-svg-icons';

import { useUiStore, useReviewStore } from '../../../hooks';
import { customStyles } from '../../../helpers/ModalCustomStyles';
import { reviewValidations, titleValidations } from '../../../helpers/formValidations';
import { alertSuccess } from '../../../helpers';

Modal.setAppElement('#root');

interface ReviewModalFormData {
  title: string;
  review: string;
}

const initForm: ReviewModalFormData = {
  title: '',
  review: '',
};

export const ReviewsModal = () => {
  const {
    register,
    handleSubmit,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm<ReviewModalFormData>({ defaultValues: initForm });

  const { startSavingReview, message, activeReview } = useReviewStore();
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
    if (activeReview !== null) reset(activeReview as any);
  }, [activeReview]);

  const onSubmit = async (data: ReviewModalFormData) => {
    try {
      await startSavingReview(data as any);
      reset();
      startCloseModal();
    } catch (error: any) {
      const {
        response: {
          data: { message },
        },
      } = error;
      const errorInfo = alertSuccess(message, 'error');
      Swal.fire(errorInfo);
    }
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
            <FontAwesomeIcon icon={faList} />
            &nbsp;REVIEWS
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
              <label htmlFor="title" className="form-label">
                Título{' '}
              </label>
              <input
                type="text"
                className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                id="title"
                placeholder="Experiencia en Servicio..."
                {...register('title', titleValidations)}
                autoFocus
              />
              <small className="invalid-feedback text-left">
                {errors.title && errors.title.message}
              </small>
            </div>

            <div className="mb-2">
              <label htmlFor="review" className="form-label">
                ¿Qué opinas de la barbería?{' '}
              </label>
              <textarea
                className={`form-control ${errors.review ? 'is-invalid' : ''}`}
                id="review"
                rows={3}
                placeholder="Excelente servicio..."
                {...register('review', reviewValidations)}
              ></textarea>
              <small className="invalid-feedback text-left">
                {errors.review && errors.review.message}
              </small>
            </div>
            <button type="submit" className="btn btn-dark mt-2">
              <FontAwesomeIcon icon={faFloppyDisk} /> Publicar
            </button>
          </form>
        </div>
      </div>
    </Modal>
  );
};
