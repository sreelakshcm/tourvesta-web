export type TourLocations = {
  _id: string;
  description: string;
  type: 'Point';
  coordinates: [number, number];
  day: number;
};

export type Tour = {
  startLocation: {
    description: string;
    type: 'Point';
    coordinates: [number, number];
    address: string;
  };
  ratingsAverage: number;
  ratingsQuantity: number;
  images: string[];
  startDates: string[];
  _id: string;
  name: string;
  duration: number;
  maxGroupSize: number;
  difficulty: 'easy' | 'medium' | 'difficult';
  guides: string[];
  price: number;
  summary: string;
  description: string;
  imageCover: string;
  locations: TourLocations[];
  reviews?: Review[];
};

export type User = {
  _id: string;
  username: string;
  email: string;
  role: 'admin' | 'user' | 'guide' | 'lead-guide';
  password: string;
  active: boolean;
};

export type Review = {
  _id: string;
  review: string;
  rating: number;
  tour: string;
  user: { name: string };
};
