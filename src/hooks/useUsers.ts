import { useState, useEffect } from 'react';
import { User, AdminStats } from '@/types/user';
import { supabase } from '@/integrations/supabase/client';

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadUsers = async () => {
    setIsLoading(true);
    
    const { data: profiles, error: profilesError } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });

    if (profilesError) {
      console.error('Erreur lors du chargement des profils:', profilesError);
      setIsLoading(false);
      return;
    }

    if (profiles) {
      const usersWithRoles = await Promise.all(
        profiles.map(async (profile) => {
          const { data: roles } = await supabase
            .from('user_roles')
            .select('role')
            .eq('user_id', profile.user_id);

          const { data: orders } = await supabase
            .from('orders')
            .select('id, total, status, created_at')
            .eq('user_id', profile.user_id);

          const userRole = roles?.find(r => r.role === 'admin') ? 'admin' : 'user';
          
          return {
            id: profile.user_id,
            name: profile.name,
            email: profile.email,
            phone: profile.phone,
            address: profile.address,
            role: userRole,
            isActive: profile.is_active,
            createdAt: profile.created_at,
            preferences: {
              newsletter: false,
              notifications: true,
              language: 'fr'
            },
            orders: orders?.map(o => ({
              id: o.id,
              date: o.created_at,
              total: typeof o.total === 'string' ? parseFloat(o.total) : o.total,
              status: o.status,
              items: []
            }))
          } as User;
        })
      );
      
      setUsers(usersWithRoles);
    }
    
    setIsLoading(false);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const removeUser = async (userId: string) => {
    const { error } = await supabase
      .from('profiles')
      .update({ is_active: false })
      .eq('user_id', userId);

    if (error) {
      console.error('Erreur lors de la suppression de l\'utilisateur:', error);
      return;
    }

    await loadUsers();
  };

  const updateUser = async (userId: string, updatedData: Partial<User>) => {
    const updateProfile: any = {};
    if (updatedData.name) updateProfile.name = updatedData.name;
    if (updatedData.email) updateProfile.email = updatedData.email;
    if (updatedData.phone !== undefined) updateProfile.phone = updatedData.phone;
    if (updatedData.address !== undefined) updateProfile.address = updatedData.address;
    if (updatedData.isActive !== undefined) updateProfile.is_active = updatedData.isActive;

    const { error } = await supabase
      .from('profiles')
      .update(updateProfile)
      .eq('user_id', userId);

    if (error) {
      console.error('Erreur lors de la mise à jour de l\'utilisateur:', error);
      return;
    }

    await loadUsers();
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
    isLoading,
    removeUser,
    updateUser,
    searchUsers,
    getUsersByRole,
    getAdminStats,
    getRecentUsers,
    getTopCustomers,
    refreshUsers: loadUsers
  };
};
