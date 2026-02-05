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

import type { Table, Waiter, MenuItem, Order } from '../types';
import { MENU_ITEMS } from '../data/menuData';

// ============================================
// MOCK DATA
// ============================================

const MOCK_WAITERS: Waiter[] = [
  { id: '1', name: 'John Silva', username: 'john', password: 'waiter123', role: 'waiter' },
  { id: '2', name: 'Mary Santos', username: 'mary', password: 'waiter123', role: 'waiter' },
  { id: '3', name: 'Peter Johnson', username: 'peter', password: 'waiter123', role: 'waiter' },
  { id: '4', name: 'Anna Costa', username: 'anna', password: 'waiter123', role: 'waiter' },
];

const KITCHEN_USER: Waiter = {
  id: 'kitchen',
  name: 'Kitchen',
  username: 'kitchen',
  password: 'kitchen123',
  role: 'kitchen'
};

const MANAGER_USER: Waiter = {
  id: 'manager',
  name: 'Admin Manager',
  username: 'admin',
  password: 'admin123',
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
        createdAt: new Date(Date.now() - 5 * 60000), // 5 minutes ago
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
        createdAt: new Date(Date.now() - 15 * 60000), // 15 minutes ago
        sentAt: new Date(Date.now() - 15 * 60000),
        preparingAt: new Date(Date.now() - 10 * 60000) // started preparing 10 min ago
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
        status: 'ready',
        createdAt: new Date(Date.now() - 25 * 60000), // 25 minutes ago
        sentAt: new Date(Date.now() - 25 * 60000),
        preparingAt: new Date(Date.now() - 20 * 60000),
        readyAt: new Date(Date.now() - 2 * 60000) // ready 2 min ago
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
        createdAt: new Date(Date.now() - 2 * 60000), // 2 minutes ago
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
          { ...MENU_ITEMS[6], quantity: 2 }, // 2x Chocolate Cake
          { ...MENU_ITEMS[9], quantity: 2 }  // 2x Espresso
        ],
        status: 'done',
        createdAt: new Date(Date.now() - 30 * 60000),
        sentAt: new Date(Date.now() - 25 * 60000),
        preparingAt: new Date(Date.now() - 20 * 60000),
        doneAt: new Date(Date.now() - 2 * 60000) // done 2 min ago
      }
    ], 
    waiterId: '4' 
  },
];

// In-memory storage (will be replaced by backend)
let users: Waiter[] = [...MOCK_WAITERS];
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
  username: string,
  password: string,
  loginType: 'waiter' | 'kitchen' | 'manager'
): Promise<{ success: boolean; user?: Waiter; role?: 'waiter' | 'kitchen' | 'manager'; error?: string }> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));

  if (loginType === 'kitchen') {
    if (username === KITCHEN_USER.username && password === KITCHEN_USER.password) {
      return { success: true, user: KITCHEN_USER, role: 'kitchen' };
    }
    return { success: false, error: 'Invalid credentials. Try: kitchen / kitchen123' };
  }

  if (loginType === 'manager') {
    if (username === MANAGER_USER.username && password === MANAGER_USER.password) {
      return { success: true, user: MANAGER_USER, role: 'manager' };
    }
    return { success: false, error: 'Invalid credentials. Try: admin / admin123' };
  }

  const waiter = users.find(w => w.username === username && w.password === password);
  if (waiter) {
    return { success: true, user: waiter, role: 'waiter' };
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
 * Get all users
 * 
 * Backend replacement:
 * - GET /api/users
 */
export async function getUsers(): Promise<Waiter[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 200));
  return [...users];
}

/**
 * Create a new user
 * 
 * Backend replacement:
 * - POST /api/users
 */
export async function createUser(user: Waiter): Promise<Waiter> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 200));
  
  users.push(user);
  return user;
}

/**
 * Update an existing user
 * 
 * Backend replacement:
 * - PUT /api/users/:id
 */
export async function updateUser(updatedUser: Waiter): Promise<Waiter> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 200));
  
  const index = users.findIndex(u => u.id === updatedUser.id);
  if (index !== -1) {
    users[index] = updatedUser;
  }
  
  return updatedUser;
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
  users = [...MOCK_WAITERS];
  tables = [...INITIAL_TABLES];
  menuItems = [...MENU_ITEMS];
}

/**
 * Get all users including special accounts (kitchen, manager)
 * Useful for login screen
 */
export function getAllUsers(): Waiter[] {
  return [...users, KITCHEN_USER, MANAGER_USER];
}

/**
 * Get a specific waiter by ID (including special accounts)
 */
export function getWaiterById(id: string): Waiter | null {
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