interface Restaurant {
  id: number;
  userId: number;
  name: string;
  address: string;
  phone: string;
  email: string;
  description: string;
  ratings: Rating[];
}

interface Rating {
  id: number;
  userId: number;
  stars: number;
  description: number;
  restaurantId: number;
}