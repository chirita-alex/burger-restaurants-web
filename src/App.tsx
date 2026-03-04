import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.scss";
import { useRestaurantReviews } from "./api/hooks/useRestaurantReviews";
import { useNearbyRestaurants } from "./api/hooks/useNearbyRestaurants";
import { useRestaurant } from "./api/hooks/useRestaurant";

function App() {
  const [count, setCount] = useState(0);
  const {
    data: reviewsData,
    isLoading,
    error,
  } = useRestaurantReviews({ restaurantId: "1" });
  const {
    data: nearbyRestaurantsData,
    isLoading: nearbyLoading,
    error: nearbyError,
  } = useNearbyRestaurants({
    latitude: 44.4268,
    longitude: 26.1025,
    radius: 5000,
  });
  const {
    data: restaurantData,
    isLoading: restaurantLoading,
    error: restaurantError,
  } = useRestaurant({ id: "1" });

  console.log({ reviewsData, nearbyRestaurantsData, restaurantData });
  console.log({ nearbyLoading, restaurantLoading, isLoading });

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
