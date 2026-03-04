export type Restaurant = {
  id: string;
  ownerId: string;
  name: string;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
  description: string;
  program: {
    openingHours: string;
  };
  address: {
    country: string;
    city: string;
    street: string;
  };
  geoLocation: {
    latitude: number;
    longitude: number;
  };
  overallRating: {
    taste: number;
    texture: number;
    visual: number;
    general: number;
  };
};

export type NearbyRestaurant = {
  id: string;
  name: string;
  imageUrl: string;
  program: {
    openingHours: string;
  };
  overallRating: {
    taste: number;
    texture: number;
    visual: number;
    general: number;
  };
};
