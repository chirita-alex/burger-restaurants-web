import { http, HttpResponse } from 'msw';

import { BASE_URL } from '../../api/constants';
import type { ReviewsResponse } from '../../api/types';
import { mockReviews } from '../data/reviews.mock';
import { mockDelay } from '../utils/delay';

const DEFAULT_LIMIT = 3;

export const reviewHandlers = [
  http.get(`${BASE_URL}/api/v1/reviews`, async ({ request }) => {
    await mockDelay();
    const url = new URL(request.url);
    const cursor = url.searchParams.get('cursor');
    const limit = Number(url.searchParams.get('limit')) || DEFAULT_LIMIT;

    const startIndex = cursor ? mockReviews.findIndex((r) => r.id === cursor) : 0;

    const page = mockReviews.slice(startIndex, startIndex + limit);
    const nextItem = mockReviews[startIndex + limit];

    const response: ReviewsResponse = {
      data: page,
      nextCursor: nextItem?.id ?? undefined,
    };

    return HttpResponse.json(response);
  }),

  http.post(`${BASE_URL}/api/v1/restaurants/:restaurantId/reviews`, async ({ request }) => {
    await mockDelay();
    const body = (await request.json()) as Record<string, unknown>;
    return HttpResponse.json({ id: `review-${Date.now()}`, ...body }, { status: 201 });
  }),
];
