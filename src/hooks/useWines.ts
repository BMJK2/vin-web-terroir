import { useState, useEffect } from 'react';
import { Wine } from '@/types/wine';
import { supabase } from '@/integrations/supabase/client';

export const useWines = () => {
  const [wines, setWines] = useState<Wine[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadWines = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('wines')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Erreur lors du chargement des vins:', error);
    } else if (data) {
      const mappedWines: Wine[] = data.map(wine => ({
        id: wine.id,
        name: wine.name,
        region: wine.region,
        year: wine.year,
        price: typeof wine.price === 'string' ? parseFloat(wine.price) : wine.price,
        rating: typeof wine.rating === 'string' ? parseFloat(wine.rating) : (wine.rating || 0),
        description: wine.description,
        image: wine.image,
        type: wine.type as any,
        category: wine.category as any,
        alcohol: typeof wine.alcohol === 'string' ? parseFloat(wine.alcohol) : (wine.alcohol || 0),
        volume: wine.volume,
        servingTemperature: wine.serving_temperature || '',
        features: wine.features || [],
        images: wine.images || [],
        grapes: wine.grapes || [],
        pairingNotes: wine.pairing_notes || []
      }));
      setWines(mappedWines);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    loadWines();
  }, []);

  const addWine = async (wine: Omit<Wine, 'id'>): Promise<Wine | null> => {
    const { data, error } = await supabase
      .from('wines')
      .insert({
        name: wine.name,
        region: wine.region,
        year: wine.year,
        price: wine.price,
        rating: wine.rating,
        description: wine.description,
        image: wine.image,
        type: wine.type,
        category: wine.category,
        alcohol: wine.alcohol,
        volume: wine.volume,
        serving_temperature: wine.servingTemperature,
        features: wine.features,
        images: wine.images,
        grapes: wine.grapes,
        pairing_notes: wine.pairingNotes,
        stock: 0,
        is_active: true
      })
      .select()
      .single();

    if (error) {
      console.error('Erreur lors de l\'ajout du vin:', error);
      return null;
    }

    await loadWines();
    return data as any;
  };

  const removeWine = async (id: string): Promise<boolean> => {
    const { error } = await supabase
      .from('wines')
      .update({ is_active: false })
      .eq('id', id);

    if (error) {
      console.error('Erreur lors de la suppression du vin:', error);
      return false;
    }

    await loadWines();
    return true;
  };

  const updateWine = async (id: string, updatedWine: Partial<Wine>): Promise<boolean> => {
    const updateData: any = {};
    if (updatedWine.name) updateData.name = updatedWine.name;
    if (updatedWine.region) updateData.region = updatedWine.region;
    if (updatedWine.year) updateData.year = updatedWine.year;
    if (updatedWine.price !== undefined) updateData.price = updatedWine.price;
    if (updatedWine.rating !== undefined) updateData.rating = updatedWine.rating;
    if (updatedWine.description) updateData.description = updatedWine.description;
    if (updatedWine.image) updateData.image = updatedWine.image;
    if (updatedWine.type) updateData.type = updatedWine.type;
    if (updatedWine.category) updateData.category = updatedWine.category;
    if (updatedWine.alcohol !== undefined) updateData.alcohol = updatedWine.alcohol;
    if (updatedWine.volume) updateData.volume = updatedWine.volume;
    if (updatedWine.servingTemperature) updateData.serving_temperature = updatedWine.servingTemperature;
    if (updatedWine.features) updateData.features = updatedWine.features;
    if (updatedWine.images) updateData.images = updatedWine.images;
    if (updatedWine.grapes) updateData.grapes = updatedWine.grapes;
    if (updatedWine.pairingNotes) updateData.pairing_notes = updatedWine.pairingNotes;

    const { error } = await supabase
      .from('wines')
      .update(updateData)
      .eq('id', id);

    if (error) {
      console.error('Erreur lors de la mise à jour du vin:', error);
      return false;
    }

    await loadWines();
    return true;
  };

  return {
    wines,
    isLoading,
    addWine,
    removeWine,
    updateWine,
    refreshWines: loadWines,
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
