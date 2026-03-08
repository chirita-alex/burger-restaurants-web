import type { Restaurant } from '../../types/restaurant';
import axiosInstance from '../axiosInstance';
import type { NearbyRestaurantsParams, NearbyRestaurantsResponse } from '../types';

export const getRestaurantById = async (id: string): Promise<Restaurant> => {
  const { data } = await axiosInstance.get(`/api/v1/restaurants/${id}`);
  return data;
};

export const getNearbyRestaurants = async (
  params: NearbyRestaurantsParams
): Promise<NearbyRestaurantsResponse> => {
  const { data } = await axiosInstance.get('/api/v1/restaurants/nearby', { params });
  return data;
};
