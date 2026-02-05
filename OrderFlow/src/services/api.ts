/**
 * API Service Layer
 * 
 * This module centralizes all data operations for the OrderFlow system.
 * Currently using mock data, but structured to easily replace with real backend calls.
 * 
 * When integrating with a real backend:
 * 1. Replace mock data with actual API endpoints
 * 2. Add proper error handling and loading states
 * 3. Implement authentication tokens in headers
 * 4. Add request/response interceptors for global error handling
 */

import type { Table, User, CreateUserDTO, AuthCredentials, MenuItem, Order } from '../types';
import { MENU_ITEMS } from '../data/menuData';

// ============================================
// API CONFIGURATION
// ============================================

const API_BASE_URL = 'http://localhost:5000/api';

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Convert date strings from API to Date objects
 */
function mapOrderDates(order: any): Order {
  return {
    ...order,
    createdAt: order.createdAt ? new Date(order.createdAt) : new Date(),
    sentAt: order.sentAt ? new Date(order.sentAt) : undefined,
    preparingAt: order.preparingAt ? new Date(order.preparingAt) : undefined,
    doneAt: order.doneAt ? new Date(order.doneAt) : undefined,
    deliveredAt: order.deliveredAt ? new Date(order.deliveredAt) : undefined,
  };
}

/**
 * Convert table data with date conversions for orders
 */
function mapTableDates(table: any): Table {
  return {
    ...table,
    orders: table.orders.map(mapOrderDates)
  };
}

// ============================================
// MOCK DATA
// ============================================

const MOCK_USERS: User[] = [
  { id: '1', name: 'John Silva', username: 'john', role: 'waiter' },
  { id: '2', name: 'Mary Santos', username: 'mary', role: 'waiter' },
  { id: '3', name: 'Peter Johnson', username: 'peter', role: 'waiter' },
  { id: '4', name: 'Anna Costa', username: 'anna', role: 'waiter' },
];

// Internal password storage (mock only - in production, handled by backend)
const MOCK_PASSWORDS: Record<string, string> = {
  '1': 'waiter123',
  '2': 'waiter123',
  '3': 'waiter123',
  '4': 'waiter123',
  'kitchen': 'kitchen123',
  'manager': 'admin123'
};

const KITCHEN_USER: User = {
  id: 'kitchen',
  name: 'Kitchen',
  username: 'kitchen',
  role: 'kitchen'
};

const MANAGER_USER: User = {
  id: 'manager',
  name: 'Admin Manager',
  username: 'admin',
  role: 'manager'
};

