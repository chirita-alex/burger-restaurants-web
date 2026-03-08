import { useQuery, type UseQueryResult } from '@tanstack/react-query';

import type { Restaurant } from '../../types/restaurant';
import { getRestaurantById } from '../endpoints/restaurants';
import type { ApiError } from '../types';

export const useRestaurant = ({ id }: { id: string }): UseQueryResult<Restaurant, ApiError> => {
  return useQuery<Restaurant, ApiError>({
    queryKey: ['restaurant', id],
    queryFn: () => getRestaurantById(id),
    enabled: !!id,
  });
};