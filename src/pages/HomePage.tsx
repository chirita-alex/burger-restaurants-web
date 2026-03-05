import { useNearbyRestaurants } from "../api/hooks/useNearbyRestaurants";
import { useMemo } from "react";
import MapWidget from "../shared/mapWidget/MapWidget";
import { PageContainer } from "../shared/layout/pageContent/PageContent";

const HomePage = () => {
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
    return (nearbyRestaurantsData?.data || []).map((restaurant) => ({
      id: restaurant.id,
      latitude: restaurant.geoLocation.latitude,
      longitude: restaurant.geoLocation.longitude,
      tooltip: {
        id: restaurant.id,
        name: restaurant.name,
        openingHours: restaurant.program.openingHours,
        overallRating: restaurant.overallRating.general,
      },
    }));
  }, [nearbyRestaurantsData]);

  console.log({ nearbyRestaurantsData, nearbyLoading, nearbyError });

  // TODO: add loading and error states and grid of nearby restaurants below the map

  return (
    <PageContainer>
      <div style={{ height: "650px" }}>
        <MapWidget
          pins={nearbyLocations}
          renderTooltip={(tooltip) => (
            <article aria-labelledby={`restaurant-${tooltip.id}`}>
              <h4 id={`restaurant-${tooltip.id}`} style={{ textAlign: "center" }}>{tooltip.name}</h4>
              <dl>
                <dt>Program</dt><dd>{tooltip.openingHours}</dd>
                <dt>General rating</dt><dd>{tooltip.overallRating}</dd>
              </dl>
            </article>
          )}
          ariaLabel="Interactive map showing nearby restaurants"
        />
      </div>
    </PageContainer>
  );
};

export default HomePage;
