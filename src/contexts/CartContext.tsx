import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useToast } from '@/hooks/use-toast';

export interface CartItem {
  id: string;
  name: string;
  region: string;
  year: string;
  price: number;
  image: string;
  type: string;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (wine: Omit<CartItem, 'id' | 'quantity'>) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const { toast } = useToast();

  const addToCart = (wine: Omit<CartItem, 'id' | 'quantity'>) => {
    const id = `${wine.name}-${wine.year}`;
    setItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === id);
      if (existingItem) {
        toast({
          title: "Quantité mise à jour",
          description: `${wine.name} - quantité augmentée`,
        });
        return prevItems.map(item =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        toast({
          title: "Ajouté au panier",
          description: `${wine.name} a été ajouté à votre panier`,
        });
        return [...prevItems, { ...wine, id, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (id: string) => {
    setItems(prevItems => {
      const removedItem = prevItems.find(item => item.id === id);
      if (removedItem) {
        toast({
          title: "Retiré du panier",
          description: `${removedItem.name} a été retiré de votre panier`,
        });
      }
      return prevItems.filter(item => item.id !== id);
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    toast({
      title: "Panier vidé",
      description: "Tous les articles ont été supprimés de votre panier",
    });
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      totalItems,
      totalPrice,
    }}>
      {children}
    </CartContext.Provider>
  );
};