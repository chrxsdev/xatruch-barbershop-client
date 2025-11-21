import { Navigate, Route, Routes } from 'react-router-dom'
import { UserPage } from '../pages'
import { UserBookingsPage, UserPasswordPage, UserReviewsPage } from '../pages/user'

export const UserRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<UserPage />} />
      <Route path='/change-password' element={<UserPasswordPage />} />
      <Route path='/reviews' element={<UserReviewsPage />} />
      <Route path='/bookings' element={<UserBookingsPage />} />
      <Route path='/*' element={<Navigate to={'/account'} />} />
    </Routes>
  )
}
