import { useEffect, useMemo } from 'react'
import { Message, SpinnerLoader } from '../../components'
import { useServiceStore } from '../../../hooks'
import { ServicesModal } from '../../components/Services/ServicesModal'
import { AddServiceButton } from '../../components/Services/AddServiceButton'
import { ServicesTable } from '../../components/Services/ServicesTable'

export const ServicesManagementView = () => {
  const { isLoadingServices, allServices, startLoadingServices } = useServiceStore()

  useEffect(() => {
    startLoadingServices()
  }, [])

  const renderServices = useMemo(() => {
    if (allServices.length === 0)
      return <Message message={'No parece haber nada por aquí... 😔'} type='dark' />
    return <ServicesTable data={allServices} />
  }, [allServices])

  return (
    <div className='row'>
      <div className='col-md-12'>
        <h3 style={{ fontSize: '20px', fontWeight: 'bold' }}>Gestión de Servicios</h3>
        <hr />
      </div>
      <div className='col-md-12 mb-2'>
        <AddServiceButton />
      </div>
      <hr />
      <div className='col-md-12'>{isLoadingServices ? <SpinnerLoader /> : renderServices}</div>
      <ServicesModal />
    </div>
  )
}
