export interface Service {
  id: number;
  user_id: number;
  category_id: number;
  title: string;
  description: string;
  price: string;
  image_url_full: string;
  image_url: string;
  created_at: string;
  updated_at: string;
  user: User;
  category: Category;
}

export interface User {
  name: string;
  address: string;
  phone_number: string;
}

export interface Category {
  id: number;
  name: string;
}
