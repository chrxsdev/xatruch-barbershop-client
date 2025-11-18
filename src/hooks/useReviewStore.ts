import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '../store/store';
import {
  approveReviews,
  deleteReview,
  getReviews,
  getUserReviews,
  saveReview,
  updateReview,
} from '../api/fetch/review';
import { reviews as ReviewStore } from '../store';

interface ReviewData {
  id?: string;
  title: string;
  review: string;
}

export const useReviewStore = () => {
  const {
    reviews,
    reviewsToApprove,
    approvedReviews,
    activeReview,
    isLoadingReviews,
    message,
  } = useSelector((state: any) => state.review);
  const dispatch = useDispatch<AppDispatch>();

  const startSetActiveUserReview = (id: string) => {
    dispatch(ReviewStore.onFindUserReview({ id }));
  };

  // Loading Reviews
  const startLoadingReviews = async (isAdmin = false) => {
    dispatch(ReviewStore.onClearReviews());
    if (!isAdmin) {
      const userReviews = await getUserReviews();
      dispatch(ReviewStore.onLoadReviews(userReviews));
      return;
    }
    const allReviews = await getReviews();
    dispatch(ReviewStore.onLoadReviews(allReviews));
  };

  // Add/remove to Approve
  const startApprovingReviews = (id: string) => {
    dispatch(ReviewStore.onApproveReviews(id));
  };

  // Start Loading Aproved Reviews
  const startLoadingApprovedReviews = async () => {
    try {
      const allReviews = await getReviews(true);
      dispatch(ReviewStore.onLoadApprovedReviews(allReviews));
    } catch (error) {
      dispatch(ReviewStore.onLoadApprovedReviews([]));
    }
  };

  // Start Approving Reviews
  const startSavingApprovedReviews = async (ids: string[]) => {
    const { reviews: approvedReviews, message } = await approveReviews(ids);
    dispatch(ReviewStore.onUpdateApprovedReviews(approvedReviews));
    dispatch(ReviewStore.onSetMessage(message));
    setTimeout(() => {
      dispatch(ReviewStore.onClearMessage());
    }, 5);
  };

  const startSetIsLoadingUserReviews = () => {
    dispatch(ReviewStore.onSetLoadingReview());
  };

  const setActiveReview = (review: any) => {
    dispatch(ReviewStore.onSetSelectedReview(review));
  };

  const startSavingReview = async ({ id, title, review }: ReviewData) => {
    if (id) {
      const { review: reviewUpdated, message } = await updateReview({
        id,
        title,
        review,
      });
      dispatch(ReviewStore.onUpdateReview({ reviewUpdated, message }));
      setTimeout(() => {
        dispatch(ReviewStore.onClearMessage());
      }, 10);
      return;
    }
    const { review: reviewSaved, message } = await saveReview(title, review);
    dispatch(ReviewStore.onAddNewReview({ reviewSaved, message }));
    setTimeout(() => {
      dispatch(ReviewStore.onClearMessage());
    }, 10);
  };

  const startDeletingUserReview = async (id: string) => {
    const message = await deleteReview(id);
    dispatch(ReviewStore.onDeleteReview({ message }));
    setTimeout(() => {
      dispatch(ReviewStore.onClearMessage());
    }, 10);
  };

  return {
    // props
    activeReview,
    isLoadingReviews,
    message,
    approvedReviews,
    reviews,
    reviewsToApprove,

    // methods
    setActiveReview,
    startDeletingUserReview,
    startSavingReview,
    startLoadingApprovedReviews,
    startSetActiveUserReview,
    startSetIsLoadingUserReviews,
    startLoadingReviews,
    startApprovingReviews,
    startSavingApprovedReviews,
  };
};
