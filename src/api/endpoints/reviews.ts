import axiosInstance from '../axiosInstance';
import type { Review } from '../../types/review';
import type { ReviewsParams, CreateReviewPayload, ReviewsResponse } from '../types';

export const getRestaurantReviews = async (params: ReviewsParams): Promise<ReviewsResponse> => {
  const { data } = await axiosInstance.get('/api/v1/reviews', { params });
  return data;
};

export const createRestaurantReview = async (
  restaurantId: string,
  payload: CreateReviewPayload
): Promise<Review> => {
  const { data } = await axiosInstance.post(`/api/v1/restaurants/${restaurantId}/reviews`, payload);
  return data;
};