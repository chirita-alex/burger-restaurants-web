import { useMemo } from "react";
import { useNearbyRestaurants } from "../../api/hooks/useNearbyRestaurants";
import MapWidget from "../../shared/mapWidget/MapWidget";
import Notice from "../../shared/notice/Notice";
import Grid from "./grid/Grid";

const NearbyRestaurants = () => {
  const {
    data: nearbyRestaurantsData,
    isLoading,
    error,
  } = useNearbyRestaurants({
    latitude: 44.4268,
    longitude: 26.1025,
    radius: 5000,
  });

  const restaurants = useMemo(() => nearbyRestaurantsData?.data ?? [], [nearbyRestaurantsData]);

  const nearbyLocationsPins = useMemo(() => {
    return restaurants.map((restaurant) => ({
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
  }, [restaurants]);

  if (error) {
    return (
      <Notice
        type="error"
        heading="Failed to load restaurants"
        message={error.message}
        showHomeLink={false}
      />
    );
  }

  if (!isLoading && restaurants.length === 0) {
    return (
      <Notice
        type="empty"
        heading="No restaurants found"
        message="There are no burger restaurants near your location."
        showHomeLink={false}
      />
    );
  }

  return (
    <>
      <Grid items={restaurants} isLoading={isLoading} />

      <div style={{ height: "450px" }}>
        <MapWidget
          pins={nearbyLocationsPins}
          renderTooltip={(tooltip) => (
            <article aria-labelledby={`restaurant-${tooltip.id}`}>
              <h4 id={`restaurant-${tooltip.id}`} style={{ textAlign: "center" }}>
                {tooltip.name}
              </h4>
              <dl>
                <dt>Program</dt>
                <dd>{tooltip.openingHours}</dd>
                <dt>General rating</dt>
                <dd>{tooltip.overallRating}</dd>
              </dl>
            </article>
          )}
          ariaLabel="Interactive map showing nearby restaurants"
        />
      </div>
    </>
  );
};

export default NearbyRestaurants;
