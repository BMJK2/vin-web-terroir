import { Wine } from '@/types/wine';

export const wines: Wine[] = [
  {
    id: '1',
    name: 'Château Antananarivo Rouge',
    region: 'Hautes Terres',
    year: 2020,
    price: 45.99,
    rating: 4.5,
    description: 'Un rouge puissant et élégant issu des terroirs d\'altitude de Madagascar. Notes de fruits rouges mûrs et d\'épices douces.',
    image: '/src/assets/wine-red-1.jpg',
    type: 'rouge',
    features: [
      'Élevage en fût de chêne 12 mois',
      'Agriculture biologique',
      'Vendanges manuelles',
      'Potentiel de garde 8-10 ans'
    ],
    images: ['/src/assets/wine-red-1.jpg', '/src/assets/wine-red-2.jpg'],
    category: 'premium',
    alcohol: 13.5,
    volume: '750ml',
    grapes: ['Cabernet Sauvignon', 'Merlot', 'Syrah'],
    servingTemperature: '16-18°C',
    pairingNotes: ['Viandes rouges grillées', 'Fromages affinés', 'Gibier']
  },
  {
    id: '2',
    name: 'Domaine Fianarantsoa Blanc',
    region: 'Région Sud',
    year: 2022,
    price: 32.50,
    rating: 4.2,
    description: 'Blanc sec et minéral aux arômes d\'agrumes et de fleurs blanches. Parfait équilibre entre fraîcheur et rondeur.',
    image: '/src/assets/wine-white-1.jpg',
    type: 'blanc',
    features: [
      'Fermentation en cuve inox',
      'Sur lies fines 6 mois',
      'Agriculture raisonnée',
      'À consommer dans les 3-5 ans'
    ],
    images: ['/src/assets/wine-white-1.jpg', '/src/assets/wine-white-2.jpg'],
    category: 'tradition',
    alcohol: 12.5,
    volume: '750ml',
    grapes: ['Sauvignon Blanc', 'Chardonnay'],
    servingTemperature: '8-10°C',
    pairingNotes: ['Poissons grillés', 'Fruits de mer', 'Salade de chèvre chaud']
  },
  {
    id: '3',
    name: 'Cuvée Antsirabe Rosé',
    region: 'Vakinankaratra',
    year: 2023,
    price: 28.75,
    rating: 4.0,
    description: 'Rosé délicat aux reflets saumon, offrant des notes de fruits rouges et une finale rafraîchissante.',
    image: '/src/assets/wine-rose-1.jpg',
    type: 'rosé',
    features: [
      'Pressurage direct',
      'Fermentation à basse température',
      'Mise en bouteille précoce',
      'Idéal pour l\'apéritif'
    ],
    images: ['/src/assets/wine-rose-1.jpg'],
    category: 'collection',
    alcohol: 12.0,
    volume: '750ml',
    grapes: ['Grenache', 'Syrah', 'Cinsault'],
    servingTemperature: '6-8°C',
    pairingNotes: ['Charcuterie fine', 'Salades estivales', 'Grillades légères']
  },
  {
    id: '4',
    name: 'Champagne Malagasy Prestige',
    region: 'Hautes Terres',
    year: 2019,
    price: 89.90,
    rating: 4.8,
    description: 'Bulles fines et persistantes, arômes complexes de brioche et fruits secs. Une cuvée d\'exception.',
    image: '/src/assets/wine-champagne-1.jpg',
    type: 'champagne',
    features: [
      'Méthode traditionnelle',
      'Vieillissement sur lies 48 mois',
      'Assemblage de 3 cépages',
      'Production limitée'
    ],
    images: ['/src/assets/wine-champagne-1.jpg'],
    category: 'premium',
    alcohol: 12.5,
    volume: '750ml',
    grapes: ['Chardonnay', 'Pinot Noir', 'Pinot Meunier'],
    servingTemperature: '6-8°C',
    pairingNotes: ['Huîtres', 'Foie gras', 'Desserts aux fruits']
  },
  {
    id: '5',
    name: 'Réserve Ambohimanga Rouge',
    region: 'Région Centrale',
    year: 2018,
    price: 65.00,
    rating: 4.6,
    description: 'Cuvée de prestige issue de vignes centenaires. Complexité aromatique exceptionnelle et tanins soyeux.',
    image: '/src/assets/wine-red-2.jpg',
    type: 'rouge',
    features: [
      'Vignes de plus de 100 ans',
      'Élevage 18 mois en barriques',
      'Sélection parcellaire',
      'Potentiel de garde 15 ans'
    ],
    images: ['/src/assets/wine-red-2.jpg', '/src/assets/wine-red-1.jpg'],
    category: 'reserve',
    alcohol: 14.0,
    volume: '750ml',
    grapes: ['Cabernet Sauvignon', 'Petit Verdot'],
    servingTemperature: '16-18°C',
    pairingNotes: ['Côte de bœuf', 'Agneau aux herbes', 'Chocolat noir']
  },
  {
    id: '6',
    name: 'Blanc de Nosy Be',
    region: 'Côte Nord-Ouest',
    year: 2023,
    price: 38.20,
    rating: 4.3,
    description: 'Blanc tropical aux notes exotiques, reflet unique du terroir insulaire de Madagascar.',
    image: '/src/assets/wine-white-2.jpg',
    type: 'blanc',
    features: [
      'Terroir volcanique unique',
      'Influence maritime',
      'Vinification moderne',
      'Fraîcheur garantie'
    ],
    images: ['/src/assets/wine-white-2.jpg', '/src/assets/wine-white-1.jpg'],
    category: 'collection',
    alcohol: 13.0,
    volume: '750ml',
    grapes: ['Chenin Blanc', 'Viognier'],
    servingTemperature: '9-11°C',
    pairingNotes: ['Poissons exotiques', 'Curry de crevettes', 'Fromages frais']
  },
  {
    id: '7',
    name: 'Tradition Mahajanga Rouge',
    region: 'Côte Ouest',
    year: 2021,
    price: 25.50,
    rating: 3.8,
    description: 'Rouge authentique représentant la tradition vinicole Malagasy. Fruité et accessible.',
    image: '/src/assets/wine-red-1.jpg',
    type: 'rouge',
    features: [
      'Méthodes traditionnelles',
      'Élevage en cuve béton',
      'Rapport qualité-prix excellent',
      'Prêt à boire'
    ],
    images: ['/src/assets/wine-red-1.jpg'],
    category: 'tradition',
    alcohol: 12.5,
    volume: '750ml',
    grapes: ['Merlot', 'Carignan'],
    servingTemperature: '15-17°C',
    pairingNotes: ['Plats mijotés', 'Barbecue', 'Pizza']
  },
  {
    id: '8',
    name: 'Cuvée Toliara Blanc Sec',
    region: 'Région Sud-Ouest',
    year: 2023,
    price: 29.90,
    rating: 4.1,
    description: 'Blanc sec aux arômes d\'agrumes et de minéralité. Expression pure du terroir aride du Sud.',
    image: '/src/assets/wine-white-1.jpg',
    type: 'blanc',
    features: [
      'Climat semi-aride unique',
      'Vendanges de nuit',
      'Fermentation contrôlée',
      'Minéralité prononcée'
    ],
    images: ['/src/assets/wine-white-1.jpg'],
    category: 'collection',
    alcohol: 12.0,
    volume: '750ml',
    grapes: ['Sauvignon Blanc', 'Muscadet'],
    servingTemperature: '8-10°C',
    pairingNotes: ['Coquillages', 'Sushi', 'Chèvre frais aux herbes']
  }
];

