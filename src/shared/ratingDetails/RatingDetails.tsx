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
        {/* key is derived from Object.keys(LABELS) — a closed, typed set of Rating properties */}
        {/* eslint-disable-next-line security/detect-object-injection */}
        <dt className="rating-details__label">{LABELS[key]}</dt>
        {/* eslint-disable-next-line security/detect-object-injection */}
        <dd className="rating-details__value">{rating[key]}</dd>
      </div>
    ))}
  </dl>
);

export default RatingDetails;