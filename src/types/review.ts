export type Review = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  description: string;
  imageUrl: string;
  userId: string;
  rating: {
    taste: number;
    texture: number;
    visual: number;
    general: number;
  };
};
