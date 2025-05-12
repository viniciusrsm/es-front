// Interfaces
interface Restaurante {
  id: number;
  userId: number;
  name: string;
  address: string;
  phone: string;
  email: string;
  description: string;
  ratings: Rating[];
  ratingsCount: number; // Quantidade de avaliações
  averageRating: number; // Nota média
}

interface Rating {
  id: number;
  userId: number;
  stars: number;
  description: string;
  restaurantId: number;
}

interface User {
  name: string;
  username: string;
}

interface Menu {
  id: number;
  name: string;
  userId: number;
  restaurantId: number;
}

interface MenuItem {
  id: number;
  name: string;
  desc: string;
  price: number;
  menuId: number;
}
