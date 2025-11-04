import { useState, useEffect } from 'react';
import { User, AdminStats } from '@/types/user';
import { users as initialUsers } from '@/data/users';

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    // Charger les utilisateurs depuis localStorage ou utiliser les données initiales
    const savedUsers = localStorage.getItem('users');
    if (savedUsers) {
      setUsers(JSON.parse(savedUsers));
    } else {
      setUsers(initialUsers);
      localStorage.setItem('users', JSON.stringify(initialUsers));
    }
  }, []);

  const removeUser = (userId: string) => {
    const updatedUsers = users.filter(user => user.id !== userId);
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };

  const updateUser = (userId: string, updatedData: Partial<User>) => {
    const updatedUsers = users.map(user =>
      user.id === userId ? { ...user, ...updatedData } : user
    );
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };

  const getActiveUsers = () => users.filter(user => user.isActive);

  const getUsersByRole = (role: 'admin' | 'user') => users.filter(user => user.role === role);

  const searchUsers = (query: string) => {
    const searchTerm = query.toLowerCase();
    return users.filter(user => 
      user.name.toLowerCase().includes(searchTerm) ||
      user.email.toLowerCase().includes(searchTerm) ||
      user.phone?.includes(searchTerm) ||
      user.address?.toLowerCase().includes(searchTerm)
    );
  };

  const getTotalOrders = () => users.reduce((total, user) => total + (user.orders?.length || 0), 0);

  const getTotalRevenue = () => {
    return users.reduce((total, user) => {
      if (!user.orders) return total;
      return total + user.orders.reduce((userTotal, order) => userTotal + order.total, 0);
    }, 0);
  };

  const getNewUsersThisMonth = () => {
    const currentDate = new Date();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    return users.filter(user => new Date(user.createdAt) > firstDayOfMonth).length;
  };

  const getAdminStats = (): AdminStats => {
    return {
      totalUsers: users.length,
      activeUsers: getActiveUsers().length,
      totalOrders: getTotalOrders(),
      totalRevenue: getTotalRevenue(),
      newUsersThisMonth: getNewUsersThisMonth()
    };
  };

  const getRecentUsers = (limit: number = 5) => {
    return users
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, limit);
  };

  const getTopCustomers = (limit: number = 5) => {
    return users
      .filter(user => user.orders && user.orders.length > 0)
      .sort((a, b) => {
        const aTotal = a.orders?.reduce((sum, order) => sum + order.total, 0) || 0;
        const bTotal = b.orders?.reduce((sum, order) => sum + order.total, 0) || 0;
        return bTotal - aTotal;
      })
      .slice(0, limit);
  };

  return {
    users,
    removeUser,
    updateUser,
    searchUsers,
    getUsersByRole,
    getAdminStats,
    getRecentUsers,
    getTopCustomers
  };
};
