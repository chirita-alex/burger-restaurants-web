import { fireEvent,render, screen } from '@testing-library/react';
import { describe, expect,it } from 'vitest';

import ReadMore from './ReadMore';

const SHORT_TEXT = 'Short text';
const LONG_TEXT = 'A'.repeat(201);

describe('ReadMore', () => {
  it('renders short text without a button', () => {
    render(<ReadMore>{SHORT_TEXT}</ReadMore>);
    expect(screen.getByText(SHORT_TEXT)).toBeInTheDocument();
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('renders full text when it is exactly maxChars', () => {
    const text = 'A'.repeat(200);
    render(<ReadMore>{text}</ReadMore>);
    expect(screen.getByText(text)).toBeInTheDocument();
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('truncates long text and shows Read more button', () => {
    render(<ReadMore>{LONG_TEXT}</ReadMore>);
    expect(screen.getByRole('button', { name: /read more/i })).toBeInTheDocument();
    expect(screen.queryByText(LONG_TEXT)).not.toBeInTheDocument();
  });

  it('Read more button has aria-expanded="false" when collapsed', () => {
    render(<ReadMore>{LONG_TEXT}</ReadMore>);
    expect(screen.getByRole('button', { name: /read more/i })).toHaveAttribute('aria-expanded', 'false');
  });

  it('respects custom maxChars prop', () => {
    render(<ReadMore maxChars={10}>{'A'.repeat(11)}</ReadMore>);
    expect(screen.getByRole('button', { name: /read more/i })).toBeInTheDocument();
  });

  it('expands full text and shows Show less when Read more is clicked', () => {
    render(<ReadMore>{LONG_TEXT}</ReadMore>);
    fireEvent.click(screen.getByRole('button', { name: /read more/i }));
    expect(screen.getByText(LONG_TEXT)).toBeInTheDocument();
    const btn = screen.getByRole('button', { name: /show less/i });
    expect(btn).toHaveAttribute('aria-expanded', 'true');
  });

  it('collapses back when Show less is clicked', () => {
    render(<ReadMore>{LONG_TEXT}</ReadMore>);
    fireEvent.click(screen.getByRole('button', { name: /read more/i }));
    fireEvent.click(screen.getByRole('button', { name: /show less/i }));
    expect(screen.queryByText(LONG_TEXT)).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: /read more/i })).toBeInTheDocument();
  });

  it('ellipsis span is aria-hidden so screen readers skip it', () => {
    render(<ReadMore>{LONG_TEXT}</ReadMore>);
    const ellipsis = screen.getByText('...', { selector: 'span' });
    expect(ellipsis).toHaveAttribute('aria-hidden', 'true');
  });

  it('button aria-controls references the text paragraph', () => {
    render(<ReadMore>{LONG_TEXT}</ReadMore>);
    const btn = screen.getByRole('button', { name: /read more/i });
    const controlledId = btn.getAttribute('aria-controls');
    expect(controlledId).toBeTruthy();
    expect(screen.getByRole('paragraph')).toHaveAttribute('id', controlledId);
  });

  it('uses a descriptive aria-label when showMoreAriaLabel prop is provided', () => {
    render(<ReadMore showMoreAriaLabel="restaurant description">{LONG_TEXT}</ReadMore>);
    expect(screen.getByRole('button', { name: 'Read more: restaurant description' })).toBeInTheDocument();
  });

  it('updates aria-label to Show less when expanded with showMoreAriaLabel prop', () => {
    render(<ReadMore showMoreAriaLabel="restaurant description">{LONG_TEXT}</ReadMore>);
    fireEvent.click(screen.getByRole('button', { name: 'Read more: restaurant description' }));
    expect(screen.getByRole('button', { name: 'Show less: restaurant description' })).toBeInTheDocument();
  });

  it('has no aria-label when showMoreAriaLabel prop is omitted', () => {
    render(<ReadMore>{LONG_TEXT}</ReadMore>);
    expect(screen.getByRole('button', { name: /read more/i })).not.toHaveAttribute('aria-label');
  });
});
