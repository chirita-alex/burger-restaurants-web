import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { http, HttpResponse } from 'msw';
import NearbyRestaurants from './NearbyRestaurants';
import { server } from '../../test/server';
import { BASE_URL } from '../../api/constants';
import { mockNearbyRestaurants } from '../../mocks/data/restaurants.mock';

vi.mock('../../mocks/utils/delay', () => ({ mockDelay: () => Promise.resolve() }));

vi.mock('../../shared/mapWidget/MapWidget', () => ({
  default: () => <div data-testid="map-widget" />,
}));

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return ({ children }: { children: React.ReactNode }) => {
    const router = createMemoryRouter([{ path: '/', element: children }]);
    return (
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    );
  };
};

describe('NearbyRestaurants - integration', () => {
  it('shows skeleton cards while loading', () => {
    render(<NearbyRestaurants />, { wrapper: createWrapper() });
    expect(screen.getByRole('list')).toHaveAttribute('aria-busy', 'true');
  });

  it('renders restaurant cards after data loads', async () => {
    render(<NearbyRestaurants />, { wrapper: createWrapper() });
    await screen.findByText(mockNearbyRestaurants[0].name);
    expect(screen.getByText(mockNearbyRestaurants[0].name)).toBeInTheDocument();
  });

  it('renders the map widget after data loads', async () => {
    render(<NearbyRestaurants />, { wrapper: createWrapper() });
    await screen.findByTestId('map-widget');
  });

  it('shows error notice when API fails', async () => {
    server.use(
      http.get(`${BASE_URL}/api/v1/restaurants/nearby`, () =>
        HttpResponse.json({ message: 'Server error' }, { status: 500 })
      )
    );
    render(<NearbyRestaurants />, { wrapper: createWrapper() });
    await screen.findByText('Failed to load restaurants');
  });

  it('shows empty notice when API returns no restaurants', async () => {
    server.use(
      http.get(`${BASE_URL}/api/v1/restaurants/nearby`, () =>
        HttpResponse.json({ data: [], nextCursor: undefined })
      )
    );
    render(<NearbyRestaurants />, { wrapper: createWrapper() });
    await screen.findByText('No restaurants found');
  });
});
