import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import RatingDetails from './RatingDetails';
import type { Rating } from '../../types/restaurant';

const mockRating: Rating = {
  taste: 8,
  texture: 7,
  visual: 9,
  general: 8,
};

describe('RatingDetails', () => {
  it('renders all four category labels', () => {
    render(<RatingDetails rating={mockRating} />);
    expect(screen.getByText('Taste')).toBeInTheDocument();
    expect(screen.getByText('Texture')).toBeInTheDocument();
    expect(screen.getByText('Visual')).toBeInTheDocument();
    expect(screen.getByText('General')).toBeInTheDocument();
  });

  it('renders all four rating values', () => {
    render(<RatingDetails rating={mockRating} />);
    expect(screen.getAllByText('8')).toHaveLength(2);
    expect(screen.getByText('7')).toBeInTheDocument();
    expect(screen.getByText('9')).toBeInTheDocument();
  });

  it('applies the sm size modifier class', () => {
    // <dl> has no accessible role in aria-query; container.firstChild accesses the root dl
    const { container } = render(<RatingDetails rating={mockRating} size="sm" />);
    // eslint-disable-next-line testing-library/no-node-access
    expect(container.firstChild).toHaveClass('rating-details--sm');
  });

  it('applies the lg size modifier class', () => {
    const { container } = render(<RatingDetails rating={mockRating} size="lg" />);
    // eslint-disable-next-line testing-library/no-node-access
    expect(container.firstChild).toHaveClass('rating-details--lg');
  });

  it('defaults to md size', () => {
    const { container } = render(<RatingDetails rating={mockRating} />);
    // eslint-disable-next-line testing-library/no-node-access
    expect(container.firstChild).toHaveClass('rating-details--md');
  });
});
