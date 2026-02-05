import type { MenuItem } from '../types';

export const MENU_ITEMS: MenuItem[] = [
  // Appetizers
  {
    id: '1',
    name: 'Caesar Salad',
    category: 'Appetizers',
    price: 28.90,
    image: 'https://images.unsplash.com/photo-1677653805080-59c57727c84e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWxhZCUyMGZyZXNofGVufDF8fHx8MTc2Nzk1MzU4Mnww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Romaine lettuce, croutons, parmesan and caesar dressing'
  },
  {
    id: '2',
    name: 'Bruschetta',
    category: 'Appetizers',
    price: 24.90,
    image: 'https://images.unsplash.com/photo-1677653805080-59c57727c84e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWxhZCUyMGZyZXNofGVufDF8fHx8MTc2Nzk1MzU4Mnww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Italian bread, fresh tomato, basil and olive oil'
  },
  {
    id: '3',
    name: 'Sushi Platter',
    category: 'Appetizers',
    price: 45.90,
    image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXNoaXxlbnwxfHx8fDE3Njc5NTIxMDl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: '12 pieces of assorted sushi and sashimi'
  },

  // Main Courses
  {
    id: '4',
    name: 'Grilled Steak',
    category: 'Main Courses',
    price: 89.90,
    image: 'https://images.unsplash.com/photo-1676471755539-d99326272d53?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGVhayUyMGZvb2R8ZW58MXx8fHwxNzY3OTUzNTgxfDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Grilled filet mignon with potatoes and vegetables'
  },
  {
    id: '5',
    name: 'Artisan Burger',
    category: 'Main Courses',
    price: 52.90,
    image: 'https://images.unsplash.com/photo-1688246780164-00c01647e78c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXJnZXIlMjBmb29kfGVufDF8fHx8MTc2Nzk1MjYxNHww&ixlib=rb-4.1.0&q=80&w=1080',
    description: '180g burger, cheese, bacon, lettuce and tomato'
  },
  {
    id: '6',
    name: 'Pasta Carbonara',
    category: 'Main Courses',
    price: 48.90,
    image: 'https://images.unsplash.com/photo-1706051555972-579324abeb9c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXN0YSUyMGZvb2R8ZW58MXx8fHwxNzY3ODQyNzY3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Fresh pasta with creamy sauce, bacon and parmesan'
  },
  {
    id: '7',
    name: 'Pizza Margherita',
    category: 'Main Courses',
    price: 42.90,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaXp6YXxlbnwxfHx8fDE3Njc4Njg3MDd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Tomato sauce, mozzarella, basil and olive oil'
  },

  // Beverages
  {
    id: '8',
    name: 'Espresso Coffee',
    category: 'Beverages',
    price: 8.90,
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxjb2ZmZWV8ZW58MXx8fHwxNzY3OTUzNTgyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Traditional espresso coffee'
  },
  {
    id: '9',
    name: 'Orange Juice',
    category: 'Beverages',
    price: 12.90,
    image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmFuZ2UlMjBqdWljZXxlbnwxfHx8fDE3Njc4ODc5ODB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Fresh orange juice 300ml'
  },
  {
    id: '10',
    name: 'Soda',
    category: 'Beverages',
    price: 8.00,
    image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmFuZ2UlMjBqdWljZXxlbnwxfHx8fDE3Njc4ODc5ODB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Soda can 350ml'
  },
  {
    id: '11',
    name: 'House Cocktail',
    category: 'Beverages',
    price: 28.90,
    image: 'https://images.unsplash.com/photo-1619385006774-942adfe8dd6f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2NrdGFpbCUyMGRyaW5rfGVufDF8fHx8MTc2Nzg3OTUyOHww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Special house cocktail'
  },

  // Desserts
  {
    id: '12',
    name: 'Tiramisu',
    category: 'Desserts',
    price: 24.90,
    image: 'https://images.unsplash.com/photo-1679942262057-d5732f732841?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNzZXJ0JTIwY2FrZXxlbnwxfHx8fDE3Njc5Mzk2NDR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Italian dessert with coffee and mascarpone'
  },
  {
    id: '13',
    name: 'Lava Cake',
    category: 'Desserts',
    price: 28.90,
    image: 'https://images.unsplash.com/photo-1679942262057-d5732f732841?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNzZXJ0JTIwY2FrZXxlbnwxfHx8fDE3Njc5Mzk2NDR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Warm chocolate cake with ice cream'
  },
  {
    id: '14',
    name: 'Cheesecake',
    category: 'Desserts',
    price: 22.90,
    image: 'https://images.unsplash.com/photo-1679942262057-d5732f732841?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNzZXJ0JTIwY2FrZXxlbnwxfHx8fDE3Njc5Mzk2NDR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Creamy cheesecake with berry sauce'
  },
];

export const CATEGORIES = ['Appetizers', 'Main Courses', 'Beverages', 'Desserts'];