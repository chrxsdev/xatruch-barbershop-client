import { useEffect, useMemo } from 'react'
import { Message, SpinnerLoader } from '../../components'
import { AddBarberButton, BarbersModal, BarbersTable } from '../../components/Barbers'
import { useBarberStore } from '../../../hooks'

export const BarbersView = () => {
  const { barbers, startLoadingBarbers, isLoadingBarbers } = useBarberStore()

  useEffect(() => {
    startLoadingBarbers()
  }, [])

  const renderBarbers = useMemo(() => {
    if (barbers.length === 0)
      return <Message message={'No parece haber nada por aquí... 😔'} type='dark' />
    return <BarbersTable data={barbers} />
  }, [barbers])

  return (
    <div className='row'>
      <div className='col-md-12'>
        <h3 style={{ fontSize: '20px', fontWeight: 'bold' }}>Barberos</h3>
        <hr />
      </div>
      <div className='col-md-12 mb-2'>
        <AddBarberButton />
      </div>
      <hr />
      <div className='col-md-12'>{isLoadingBarbers ? <SpinnerLoader /> : renderBarbers}</div>
      <BarbersModal />
    </div>
  )
}
