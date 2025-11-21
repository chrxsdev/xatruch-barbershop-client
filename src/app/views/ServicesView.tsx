import { useEffect, useMemo } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { useForm } from 'react-hook-form'
import { useServiceStore } from '../../hooks'
import { Message, SpinnerLoader } from '../components'
import { ServicesGrid } from '../components/Services'

interface SearchFormData {
  searchText: string
}

export const ServicesView = () => {
  const {
    isLoadingServices,
    services,
    message,
    startLoadingServices,
    startFilteringServices,
    startFilteringReset,
  } = useServiceStore()

  const { register, handleSubmit } = useForm<SearchFormData>({
    defaultValues: {
      searchText: '',
    },
  })

  useEffect(() => {
    startLoadingServices()
  }, [])

  const onSearchSubmit = (data: SearchFormData) => {
    const { searchText } = data
    if (searchText.length === 0) return

    startFilteringServices(searchText)
  }

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchChange = e.target.value
    if (!!searchChange || searchChange.length === 0) startFilteringReset()
  }

  const renderServices = useMemo(() => {
    if (services.length === 0) {
      const messageText = message?.text || 'Lo sentimos, no encontramos los servicios 😔';
      const messageType = message?.type || 'dark';
      return <Message message={messageText} type={messageType} />
    }
    return <ServicesGrid services={services} />
  }, [message, services])


  return (
    <div className='container-fluid'>
      <div className='container'>
        <div className='row p-4'>
          <div className='col-md-5'>
            <h4>
              {' '}
              <b> Filtrar </b>
            </h4>
            <hr />
            <form onSubmit={handleSubmit(onSearchSubmit)}>
              <div className='form-row'>
                <div className='col-md-10 mt-2'>
                  <input
                    type='text'
                    className='form-control'
                    {...register('searchText', {
                      onChange: onChangeSearch,
                    })}
                    autoComplete='off'
                    placeholder='Nombre del Servicio...'
                  />
                </div>
                <div className='col-md-2 mt-2'>
                  <button className='btn btn-dark'>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                  </button>
                </div>
                <small className='form-text text-muted'>
                  Ej. Mascarilla, Corte para Caballero...
                </small>
              </div>
            </form>
          </div>
          <div className='col-md-7'>
            <h4>
              <b>Servicios Disponibles</b>
            </h4>
            <hr />
            {isLoadingServices ? <SpinnerLoader /> : renderServices}
          </div>
        </div>
      </div>
    </div>
  )
}
