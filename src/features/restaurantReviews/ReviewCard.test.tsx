import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ReviewCard from './ReviewCard';
import type { Review } from '../../types/review';

const mockReview: Review = {
  id: 'review-1',
  createdAt: new Date('2024-03-15T10:00:00.000Z'),
  updatedAt: new Date('2024-03-15T10:00:00.000Z'),
  description: 'Absolutely delicious burger, crispy and juicy.',
  imageUrl: '/images/review-1.jpg',
  userId: 'user-1',
  rating: { taste: 9, texture: 8, visual: 9, general: 9 },
};

describe('ReviewCard', () => {
  it('renders the review description', () => {
    render(<ul><ReviewCard review={mockReview} /></ul>);
    expect(screen.getByText('Absolutely delicious burger, crispy and juicy.')).toBeInTheDocument();
  });

  it('renders the review image with descriptive alt text', () => {
    const { container } = render(<ul><ReviewCard review={mockReview} /></ul>);
    const img = container.querySelector('img');
    expect(img).toHaveAttribute('alt', 'Photo of the reviewed burger');
    expect(img).toHaveAttribute('src', '/images/review-1.jpg');
  });

  it('renders the image with lazy loading', () => {
    const { container } = render(<ul><ReviewCard review={mockReview} /></ul>);
    expect(container.querySelector('img')).toHaveAttribute('loading', 'lazy');
  });

  it('renders the date in a time element', () => {
    const { container } = render(<ul><ReviewCard review={mockReview} /></ul>);
    const time = container.querySelector('time');
    expect(time).toBeInTheDocument();
    expect(time).toHaveAttribute('dateTime', new Date(mockReview.createdAt).toISOString());
  });

  it('renders rating details', () => {
    render(<ul><ReviewCard review={mockReview} /></ul>);
    expect(screen.getByText('Taste')).toBeInTheDocument();
    expect(screen.getByText('Texture')).toBeInTheDocument();
  });
});
