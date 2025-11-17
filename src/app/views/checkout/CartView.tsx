import { useEffect } from 'react'
import Swal from 'sweetalert2'
import { faBars, faCalendarDays, faCartShopping, faMoneyBill } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import { useCartStore } from '../../../hooks/useCartStore'
import { ItemCard } from '../../components/Checkout/ItemCard'
import { alertSuccess } from '../../../helpers'
import { Message } from '../../components/Message'
import type { CartItem } from '../../../types/entities'

export const CartView = () => {
  const { cart, startDeletingFromCart, message } = useCartStore()

  useEffect(() => {
    if (message !== undefined) {
      const successInfo = alertSuccess(message, 'success')
      Swal.fire(successInfo)
    }
  }, [message])

  const onDeleteServiceInCart = (id: string) => {
    startDeletingFromCart(id)
  }

  return (
    <div className='container-fluid' style={{ marginTop: '120px' }}>
      <h2 className='mb-4' style={{ fontWeight: 'bold' }}>
        <FontAwesomeIcon icon={faCartShopping} /> Mi Carrito
      </h2>
      {cart.length > 0 ? (
        <div className='row'>
          <div className='col-md-8'>
            <div className='card-header'>
              <strong>
                <FontAwesomeIcon icon={faBars} /> Servicios
              </strong>
            </div>
            <div>
              {cart.map((serv: CartItem, i: number) => (
                <ItemCard
                  key={i}
                  serviceName={serv.serviceName}
                  price={serv.price}
                  serviceId={serv.serviceId}
                  onDelete={onDeleteServiceInCart}
                />
              ))}
            </div>
          </div>
          <div className='col-md-4'>
            <div className='card-header'>
              <strong>
                <FontAwesomeIcon icon={faMoneyBill} /> Pago
              </strong>
            </div>
            <div className='mt-4'>
              <p>Total a pagar:</p>
              <h5 className='card-title'>
                L. {cart.reduce((prev: number, curr: CartItem) => prev + curr.price, 0).toFixed(2)}
              </h5>
              <Link to={'/checkout/pick-a-time'} className='btn btn-dark float-right'>
                <FontAwesomeIcon icon={faCalendarDays} /> Checkout
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <Message message={'No hay servicios en el carrito 🛒...'} type={'dark'} />
      )}
    </div>
  )
}
