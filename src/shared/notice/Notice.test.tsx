import { render, screen } from '@testing-library/react';
import { isRouteErrorResponse, MemoryRouter, useRouteError } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import Notice from './Notice';

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-router-dom')>();
  return {
    ...actual,
    useRouteError: vi.fn(() => undefined),
    isRouteErrorResponse: vi.fn(() => false),
  };
});

const renderNotice = (props = {}) =>
  render(
    <MemoryRouter>
      <Notice {...props} />
    </MemoryRouter>
  );

describe('Notice', () => {
  describe('default (error) type', () => {
    it('renders default error heading', () => {
      renderNotice({ type: 'error' });
      expect(screen.getByRole('heading')).toHaveTextContent('Something went wrong');
    });

    it('renders default error message', () => {
      renderNotice({ type: 'error' });
      expect(screen.getByText('An unexpected error occurred.')).toBeInTheDocument();
    });
  });

  describe('not-found type', () => {
    it('renders not-found heading', () => {
      renderNotice({ type: 'not-found' });
      expect(screen.getByRole('heading')).toHaveTextContent('Page not found');
    });
  });

  describe('empty type', () => {
    it('renders empty heading', () => {
      renderNotice({ type: 'empty' });
      expect(screen.getByRole('heading')).toHaveTextContent('Nothing here');
    });
  });

  describe('unauthorized type', () => {
    it('renders unauthorized heading', () => {
      renderNotice({ type: 'unauthorized' });
      expect(screen.getByRole('heading')).toHaveTextContent('Unauthorized');
    });
  });

  describe('custom heading and message', () => {
    it('overrides the default heading', () => {
      renderNotice({ type: 'error', heading: 'Custom error title' });
      expect(screen.getByRole('heading')).toHaveTextContent('Custom error title');
    });

    it('overrides the default message', () => {
      renderNotice({ type: 'empty', message: 'No burgers found nearby.' });
      expect(screen.getByText('No burgers found nearby.')).toBeInTheDocument();
    });
  });

  describe('showHomeLink', () => {
    it('renders the home link by default', () => {
      renderNotice({ type: 'error' });
      expect(screen.getByRole('link', { name: /go to home page/i })).toBeInTheDocument();
    });

    it('hides the home link when showHomeLink is false', () => {
      renderNotice({ type: 'error', showHomeLink: false });
      expect(screen.queryByRole('link')).not.toBeInTheDocument();
    });
  });

  describe('icon', () => {
    it('renders the icon with empty alt (decorative)', () => {
      renderNotice({ type: 'error' });
      // alt="" images are decorative; query by alt text
      const img = screen.getByAltText('', { exact: true });
      expect(img).toHaveAttribute('aria-hidden', 'true');
    });
  });

  describe('as route error boundary (errorElement)', () => {
    beforeEach(() => {
      vi.mocked(isRouteErrorResponse).mockReturnValue(true);
    });

    afterEach(() => {
      vi.mocked(useRouteError).mockReturnValue(undefined);
      vi.mocked(isRouteErrorResponse).mockReturnValue(false);
    });

    it('renders not-found for 404', () => {
      vi.mocked(useRouteError).mockReturnValue({
        status: 404,
        statusText: 'Not Found',
        internal: true,
        data: {},
      });
      renderNotice();
      expect(screen.getByRole('heading')).toHaveTextContent('Page not found');
    });

    it('renders unauthorized for 401', () => {
      vi.mocked(useRouteError).mockReturnValue({
        status: 401,
        statusText: 'Unauthorized',
        internal: true,
        data: {},
      });
      renderNotice();
      expect(screen.getByRole('heading')).toHaveTextContent('Unauthorized');
    });

    it('renders unauthorized for 403', () => {
      vi.mocked(useRouteError).mockReturnValue({
        status: 403,
        statusText: 'Forbidden',
        internal: true,
        data: {},
      });
      renderNotice();
      expect(screen.getByRole('heading')).toHaveTextContent('Unauthorized');
    });

    it('renders error for 500', () => {
      vi.mocked(useRouteError).mockReturnValue({
        status: 500,
        statusText: 'Internal Server Error',
        internal: true,
        data: {},
      });
      renderNotice();
      expect(screen.getByRole('heading')).toHaveTextContent('Something went wrong');
    });

    it('renders error for unmapped status codes', () => {
      vi.mocked(useRouteError).mockReturnValue({
        status: 418,
        statusText: "I'm a Teapot",
        internal: true,
        data: {},
      });
      renderNotice();
      expect(screen.getByRole('heading')).toHaveTextContent('Something went wrong');
    });
  });
});
