import { User, AdminStats } from '@/types/user';

export const users: User[] = [
  {
    id: '1',
    name: 'Jean Dupont',
    email: 'jean.dupont@email.com',
    role: 'admin',
    avatar: '/avatars/admin1.jpg',
    phone: '+33123456789',
    address: '123 Rue de la Paix, 75001 Paris',
    createdAt: '2023-01-15',
    lastLogin: '2024-07-19',
    isActive: true,
    preferences: {
      newsletter: true,
      notifications: true,
      language: 'fr'
    },
    orders: [
      {
        id: 'ord-001',
        date: '2024-07-15',
        total: 299.99,
        status: 'delivered',
        items: [
          {
            wineId: '1',
            wineName: 'Château Margaux 2018',
            quantity: 1,
            price: 299.99
          }
        ]
      }
    ]
  },
  {
    id: '2',
    name: 'Marie Martin',
    email: 'marie.martin@email.com',
    role: 'user',
    avatar: '/avatars/user1.jpg',
    phone: '+33987654321',
    address: '456 Avenue des Champs, 75008 Paris',
    createdAt: '2023-03-20',
    lastLogin: '2024-07-18',
    isActive: true,
    preferences: {
      newsletter: true,
      notifications: false,
      language: 'fr'
    },
    orders: [
      {
        id: 'ord-002',
        date: '2024-07-10',
        total: 125.50,
        status: 'shipped',
        items: [
          {
            wineId: '2',
            wineName: 'Sancerre Blanc 2021',
            quantity: 2,
            price: 45.00
          },
          {
            wineId: '6',
            wineName: 'Bandol Rosé 2022',
            quantity: 1,
            price: 35.50
          }
        ]
      }
    ]
  },
  {
    id: '3',
    name: 'Pierre Dubois',
    email: 'pierre.dubois@email.com',
    role: 'user',
    phone: '+33567891234',
    address: '789 Boulevard Saint-Germain, 75006 Paris',
    createdAt: '2023-06-10',
    lastLogin: '2024-07-17',
    isActive: true,
    preferences: {
      newsletter: false,
      notifications: true,
      language: 'fr'
    },
    orders: [
      {
        id: 'ord-003',
        date: '2024-06-28',
        total: 85.00,
        status: 'delivered',
        items: [
          {
            wineId: '3',
            wineName: 'Champagne Bollinger 2019',
            quantity: 1,
            price: 85.00
          }
        ]
      }
    ]
  },
  {
    id: '4',
    name: 'Sophie Leclerc',
    email: 'sophie.leclerc@email.com',
    role: 'admin',
    avatar: '/avatars/admin2.jpg',
    phone: '+33345678901',
    address: '321 Rue de Rivoli, 75001 Paris',
    createdAt: '2022-11-05',
    lastLogin: '2024-07-19',
    isActive: true,
    preferences: {
      newsletter: true,
      notifications: true,
      language: 'fr'
    }
  },
  {
    id: '5',
    name: 'Antoine Moreau',
    email: 'antoine.moreau@email.com',
    role: 'user',
    phone: '+33456789012',
    address: '654 Rue du Faubourg, 75011 Paris',
    createdAt: '2024-01-15',
    lastLogin: '2024-07-16',
    isActive: true,
    preferences: {
      newsletter: true,
      notifications: true,
      language: 'fr'
    }
  },
  {
    id: '6',
    name: 'Camille Bernard',
    email: 'camille.bernard@email.com',
    role: 'user',
    phone: '+33234567890',
    address: '987 Avenue Montaigne, 75008 Paris',
    createdAt: '2023-08-22',
    lastLogin: '2024-07-14',
    isActive: false,
    preferences: {
      newsletter: false,
      notifications: false,
      language: 'fr'
    }
  },
  {
    id: '7',
    name: 'Lucas Petit',
    email: 'lucas.petit@email.com',
    role: 'user',
    phone: '+33678901234',
    address: '147 Rue de la République, 69002 Lyon',
    createdAt: '2023-12-08',
    lastLogin: '2024-07-15',
    isActive: true,
    preferences: {
      newsletter: true,
      notifications: true,
      language: 'fr'
    },
    orders: [
      {
        id: 'ord-004',
        date: '2024-07-05',
        total: 180.00,
        status: 'confirmed',
        items: [
          {
            wineId: '5',
            wineName: 'Chassagne-Montrachet 2021',
            quantity: 1,
            price: 180.00
          }
        ]
      }
    ]
  },
  {
    id: '8',
    name: 'Emma Rousseau',
    email: 'emma.rousseau@email.com',
    role: 'user',
    phone: '+33789012345',
    address: '258 Cours Mirabeau, 13100 Aix-en-Provence',
    createdAt: '2024-02-28',
    lastLogin: '2024-07-12',
    isActive: true,
    preferences: {
      newsletter: true,
      notifications: false,
      language: 'fr'
    }
  }
];

