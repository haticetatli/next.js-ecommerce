export type Role = "USER" | "ADMIN";

export interface User {
  id: string;
  name?: string | null;
  email?: string | null;
  emailVerified?: Date | null;
  image?: string | null;
  hashedPassword?: string | null;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}

export interface SafeUser {
  id: string;
  name?: string | null;
  email?: string | null;
  emailVerified: string | null;
  image?: string | null;
  hashedPassword?: string | null;
  role: Role;
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  id: string;
  userId?: string;
  productId?: string;
  rating: number;
  comment: string;
  createdDate?: string | Date;
  user?: {
    id?: string;
    name?: string | null;
    image?: string | null;
  };
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  brand: string;
  category: string;
  inStock: boolean;
  image: string;
  images?: string[];
  reviews?: Review[];
}

export interface CartProduct {
  id: string;
  name: string;
  description?: string;
  price: number;
  quantity: number;
  image: string;
  inStock?: boolean;
  brand?: string;
  category?: string;
}

export type SortOption =
  | "featured"
  | "price-asc"
  | "price-desc"
  | "rating-desc"
  | "name-asc";

export interface FilterState {
  category: string;
  search: string;
  minPrice?: number;
  maxPrice?: number;
  inStockOnly?: boolean;
  sortBy: SortOption;
}

export interface Address {
  fullName: string;
  phone: string;
  email: string;
  addressLine: string;
  city: string;
  district: string;
  postalCode: string;
}

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  id: string;
  items: OrderItem[];
  subtotal: number;
  shippingFee: number;
  discount: number;
  total: number;
  shippingAddress: Address;
  paymentMethod: "card" | "cash_on_delivery";
  status: "pending" | "processing" | "shipped" | "delivered";
  createdAt: string;
  estimatedDelivery: string;
}

export interface Coupon {
  code: string;
  discountPercent?: number;
  discountAmount?: number;
  freeShipping?: boolean;
  description: string;
}
