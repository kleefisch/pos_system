// User & Authentication Types
export interface User {
  id: string;
  name: string;
  username: string;
  role: 'waiter' | 'kitchen' | 'manager';
}

export interface AuthCredentials {
  username: string;
  password: string;
}

export interface CreateUserDTO extends User {
  password: string;
}

// Menu & Items Types
export interface MenuItem {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
  available?: boolean; // true by default, can be marked as unavailable
}

export interface OrderItem extends MenuItem {
  quantity: number;
  notes?: string;
}

// Order Types
export type OrderStatus = 'pending' | 'preparing' | 'done' | 'delivered';

export interface Order {
  id: string;
  items: OrderItem[];
  status: OrderStatus;
  createdAt: Date;
  sentAt?: Date;
  preparingAt?: Date;
  doneAt?: Date;
  deliveredAt?: Date;
}

// Table Types
export interface Table {
  id: string;
  number: number;
  seats: number;
  status: 'available' | 'occupied' | 'reserved';
  orders: Order[];
  waiterId?: string;
  active?: boolean; // true by default, can be deactivated
}

// View & Navigation Types
export type ViewType = 'tables' | 'order' | 'payment';
export type TabType = 'tables' | 'kitchen' | 'dashboard' | 'users' | 'menu-setup' | 'table-setup';