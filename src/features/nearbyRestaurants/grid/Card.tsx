import './styles.scss';

import { Link } from 'react-router-dom';

import RatingDetails from '../../../shared/ratingDetails/RatingDetails';
import type { NearbyRestaurant } from '../../../types/restaurant';

type CardProps = {
  item: NearbyRestaurant;
};

const Card = ({ item }: CardProps) => {
  return (
    <li className="card">
      <Link to={`/restaurant/${item.id}`} aria-label={`View details for ${item.name}`}>
        <img className="image" src={item.imageUrl} alt="" fetchPriority="high" />
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
