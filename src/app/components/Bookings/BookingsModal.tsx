import { useMemo } from 'react';
import Modal from 'react-modal';
import { faCalendarCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { customStyles, formatTime } from '../../../helpers';
import { useUiStore, useBookingStore } from '../../../hooks';
import { SpinnerLoader } from '../SpinnerLoader';
import type { UserBookingDetail } from '../../../types/entities';

Modal.setAppElement('#root');

export const BookingsModal = () => {
  const { isModalOpen, startCloseModal } = useUiStore();
  const { userbookingDetail, activeBooking, isLoadingDetail } = useBookingStore();

  const closeModalAndClean = () => {
    startCloseModal();
  };

  const total = useMemo(() => {
    return userbookingDetail.reduce((prev: number, curr: UserBookingDetail) => prev + curr.price, 0);
  }, [userbookingDetail]);

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
            <FontAwesomeIcon icon={faCalendarCheck} />
            &nbsp;BOOKINGS
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
        {isLoadingDetail ? (
          <div className="text-center p-4">
            <SpinnerLoader />
          </div>
        ) : (
          <div className="modal-body animate__animated animate__fadeIn">
            <div className="row mb-4">
              <div className="col-md-4">
                <b>Código:</b> <br /> {activeBooking?.id}
              </div>
              <div className="col-md-4">
                <b>Fecha de Sesión: </b> {activeBooking?.bookingDate}
              </div>
              <div className="col-md-4">
                <b>Hora de Sesión: </b> {formatTime(activeBooking?.bookingTime)}
              </div>
            </div>
            <div className="row mb-4">
              <div className="col-md-6">
                <b>Barbero: </b> {activeBooking?.barber}
              </div>
              <div className="col-md-6">
                <b>Cliente: </b> {activeBooking?.user}
              </div>
            </div>

            <div className="row">
              <div className="col-md-12">
                <table className="table table-bordered w-100">
                  <thead>
                    <tr>
                      <th scope="col">Servicio</th>
                      <th scope="col">Precio</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userbookingDetail.map((detail: UserBookingDetail, i: number) => (
                      <tr key={i}>
                        <td>{detail.serviceName}</td>
                        <td className='text-right'>L. {detail.price.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 text-right p-4">
                <b>Total: </b>
                <span>L. {total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};
