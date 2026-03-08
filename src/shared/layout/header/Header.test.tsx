import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect,it } from 'vitest';

import Header from './Header';

const renderHeader = () =>
  render(
    <MemoryRouter>
      <Header />
    </MemoryRouter>
  );

describe('Header', () => {
  it('renders the brand name', () => {
    renderHeader();
    expect(screen.getByText('Burger Restaurants')).toBeInTheDocument();
  });

  it('logo links to the home page', () => {
    renderHeader();
    expect(screen.getByRole('link', { name: /burger restaurants home page/i })).toHaveAttribute('href', '/');
  });

  it('renders the main navigation landmark', () => {
    renderHeader();
    expect(screen.getByRole('navigation', { name: /main navigation/i })).toBeInTheDocument();
  });

  it('renders the nearby restaurants nav link', () => {
    renderHeader();
    expect(screen.getByRole('link', { name: /nearby restaurants page/i })).toHaveAttribute('href', '/');
  });
});
