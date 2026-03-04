import { getRestaurantReviews } from "../endpoints/reviews";
import { useInfiniteQuery, type UseInfiniteQueryResult, type InfiniteData } from "@tanstack/react-query";
import type { ApiError, ReviewsParams, ReviewsResponse } from "../types";

export const useRestaurantReviews = (
  params: Omit<ReviewsParams, "cursor">
): UseInfiniteQueryResult<InfiniteData<ReviewsResponse, unknown>, ApiError> => {
  return useInfiniteQuery<ReviewsResponse, ApiError>({
    queryKey: ["reviews", params.restaurantId],
    queryFn: () =>
      getRestaurantReviews({
        ...params,
        cursor: undefined, // TODO: add cursor support when testing pagination with mocks
      }),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    enabled: !!params.restaurantId,
  });
};
