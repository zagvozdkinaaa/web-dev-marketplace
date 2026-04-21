export interface Category {
  id: number;
  name: string;
}

export interface Product {
  id: number;
  name: string;
  price: string;
  description?: string;
  category?: number | Category;
}

export interface Review {
  id?: number;
  user?: number;
  username?: string;
  product?: number;
  rating: number;
  comment: string;
  created_at?: string;
}

export interface OrderItem {
  id?: number;
  product: number;
  product_name?: string;
  price?: string;
  quantity: number;
  total_product_price?: number;
}

export interface Order {
  id?: number;
  user?: string;
  phone_number: string;
  delivery_address: string;
  status?: string;
  total_positions?: number;
  total_price?: number;
  order_items: OrderItem[];
  created_at?: string;
  updated_at?: string;
  is_deleted?: boolean;
}

export interface AuthResponse {
  token: string;
}
