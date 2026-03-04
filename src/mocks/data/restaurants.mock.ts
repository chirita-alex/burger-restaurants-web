import type { Restaurant, NearbyRestaurant } from '../../types/restaurant';

export const mockRestaurant: Restaurant = {
  id: '1',
  ownerId: 'owner-1',
  name: 'Burger House',
  imageUrl: '/images/restaurants/restaurant_3.webp',
  createdAt: new Date('2024-01-01'),
  updatedAt: new Date('2024-01-01'),
  description: 'Best burgers in town with fresh ingredients',
  program: { openingHours: 'Mon-Sun 10:00-22:00' },
  address: { country: 'Romania', city: 'Bucharest', street: 'Burger St. 1' },
  geoLocation: { latitude: 44.4268, longitude: 26.1025 },
  overallRating: { taste: 4.5, texture: 4.2, visual: 4.8, general: 4.5 },
};

export const mockNearbyRestaurants: NearbyRestaurant[] = [
  {
    id: '1',
    name: 'Burger House',
    imageUrl: '/images/restaurants/restaurant_1.webp',
    program: { openingHours: 'Mon-Sun 10:00-22:00' },
    geoLocation: { latitude: 44.4268, longitude: 26.1025 },
    overallRating: { taste: 4.5, texture: 4.2, visual: 4.8, general: 4.5 },
  },
  {
    id: '2',
    name: 'Smash Bros Burgers',
    imageUrl: '/images/restaurants/restaurant_4.webp',
    program: { openingHours: 'Mon-Fri 11:00-23:00' },
    geoLocation: { latitude: 44.4268, longitude: 26.1025 },
    overallRating: { taste: 4.8, texture: 4.6, visual: 4.3, general: 4.7 },
  },
  {
    id: '3',
    name: 'The Patty Lab',
    imageUrl: '/images/restaurants/restaurant_2.webp',
    program: { openingHours: 'Tue-Sun 12:00-21:00' },
    geoLocation: { latitude: 44.4268, longitude: 26.1025 },
    overallRating: { taste: 4.2, texture: 4.4, visual: 4.6, general: 4.3 },
  },
  {
    id: '4',
    name: 'Big Bun Theory',
    imageUrl: '/images/restaurants/restaurant_5.webp',
    program: { openingHours: 'Mon-Sun 09:00-23:00' },
    geoLocation: { latitude: 44.4268, longitude: 26.1025 },
    overallRating: { taste: 4.6, texture: 4.5, visual: 4.7, general: 4.6 },
  },
  {
    id: '5',
    name: 'Grill & Chill',
    imageUrl: '/images/restaurants/restaurant_6.webp',
    program: { openingHours: 'Wed-Sun 12:00-22:00' },
    geoLocation: { latitude: 44.4268, longitude: 26.1025 },
    overallRating: { taste: 4.3, texture: 4.1, visual: 4.5, general: 4.2 },
  },
  {
    id: '6',
    name: 'Great BURGERS!',
    imageUrl: '/images/restaurants/restaurant_2.webp',
    program: { openingHours: 'Mon-Sun 09:00-23:00' },
    geoLocation: { latitude: 44.4268, longitude: 26.1025 },
    overallRating: { taste: 4.6, texture: 4.5, visual: 4.7, general: 4.6 },
  },
];