// Fonctions utilitaires pour récupérer et filtrer les utilisateurs
export const getUserById = (id: string): User | undefined => {
  return users.find(user => user.id === id);
};

export const getUsersByRole = (role: 'admin' | 'user'): User[] => {
  return users.filter(user => user.role === role);
};

export const getActiveUsers = (): User[] => {
  return users.filter(user => user.isActive);
};

export const getInactiveUsers = (): User[] => {
  return users.filter(user => !user.isActive);
};

export const getUsersByEmail = (email: string): User | undefined => {
  return users.find(user => user.email.toLowerCase() === email.toLowerCase());
};

export const searchUsers = (query: string): User[] => {
  const searchTerm = query.toLowerCase();
  return users.filter(user => 
    user.name.toLowerCase().includes(searchTerm) ||
    user.email.toLowerCase().includes(searchTerm) ||
    user.phone?.includes(searchTerm) ||
    user.address?.toLowerCase().includes(searchTerm)
  );
};

export const getUsersWithOrders = (): User[] => {
  return users.filter(user => user.orders && user.orders.length > 0);
};

export const getUsersCreatedAfter = (date: string): User[] => {
  return users.filter(user => new Date(user.createdAt) > new Date(date));
};

export const getUsersWithNewsletter = (): User[] => {
  return users.filter(user => user.preferences.newsletter);
};

export const getTotalUsers = (): number => {
  return users.length;
};

export const getTotalActiveUsers = (): number => {
  return getActiveUsers().length;
};

export const getTotalAdmins = (): number => {
  return getUsersByRole('admin').length;
};

export const getTotalOrders = (): number => {
  return users.reduce((total, user) => total + (user.orders?.length || 0), 0);
};

export const getTotalRevenue = (): number => {
  return users.reduce((total, user) => {
    if (!user.orders) return total;
    return total + user.orders.reduce((userTotal, order) => userTotal + order.total, 0);
  }, 0);
};

export const getNewUsersThisMonth = (): number => {
  const currentDate = new Date();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  return getUsersCreatedAfter(firstDayOfMonth.toISOString().split('T')[0]).length;
};

export const getAdminStats = (): AdminStats => {
  return {
    totalUsers: getTotalUsers(),
    activeUsers: getTotalActiveUsers(),
    totalOrders: getTotalOrders(),
    totalRevenue: getTotalRevenue(),
    newUsersThisMonth: getNewUsersThisMonth()
  };
};

export const getRecentUsers = (limit: number = 5): User[] => {
  return users
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, limit);
};

export const getTopCustomers = (limit: number = 5): User[] => {
  return users
    .filter(user => user.orders && user.orders.length > 0)
    .sort((a, b) => {
      const aTotal = a.orders?.reduce((sum, order) => sum + order.total, 0) || 0;
      const bTotal = b.orders?.reduce((sum, order) => sum + order.total, 0) || 0;
      return bTotal - aTotal;
    })
    .slice(0, limit);
};