import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@/types/user';
import { getUsersByEmail } from '@/data/users';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  isLoading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Vérifier si l'utilisateur est déjà connecté au chargement
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulation d'un délai de connexion
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = getUsersByEmail(email);
    
    if (foundUser && foundUser.isActive) {
      // Dans un vrai système, on vérifierait le mot de passe
      // Ici on simule avec un mot de passe simple: "password"
      if (password === 'password') {
        setUser(foundUser);
        localStorage.setItem('currentUser', JSON.stringify(foundUser));
        setIsLoading(false);
        return true;
      }
    }
    
    setIsLoading(false);
    return false;
  };

  const register = async (name: string, email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    
    // Simulation d'un délai d'inscription
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Vérifier si l'email existe déjà
    const existingUser = getUsersByEmail(email);
    if (existingUser) {
      setIsLoading(false);
      return { success: false, error: 'Cet email est déjà utilisé' };
    }
    
    // Créer un nouvel utilisateur
    const newUser: User = {
      id: `user-${Date.now()}`,
      name,
      email,
      role: 'user',
      createdAt: new Date().toISOString(),
      isActive: true,
      preferences: {
        newsletter: false,
        notifications: true,
        language: 'fr'
      }
    };
    
    setUser(newUser);
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    setIsLoading(false);
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  const isAuthenticated = !!user;
  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        isLoading,
        isAuthenticated,
        isAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};