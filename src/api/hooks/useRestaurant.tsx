import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { getRestaurantById } from '../endpoints/restaurants';
import type { ApiError } from '../types';
import type { Restaurant } from '../../types/restaurant';

export const useRestaurant = ({ id }: { id: string }): UseQueryResult<Restaurant, ApiError> => {
  return useQuery<Restaurant, ApiError>({
    queryKey: ['restaurant', id],
    queryFn: () => getRestaurantById(id),
    enabled: !!id,
  });
};