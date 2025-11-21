import { Navigate, Route, Routes } from 'react-router-dom'
import { ServicesPage } from '../pages/admin/ServicesPage'
import { AdminPanelPage } from '../pages'
import { BarbersPage, BookingsPage, ReviewsPage } from '../pages/admin'

export const AdminRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<AdminPanelPage />} />
      <Route path='/barbers' element={<BarbersPage />} />
      <Route path='/services' element={<ServicesPage />} />
      <Route path='/reviews' element={<ReviewsPage />} />
      <Route path='/bookings' element={<BookingsPage />} />
      <Route path='/*' element={<Navigate to={'/settings'} />} />
    </Routes>
  )
}
