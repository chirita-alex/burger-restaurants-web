import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import MapWidget from './MapWidget';

vi.mock('leaflet', () => ({
  default: { icon: vi.fn(() => ({})) },
}));

vi.mock('react-leaflet', () => ({
  MapContainer: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="map-container">{children}</div>
  ),
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
    expect(screen.getByTitle('Open details for Burger Palace')).toBeInTheDocument();
    expect(screen.getByTitle('Open details for Stack House')).toBeInTheDocument();
  });

  it('uses a fallback title when tooltip is absent', () => {
    const pinsWithoutTooltip = [{ id: 'pin-1', latitude: 44.43, longitude: 26.10 }];
    render(<MapWidget pins={pinsWithoutTooltip} />);
    expect(screen.getByTitle('Map pin open for available details')).toBeInTheDocument();
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
