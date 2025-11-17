import { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import { AuthRoutes } from '../auth/routes'
import { AdminRoutes, CheckoutRoutes, UserRoutes } from '../app/routes'

import { ServicesPage } from '../app/pages/ServicesPage'
import { LandingPage } from '../app/pages'
import { useAuthStore, useReviewStore } from '../hooks'
import { authStatus } from '../data/data'
import { AuthLoader } from '../ui'
import { useCartStore } from '../hooks/useCartStore'

export const AppRouter = () => {
  const {
    user: { role },
    currentStatus,
    startCheckingToken,
  } = useAuthStore()

  const { startLoadingCart } = useCartStore()
  const { startLoadingApprovedReviews } = useReviewStore()

  // Check Token
  useEffect(() => {
    startCheckingToken()
  }, [])

  // Load Cart
  useEffect(() => {
    if (currentStatus === authStatus[1]) startLoadingCart()
  }, [currentStatus])

  // Load Reviews Landing
  useEffect(() => {
    startLoadingApprovedReviews()
  }, [])

  if (currentStatus === authStatus[0]) return <AuthLoader />

  return (
    <Routes>
      {currentStatus === authStatus[2] ? (
        <Route path='/auth/*' element={<AuthRoutes />} />
      ) : (
        <>
          {role === 'ADMIN' && <Route path='/settings/*' element={<AdminRoutes />} />}
          <Route path='/account/*' element={<UserRoutes />} />
          <Route path='/checkout/*' element={<CheckoutRoutes />} />
        </>
      )}
      <Route path='/' element={<LandingPage />} />
      <Route path='/services' element={<ServicesPage />} />
      <Route path='*' element={<Navigate to={'/'} />} />
    </Routes>
  )
}