const INITIAL_TABLES: Table[] = [
  { id: '1', number: 1, seats: 2, status: 'available', orders: [] },
  { 
    id: '2', 
    number: 2, 
    seats: 4, 
    status: 'occupied', 
    orders: [
      {
        id: 'order-1',
        items: [
          { id: '1', name: 'Caesar Salad', category: 'Appetizers', price: 28.90, image: '', description: 'Romaine lettuce, croutons, parmesan', quantity: 2, notes: 'No croutons please' },
          { id: '4', name: 'Grilled Steak', category: 'Main Courses', price: 89.90, image: '', description: 'Grilled filet mignon', quantity: 1, notes: 'Medium rare' },
          { id: '8', name: 'Espresso Coffee', category: 'Beverages', price: 8.90, image: '', description: 'Traditional espresso', quantity: 2 }
        ],
        status: 'pending',
        createdAt: new Date(Date.now() - 5 * 60000),
        sentAt: new Date(Date.now() - 5 * 60000)
      }
    ], 
    waiterId: '1' 
  },
  { 
    id: '3', 
    number: 3, 
    seats: 2, 
    status: 'occupied', 
    orders: [
      {
        id: 'order-2',
        items: [
          { id: '5', name: 'Artisan Burger', category: 'Main Courses', price: 52.90, image: '', description: '180g burger with cheese', quantity: 1, notes: 'Extra bacon' },
          { id: '9', name: 'Orange Juice', category: 'Beverages', price: 12.90, image: '', description: 'Fresh orange juice', quantity: 1 }
        ],
        status: 'preparing',
        createdAt: new Date(Date.now() - 15 * 60000),
        sentAt: new Date(Date.now() - 15 * 60000),
        preparingAt: new Date(Date.now() - 10 * 60000)
      }
    ], 
    waiterId: '2' 
  },
  { 
    id: '4', 
    number: 4, 
    seats: 6, 
    status: 'occupied', 
    orders: [
      {
        id: 'order-3',
        items: [
          { id: '3', name: 'Sushi Platter', category: 'Appetizers', price: 45.90, image: '', description: '12 pieces assorted', quantity: 2 },
          { id: '6', name: 'Pasta Carbonara', category: 'Main Courses', price: 48.90, image: '', description: 'Fresh pasta with creamy sauce', quantity: 3 },
          { id: '11', name: 'House Cocktail', category: 'Beverages', price: 28.90, image: '', description: 'Special cocktail', quantity: 4 }
        ],
        status: 'done',
        createdAt: new Date(Date.now() - 25 * 60000),
        sentAt: new Date(Date.now() - 25 * 60000),
        preparingAt: new Date(Date.now() - 20 * 60000),
        doneAt: new Date(Date.now() - 2 * 60000)
      }
    ], 
    waiterId: '2' 
  },
  { id: '5', number: 5, seats: 4, status: 'reserved', orders: [] },
  { id: '6', number: 6, seats: 8, status: 'reserved', orders: [], waiterId: '3' },
  { id: '7', number: 7, seats: 2, status: 'available', orders: [] },
  { id: '8', number: 8, seats: 4, status: 'available', orders: [] },
  { 
    id: '9', 
    number: 9, 
    seats: 4, 
    status: 'occupied', 
    orders: [
      {
        id: 'order-4',
        items: [
          { id: '7', name: 'Pizza Margherita', category: 'Main Courses', price: 42.90, image: '', description: 'Tomato, mozzarella, basil', quantity: 2 },
          { id: '10', name: 'Soda', category: 'Beverages', price: 8.00, image: '', description: 'Can 350ml', quantity: 3 }
        ],
        status: 'pending',
        createdAt: new Date(Date.now() - 2 * 60000),
        sentAt: new Date(Date.now() - 2 * 60000)
      }
    ], 
    waiterId: '1' 
  },
  { id: '10', number: 10, seats: 2, status: 'available', orders: [] },
  { id: '11', number: 11, seats: 6, status: 'available', orders: [] },
  { 
    id: '12', 
    number: 12, 
    seats: 4, 
    status: 'occupied', 
    orders: [
      {
        id: 'ord-003',
        items: [
          { ...MENU_ITEMS[6], quantity: 2 },
          { ...MENU_ITEMS[9], quantity: 2 }
        ],
        status: 'done',
        createdAt: new Date(Date.now() - 30 * 60000),
        sentAt: new Date(Date.now() - 25 * 60000),
        preparingAt: new Date(Date.now() - 20 * 60000),
        doneAt: new Date(Date.now() - 2 * 60000)
      }
    ], 
    waiterId: '4' 
  },
];

// In-memory storage (will be replaced by backend)
let users: User[] = [...MOCK_USERS];
let tables: Table[] = [...INITIAL_TABLES];
let menuItems: MenuItem[] = [...MENU_ITEMS];
let categories: string[] = ['Appetizers', 'Main Courses', 'Beverages', 'Desserts'];

// ============================================
// AUTHENTICATION SERVICES
// ============================================

/**
 * Authenticate user with username and password
 * 
 * Backend replacement:
 * - POST /api/auth/login
 * - Returns JWT token and user data
 */
export async function login(
  credentials: AuthCredentials,
  loginType: 'waiter' | 'kitchen' | 'manager'
): Promise<{ success: boolean; user?: User; role?: 'waiter' | 'kitchen' | 'manager'; error?: string }> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));

  const { username, password } = credentials;

  if (loginType === 'kitchen') {
    if (username === KITCHEN_USER.username && password === MOCK_PASSWORDS['kitchen']) {
      return { success: true, user: KITCHEN_USER, role: 'kitchen' };
    }
    return { success: false, error: 'Invalid credentials. Try: kitchen / kitchen123' };
  }

  if (loginType === 'manager') {
    if (username === MANAGER_USER.username && password === MOCK_PASSWORDS['manager']) {
      return { success: true, user: MANAGER_USER, role: 'manager' };
    }
    return { success: false, error: 'Invalid credentials. Try: admin / admin123' };
  }

  const user = users.find(u => u.username === username);
  if (user && MOCK_PASSWORDS[user.id] === password) {
    return { success: true, user, role: 'waiter' };
  }

  return { success: false, error: 'Invalid credentials. Try: john / waiter123' };
}

