import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Controller, useForm } from 'react-hook-form';
import {
  faCalendar,
  faCartShopping,
  faCircleInfo,
  faClock,
  faListCheck,
  faRotateLeft,
  faUser,
} from '@fortawesome/free-solid-svg-icons';

import DatePicker from 'react-datepicker';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useCartStore } from '../../../hooks/useCartStore';
import { Message, SpinnerLoader } from '../../components';

import 'react-datepicker/dist/react-datepicker.min.css';
import { useBarberStore } from '../../../hooks';
import { addDays } from 'date-fns';
import { alertSuccess, formatFullDate, formatTime, formatToValidDate } from '../../../helpers';
import type { CartItem, Barber } from '../../../types/entities';

interface PickTimeFormData {
  bookingDate: Date;
  bookingTime: string;
  barberId: string;
}

const init: PickTimeFormData = {
  bookingDate: addDays(new Date(), 1),
  bookingTime: '',
  barberId: '',
};

export const PickTimeView = () => {
  const navigate = useNavigate();

  const { cart, availableBarbers, startAddingSession, startLoadingAvailableBarbers, isProcessing, message } =
    useCartStore();
  const { barbers, startLoadingBarbers } = useBarberStore();

  const {
    register,
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<PickTimeFormData>({ defaultValues: init });

  useEffect(() => {
    if (message !== undefined) {
      const successInfo = alertSuccess(message, 'success', 5000);
      Swal.fire(successInfo);
    }
  }, [message]);

  useEffect(() => {
    startLoadingBarbers();
  }, []);

  const onSelectBarber = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const barberId = event.target.value;
    if (!barberId) return;
    const date = formatToValidDate(getValues('bookingDate'));
    startLoadingAvailableBarbers(barberId, date);
  };

  const onSelectBookingDate = (date: Date | null) => {
    if (!date) return;
    const barberId = getValues('barberId');
    if (!barberId) return;
    const formattedDate = formatToValidDate(date);
    startLoadingAvailableBarbers(barberId, formattedDate);
  };

  const onBookSession = (data: PickTimeFormData) => {
    const { bookingDate, bookingTime, barberId } = data;
    const booking = {
      bookingDate: formatFullDate(bookingDate),
      bookingTime: bookingTime,
      barberId,
    };

    startAddingSession(booking).then(() => {
      navigate('/account/bookings')
    });
  };

  if (isProcessing)
    return (
      <div className='container text-center' style={{ marginTop: '20%' }}>
        <SpinnerLoader />
      </div>
    );

  return (
    <div className='container-fluid' style={{ marginTop: '120px' }}>
      {cart.length === 0 ? (
        <>
          <Message message={`Agregue servicios al carrito para continuar 🛒 ...`} type={'dark'} />
          <div className='text-center mt-4'>
            <a href='/services'>
              <FontAwesomeIcon icon={faRotateLeft} /> Ir a Servicios
            </a>
          </div>
        </>
      ) : (
        <>
          <h2 className='mb-4' style={{ fontWeight: 'bold' }}>
            <FontAwesomeIcon icon={faCartShopping} /> Checkout
          </h2>
          <form onSubmit={handleSubmit(onBookSession)}>
            <div className='row'>
              <div className='col-md-6 mb-2'>
                <div className='card-header'>
                  <strong>
                    <FontAwesomeIcon icon={faCalendar} /> Seleccionar un Horario
                  </strong>
                </div>
                <div className='mt-4 customDatePickerWidth'>
                  <Controller
                    name='bookingDate'
                    control={control}
                    rules={{
                      required: {
                        value: true,
                        message: 'Fecha de Sesión es requerida.',
                      },
                    }}
                    render={({ field }) => (
                      <DatePicker
                        showIcon
                        className={`form-control ${errors.bookingDate ? 'is-invalid' : ''}`}
                        locale='es'
                        dateFormat='P'
                        minDate={addDays(new Date(), 1)}
                        onChange={(date) => {
                          field.onChange(date);
                          onSelectBookingDate(date);
                        }}
                        selected={field.value}
                        placeholderText='Fecha de Sesión'
                      />
                    )}
                  />
                  <small className='text-danger text-left'>{errors.bookingDate?.message}</small>
                </div>
              </div>
              <div className='col-md-6'>
                <div className='card-header'>
                  <strong>
                    <FontAwesomeIcon icon={faUser} /> Seleccionar Barbero
                  </strong>
                </div>
                <div className='mt-4'>
                  <select
                    className={`custom-select ${errors.barberId ? 'is-invalid' : ''}`}
                    {...register('barberId', {
                      required: {
                        value: true,
                        message: 'Seleccione un barbero.',
                      },
                      onChange: onSelectBarber,
                    })}
                  >
                    <option value=''>-- Seleccionar --</option>
                    {barbers.map((barber: Barber, i: number) => (
                      <option key={i} value={barber.id}>
                        {barber.fullName}
                      </option>
                    ))}
                  </select>
                  <small className='invalid-feedback text-left'>{errors.barberId?.message}</small>
                </div>
              </div>
            </div>
            <div className='row mt-4'>
              <div className='col-md-6 mb-2'>
                <div className='card-header'>
                  <strong>
                    <FontAwesomeIcon icon={faListCheck} /> Horarios Disponibles
                  </strong>
                </div>
                <div className='mt-4'>
                  <select
                    className={`custom-select ${errors.bookingTime ? 'is-invalid' : ''}`}
                    {...register('bookingTime', {
                      required: {
                        value: true,
                        message: 'Seleccione un horario.',
                      },
                    })}
                  >
                    <option value=''>-- Seleccionar --</option>
                    {availableBarbers.length > 0 &&
                      availableBarbers.map((schedule: string, i: number) => (
                        <option key={i} value={schedule}>
                          {formatTime(schedule)}
                        </option>
                      ))}
                  </select>
                  <small className='invalid-feedback text-left'>{errors.bookingTime?.message}</small>
                </div>
              </div>
              <div className='col-md-6'>
                <div className=''>
                  <div className='card-header'>
                    <strong>
                      <FontAwesomeIcon icon={faCircleInfo} /> Detalle
                    </strong>
                  </div>
                  <div className=''>
                    <p className='mt-4'>
                      <b>Servicios:</b>
                    </p>
                    <div>
                      <ul className='list-group list-group-flush'>
                        {cart.map((serv: CartItem, i: number) => (
                          <li className='list-group-item' key={i}>
                            {serv.serviceName}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <p className='mt-4'>
                      <b>Total:</b>
                    </p>
                    <h4 className='card-title'>
                      L. {cart.reduce((prev: number, curr: CartItem) => prev + curr.price, 0).toFixed(2)}
                    </h4>
                  </div>

                  <button type='submit' className='btn btn-dark float-right'>
                    <FontAwesomeIcon icon={faClock} /> Agendar
                  </button>
                </div>
              </div>
            </div>
          </form>
        </>
      )}
    </div>
  );
};
