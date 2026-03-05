import { useRestaurant } from "../../api/hooks/useRestaurant";
import RatingDetails from "../../shared/ratingDetails/RatingDetails";
import "./RestaurantDetails.scss";

type RestaurantDetailsProps = {
  restaurantId: string;
};

const RestaurantDetails = ({ restaurantId }: RestaurantDetailsProps) => {
  const { data: restaurant, isLoading, error } = useRestaurant({ id: restaurantId });

  if (isLoading) return (
    <div className="restaurant-details restaurant-details--loading" aria-busy="true">
      <div className="restaurant-details__skeleton" />
    </div>
  );

  // TODO: add error handling UI with Notice component adapted
  if (error || !restaurant) return null;

  return (
    <article className="restaurant-details" aria-labelledby="restaurant-name">
      <img
        className="restaurant-details__image"
        src={restaurant.imageUrl}
        alt={restaurant.name}
      />
      <div className="restaurant-details__info">
        <h1 className="restaurant-details__name" id="restaurant-name">
          {restaurant.name}
        </h1>
        <dl className="restaurant-details__meta">
          <dt>Program</dt>
          <dd>{restaurant.program.openingHours}</dd>
          <dt>Address</dt>
          <dd>
            {restaurant.address.street}, {" "}
            {restaurant.address.city}, {" "}
            {restaurant.address.country}
          </dd>
        </dl>
        <RatingDetails rating={restaurant.overallRating} size="md" />

        {/* TODO: add more details READ MORE when you make it for review card */}
        <p className="restaurant-details__description">{restaurant.description}</p>
      </div>
    </article>
  );
};

export default RestaurantDetails;
