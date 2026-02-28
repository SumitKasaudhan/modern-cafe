export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  avatar?: string;
  addresses?: Address[];
  createdAt: Date;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface MenuItem {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  dietaryTags: string[];
  ingredients: string[];
  nutritionalInfo?: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  sizes?: {
    name: string;
    price: number;
  }[];
  available: boolean;
  featured: boolean;
  createdAt: Date;
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
  size?: string;
  customizations?: string[];
}

export interface Order {
  _id: string;
  user?: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  deliveryFee: number;
  total: number;
  status: 'received' | 'preparing' | 'ready' | 'out_for_delivery' | 'delivered';
  deliveryAddress?: Address;
  deliveryType: 'delivery' | 'pickup';
  paymentMethod: string;
  promoCode?: string;
  createdAt: Date;
}

export interface Reservation {
  _id: string;
  user?: string;
  name: string;
  email: string;
  phone: string;
  date: Date;
  time: string;
  partySize: number;
  occasion?: string;
  specialRequests?: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: Date;
}

export interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featuredImage: string;
  author: string;
  category: string;
  tags: string[];
  published: boolean;
  readTime: number;
  createdAt: Date;
}

export interface Testimonial {
  _id: string;
  name: string;
  avatar: string;
  rating: number;
  comment: string;
  role: string;
}
