import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { http, HttpResponse } from 'msw';
import RestaurantDetails from './RestaurantDetails';
import { server } from '../../test/server';
import { BASE_URL } from '../../api/constants';
import { mockRestaurant } from '../../mocks/data/restaurants.mock';

vi.mock('../../mocks/utils/delay', () => ({ mockDelay: () => Promise.resolve() }));

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

describe('RestaurantDetails - integration', () => {
  it('shows skeleton while loading', () => {
    render(<RestaurantDetails restaurantId="1" />, { wrapper: createWrapper() });
    // Loading skeleton is a plain div with no accessible role
    // eslint-disable-next-line testing-library/no-node-access
    expect(document.querySelector('.restaurant-details--loading')).toBeInTheDocument();
  });

  it('renders restaurant name after data loads', async () => {
    render(<RestaurantDetails restaurantId="1" />, { wrapper: createWrapper() });
    expect(await screen.findByRole('heading', { name: mockRestaurant.name })).toBeInTheDocument();
  });

  it('renders opening hours', async () => {
    render(<RestaurantDetails restaurantId="1" />, { wrapper: createWrapper() });
    expect(await screen.findByText(mockRestaurant.program.openingHours)).toBeInTheDocument();
  });

  it('renders the address', async () => {
    render(<RestaurantDetails restaurantId="1" />, { wrapper: createWrapper() });
    expect(await screen.findByText(mockRestaurant.address.street, { exact: false })).toBeInTheDocument();
    expect(screen.getByText(mockRestaurant.address.city, { exact: false })).toBeInTheDocument();
  });

  it('renders the description', async () => {
    render(<RestaurantDetails restaurantId="1" />, { wrapper: createWrapper() });
    expect(await screen.findByText(mockRestaurant.description)).toBeInTheDocument();
  });

  it('renders rating details', async () => {
    render(<RestaurantDetails restaurantId="1" />, { wrapper: createWrapper() });
    expect(await screen.findByText('Taste')).toBeInTheDocument();
    expect(screen.getByText('General')).toBeInTheDocument();
  });

  it('shows error notice when API fails', async () => {
    server.use(
      http.get(`${BASE_URL}/api/v1/restaurants/:id`, () =>
        HttpResponse.json({ message: 'Server error' }, { status: 500 })
      )
    );
    render(<RestaurantDetails restaurantId="1" />, { wrapper: createWrapper() });
    expect(await screen.findByText('Failed to load restaurant')).toBeInTheDocument();
  });

  it('shows not-found notice when restaurant data is missing', async () => {
    server.use(
      http.get(`${BASE_URL}/api/v1/restaurants/:id`, () =>
        HttpResponse.json(null, { status: 200 })
      )
    );
    render(<RestaurantDetails restaurantId="999" />, { wrapper: createWrapper() });
    expect(await screen.findByText('Restaurant not found')).toBeInTheDocument();
  });
});
