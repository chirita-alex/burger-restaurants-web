import { useParams } from "react-router-dom";import RestaurantDetails from "../features/restaurantDetails/RestaurantDetails";
import RestaurantReviews from "../features/restaurantReviews/RestaurantReviews";

const RestaurantPage = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <>
      <title>Restaurant details</title>
      <RestaurantDetails restaurantId={id ?? ''} />
      <RestaurantReviews restaurantId={id ?? ''} />
    </>
  );
};

export default RestaurantPage;