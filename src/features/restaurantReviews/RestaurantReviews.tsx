import { useRestaurantReviews } from "../../api/hooks/useRestaurantReviews";
import ReviewCard from "./ReviewCard";
import "./styles.scss";

type RestaurantReviewsProps = {
  restaurantId: string;
};

const RestaurantReviews = ({ restaurantId }: RestaurantReviewsProps) => {
  const { data, isLoading, error } = useRestaurantReviews({ restaurantId });

  const reviews = data?.pages.flatMap((page) => page.data) ?? [];

  // TODO: add error handling UI with Notice component adapted

  return (
    <section className="restaurant-reviews" aria-labelledby="reviews-heading">
      <header className="restaurant-reviews__header">
        <h2 className="restaurant-reviews__title" id="reviews-heading">
          Reviews
        </h2>
      </header>

      <ul
        className="restaurant-reviews__list"
        aria-busy={isLoading}
      >
        {isLoading && (
          <li className="restaurant-reviews__loading" aria-label="Loading reviews">
            {Array.from({ length: 3 }, (_, i) => (
              <div key={i} className="restaurant-reviews__skeleton" />
            ))}
          </li>
        )}
        {!isLoading && reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </ul>
    </section>
  );
};

export default RestaurantReviews;
