import { http, HttpResponse } from 'msw';
import { mockRestaurant, mockNearbyRestaurants } from '../data/restaurants.mock';
import type { NearbyRestaurantsResponse } from '../../api/types';
import { BASE_URL } from '../../api/constants';
import { mockDelay } from '../utils/delay';

const DEFAULT_LIMIT = 7;

export const restaurantHandlers = [
  http.get(`${BASE_URL}/api/v1/restaurants/nearby`, async ({ request }) => {
    await mockDelay();
    const url = new URL(request.url);
    const cursor = url.searchParams.get('cursor');
    const limit = Number(url.searchParams.get('limit')) || DEFAULT_LIMIT;

    const startIndex = cursor
      ? mockNearbyRestaurants.findIndex((r) => r.id === cursor)
      : 0;

    const page = mockNearbyRestaurants.slice(startIndex, startIndex + limit);
    const nextItem = mockNearbyRestaurants[startIndex + limit];

    const response: NearbyRestaurantsResponse = {
      data: page,
      nextCursor: nextItem?.id ?? undefined,
    };

    return HttpResponse.json(response);
  }),

  http.get(`${BASE_URL}/api/v1/restaurants/:id`, async ({ params }) => {
    await mockDelay();
    return HttpResponse.json({
      ...mockRestaurant,
      id: params.id,
    });
  }),
]