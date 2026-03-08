import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import type { Review } from '../../types/review';
import { prettyDate } from '../../utils/prettyDate';
import ReviewCard from './ReviewCard';

const SHORT_DESCRIPTION = 'Absolutely delicious burger, crispy and juicy.';
const LONG_DESCRIPTION = 'A'.repeat(651);

const mockReview: Review = {
  id: 'review-1',
  createdAt: new Date('2024-03-15T10:00:00.000Z'),
  updatedAt: new Date('2024-03-15T10:00:00.000Z'),
  description: SHORT_DESCRIPTION,
  imageUrl: '/images/review-1.jpg',
  userId: 'user-1',
  rating: { taste: 9, texture: 8, visual: 9, general: 9 },
};

describe('ReviewCard', () => {
  it('renders the review description', () => {
    render(
      <ul>
        <ReviewCard review={mockReview} />
      </ul>
    );
    expect(screen.getByText(SHORT_DESCRIPTION)).toBeInTheDocument();
  });

  it('renders the review image with descriptive alt text', () => {
    render(
      <ul>
        <ReviewCard review={mockReview} />
      </ul>
    );
    const img = screen.getByRole('img', { name: 'Reviewed burger' });
    expect(img).toHaveAttribute('src', '/images/review-1.jpg');
  });

  it('renders the image with lazy loading', () => {
    render(
      <ul>
        <ReviewCard review={mockReview} />
      </ul>
    );
    expect(screen.getByRole('img', { name: 'Reviewed burger' })).toHaveAttribute('loading', 'lazy');
  });

  it('renders the date in a time element', () => {
    render(
      <ul>
        <ReviewCard review={mockReview} />
      </ul>
    );
    const timeEl = screen.getByText(prettyDate(mockReview.createdAt));
    expect(timeEl).toBeInTheDocument();
    expect(timeEl).toHaveAttribute('dateTime', new Date(mockReview.createdAt).toISOString());
  });

  it('renders rating details', () => {
    render(
      <ul>
        <ReviewCard review={mockReview} />
      </ul>
    );
    expect(screen.getByText('Taste')).toBeInTheDocument();
    expect(screen.getByText('Texture')).toBeInTheDocument();
  });
});

describe('ReviewCard — ReadMore integration', () => {
  const renderLong = (description = LONG_DESCRIPTION) =>
    render(
      <ul>
        <ReviewCard review={{ ...mockReview, description }} />
      </ul>
    );

  it('renders short description without a Read more button', () => {
    render(
      <ul>
        <ReviewCard review={mockReview} />
      </ul>
    );
    expect(screen.getByText(SHORT_DESCRIPTION)).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /read more/i })).not.toBeInTheDocument();
  });

  it('truncates long description and shows Read more button', () => {
    renderLong();
    expect(screen.queryByText(LONG_DESCRIPTION)).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: /read more/i })).toBeInTheDocument();
  });

  it('truncated text ends with an ellipsis', () => {
    renderLong();
    expect(screen.getByText('...', { selector: 'span' })).toBeInTheDocument();
  });

  it('Read more button has aria-expanded="false" when collapsed', () => {
    renderLong();
    expect(screen.getByRole('button', { name: /read more/i })).toHaveAttribute(
      'aria-expanded',
      'false'
    );
  });

  it('Read more button has a descriptive aria-label', () => {
    renderLong();
    expect(screen.getByRole('button', { name: /read more: jhon doe review/i })).toBeInTheDocument();
  });

  it('expands to full text when Read more is clicked', () => {
    renderLong();
    fireEvent.click(screen.getByRole('button', { name: /read more/i }));
    expect(screen.getByText(LONG_DESCRIPTION)).toBeInTheDocument();
  });

  it('shows Show less button with aria-expanded="true" after expanding', () => {
    renderLong();
    fireEvent.click(screen.getByRole('button', { name: /read more/i }));
    const btn = screen.getByRole('button', { name: /show less/i });
    expect(btn).toHaveAttribute('aria-expanded', 'true');
  });

  it('collapses back to truncated text when Show less is clicked', () => {
    renderLong();
    fireEvent.click(screen.getByRole('button', { name: /read more/i }));
    fireEvent.click(screen.getByRole('button', { name: /show less/i }));
    expect(screen.queryByText(LONG_DESCRIPTION)).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: /read more/i })).toBeInTheDocument();
  });
});
