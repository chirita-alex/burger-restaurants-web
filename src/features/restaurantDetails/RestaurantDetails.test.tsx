import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';

import { BASE_URL } from '../../api/constants';
import { mockRestaurant } from '../../mocks/data/restaurants.mock';
import { server } from '../../test/server';
import RestaurantDetails from './RestaurantDetails';

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
    expect(
      await screen.findByText(mockRestaurant.address.street, { exact: false })
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        (_, el) =>
          el?.tagName === 'DD' && (el.textContent ?? '').includes(mockRestaurant.address.city)
      )
    ).toBeInTheDocument();
  });

  it('renders the truncated description via ReadMore', async () => {
    render(<RestaurantDetails restaurantId="1" />, { wrapper: createWrapper() });
    const truncated = mockRestaurant.description.slice(0, 300).trim();
    expect(await screen.findByText(truncated, { exact: false })).toBeInTheDocument();
  });

  it('shows Read more button for long description', async () => {
    render(<RestaurantDetails restaurantId="1" />, { wrapper: createWrapper() });
    expect(
      await screen.findByRole('button', { name: /read more: restaurant description/i })
    ).toBeInTheDocument();
  });

  it('expands full description when Read more is clicked', async () => {
    render(<RestaurantDetails restaurantId="1" />, { wrapper: createWrapper() });
    fireEvent.click(
      await screen.findByRole('button', { name: /read more: restaurant description/i })
    );
    expect(screen.getByText(mockRestaurant.description)).toBeInTheDocument();
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
      http.get(`${BASE_URL}/api/v1/restaurants/:id`, () => HttpResponse.json(null, { status: 200 }))
    );
    render(<RestaurantDetails restaurantId="999" />, { wrapper: createWrapper() });
    expect(await screen.findByText('Restaurant not found')).toBeInTheDocument();
  });
});
