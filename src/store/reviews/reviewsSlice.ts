import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { ReviewState } from '../../types/store';

type ReviewType = ReviewState['reviews'][number];

const initialState: ReviewState = {
  reviews: [],
  approvedReviews: [],
  activeReview: null,
  isLoadingReviews: true,
  reviewsToApprove: [],
  message: undefined,
};

export const reviewsSlice = createSlice({
  name: 'review',
  initialState,
  reducers: {
    onAddNewReview: (state, { payload }: PayloadAction<{ reviewSaved: ReviewType; message: string }>) => {
      state.reviews.push(payload.reviewSaved);
      state.message = payload.message;
    },
    onUpdateReview: (state, { payload }: PayloadAction<{ reviewUpdated: ReviewType; message: string }>) => {
      state.reviews = state.reviews.map((review) => {
        if (payload.reviewUpdated.id !== review.id) return review;
        return payload.reviewUpdated;
      });
      state.message = payload.message;
      state.activeReview = null;
    },
    onDeleteReview: (state, { payload }: PayloadAction<{ message: string }>) => {
      state.reviews = state.reviews.filter((review) => {
        return state.activeReview ? review.id !== state.activeReview.id : true;
      });
      state.message = payload.message;
    },
    onLoadReviews: (state, { payload }: PayloadAction<ReviewType[]>) => {
      payload.forEach((review) => {
        const exists = state.reviews.some((reviewInStore) => reviewInStore.id === review.id);
        if (!exists) state.reviews.push(review);
      });
      state.isLoadingReviews = false;
    },
    onClearMessage: (state) => {
      state.message = undefined;
    },
    onSetLoadingReview: (state) => {
      state.isLoadingReviews = false;
    },
    onSetSelectedReview: (state, { payload }: PayloadAction<ReviewType | null>) => {
      state.activeReview = payload;
    },
    onFindUserReview: (state, { payload }: PayloadAction<{ id: string }>) => {
      state.activeReview = state.reviews.find((review) => review.id === payload.id) ?? null;
    },
    onApproveReviews: (state, { payload }: PayloadAction<string>) => {
      if (!state.reviewsToApprove.includes(payload)) {
        state.reviewsToApprove.push(payload);
        return;
      }
      state.reviewsToApprove = state.reviewsToApprove.filter((rev) => rev !== payload);
    },
    onUpdateApprovedReviews: (state, { payload }: PayloadAction<ReviewType[]>) => {
      state.reviews = state.reviews.map((revInStore) => {
        const foundReview = payload.find((rev) => rev.id === revInStore.id);
        if (foundReview) return foundReview;
        revInStore.isApproved = false;
        return revInStore;
      });
      state.reviewsToApprove = [];
    },
    onSetMessage: (state, { payload }: PayloadAction<string>) => {
      state.message = payload;
    },
    onLoadApprovedReviews: (state, { payload }: PayloadAction<ReviewType[]>) => {
      state.approvedReviews = payload;
    },
    onClearReviews: (state) => {
      state.reviews = [];
      state.isLoadingReviews = true;
    },
    onLogoutReviews: (state) => {
      state.reviews = [];
      state.activeReview = null;
      state.isLoadingReviews = true;
      state.reviewsToApprove = [];
      state.message = undefined;
    },
  },
});

export const {
  onAddNewReview,
  onApproveReviews,
  onClearMessage,
  onClearReviews,
  onDeleteReview,
  onFindUserReview,
  onLoadReviews,
  onSetLoadingReview,
  onSetSelectedReview,
  onUpdateReview,
  onUpdateApprovedReviews,
  onLogoutReviews,
  onLoadApprovedReviews,
  onSetMessage,
} = reviewsSlice.actions;
