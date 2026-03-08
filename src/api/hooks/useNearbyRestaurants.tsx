import { useQuery, type UseQueryResult } from '@tanstack/react-query';

import { getNearbyRestaurants } from '../endpoints/restaurants';
import type { ApiError, NearbyRestaurantsParams, NearbyRestaurantsResponse } from '../types';

export const useNearbyRestaurants = (
  params: NearbyRestaurantsParams
): UseQueryResult<NearbyRestaurantsResponse, ApiError> => {
  return useQuery<NearbyRestaurantsResponse, ApiError>({
    queryKey: ['restaurants', 'nearby', params],
    queryFn: () => getNearbyRestaurants(params),
    enabled: !!params.latitude && !!params.longitude && !!params.radius,
  });
};
