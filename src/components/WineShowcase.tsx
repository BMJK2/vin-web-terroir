import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import WineCard from "./WineCard";
import { ArrowRight, Award, Grape, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { useWines } from "@/hooks/useWines";

const WineShowcase = () => {
  const { getFeaturedWines } = useWines();
  const wines = getFeaturedWines();

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-wine-gold/10 px-4 py-2 rounded-full mb-6">
            <Award className="h-4 w-4 text-wine-gold" />
            <span className="text-wine-gold font-medium">Sélection Exclusive</span>
          </div>
          
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-wine-burgundy mb-6">
            Nos Vins d'Exception
          </h2>
          
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            Chaque bouteille de notre collection a été soigneusement sélectionnée pour vous offrir 
            une expérience gustative inoubliable.
          </p>
        </div>

        {/* Wine Categories */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-5 max-w-md mx-auto mb-12">
            <TabsTrigger value="all">Tous</TabsTrigger>
            <TabsTrigger value="rouge">Rouge</TabsTrigger>
            <TabsTrigger value="blanc">Blanc</TabsTrigger>
            <TabsTrigger value="rose">Rosé</TabsTrigger>
            <TabsTrigger value="effervescent">Bulles</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {wines.map((wine) => (
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
          </TabsContent>

          <TabsContent value="rouge" className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {wines.filter(wine => wine.type === "rouge").map((wine) => (
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
          </TabsContent>

          <TabsContent value="blanc" className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {wines.filter(wine => wine.type === "blanc").map((wine) => (
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
          </TabsContent>

          <TabsContent value="rose" className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {wines.filter(wine => wine.type === "rosé").map((wine) => (
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
          </TabsContent>

          <TabsContent value="effervescent" className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {wines.filter(wine => wine.type === "champagne").map((wine) => (
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
          </TabsContent>
        </Tabs>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <Button variant="wine" size="xl" className="group" asChild>
            <Link to="/collection">
              Voir Toute la Collection
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24">
          <div className="text-center">
            <div className="w-16 h-16 bg-wine-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Grape className="h-8 w-8 text-wine-gold" />
            </div>
            <h3 className="font-serif text-xl font-semibold text-wine-burgundy mb-2">
              Terroirs d'Exception
            </h3>
            <p className="text-muted-foreground">
              Vins issus des plus beaux terroirs Malagasy, travaillés avec passion et respect.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-wine-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="h-8 w-8 text-wine-gold" />
            </div>
            <h3 className="font-serif text-xl font-semibold text-wine-burgundy mb-2">
              Sélection Rigoureuse
            </h3>
            <p className="text-muted-foreground">
              Chaque vin est dégusté et approuvé par nos sommeliers experts.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-wine-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="h-8 w-8 text-wine-gold" />
            </div>
            <h3 className="font-serif text-xl font-semibold text-wine-burgundy mb-2">
              Livraison Soignée
            </h3>
            <p className="text-muted-foreground">
              Expédition sécurisée dans tout Madagascar avec un emballage adapté.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WineShowcase;