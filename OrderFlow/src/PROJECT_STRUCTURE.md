# OrderFlow - Project Structure

## Overview
OrderFlow is a complete POS (Point of Sale) system for restaurants with mobile-first design. The system is structured to easily integrate with a backend API in the future.

## Architecture

### 📁 Folder Structure

```
/
├── types/              # TypeScript type definitions (centralized)
│   └── index.ts        # All interfaces and types used across the app
│
├── services/           # Service layer for data operations
│   └── api.ts          # API functions (currently mock, ready for backend)
│
├── data/               # Static data and configurations
│   └── menuData.ts     # Menu items and categories
│
├── components/         # React components
│   ├── LoginScreen.tsx         # Authentication screen
│   ├── MainPOS.tsx             # Main container with navigation
│   ├── TablesView.tsx          # Table selection and management
│   ├── OrderView.tsx           # Order creation and management
│   ├── MenuList.tsx            # Menu item selection
│   ├── OrderCart.tsx           # Cart with items
│   ├── PaymentView.tsx         # Payment and bill splitting
│   ├── KitchenView.tsx         # Kitchen order queue
│   ├── DashboardView.tsx       # Manager dashboard
│   ├── UserManagementView.tsx  # User administration
│   └── OrderFlowLogo.tsx       # Logo component
│
└── App.tsx             # Root component
```

## Type Definitions (`/types/index.ts`)

All TypeScript interfaces are centralized in one file for consistency:

- **Waiter**: User account (waiter, kitchen, manager)
- **MenuItem**: Menu item definition
- **OrderItem**: MenuItem with quantity and notes
- **Order**: Customer order with status tracking
- **Table**: Restaurant table with orders and status
- **OrderStatus**: 'pending' | 'preparing' | 'ready' | 'delivered'
- **ViewType**: Application views
- **TabType**: Navigation tabs

## Service Layer (`/services/api.ts`)

The service layer abstracts all data operations. Currently uses **mock data** stored in memory, but is structured to easily replace with real API calls.

### Authentication Services

```typescript
login(username, password, loginType) 
// Backend: POST /api/auth/login
```

### Table Services

```typescript
getTables()                    // Backend: GET /api/tables
updateTable(table)             // Backend: PUT /api/tables/:id
updateTables(tables)           // Backend: PUT /api/tables/batch
```

### Menu Services

```typescript
getMenuItems()                 // Backend: GET /api/menu
getMenuCategories()            // Backend: GET /api/menu/categories
```

### Order Services

```typescript
createOrder(tableId, order)                    // Backend: POST /api/orders
updateOrderStatus(tableId, orderId, status)    // Backend: PATCH /api/orders/:id/status
```

### User Management Services

```typescript
getUsers()                     // Backend: GET /api/users
createUser(user)               // Backend: POST /api/users
updateUser(user)               // Backend: PUT /api/users/:id
deleteUser(userId)             // Backend: DELETE /api/users/:id
```

### Utility Functions

```typescript
resetData()                    // Reset to initial state (testing)
getAllUsers()                  // Get all users including special accounts
getWaiterById(id)              // Get specific user by ID
```

## Backend Integration Guide

When ready to connect to a real backend:

### 1. Update Service Functions

Replace mock implementations in `/services/api.ts` with actual HTTP calls:

```typescript
// Before (Mock)
export async function getTables(): Promise<Table[]> {
  await new Promise(resolve => setTimeout(resolve, 200));
  return [...tables];
}

// After (Real API)
export async function getTables(): Promise<Table[]> {
  const response = await fetch('/api/tables', {
    headers: {
      'Authorization': `Bearer ${getAuthToken()}`
    }
  });
  return response.json();
}
```

### 2. Add Authentication Token Management

```typescript
// services/auth.ts (new file)
let authToken: string | null = null;

export function setAuthToken(token: string) {
  authToken = token;
  localStorage.setItem('auth_token', token);
}

export function getAuthToken(): string | null {
  return authToken || localStorage.getItem('auth_token');
}

export function clearAuthToken() {
  authToken = null;
  localStorage.removeItem('auth_token');
}
```

### 3. Add Error Handling

```typescript
// services/errorHandler.ts (new file)
export class APIError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

export async function handleResponse(response: Response) {
  if (!response.ok) {
    const error = await response.json();
    throw new APIError(response.status, error.message);
  }
  return response.json();
}
```

### 4. Add Loading States

Components can be updated to show loading indicators:

```typescript
const [isLoading, setIsLoading] = useState(false);

const loadData = async () => {
  setIsLoading(true);
  try {
    const data = await api.getTables();
    setTables(data);
  } catch (error) {
    console.error('Failed to load tables:', error);
  } finally {
    setIsLoading(false);
  }
};
```

## Component Communication

```
App.tsx
  └─ LoginScreen.tsx
  └─ MainPOS.tsx
      ├─ TablesView.tsx
      ├─ OrderView.tsx
      │   ├─ MenuList.tsx
      │   └─ OrderCart.tsx
      ├─ PaymentView.tsx
      ├─ KitchenView.tsx
      ├─ DashboardView.tsx
      └─ UserManagementView.tsx
```

## User Roles

- **Waiter**: Can manage tables, create orders, process payments
- **Kitchen**: Can view and update order statuses
- **Manager**: Can access dashboard, manage users, and view all tables

## Data Flow

1. User logs in → `LoginScreen` → `api.login()`
2. User selects table → `TablesView` → `api.getTables()`
3. User creates order → `OrderView` → updates state locally
4. User sends to kitchen → Order added to table → `api.updateTable()`
5. Kitchen prepares → `KitchenView` → `api.updateOrderStatus()`
6. Payment → `PaymentView` → `api.updateTable()` (closes table)

## Mock Credentials

**Waiters:**
- john / waiter123
- mary / waiter123
- peter / waiter123
- anna / waiter123

**Kitchen:**
- kitchen / kitchen123

**Manager:**
- admin / admin123

## Next Steps for Production

1. **Backend Integration**
   - Replace mock functions in `/services/api.ts`
   - Add proper authentication with JWT tokens
   - Implement WebSocket for real-time order updates

2. **Error Handling**
   - Add global error boundary
   - Implement toast notifications for errors
   - Add retry logic for failed requests

3. **Performance**
   - Add React Query or SWR for data caching
   - Implement optimistic updates
   - Add pagination for large datasets

4. **Security**
   - Never store passwords in plain text
   - Use HTTPS only
   - Implement CSRF protection
   - Add rate limiting

5. **Testing**
   - Unit tests for service functions
   - Integration tests for components
   - E2E tests for critical flows

## Technologies Used

- React 18
- TypeScript
- Tailwind CSS v4
- Lucide React (icons)

---

**Note**: This structure makes it easy to transition from mock data to a real backend by simply updating the functions in `/services/api.ts` without touching any component code.
