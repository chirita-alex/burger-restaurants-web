import "./styles.scss";

const CardSkeleton = () => (
  <li className="card-skeleton" aria-hidden="true">
    <div className="card-skeleton__image" />
    <div className="card-skeleton__body">
      <div className="card-skeleton__title" />
      <div className="card-skeleton__line card-skeleton__line--short" />
      <div className="card-skeleton__ratings">
        <div className="card-skeleton__line" />
        <div className="card-skeleton__line" />
        <div className="card-skeleton__line" />
        <div className="card-skeleton__line card-skeleton__line--short" />
      </div>
    </div>
  </li>
);

export default CardSkeleton;
