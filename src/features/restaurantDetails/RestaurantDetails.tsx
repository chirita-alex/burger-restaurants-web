import { useRestaurant } from "../../api/hooks/useRestaurant";
import RatingDetails from "../../shared/ratingDetails/RatingDetails";
import Notice from "../../shared/notice/Notice";
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

  if (error) {
    return (
      <Notice
        type="error"
        heading="Failed to load restaurant"
        message={error.message}
        showHomeLink={false}
      />
    )
  };

  if (!restaurant) {
    return (
      <Notice
        type="not-found"
        heading="Restaurant not found"
        message="The restaurant you're looking for doesn't exist."
        showHomeLink={false}
      />
    )
  };

  return (
    <article className="restaurant-details" aria-labelledby="restaurant-name">
      <img
        className="restaurant-details__image"
        src={restaurant.imageUrl}
        alt={restaurant.name}
      />
      <div className="restaurant-details__info">
        <h2 className="restaurant-details__name" id="restaurant-name">
          {restaurant.name}
        </h2>
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

        {/* eslint-disable-next-line sonarjs/todo-tag */}
        {/* TODO: add ReadMore to review card description */}
        <p className="restaurant-details__description">{restaurant.description}</p>
      </div>
    </article>
  );
};

export default RestaurantDetails;
