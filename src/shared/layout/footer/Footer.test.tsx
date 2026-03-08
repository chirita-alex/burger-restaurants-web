import { render, screen } from '@testing-library/react';
import { describe, expect,it } from 'vitest';

import Footer from './Footer';

describe('Footer', () => {
  it('renders the current year', () => {
    render(<Footer />);
    // Year is a safe integer-to-string conversion, not user input
    // eslint-disable-next-line security/detect-non-literal-regexp
    expect(screen.getByText(new RegExp(String(new Date().getFullYear())))).toBeInTheDocument();
  });

  it('renders the copyright notice', () => {
    render(<Footer />);
    expect(screen.getByText(/burger restaurants\. all rights reserved/i)).toBeInTheDocument();
  });

  it('renders a footer landmark', () => {
    render(<Footer />);
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });
});
