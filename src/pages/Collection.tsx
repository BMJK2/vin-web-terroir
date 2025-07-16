import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WineCard from "@/components/WineCard";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Filter, Search, SlidersHorizontal } from "lucide-react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import wineRed1 from "@/assets/wine-red-1.jpg";
import wineWhite1 from "@/assets/wine-white-1.jpg";
import wineChampagne1 from "@/assets/wine-champagne-1.jpg";
import wineRed2 from "@/assets/wine-red-2.jpg";
import wineWhite2 from "@/assets/wine-white-2.jpg";
import wineRose1 from "@/assets/wine-rose-1.jpg";

const Collection = () => {
  const allWines = [
    {
      name: "Château Margaux",
      region: "Bordeaux",
      year: "2018",
      price: "299",
      rating: 5,
      image: wineRed1,
      type: "Rouge",
      description: "Un grand cru exceptionnel aux arômes complexes de fruits noirs et d'épices."
    },
    {
      name: "Sancerre Blanc",
      region: "Loire",
      year: "2021",
      price: "45",
      rating: 4,
      image: wineWhite1,
      type: "Blanc",
      description: "Vin blanc sec et minéral, parfait pour accompagner fruits de mer et poissons."
    },
    {
      name: "Champagne Bollinger",
      region: "Champagne",
      year: "2019",
      price: "85",
      rating: 5,
      image: wineChampagne1,
      type: "Effervescent",
      description: "Champagne prestigieux aux bulles fines et aux arômes de brioche et d'agrumes."
    },
    {
      name: "Côte-Rôtie",
      region: "Rhône",
      year: "2020",
      price: "125",
      rating: 4,
      image: wineRed2,
      type: "Rouge",
      description: "Vin rouge puissant et élégant, expression parfaite du terroir rhodanien."
    },
    {
      name: "Chassagne-Montrachet",
      region: "Bourgogne",
      year: "2021",
      price: "180",
      rating: 5,
      image: wineWhite2,
      type: "Blanc",
      description: "Chardonnay d'exception aux notes beurrées et minérales incomparables."
    },
    {
      name: "Bandol Rosé",
      region: "Provence",
      year: "2022",
      price: "35",
      rating: 4,
      image: wineRose1,
      type: "Rosé",
      description: "Rosé de caractère aux arômes de fruits rouges et d'herbes de Provence."
    },
    {
      name: "Pommard Premier Cru",
      region: "Bourgogne",
      year: "2019",
      price: "220",
      rating: 5,
      image: wineRed1,
      type: "Rouge",
      description: "Grand Bourgogne aux tanins soyeux et aux arômes de cerise et de sous-bois."
    },
    {
      name: "Pouilly-Fumé",
      region: "Loire",
      year: "2022",
      price: "38",
      rating: 4,
      image: wineWhite1,
      type: "Blanc",
      description: "Sauvignon blanc expressif aux notes de pierre à fusil et d'agrumes."
    },
    {
      name: "Châteauneuf-du-Pape",
      region: "Rhône",
      year: "2018",
      price: "95",
      rating: 5,
      image: wineRed2,
      type: "Rouge",
      description: "Assemblage noble aux arômes de garrigue, d'épices et de fruits mûrs."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-r from-wine-burgundy to-wine-burgundy/80">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-wine-cream">
            <Link to="/" className="inline-flex items-center space-x-2 mb-6 hover:text-wine-gold transition-wine">
              <ArrowLeft className="h-4 w-4" />
              <span>Retour à l'accueil</span>
            </Link>
            
            <h1 className="font-serif text-5xl md:text-6xl font-bold mb-6">
              Toute la Collection
            </h1>
            
            <p className="text-xl leading-relaxed text-wine-cream/90 max-w-2xl mx-auto">
              Explorez l'intégralité de notre sélection de vins d'exception, 
              des grands crus aux pépites méconnues.
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-12 bg-wine-cream/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex items-center space-x-4 flex-1">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Rechercher un vin..." 
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <Select>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les types</SelectItem>
                    <SelectItem value="rouge">Rouge</SelectItem>
                    <SelectItem value="blanc">Blanc</SelectItem>
                    <SelectItem value="rose">Rosé</SelectItem>
                    <SelectItem value="effervescent">Effervescent</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Région" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes régions</SelectItem>
                    <SelectItem value="bordeaux">Bordeaux</SelectItem>
                    <SelectItem value="bourgogne">Bourgogne</SelectItem>
                    <SelectItem value="loire">Loire</SelectItem>
                    <SelectItem value="rhone">Rhône</SelectItem>
                    <SelectItem value="champagne">Champagne</SelectItem>
                    <SelectItem value="provence">Provence</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Prix" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous prix</SelectItem>
                    <SelectItem value="0-50">0€ - 50€</SelectItem>
                    <SelectItem value="50-100">50€ - 100€</SelectItem>
                    <SelectItem value="100-200">100€ - 200€</SelectItem>
                    <SelectItem value="200+">200€ +</SelectItem>
                  </SelectContent>
                </Select>
                
                <Button variant="outline" size="icon">
                  <SlidersHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Wine Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="font-serif text-2xl font-bold text-wine-burgundy">
                  {allWines.length} vins disponibles
                </h2>
                <p className="text-muted-foreground">
                  Triés par popularité
                </p>
              </div>
              
              <Select>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Trier par..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popularity">Popularité</SelectItem>
                  <SelectItem value="price-asc">Prix croissant</SelectItem>
                  <SelectItem value="price-desc">Prix décroissant</SelectItem>
                  <SelectItem value="rating">Note</SelectItem>
                  <SelectItem value="year">Millésime</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {allWines.map((wine, index) => (
                <WineCard key={index} {...wine} />
              ))}
            </div>
            
            {/* Load More */}
            <div className="text-center mt-12">
              <Button variant="outline" size="lg">
                Charger plus de vins...
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Collection;