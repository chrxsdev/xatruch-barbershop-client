import { useEffect, useMemo } from 'react'
import { useSettingStore } from '../../../hooks'
import {
  AddSettingButton,
  Message,
  SettingsModal,
  SettingsTable,
  SpinnerLoader,
} from '../../components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons'
import type { ValidationError } from '../../../types/store'

export const SettingsView = () => {
  const { isLoadingSetting, settings, settingErrors, startLoadingSettings } = useSettingStore()

  useEffect(() => {
    startLoadingSettings()
  }, [])

  const renderSettings = useMemo(() => {
    if (settings.length === 0)
      return <Message message={'No parece haber nada por aquí... 😔'} type='dark' />
    return <SettingsTable data={settings} />
  }, [settings])

  return (
    <div className='row'>
      <div className='col-md-12'>
        <h3 style={{ fontSize: '20px', fontWeight: 'bold' }}>Horarios</h3>
        <hr />
      </div>
      <div className='col-md-12 mb-2'>
        <AddSettingButton />
      </div>
      <div className='col-md-12'>
        {settingErrors.length > 0 && (
          <div className='alert alert-danger'>
            <span>
              <FontAwesomeIcon icon={faCircleExclamation} /> <b> Error: </b>{' '}
            </span>
            <ul>
              {settingErrors.map((err: ValidationError, i: number) => (
                <li key={i}>{err.message}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <hr />
      <div className='col-md-12'>{isLoadingSetting ? <SpinnerLoader /> : renderSettings}</div>
      <SettingsModal />
    </div>
  )
}