// ============================================
// TABLE SERVICES
// ============================================

/**
 * Get all tables
 * 
 * Backend replacement:
 * - GET /api/tables
 */
export async function getTables(): Promise<Table[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 200));
  // In production: const response = await fetch(`${API_BASE_URL}/tables`);
  // const data = await response.json();
  // return data.map(mapTableDates);
  return [...tables];
}

/**
 * Update a table
 * 
 * Backend replacement:
 * - PUT /api/tables/:id
 */
export async function updateTable(updatedTable: Table): Promise<Table> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 200));
  
  const index = tables.findIndex(t => t.id === updatedTable.id);
  if (index !== -1) {
    tables[index] = updatedTable;
  }
  
  return updatedTable;
}

/**
 * Update multiple tables (batch update)
 * 
 * Backend replacement:
 * - PUT /api/tables/batch
 */
export async function updateTables(updatedTables: Table[]): Promise<Table[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 200));
  
  updatedTables.forEach(updatedTable => {
    const index = tables.findIndex(t => t.id === updatedTable.id);
    if (index !== -1) {
      tables[index] = updatedTable;
    }
  });
  
  return updatedTables;
}

// ============================================
// MENU SERVICES
// ============================================

/**
 * Get all menu items
 * 
 * Backend replacement:
 * - GET /api/menu
 */
export async function getMenuItems(): Promise<MenuItem[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 200));
  return menuItems;
}

/**
 * Get menu categories
 * 
 * Backend replacement:
 * - GET /api/menu/categories
 */
export async function getMenuCategories(): Promise<string[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 200));
  return categories;
}

// ============================================
// ORDER SERVICES
// ============================================

/**
 * Create a new order for a table
 * 
 * Backend replacement:
 * - POST /api/orders
 */
export async function createOrder(tableId: string, order: Order): Promise<Order> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 200));
  
  const table = tables.find(t => t.id === tableId);
  if (table) {
    table.orders.push(order);
  }
  
  return order;
}

/**
 * Update order status
 * 
 * Backend replacement:
 * - PATCH /api/orders/:id/status
 */
export async function updateOrderStatus(
  tableId: string,
  orderId: string,
  status: Order['status']
): Promise<Order | null> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 200));
  
  const table = tables.find(t => t.id === tableId);
  if (table) {
    const order = table.orders.find(o => o.id === orderId);
    if (order) {
      order.status = status;
      return order;
    }
  }
  
  return null;
}

// ============================================
// USER MANAGEMENT SERVICES
// ============================================

/**
 * Get all users (without passwords)
 * 
 * Backend replacement:
 * - GET /api/users
 */
export async function getUsers(): Promise<User[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 200));
  // Return users without password field
  return [...users];
}

/**
 * Create a new user
 * 
 * Backend replacement:
 * - POST /api/users
 */
export async function createUser(userDTO: CreateUserDTO): Promise<User> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 200));
  
  // Extract password and create user object without it
  const { password, ...user } = userDTO;
  
  // Store password separately (mock only)
  MOCK_PASSWORDS[user.id] = password;
  
  // Add user to list
  users.push(user);
  
  // Return user without password
  return user;
}

/**
 * Update an existing user
 * 
 * Backend replacement:
 * - PUT /api/users/:id
 */
export async function updateUser(userId: string, updates: Partial<User>, newPassword?: string): Promise<User> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 200));
  
  const index = users.findIndex(u => u.id === userId);
  if (index !== -1) {
    users[index] = { ...users[index], ...updates };
    
    // Update password if provided
    if (newPassword) {
      MOCK_PASSWORDS[userId] = newPassword;
    }
    
    return users[index];
  }
  
  throw new Error('User not found');
}

/**
 * Delete a user
 * 
 * Backend replacement:
 * - DELETE /api/users/:id
 */
export async function deleteUser(userId: string): Promise<boolean> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 200));
  
  const index = users.findIndex(u => u.id === userId);
  if (index !== -1) {
    users.splice(index, 1);
    delete MOCK_PASSWORDS[userId];
    return true;
  }
  
  return false;
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Reset all data to initial state (useful for testing)
 */
export function resetData(): void {
  users = [...MOCK_USERS];
  tables = [...INITIAL_TABLES];
  menuItems = [...MENU_ITEMS];
}

/**
 * Get all users including special accounts (kitchen, manager)
 * Useful for login screen
 */
export function getAllUsers(): User[] {
  return [...users, KITCHEN_USER, MANAGER_USER];
}

