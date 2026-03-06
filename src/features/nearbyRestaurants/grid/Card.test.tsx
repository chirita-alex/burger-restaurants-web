import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Card from './Card';
import type { NearbyRestaurant } from '../../../types/restaurant';

const mockItem: NearbyRestaurant = {
  id: 'restaurant-1',
  name: 'Burger Palace',
  imageUrl: '/images/burger-palace.jpg',
  geoLocation: { latitude: 51.5074, longitude: -0.1278 },
  program: { openingHours: '10:00 - 22:00' },
  overallRating: { taste: 9, texture: 8, visual: 7, general: 8 },
};

const renderCard = (item = mockItem) =>
  render(
    <MemoryRouter>
      <ul>
        <Card item={item} />
      </ul>
    </MemoryRouter>
  );

describe('Card', () => {
  it('renders the restaurant name', () => {
    renderCard();
    expect(screen.getByText('Burger Palace')).toBeInTheDocument();
  });

  it('renders the opening hours', () => {
    renderCard();
    expect(screen.getByText('10:00 - 22:00')).toBeInTheDocument();
  });

  it('links to the restaurant detail page', () => {
    renderCard();
    expect(screen.getByRole('link')).toHaveAttribute('href', '/restaurant/restaurant-1');
  });

  it('has an accessible link label', () => {
    renderCard();
    expect(screen.getByRole('link', { name: /view details for burger palace/i })).toBeInTheDocument();
  });

  it('renders the card image with empty alt (decorative)', () => {
    const { container } = renderCard();
    const img = container.querySelector('img');
    expect(img).toHaveAttribute('alt', '');
    expect(img).toHaveAttribute('src', '/images/burger-palace.jpg');
  });

  it('renders rating details', () => {
    renderCard();
    expect(screen.getByText('Taste')).toBeInTheDocument();
  });
});
