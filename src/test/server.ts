import { setupServer } from 'msw/node';

import { restaurantHandlers } from '../mocks/handlers/restaurant.handler';
import { reviewHandlers } from '../mocks/handlers/review.handler';

export const server = setupServer(...restaurantHandlers, ...reviewHandlers);
