export type Rating = {
  taste: number;
  texture: number;
  visual: number;
  general: number;
}

export type Address = {
  country: string;
  city: string;
  street: string;
}

export type GeoLocation = {
  latitude: number;
  longitude: number;
}

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
  address: Address;
  geoLocation: GeoLocation;
  overallRating: Rating;
};

export type NearbyRestaurant = Pick<Restaurant, 'id' | 'name' | 'imageUrl' | 'geoLocation' | 'program' | 'overallRating'>;
