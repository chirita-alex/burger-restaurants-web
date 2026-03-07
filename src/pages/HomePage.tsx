import NearbyRestaurants from "../features/nearbyRestaurants/NearbyRestaurants";

const HomePage = () => {
  return (
    <>
      <title>Nearby restaurants</title>
      <h1 style={{ margin: "auto" }}>Find nearby restaurants with best burgers</h1>
      <NearbyRestaurants />;
    </>
  )
};

export default HomePage;
