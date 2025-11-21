import { useEffect } from 'react';
import Modal from 'react-modal';
import Swal from 'sweetalert2';
import DatePicker, { registerLocale } from 'react-datepicker';
import { es } from 'date-fns/locale';
import { Controller, useForm } from 'react-hook-form';
import { differenceInSeconds } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faFloppyDisk, faWrench } from '@fortawesome/free-solid-svg-icons';

import { useUiStore, useSettingStore } from '../../../hooks';
import { customStyles } from '../../../helpers/ModalCustomStyles';
import { alertSuccess, formatStringToDate, formatTo24hrs } from '../../../helpers';

import 'react-datepicker/dist/react-datepicker.min.css';

Modal.setAppElement('#root');

/** ES DatePicker */
registerLocale('es', es);

interface SettingsFormData {
  startDailyAvailability: Date;
  endDailyAvailability: Date;
}

export const SettingsModal = () => {
  const {
    control,
    handleSubmit,
    reset,
    clearErrors,
    setError,
    formState: { errors },
  } = useForm<SettingsFormData>();
  const { isModalOpen, startCloseModal } = useUiStore();
  const { startSavingSetting, message, activeSetting } = useSettingStore();

  useEffect(() => {
    if (activeSetting !== null) {
      reset({
        ...activeSetting,
        startDailyAvailability: formatStringToDate((activeSetting as any).startDailyAvailability),
        endDailyAvailability: formatStringToDate((activeSetting as any).endDailyAvailability),
      } as any);
    }
  }, [activeSetting]);

  useEffect(() => {
    if (message !== undefined) {
      const infoMessage = alertSuccess(message, 'success');
      Swal.fire(infoMessage);
    }
  }, [message]);

  const closeModalAndClean = () => {
    reset();
    clearErrors();
    startCloseModal();
  };

  const onSubmit = async (data: SettingsFormData) => {
    const { startDailyAvailability, endDailyAvailability, ...rest } = data;
    const difference = differenceInSeconds(endDailyAvailability, startDailyAvailability);

    if (isNaN(difference) || difference <= 0) {
      setError('endDailyAvailability', {
        type: 'custom',
      });
      const infoMessage = alertSuccess(
        'Fecha de Fin no puede ser menor o igual que la de Inicio.',
        'error'
      );
      Swal.fire(infoMessage);
      return;
    }

    try {
      // Format to 24hrs
      await startSavingSetting({
        ...rest,
        startDailyAvailability: formatTo24hrs(startDailyAvailability),
        endDailyAvailability: formatTo24hrs(endDailyAvailability),
      } as any);
      closeModalAndClean();
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
      <div className="container">
        <div className="modal-header">
          <h5 className="modal-title">
            <FontAwesomeIcon icon={faWrench} />
            &nbsp;HORARIOS
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
            <div className="row">
              <label className="mr-2" htmlFor="end">
                Hora Inicio:{' '}
              </label>
              <div className="col-md-12 mb-2 customDatePickerWidth">
                <Controller
                  control={control}
                  name="startDailyAvailability"
                  rules={{ required: true }}
                  render={({ field }) => (
                    <DatePicker
                      className={`form-control ${
                        errors.startDailyAvailability ? 'is-invalid' : ''
                      }`}
                      selected={field.value}
                      onChange={(date) => field.onChange(date)}
                      locale="es"
                      timeCaption="Horario"
                      timeIntervals={60}
                      dateFormat="h:mm a"
                      placeholderText="Seleccionar Inicio"
                      showTimeSelectOnly
                      showTimeSelect
                      onKeyDown={(e) => {
                        e.preventDefault();
                      }}
                    />
                  )}
                />
              </div>
              <label className="mr-2 mt-4" htmlFor="end">
                Hora de Fin:{' '}
              </label>
              <div className="col-md-12 customDatePickerWidth">
                <Controller
                  control={control}
                  name="endDailyAvailability"
                  rules={{ required: true }}
                  render={({ field }) => (
                    <DatePicker
                      className={`form-control ${errors.endDailyAvailability ? 'is-invalid' : ''}`}
                      selected={field.value}
                      onChange={(date) => field.onChange(date)}
                      locale="es"
                      timeCaption="Horario"
                      timeIntervals={60}
                      dateFormat="h:mm a"
                      placeholderText="Seleccionar Fin"
                      showTimeSelectOnly
                      showTimeSelect
                      onKeyDown={(e) => {
                        e.preventDefault();
                      }}
                    />
                  )}
                />
              </div>
            </div>
            <button className="btn btn-dark float-right m-4" type="submit">
              <FontAwesomeIcon icon={faFloppyDisk} /> Guardar
            </button>
          </form>
        </div>
      </div>
    </Modal>
  );
};
