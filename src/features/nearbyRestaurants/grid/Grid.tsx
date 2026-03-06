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
  <ul className="grid" aria-busy={isLoading}>
    {
      isLoading
        ? Array.from({ length: skeletonCount }, (_, i) => <CardSkeleton key={i} />)
        : items.map((item, index) => <Card key={item.id} item={item} priority={index === 0} />)
    }
  </ul>
);

export default Grid;
