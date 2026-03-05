import "./App.scss";
import { useNearbyRestaurants } from "./api/hooks/useNearbyRestaurants";
import { useMemo } from "react";
import MapWidget from "./shared/mapWidget/MapWidget";

const App = () => {
  const {
    data: nearbyRestaurantsData,
    isLoading: nearbyLoading,
    error: nearbyError,
  } = useNearbyRestaurants({
    latitude: 44.4268,
    longitude: 26.1025,
    radius: 5000,
  });

  const nearbyLocations = useMemo(() => {
    return (nearbyRestaurantsData?.data || []).map((nearbyRestaurants) => {
      return {
        id: nearbyRestaurants.id,
        latitude: nearbyRestaurants.geoLocation.latitude,
        longitude: nearbyRestaurants.geoLocation.longitude,
        tooltip: {
          id: nearbyRestaurants.id,
          name: nearbyRestaurants.name,
          openingHours: nearbyRestaurants.program.openingHours,
          overallRating: nearbyRestaurants.overallRating.general,
        },
      };
    });
  }, [nearbyRestaurantsData]);

  // Test map widget with mock data
  console.log({ nearbyRestaurantsData, nearbyLoading, nearbyError });

  return (
    <div style={{ height: "650px" }}>
      <MapWidget
        pins={nearbyLocations}
        renderTooltip={(tooltip) => (
          <article aria-labelledby={`restaurant-${tooltip.id}`}>
            <h4 id={`restaurant-${tooltip.id}`}>{tooltip.name}</h4>
            <dl>
              <dt>Program</dt><dd>{tooltip.openingHours}</dd>
              <dt>Overall Rating</dt><dd>{tooltip.overallRating}</dd>
            </dl>
          </article>
        )}
        ariaLabel="Interactive map showing nearby restaurants"
      />
    </div>
  );
};

export default App;
