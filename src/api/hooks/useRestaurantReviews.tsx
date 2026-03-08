import {
  type InfiniteData,
  useInfiniteQuery,
  type UseInfiniteQueryResult,
} from '@tanstack/react-query';

import { getRestaurantReviews } from '../endpoints/reviews';
import type { ApiError, ReviewsParams, ReviewsResponse } from '../types';

export const useRestaurantReviews = (
  params: Omit<ReviewsParams, 'cursor'>
): UseInfiniteQueryResult<InfiniteData<ReviewsResponse, unknown>, ApiError> => {
  return useInfiniteQuery<ReviewsResponse, ApiError>({
    queryKey: ['reviews', params],
    queryFn: ({ pageParam }) =>
      getRestaurantReviews({
        ...params,
        cursor: pageParam as string | undefined,
      }),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    enabled: !!params.restaurantId,
  });
};
