import { useState } from 'react'
import { useForm } from 'react-hook-form'
import Swal from 'sweetalert2'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { alertSuccess, passwordValidations } from '../../../helpers'
import { updatePassword } from '../../../api/fetch/user'

interface PasswordFormData {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

interface PasswordError {
  message: string
}

const initialForm: PasswordFormData = {
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
}

export const PasswordUpdateView = () => {
  const [passwordErrors, setPasswordErrors] = useState<PasswordError[]>([])

  const {
    register,
    setError,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PasswordFormData>({ defaultValues: initialForm })

  const onSubmit = async (data: PasswordFormData) => {
    if (data.newPassword !== data.confirmPassword) {
      setError('confirmPassword', {
        type: 'custom',
        message: 'Confirmar Contraseña no coincide con Nueva Contraseña.',
      })
      return
    }

    try {
      const message = await updatePassword(data)
      const successMsg = alertSuccess(message)
      Swal.fire(successMsg)
      setPasswordErrors([])
      reset()
    } catch (error: any) {
      const errors = error?.response?.data?.errors || []
      setPasswordErrors(errors)
    }
  }

  return (
    <div className='row'>
      <div className='col-md-12'>
        <h3 style={{ fontSize: '20px', fontWeight: 'bold' }}>Cambiar Contraseña</h3>
        <hr />
      </div>
      <div className='col-md-12 p-0 mb-2'>
        {passwordErrors.length > 0 && (
          <div className='alert alert-danger'>
            <ul className='mb-0'>
              {passwordErrors.map((err, i) => (
                <li key={i}>{err.message}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className='col-md-8'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='mb-2'>
            <label htmlFor='currentPassword' className='form-label'>
              Escribe tu contraseña{' '}
            </label>
            <input
              type='password'
              className={`form-control ${errors.currentPassword ? 'is-invalid' : ''}`}
              id='currentPassword'
              {...register('currentPassword', passwordValidations())}
              autoFocus
            />
            <small className='invalid-feedback text-left'>
              {errors.currentPassword && errors.currentPassword.message}
            </small>
          </div>
          <div className='mb-2'>
            <label htmlFor='newPassword' className='form-label'>
              Nueva Contraseña{' '}
            </label>
            <input
              type='password'
              className={`form-control ${errors.newPassword ? 'is-invalid' : ''}`}
              id='newPassword'
              {...register('newPassword', passwordValidations('newPassword'))}
            />
            <small className='invalid-feedback text-left'>
              {errors.newPassword && errors.newPassword.message}
            </small>
          </div>

          <div className='mb-2'>
            <label htmlFor='confirmPassword' className='form-label'>
              Confirmar Contraseña{' '}
            </label>
            <input
              type='password'
              className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
              id='confirmPassword'
              {...register('confirmPassword', passwordValidations('confirmPassword'))}
            />
            <small className='invalid-feedback text-left'>
              {errors.confirmPassword && errors.confirmPassword.message}
            </small>
          </div>

          <button type='submit' className='btn btn-dark mt-2 float-right'>
            <FontAwesomeIcon icon={faCheck} /> Actualizar
          </button>
        </form>
      </div>
    </div>
  )
}
