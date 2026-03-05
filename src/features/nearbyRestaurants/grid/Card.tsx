import { Link } from "react-router-dom";
import type { NearbyRestaurant } from "../../../types/restaurant";
import "./styles.scss";
import RatingDetails from "../../../shared/ratingDetails/RatingDetails";

type CardProps = {
  item: NearbyRestaurant;
};

const Card = ({ item }: CardProps) => {
  return (
    <li className="card">
      <Link
        to={`/restaurant/${item.id}`}
        aria-label={`View details for ${item.name}`}
      >
        <img className="image" src={item.imageUrl} alt="" loading="lazy" />
        <div className="body">
            <h3 className="title">{item.name}</h3>
            <dl className="details">
              <dt>Hours</dt>
              <dd>{item.program.openingHours}</dd>
            </dl>
            <br />
            <RatingDetails rating={item.overallRating} size="sm" />
          </div>
      </Link>
    </li>
  );
};

export default Card;
