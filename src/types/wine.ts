export interface Wine {
  id: string;
  name: string;
  region: string;
  year: number;
  price: number;
  rating: number;
  description: string;
  image: string;
  type: 'rouge' | 'blanc' | 'rosé' | 'champagne';
  features: string[];
  images: string[];
  category: 'premium' | 'collection' | 'reserve' | 'tradition';
  alcohol: number;
  volume: string;
  grapes: string[];
  servingTemperature: string;
  pairingNotes: string[];
}