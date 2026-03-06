import type { Review } from "../../types/review";
import RatingDetails from "../../shared/ratingDetails/RatingDetails";
import { prettyDate } from "../../utils/prettyDate";
import "./styles.scss";

type ReviewCardProps = {
  review: Review;
};

const ReviewCard = ({ review }: ReviewCardProps) => (
  <li>
    <article className="review-card">
      <img
        className="review-card__image"
        src={review.imageUrl}
        alt="Photo of the reviewed burger"
        loading="lazy"
      />

      <div className="review-card__content">
        <RatingDetails rating={review.rating} size="lg" />

        <p className="review-card__description">{review.description}</p>

        <footer className="review-card__footer">
          <address className="review-card__user">Jhon Doe</address>

          <time
            className="review-card__date"
            dateTime={new Date(review.createdAt).toISOString()}
          >
            {prettyDate(review.createdAt)}
          </time>
        </footer>
      </div>
    </article>
  </li>
);

export default ReviewCard;
