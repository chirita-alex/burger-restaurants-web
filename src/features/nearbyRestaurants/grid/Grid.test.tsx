import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Grid from './Grid';
import type { NearbyRestaurant } from '../../../types/restaurant';

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
      expect(container.querySelectorAll('.card-skeleton')).toHaveLength(3);
    });

    it('does not render real cards when loading', () => {
      renderGrid({ isLoading: true });
      expect(screen.queryByText('Burger Palace')).not.toBeInTheDocument();
    });

    it('sets aria-busy to true when loading', () => {
      const { container } = renderGrid({ isLoading: true });
      expect(container.querySelector('ul')).toHaveAttribute('aria-busy', 'true');
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
      expect(container.querySelectorAll('.card-skeleton')).toHaveLength(0);
    });

    it('sets aria-busy to false when not loading', () => {
      const { container } = renderGrid();
      expect(container.querySelector('ul')).toHaveAttribute('aria-busy', 'false');
    });

    it('defaults to 6 skeletons when skeletonCount is not provided', () => {
      const { container } = renderGrid({ isLoading: true });
      expect(container.querySelectorAll('.card-skeleton')).toHaveLength(6);
    });
  });
});
