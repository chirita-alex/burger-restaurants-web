import { useCallback } from "react";
import { useRestaurantReviews } from "../../api/hooks/useRestaurantReviews";
import { useOnVisible } from "../../hooks/useOnVisible";
import ReviewCard from "./ReviewCard";
import "./styles.scss";

type RestaurantReviewsProps = {
  restaurantId: string;
};

const RestaurantReviews = ({ restaurantId }: RestaurantReviewsProps) => {
  const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useRestaurantReviews({ restaurantId });

  const reviews = data?.pages.flatMap((page) => page.data) ?? [];

  const handleLoadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) fetchNextPage();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const sentinelRef = useOnVisible<HTMLLIElement>(handleLoadMore);

  return (
    <section className="restaurant-reviews" aria-labelledby="reviews-heading">
      <header className="restaurant-reviews__header">
        <h2 className="restaurant-reviews__title" id="reviews-heading">
          Reviews
        </h2>
      </header>

      {isFetchingNextPage && (
        <p className="sr-only" aria-live="polite">
          Loading more review
        </p>
      )}

      <ul
        className="restaurant-reviews__list"
        aria-busy={isLoading || isFetchingNextPage}
      >
        {isLoading && (
          <li className="restaurant-reviews__loading" aria-hidden="true">
            {Array.from({ length: 3 }, (_, i) => (
              <div key={i} className="restaurant-reviews__skeleton" />
            ))}
          </li>
        )}

        {!isLoading &&
          reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}

        {isFetchingNextPage && (
          <li className="restaurant-reviews__loading" aria-hidden="true">
            {Array.from({ length: 3 }, (_, i) => (
              <div key={i} className="restaurant-reviews__skeleton" />
            ))}
          </li>
        )}

        {hasNextPage && !isFetchingNextPage && (
          <li
            ref={sentinelRef}
            className="restaurant-reviews__sentinel"
            aria-hidden="true"
          />
        )}
      </ul>
    </section>
  );
};

export default RestaurantReviews;
