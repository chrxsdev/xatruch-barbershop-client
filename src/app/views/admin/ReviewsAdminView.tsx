import { useEffect, useMemo } from 'react'
import Swal from 'sweetalert2'
import { useReviewStore } from '../../../hooks/useReviewStore'
import { Message, SpinnerLoader } from '../../components'
import { ReviewsAdminTable } from '../../components/Reviews/admin/ReviewsAdminTable'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { alertSuccess } from '../../../helpers'

export const ReviewsAdminView = () => {
  const {
    reviews,
    reviewsToApprove,
    isLoadingReviews,
    startLoadingReviews,
    message,
    startSavingApprovedReviews,
  } = useReviewStore()

  useEffect(() => {
    startLoadingReviews(true)
  }, [])

  useEffect(() => {
    if (message !== undefined) {
      const successInfo = alertSuccess(message, 'success')
      Swal.fire(successInfo)
    }
  }, [message])

  const onApprove = () => {
    startSavingApprovedReviews(reviewsToApprove)
  }

  const renderReviews = useMemo(() => {
    if (reviews.length === 0)
      return <Message message={'No parece haber nada por aquí... 😔'} type='dark' />
    return <ReviewsAdminTable data={reviews} />
  }, [reviews])

  return (
    <div className='row'>
      <div className='col-md-12'>
        <h3 style={{ fontSize: '20px', fontWeight: 'bold' }}>Reviews</h3>
        <hr />
      </div>
      <div className='col-md-12'>
        <button
          className={`btn btn-dark ${reviews.length === 0 ? 'd-none' : ''}`}
          onClick={onApprove}
          disabled={reviewsToApprove.length === 0}
        >
          <FontAwesomeIcon icon={faCheck} /> Aprobar
        </button>
        <div className='col-md-12'>{isLoadingReviews ? <SpinnerLoader /> : renderReviews}</div>
      </div>
    </div>
  )
}