export const getWineById = (id: string): Wine | undefined => {
  return wines.find(wine => wine.id === id);
};

export const getWinesByType = (type: string): Wine[] => {
  return wines.filter(wine => wine.type === type);
};

export const getWinesByRegion = (region: string): Wine[] => {
  return wines.filter(wine => wine.region.toLowerCase() === region.toLowerCase());
};

export const getWinesByCategory = (category: string): Wine[] => {
  return wines.filter(wine => wine.category === category);
};

export const getFeaturedWines = (): Wine[] => {
  return wines.slice(0, 4);
};

export const getNewArrivals = (): Wine[] => {
  return wines.filter(wine => wine.year >= 2022).slice(0, 4);
};

export const getPremiumWines = (): Wine[] => {
  return wines.filter(wine => wine.category === 'premium' || wine.category === 'reserve');
};

export const getWinesByPriceRange = (minPrice: number, maxPrice: number): Wine[] => {
  return wines.filter(wine => wine.price >= minPrice && wine.price <= maxPrice);
};

export const getRecommendedWines = (wineId: string): Wine[] => {
  const currentWine = getWineById(wineId);
  if (!currentWine) return [];
  
  return wines
    .filter(wine => 
      wine.id !== wineId && 
      (wine.type === currentWine.type || wine.region === currentWine.region)
    )
    .slice(0, 4);
};

export const searchWines = (query: string): Wine[] => {
  const lowercaseQuery = query.toLowerCase();
  return wines.filter(wine => 
    wine.name.toLowerCase().includes(lowercaseQuery) ||
    wine.region.toLowerCase().includes(lowercaseQuery) ||
    wine.description.toLowerCase().includes(lowercaseQuery) ||
    wine.grapes.some(grape => grape.toLowerCase().includes(lowercaseQuery))
  );
};