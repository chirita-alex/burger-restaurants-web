import type { Rating } from "../../types/restaurant";
import "./RatingDetails.scss";

type RatingDetailsProps = {
  rating: Rating;
  size?: "sm" | "md" | "lg";
};

const LABELS: Record<keyof Rating, string> = {
  taste: "Taste",
  texture: "Texture",
  visual: "Visual",
  general: "General",
};

const RatingDetails = ({ rating, size = "md" }: RatingDetailsProps) => (
  <dl className={`rating-details rating-details--${size}`}>
    {(Object.keys(LABELS) as Array<keyof Rating>).map((key) => (
      <div key={key} className="rating-details__item">
        <dt className="rating-details__label">{LABELS[key]}</dt>
        <dd className="rating-details__value">{rating[key]}</dd>
      </div>
    ))}
  </dl>
);

export default RatingDetails;