import { render, screen } from '@testing-library/react';
import { afterEach,beforeEach, describe, expect, it, vi } from 'vitest';

import MapWidget from './MapWidget';

let shouldMapThrow = false;

vi.mock('leaflet', () => ({
  default: { icon: vi.fn(() => ({})) },
}));

vi.mock('../notice/Notice', () => ({
  default: ({ heading, message }: { heading: string; message: string }) => (
    <div role="alert">{heading}: {message}</div>
  ),
}));

vi.mock('react-leaflet', () => ({
  MapContainer: ({ children }: { children: React.ReactNode }) => {
    if (shouldMapThrow) throw new Error('Leaflet failed');
    return <div data-testid="map-container">{children}</div>;
  },
  TileLayer: () => null,
  Marker: ({ children, title }: { children: React.ReactNode; title: string }) => (
    <div data-testid="map-marker" title={title}>{children}</div>
  ),
  Popup: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

vi.mock('leaflet/dist/leaflet.css', () => ({}));

const mockPins = [
  { id: 'pin-1', latitude: 44.43, longitude: 26.10, tooltip: { name: 'Burger Palace' } },
  { id: 'pin-2', latitude: 44.44, longitude: 26.11, tooltip: { name: 'Stack House' } },
];

describe('MapWidget', () => {
  it('renders the map section with default aria-label', () => {
    render(<MapWidget pins={[]} />);
    expect(screen.getByRole('region', { name: 'Interactive map' })).toBeInTheDocument();
  });

  it('renders with a custom aria-label', () => {
    render(<MapWidget pins={[]} ariaLabel="Nearby restaurants map" />);
    expect(screen.getByRole('region', { name: 'Nearby restaurants map' })).toBeInTheDocument();
  });

  it('renders a marker for each pin', () => {
    render(<MapWidget pins={mockPins} />);
    expect(screen.getAllByTestId('map-marker')).toHaveLength(2);
  });

  it('sets the marker title from the pin tooltip name', () => {
    render(<MapWidget pins={mockPins} />);
    expect(screen.getByTitle('Burger Palace — click to open details')).toBeInTheDocument();
    expect(screen.getByTitle('Stack House — click to open details')).toBeInTheDocument();
  });

  it('uses a fallback title when tooltip is absent', () => {
    const pinsWithoutTooltip = [{ id: 'pin-1', latitude: 44.43, longitude: 26.10 }];
    render(<MapWidget pins={pinsWithoutTooltip} />);
    expect(screen.getByTitle('Map pin')).toBeInTheDocument();
  });

  it('renders tooltip content via renderTooltip', () => {
    render(
      <MapWidget
        pins={mockPins}
        renderTooltip={(data) => <span>Tooltip: {(data as { name: string }).name}</span>}
      />
    );
    expect(screen.getByText('Tooltip: Burger Palace')).toBeInTheDocument();
  });
});

describe('MapWidget — ErrorBoundary', () => {
  beforeEach(() => {
    shouldMapThrow = true;
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    shouldMapThrow = false;
    vi.restoreAllMocks();
  });

  it('renders the fallback when MapContainer throws', () => {
    render(<MapWidget pins={[]} />);
    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByText(/map unavailable/i)).toBeInTheDocument();
  });

  it('does not render the map section when an error is thrown', () => {
    render(<MapWidget pins={[]} />);
    expect(screen.queryByRole('region', { name: 'Interactive map' })).not.toBeInTheDocument();
  });
});
