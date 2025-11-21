import { Navigate, Route, Routes } from 'react-router-dom'
import { CartPage } from '../pages/checkout/CartPage'
import { PickTimePage } from '../pages/checkout/PickTimePage'

export const CheckoutRoutes = () => {
  return (
    <Routes>
      <Route path='/my-cart' element={<CartPage />} />
      <Route path='/pick-a-time' element={<PickTimePage />} />
      <Route path='/*' element={<Navigate to={'/my-cart'} />} />
    </Routes>
  )
}
