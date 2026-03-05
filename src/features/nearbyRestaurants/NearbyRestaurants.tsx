import { useMemo } from "react";
import { useNearbyRestaurants } from "../../api/hooks/useNearbyRestaurants";
import MapWidget from "../../shared/mapWidget/MapWidget";
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

  const mapNearbyLocations = useMemo(() => {
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

  // TODO: add error handling UI with Notice component adapted
  return (
    <>
      <Grid items={nearbyRestaurantsData?.data || []} isLoading={isLoading} />
      <div style={{ height: "450px" }}>
        <MapWidget
          pins={mapNearbyLocations}
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
