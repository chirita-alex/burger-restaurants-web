import './MapWidget.scss';
import 'leaflet/dist/leaflet.css';

import L from 'leaflet';
import { ErrorBoundary } from 'react-error-boundary';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

import Notice from '../notice/Notice';

const pinIcon = L.icon({
  iconUrl: '/images/map-pin.svg',
  iconSize: [32, 42],
  iconAnchor: [16, 42],
  popupAnchor: [0, -42],
});

type MapPin<T = Record<string, unknown>> = {
  id: string;
  latitude: number;
  longitude: number;
  tooltip?: T & {
    name: string;
  };
};

type MapWidgetProps<T = Record<string, unknown>> = {
  pins: MapPin<T>[];
  renderTooltip?: (data: T) => React.ReactNode;
  center?: [number, number];
  zoom?: number;
  ariaLabel?: string;
};

const DEFAULT_CENTER: [number, number] = [44.4268, 26.1025];
const DEFAULT_ZOOM = 13;

const MapWidget = <T = Record<string, unknown>,>({
  pins,
  renderTooltip,
  center = DEFAULT_CENTER,
  zoom = DEFAULT_ZOOM,
  ariaLabel = 'Interactive map',
}: MapWidgetProps<T>) => {
  return (
    <ErrorBoundary
      fallback={
        <Notice
          type="error"
          heading="Map unavailable"
          message="The map could not be loaded."
          showHomeLink={false}
        />
      }
    >
      <section aria-label={ariaLabel} style={{ width: '100%', height: '100%' }}>
        <MapContainer
          center={center}
          zoom={zoom}
          scrollWheelZoom={false}
          className="mapWidgetStyles"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {pins.map((pin) => (
            <Marker
              key={pin.id}
              position={[pin.latitude, pin.longitude]}
              icon={pinIcon}
              title={pin.tooltip?.name ? `${pin.tooltip.name} — click to open details` : 'Map pin'}
              alt={pin.tooltip?.name ? `Map pin for ${pin.tooltip.name}` : 'Map pin'}
              keyboard={true}
            >
              {pin.tooltip && renderTooltip && <Popup>{renderTooltip(pin.tooltip)}</Popup>}
            </Marker>
          ))}
        </MapContainer>
      </section>
    </ErrorBoundary>
  );
};

export default MapWidget;
