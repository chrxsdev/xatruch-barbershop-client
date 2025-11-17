import { useEffect, useMemo } from 'react'
import { useReviewStore } from '../../../hooks/useReviewStore'
import { AddReviewButton, ReviewsModal, ReviewsTable } from '../../components/Reviews'
import { Message, SpinnerLoader } from '../../components'

export const UserReviewsView = () => {
  const { reviews, isLoadingReviews, startLoadingReviews } = useReviewStore()

  console.log(reviews)

  useEffect(() => {
    startLoadingReviews()
  }, [])

  const renderUserReviews = useMemo(() => {
    if (reviews.length === 0)
      return <Message message={'No parece haber nada por aquí... 😔'} type='dark' />
    return <ReviewsTable data={reviews} />
  }, [reviews])

  return (
    <div className='row'>
      <div className='col-md-12'>
        <h3 style={{ fontSize: '20px', fontWeight: 'bold' }}>Reviews</h3>
        <hr />
      </div>
      <div className='col-md-12 mb-2'>
        <AddReviewButton />
      </div>
      <div className='col-md-12'>{isLoadingReviews ? <SpinnerLoader /> : renderUserReviews}</div>
      <ReviewsModal />
    </div>
  )
}
