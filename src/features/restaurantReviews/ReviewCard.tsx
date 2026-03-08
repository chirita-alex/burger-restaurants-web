import "./styles.scss";

import RatingDetails from "../../shared/ratingDetails/RatingDetails";
import ReadMore from "../../shared/readMore/ReadMore";
import type { Review } from "../../types/review";
import { prettyDate } from "../../utils/prettyDate";

type ReviewCardProps = {
  review: Review;
};

const ReviewCard = ({ review }: ReviewCardProps) => (
  <li>
    <article className="review-card">
      <img
        className="review-card__image"
        src={review.imageUrl}
        alt="Reviewed burger"
        loading="lazy"
      />

      <div className="review-card__content">
        <RatingDetails rating={review.rating} size="lg" />

        {/* Here we would normally fetch the user details based on review.userId, 
          but for this example, we'll hardcode it. 
        */}
        <ReadMore 
          maxChars={650} 
          showMoreAriaLabel={"Jhon Doe review"}
          textClassName="review-card__description"
         >
            {review.description}
        </ReadMore>

        <footer className="review-card__footer">
          {/* Here we would normally fetch the user details based on review.userId, 
            but for this example, we'll hardcode it. 
          */}
          <p className="review-card__user">Jhon Doe</p>

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