/**
 * Get a specific user by ID (including special accounts)
 */
export function getUserById(id: string): User | null {
  const allUsers = [...users, KITCHEN_USER, MANAGER_USER];
  return allUsers.find(u => u.id === id) || null;
}

// ============================================
// MENU MANAGEMENT SERVICES (Manager only)
// ============================================

/**
 * Create a new menu item
 * 
 * Backend replacement:
 * - POST /api/menu
 */
export async function createMenuItem(item: MenuItem): Promise<MenuItem> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 200));
  
  menuItems.push(item);
  return item;
}

/**
 * Update a menu item
 * 
 * Backend replacement:
 * - PUT /api/menu/:id
 */
export async function updateMenuItem(updatedItem: MenuItem): Promise<MenuItem> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 200));
  
  const index = menuItems.findIndex(item => item.id === updatedItem.id);
  if (index !== -1) {
    menuItems[index] = updatedItem;
  }
  
  return updatedItem;
}

/**
 * Delete a menu item
 * 
 * Backend replacement:
 * - DELETE /api/menu/:id
 */
export async function deleteMenuItem(itemId: string): Promise<boolean> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 200));
  
  const index = menuItems.findIndex(item => item.id === itemId);
  if (index !== -1) {
    menuItems.splice(index, 1);
    return true;
  }
  
  return false;
}

/**
 * Toggle menu item availability
 * 
 * Backend replacement:
 * - PATCH /api/menu/:id/availability
 */
export async function toggleMenuItemAvailability(itemId: string): Promise<MenuItem | null> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 200));
  
  const item = menuItems.find(i => i.id === itemId);
  if (item) {
    item.available = item.available === false ? true : false;
    return item;
  }
  
  return null;
}

// ============================================
// TABLE MANAGEMENT SERVICES (Manager only)
// ============================================

/**
 * Create a new table
 * 
 * Backend replacement:
 * - POST /api/tables
 */
export async function createTable(table: Table): Promise<Table> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 200));
  
  tables.push(table);
  return table;
}

/**
 * Delete a table
 * 
 * Backend replacement:
 * - DELETE /api/tables/:id
 */
export async function deleteTable(tableId: string): Promise<boolean> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 200));
  
  const index = tables.findIndex(t => t.id === tableId);
  if (index !== -1) {
    tables.splice(index, 1);
    return true;
  }
  
  return false;
}

/**
 * Toggle table active status
 * 
 * Backend replacement:
 * - PATCH /api/tables/:id/active
 */
export async function toggleTableActive(tableId: string): Promise<Table | null> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 200));
  
  const table = tables.find(t => t.id === tableId);
  if (table) {
    table.active = table.active === false ? true : false;
    return table;
  }
  
  return null;
}

// ============================================
// CATEGORY MANAGEMENT SERVICES (Manager only)
// ============================================

/**
 * Create a new category
 * 
 * Backend replacement:
 * - POST /api/categories
 */
export async function createCategory(categoryName: string): Promise<string> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 200));
  
  if (categories.includes(categoryName)) {
    throw new Error('Category already exists');
  }
  
  categories.push(categoryName);
  return categoryName;
}

/**
 * Update a category name
 * 
 * Backend replacement:
 * - PUT /api/categories/:name
 */
export async function updateCategory(oldName: string, newName: string): Promise<string> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 200));
  
  const index = categories.findIndex(cat => cat === oldName);
  if (index === -1) {
    throw new Error('Category not found');
  }
  
  if (categories.includes(newName) && oldName !== newName) {
    throw new Error('Category name already exists');
  }
  
  // Update category name
  categories[index] = newName;
  
  // Update all menu items with this category
  menuItems.forEach(item => {
    if (item.category === oldName) {
      item.category = newName;
    }
  });
  
  return newName;
}

/**
 * Delete a category
 * 
 * Backend replacement:
 * - DELETE /api/categories/:name
 */
export async function deleteCategory(categoryName: string): Promise<boolean> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 200));
  
  // Check if there are items in this category
  const itemsInCategory = menuItems.filter(item => item.category === categoryName);
  if (itemsInCategory.length > 0) {
    throw new Error(`Cannot delete category with ${itemsInCategory.length} items. Please move or delete items first.`);
  }
  
  const index = categories.findIndex(cat => cat === categoryName);
  if (index !== -1) {
    categories.splice(index, 1);
    return true;
  }
  
  return false;
}
