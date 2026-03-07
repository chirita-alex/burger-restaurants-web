import type { NearbyRestaurant } from "../types/restaurant";
import type { Review } from "../types/review";

export type PaginatedParams<T = object> = T & {
  cursor?: string;
  limit?: number;
};

export type ReviewsParams = PaginatedParams<{
  restaurantId: string;
}>;

export type PaginatedResponse<T> = {
  data: T[];
  nextCursor?: string;
};

export type NearbyRestaurantsParams = PaginatedParams<{
  latitude: number;
  longitude: number;
  radius: number;
}>;

export type NearbyRestaurantsResponse = PaginatedResponse<NearbyRestaurant>;

export type ReviewsResponse = PaginatedResponse<Review>;

export type CreateReviewPayload = Omit<Review, 'id'>;

export type ApiError = {
  message: string;
  status: number;
  code?: string; // e.g. RESTAURANT_NOT_FOUND or VALIDATION_ERROR??
}