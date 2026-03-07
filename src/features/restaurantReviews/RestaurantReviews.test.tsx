import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { http, HttpResponse } from 'msw';
import RestaurantReviews from './RestaurantReviews';
import { server } from '../../test/server';
import { BASE_URL } from '../../api/constants';
import { mockReviews } from '../../mocks/data/reviews.mock';

vi.mock('../../mocks/utils/delay', () => ({ mockDelay: () => Promise.resolve() }));

vi.mock('../../hooks/useOnVisible', () => ({
  useOnVisible: () => ({ current: null }),
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

describe('RestaurantReviews - integration', () => {
  it('shows skeleton while loading', () => {
    render(<RestaurantReviews restaurantId="1" />, { wrapper: createWrapper() });
    // Review skeletons are aria-hidden with no accessible role
    // eslint-disable-next-line testing-library/no-node-access
    expect(document.querySelector('.restaurant-reviews__skeleton')).toBeInTheDocument();
  });

  it('renders the Reviews heading', async () => {
    render(<RestaurantReviews restaurantId="1" />, { wrapper: createWrapper() });
    expect(await screen.findByRole('heading', { name: 'Reviews' })).toBeInTheDocument();
  });

  it('renders review cards after data loads', async () => {
    render(<RestaurantReviews restaurantId="1" />, { wrapper: createWrapper() });
    const truncated = mockReviews[0].description.slice(0, 650).trim();
    expect(await screen.findByText(truncated, { exact: false })).toBeInTheDocument();
  });

  it('shows error notice when API fails', async () => {
    server.use(
      http.get(`${BASE_URL}/api/v1/reviews`, () =>
        HttpResponse.json({ message: 'Server error' }, { status: 500 })
      )
    );
    render(<RestaurantReviews restaurantId="1" />, { wrapper: createWrapper() });
    expect(await screen.findByText('Failed to load reviews')).toBeInTheDocument();
  });

  it('shows empty notice when API returns no reviews', async () => {
    server.use(
      http.get(`${BASE_URL}/api/v1/reviews`, () =>
        HttpResponse.json({ data: [], nextCursor: undefined })
      )
    );
    render(<RestaurantReviews restaurantId="1" />, { wrapper: createWrapper() });
    expect(await screen.findByText('No reviews yet')).toBeInTheDocument();
  });
});
