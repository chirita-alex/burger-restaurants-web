import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect,it } from 'vitest';

import type { NearbyRestaurant } from '../../../types/restaurant';
import Grid from './Grid';

const mockItems: NearbyRestaurant[] = [
  {
    id: 'r-1',
    name: 'Burger Palace',
    imageUrl: '/images/r1.jpg',
    geoLocation: { latitude: 51.5, longitude: -0.1 },
    program: { openingHours: '10:00 - 22:00' },
    overallRating: { taste: 9, texture: 8, visual: 7, general: 8 },
  },
  {
    id: 'r-2',
    name: 'Stack House',
    imageUrl: '/images/r2.jpg',
    geoLocation: { latitude: 51.6, longitude: -0.2 },
    program: { openingHours: '11:00 - 23:00' },
    overallRating: { taste: 7, texture: 7, visual: 8, general: 7 },
  },
];

const renderGrid = (props = {}) =>
  render(
    <MemoryRouter>
      <Grid items={mockItems} {...props} />
    </MemoryRouter>
  );

describe('Grid', () => {
  describe('loading state', () => {
    it('renders skeleton cards when loading', () => {
      const { container } = renderGrid({ isLoading: true, skeletonCount: 3 });
      // Skeletons are aria-hidden with no accessible role — container query is necessary
      // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
      expect(container.querySelectorAll('.card-skeleton')).toHaveLength(3);
    });

    it('does not render real cards when loading', () => {
      renderGrid({ isLoading: true });
      expect(screen.queryByText('Burger Palace')).not.toBeInTheDocument();
    });

    it('sets aria-busy to true when loading', () => {
      renderGrid({ isLoading: true });
      expect(screen.getByRole('list')).toHaveAttribute('aria-busy', 'true');
    });
  });

  describe('loaded state', () => {
    it('renders a card for each item', () => {
      renderGrid();
      expect(screen.getByText('Burger Palace')).toBeInTheDocument();
      expect(screen.getByText('Stack House')).toBeInTheDocument();
    });

    it('does not render skeletons when not loading', () => {
      const { container } = renderGrid();
      // Skeletons are aria-hidden with no accessible role — container query is necessary
      // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
      expect(container.querySelectorAll('.card-skeleton')).toHaveLength(0);
    });

    it('sets aria-busy to false when not loading', () => {
      renderGrid();
      const grid = screen.getAllByRole('list').find((el) => el.tagName === 'UL')!;
      expect(grid).toHaveAttribute('aria-busy', 'false');
    });

    it('defaults to 6 skeletons when skeletonCount is not provided', () => {
      const { container } = renderGrid({ isLoading: true });
      // Skeletons are aria-hidden with no accessible role — container query is necessary
      // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
      expect(container.querySelectorAll('.card-skeleton')).toHaveLength(6);
    });
  });
});
