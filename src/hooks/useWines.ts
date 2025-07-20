import { useState, useEffect } from 'react';
import { Wine } from '@/types/wine';
import { wines as initialWines } from '@/data/wines';

// État global pour les vins
let globalWines: Wine[] = [...initialWines];
let listeners: Array<() => void> = [];

// Fonction pour notifier tous les listeners
const notifyListeners = () => {
  listeners.forEach(listener => listener());
};

// Fonctions pour manipuler les vins
export const addWineToGlobal = (wine: Omit<Wine, 'id'>): Wine => {
  const newId = (Math.max(...globalWines.map(w => parseInt(w.id))) + 1).toString();
  const newWine = { ...wine, id: newId };
  globalWines.push(newWine);
  notifyListeners();
  return newWine;
};

export const removeWineFromGlobal = (id: string): boolean => {
  const index = globalWines.findIndex(wine => wine.id === id);
  if (index > -1) {
    globalWines.splice(index, 1);
    notifyListeners();
    return true;
  }
  return false;
};

export const updateWineInGlobal = (id: string, updatedWine: Partial<Wine>): boolean => {
  const index = globalWines.findIndex(wine => wine.id === id);
  if (index > -1) {
    globalWines[index] = { ...globalWines[index], ...updatedWine };
    notifyListeners();
    return true;
  }
  return false;
};

// Hook personnalisé pour utiliser les vins
export const useWines = () => {
  const [wines, setWines] = useState<Wine[]>([...globalWines]);

  useEffect(() => {
    const listener = () => {
      setWines([...globalWines]);
    };

    listeners.push(listener);

    return () => {
      listeners = listeners.filter(l => l !== listener);
    };
  }, []);

  return {
    wines,
    addWine: addWineToGlobal,
    removeWine: removeWineFromGlobal,
    updateWine: updateWineInGlobal,
    getWineById: (id: string) => wines.find(wine => wine.id === id),
    getWinesByType: (type: string) => wines.filter(wine => wine.type === type),
    getWinesByRegion: (region: string) => wines.filter(wine => wine.region.toLowerCase() === region.toLowerCase()),
    getWinesByCategory: (category: string) => wines.filter(wine => wine.category === category),
    getFeaturedWines: () => wines.slice(0, 4),
    getNewArrivals: () => wines.filter(wine => wine.year >= 2022).slice(0, 4),
    getPremiumWines: () => wines.filter(wine => wine.category === 'premium' || wine.category === 'reserve'),
    getWinesByPriceRange: (minPrice: number, maxPrice: number) => wines.filter(wine => wine.price >= minPrice && wine.price <= maxPrice),
    searchWines: (query: string) => {
      const lowercaseQuery = query.toLowerCase();
      return wines.filter(wine => 
        wine.name.toLowerCase().includes(lowercaseQuery) ||
        wine.region.toLowerCase().includes(lowercaseQuery) ||
        wine.description.toLowerCase().includes(lowercaseQuery) ||
        wine.grapes.some(grape => grape.toLowerCase().includes(lowercaseQuery))
      );
    }
  };
};