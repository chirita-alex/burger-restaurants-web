import { setupWorker } from 'msw/browser';

import { restaurantHandlers } from './handlers/restaurant.handler';
import { reviewHandlers } from './handlers/review.handler';

export const worker = setupWorker();

worker.use(...restaurantHandlers, ...reviewHandlers);
