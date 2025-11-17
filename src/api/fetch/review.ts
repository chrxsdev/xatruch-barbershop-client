import xatruchBarberApi from '../clientApi';
import type { ApiResponse } from '../../types/api';
import type { Review } from '../../types/entities';

interface SaveReviewParams {
  title: string;
  review: string;
}

interface UpdateReviewParams extends SaveReviewParams {
  id: string;
}

interface ReviewResponse {
  review: Review;
  message: string;
}

interface ApproveReviewsResponse {
  reviews: Review[];
  message: string;
}

// GET
export const getUserReviews = async (): Promise<Review[]> => {
  const {
    data: { data },
  } = await xatruchBarberApi.get<ApiResponse<Review[]>>('/reviews/my-reviews');
  return data;
};

// GET ALL
export const getReviews = async (approved = false): Promise<Review[]> => {
  const {
    data: { data },
  } = await xatruchBarberApi.get<ApiResponse<Review[]>>(`/reviews?approved=${approved}`);
  return data;
};

// PUT
export const updateReview = async ({ id, title, review }: UpdateReviewParams): Promise<ReviewResponse> => {
  const {
    data: {
      data: { user, ...rest },
      message,
    },
  } = await xatruchBarberApi.put<ApiResponse<Review>>(`/reviews/${id}`, { title, review });
  return {
    review: rest as Review,
    message: message ?? '',
  };
};

// POST
export const saveReview = async (title: string, review: string): Promise<ReviewResponse> => {
  const {
    data: {
      data: { user, ...rest },
      message,
    },
  } = await xatruchBarberApi.post<ApiResponse<Review>>('/reviews', { title, review });
  return {
    review: rest as Review,
    message: message ?? '',
  };
};

// POST
export const approveReviews = async (reviewsId: string[] = []): Promise<ApproveReviewsResponse> => {
  const {
    data: { data, message },
  } = await xatruchBarberApi.post<ApiResponse<Review[]>>(`/reviews/approve?ids=${reviewsId.join(',')}`);
  return {
    reviews: data,
    message: message ?? '',
  };
};

// DELETE
export const deleteReview = async (id: string): Promise<string> => {
  const {
    data: { message },
  } = await xatruchBarberApi.delete<ApiResponse<null>>(`/reviews/${id}`);
  return message ?? '';
};
