import { useParams } from "react-router-dom";
import RestaurantDetails from "../features/restaurantDetails/RestaurantDetails";

const RestaurantPage = () => {
  const { id } = useParams<{ id: string }>();

  // TODO: add Notice error handling
  if (!id) return null;

  return <RestaurantDetails restaurantId={id} />;
};

export default RestaurantPage;