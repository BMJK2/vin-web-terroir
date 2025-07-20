import { useState, useMemo } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WineCard from "@/components/WineCard";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Filter, Search, SlidersHorizontal } from "lucide-react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useWines } from "@/hooks/useWines";

const Collection = () => {
  const { wines } = useWines();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [selectedPriceRange, setSelectedPriceRange] = useState("all");
  const [sortBy, setSortBy] = useState("popularity");
  const [displayedCount, setDisplayedCount] = useState(9);

  // Get unique regions from wines data
  const regions = useMemo(() => {
    const uniqueRegions = [...new Set(wines.map(wine => wine.region))];
    return uniqueRegions.sort();
  }, []);

  // Filter and sort wines
  const filteredAndSortedWines = useMemo(() => {
    let filtered = wines.filter(wine => {
      // Search filter
      if (searchQuery && !wine.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !wine.region.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !wine.description.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }

      // Type filter
      if (selectedType !== "all" && wine.type !== selectedType) {
        return false;
      }

      // Region filter
      if (selectedRegion !== "all" && wine.region.toLowerCase() !== selectedRegion.toLowerCase()) {
        return false;
      }

      // Price range filter
      if (selectedPriceRange !== "all") {
        const price = wine.price;
        switch (selectedPriceRange) {
          case "0-50":
            return price <= 50;
          case "50-100":
            return price > 50 && price <= 100;
          case "100-200":
            return price > 100 && price <= 200;
          case "200+":
            return price > 200;
          default:
            return true;
        }
      }

      return true;
    });

    // Sort wines
    switch (sortBy) {
      case "price-asc":
        return filtered.sort((a, b) => a.price - b.price);
      case "price-desc":
        return filtered.sort((a, b) => b.price - a.price);
      case "rating":
        return filtered.sort((a, b) => b.rating - a.rating);
      case "year":
        return filtered.sort((a, b) => b.year - a.year);
      case "popularity":
      default:
        return filtered.sort((a, b) => b.rating - a.rating);
    }
  }, [searchQuery, selectedType, selectedRegion, selectedPriceRange, sortBy]);

  const displayedWines = filteredAndSortedWines.slice(0, displayedCount);
  const hasMoreWines = displayedCount < filteredAndSortedWines.length;

  const handleLoadMore = () => {
    setDisplayedCount(prev => prev + 6);
  };

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedType("all");
    setSelectedRegion("all");
    setSelectedPriceRange("all");
    setSortBy("popularity");
    setDisplayedCount(9);
  };

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
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les types</SelectItem>
                    <SelectItem value="rouge">Rouge</SelectItem>
                    <SelectItem value="blanc">Blanc</SelectItem>
                    <SelectItem value="rosé">Rosé</SelectItem>
                    <SelectItem value="champagne">Champagne</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Région" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes régions</SelectItem>
                    {regions.map(region => (
                      <SelectItem key={region} value={region}>{region}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Select value={selectedPriceRange} onValueChange={setSelectedPriceRange}>
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
                
                <Button variant="outline" size="icon" onClick={resetFilters} title="Réinitialiser les filtres">
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
                  {filteredAndSortedWines.length} vins disponibles
                </h2>
                <p className="text-muted-foreground">
                  {sortBy === "popularity" ? "Triés par popularité" : 
                   sortBy === "price-asc" ? "Prix croissant" :
                   sortBy === "price-desc" ? "Prix décroissant" :
                   sortBy === "rating" ? "Triés par note" :
                   "Triés par millésime"}
                </p>
              </div>
              
              <Select value={sortBy} onValueChange={setSortBy}>
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
            
            {displayedWines.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {displayedWines.map((wine) => (
                    <WineCard 
                      key={wine.id} 
                      id={wine.id}
                      name={wine.name}
                      region={wine.region}
                      year={wine.year.toString()}
                      price={wine.price.toString()}
                      rating={wine.rating}
                      image={wine.image}
                      type={wine.type}
                      description={wine.description}
                    />
                  ))}
                </div>
                
                {/* Load More */}
                {hasMoreWines && (
                  <div className="text-center mt-12">
                    <Button variant="outline" size="lg" onClick={handleLoadMore}>
                      Charger plus de vins... ({filteredAndSortedWines.length - displayedCount} restants)
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg mb-4">
                  Aucun vin ne correspond à vos critères de recherche.
                </p>
                <Button onClick={resetFilters} variant="outline">
                  Réinitialiser les filtres
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Collection;