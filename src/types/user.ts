export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  avatar?: string;
  phone?: string;
  address?: string;
  createdAt: string;
  lastLogin?: string;
  isActive: boolean;
  preferences: {
    newsletter: boolean;
    notifications: boolean;
    language: 'fr' | 'en';
  };
  orders?: Order[];
}

export interface Order {
  id: string;
  date: string;
  total: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  items: OrderItem[];
}

export interface OrderItem {
  wineId: string;
  wineName: string;
  quantity: number;
  price: number;
}

export interface AdminStats {
  totalUsers: number;
  activeUsers: number;
  totalOrders: number;
  totalRevenue: number;
  newUsersThisMonth: number;
}