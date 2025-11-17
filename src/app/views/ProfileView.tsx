import { useEffect, useRef } from 'react'
import Swal from 'sweetalert2'
import { useForm } from 'react-hook-form'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faUpload } from '@fortawesome/free-solid-svg-icons'
import { useAuthStore } from '../../hooks/useAuthStore'
import { alertSuccess, emailValidations, fullNameValidations } from '../../helpers'
import { SpinnerLoader } from '../components/SpinnerLoader'
import type { ValidationError } from '../../types/store'

interface ProfileFormData {
  fullName: string
  email: string
}

export const ProfileView = () => {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const {
    user,
    isLoadingPicture,
    startUpdateAuthProfile,
    startUploadingProfilePicture,
    message,
    errors: userErrors,
  } = useAuthStore()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileFormData>()

  useEffect(() => {
    if (user) {
      reset(user)
    }
  }, [user, reset])

  const onUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files || files.length === 0) return

    const fileSizeKb = files[0].size / 1024
    if (fileSizeKb > 1024) {
      const errorMsg = alertSuccess('Tamaño de imagen mayor a 1MB.', 'error')
      Swal.fire(errorMsg)
      return
    }

    startUploadingProfilePicture(files[0]).then(() => {
      const successMsg = alertSuccess('Subida de Imagen Exitosa')
      Swal.fire(successMsg)
    })
  }

  const onSubmit = (data: ProfileFormData) => {
    const { fullName, email } = data
    startUpdateAuthProfile({ fullName, email }).then(() => {
      const successMsg = alertSuccess('Perfil Actualizado Exitosamente')
      Swal.fire(successMsg)
    })
  }

  return (
    <div className='row'>
      <div className='col-md-12'>
        <h3 style={{ fontSize: '20px', fontWeight: 'bold' }}>Cuenta</h3>
        <hr />
      </div>
      <div className='col-md-12 p-0 mb-2'>
        {userErrors.length > 0 && (
          <div className='alert alert-danger'>
            <b>{message}</b>
            <ul className='mb-0'>
              {userErrors.map((err: ValidationError, i: number) => (
                <li key={i}>{err.message}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className='col-md-4'>
        <div className='col-md-12 text-center'>
          {isLoadingPicture ? (
            <SpinnerLoader />
          ) : (
            <img
              className='rounded-circle img-fluid profile-picture'
              src={user?.profileUrl}
              alt='user-photo'
            />
          )}
        </div>
        <input
          type='file'
          accept='.jpg,.jpeg,.png'
          onChange={onUpload}
          ref={fileInputRef}
          style={{ display: 'none' }}
        />
        <span className='float-right p-2'>
          <small className='text-secondary mr-2' style={{ fontSize: '12px' }}>
            Tamaño máximo: 1MB.
          </small>
          <FontAwesomeIcon
            style={{ cursor: 'pointer' }}
            onClick={() => fileInputRef.current?.click()}
            icon={faUpload}
          />
        </span>
      </div>

      <div className='col-md-8'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='mb-2'>
            <label htmlFor='fullName' className='form-label'>
              Nombre Completo{' '}
            </label>
            <input
              type='text'
              className={`form-control ${errors.fullName ? 'is-invalid' : ''}`}
              id='fullName'
              placeholder='John Doe'
              {...register('fullName', fullNameValidations)}
              autoFocus
            />
            <small className='invalid-feedback text-left'>
              {errors.fullName && errors.fullName.message}
            </small>
          </div>
          <div className='mb-2'>
            <label htmlFor='email' className='form-label'>
              Email{' '}
            </label>
            <input
              type='text'
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              id='email'
              placeholder='johndoe@email.com'
              {...register('email', emailValidations)}
            />
            <small className='invalid-feedback text-left'>
              {errors.email && errors.email.message}
            </small>
          </div>

          <button type='submit' className='btn btn-dark mt-2 float-right'>
            <FontAwesomeIcon icon={faCheck} /> Guardar
          </button>
        </form>
      </div>
    </div>
  )
}
