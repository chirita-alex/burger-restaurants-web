import type { NearbyRestaurant } from "../../../types/restaurant";
import Card from "./Card";
import CardSkeleton from "./CardSkeleton";
import "./styles.scss";

type GridProps = {
  items: NearbyRestaurant[];
  isLoading?: boolean;
  skeletonCount?: number;
};

const Grid = ({ items, isLoading = false, skeletonCount = 6 }: GridProps) => (
  <ul
    className="grid"
    aria-label="Nearby restaurants"
    aria-busy={isLoading}
    aria-live="polite"
  >
    {
      isLoading
        ? Array.from({ length: skeletonCount }, (_, i) => <CardSkeleton key={i} />)
        : items.map((item) => <Card key={item.id} item={item}  />)
    }
  </ul>
);

export default Grid;
