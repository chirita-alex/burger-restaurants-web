import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';

import { mockNearbyRestaurants } from '../mocks/data/restaurants.mock';
import { router as appRouter } from './index';

vi.mock('../mocks/utils/delay', () => ({ mockDelay: () => Promise.resolve() }));

vi.mock('../shared/mapWidget/MapWidget', () => ({
  default: () => <div data-testid="map-widget" />,
}));

vi.mock('../hooks/useOnVisible', () => ({
  useOnVisible: () => ({ current: null }),
}));

const routeConfig = appRouter.routes;

const renderAt = (path: string) => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  const router = createMemoryRouter(routeConfig, { initialEntries: [path] });
  return render(
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};

describe('Routes', () => {
  describe('HomePage (/)', () => {
    it('renders the header', async () => {
      renderAt('/');
      expect(screen.getByRole('banner')).toBeInTheDocument();
    });

    it('renders the footer', async () => {
      renderAt('/');
      expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    });

    it('renders nearby restaurant cards after data loads', async () => {
      renderAt('/');
      expect(await screen.findByText(mockNearbyRestaurants[0].name)).toBeInTheDocument();
    });
  });

  describe('RestaurantPage (/restaurant/:id)', () => {
    it('renders restaurant details skeleton initially', () => {
      renderAt('/restaurant/1');
      // Loading skeleton is a plain div with no accessible role
      // eslint-disable-next-line testing-library/no-node-access
      expect(document.querySelector('.restaurant-details--loading')).toBeInTheDocument();
    });

    it('renders restaurant name after data loads', async () => {
      renderAt('/restaurant/1');
      expect(await screen.findByRole('heading', { level: 1 })).toBeInTheDocument();
    });
  });

  describe('Unknown route (404)', () => {
    it('renders the not-found notice for an unknown path', async () => {
      renderAt('/this-route-does-not-exist');
      expect(await screen.findByText('Page not found')).toBeInTheDocument();
    });
  });
});
