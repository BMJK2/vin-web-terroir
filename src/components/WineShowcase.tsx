import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import WineCard from "./WineCard";
import { ArrowRight, Award, Grape, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import wineRed1 from "@/assets/wine-red-1.jpg";
import wineWhite1 from "@/assets/wine-white-1.jpg";
import wineChampagne1 from "@/assets/wine-champagne-1.jpg";
import wineRed2 from "@/assets/wine-red-2.jpg";
import wineWhite2 from "@/assets/wine-white-2.jpg";
import wineRose1 from "@/assets/wine-rose-1.jpg";

const WineShowcase = () => {
  const wines = [
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
    }
  ];

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
              {wines.map((wine, index) => (
                <WineCard key={index} {...wine} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="rouge" className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {wines.filter(wine => wine.type === "Rouge").map((wine, index) => (
                <WineCard key={index} {...wine} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="blanc" className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {wines.filter(wine => wine.type === "Blanc").map((wine, index) => (
                <WineCard key={index} {...wine} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="rose" className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {wines.filter(wine => wine.type === "Rosé").map((wine, index) => (
                <WineCard key={index} {...wine} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="effervescent" className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {wines.filter(wine => wine.type === "Effervescent").map((wine, index) => (
                <WineCard key={index} {...wine} />
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
              Vins issus des plus beaux terroirs français, travaillés avec passion et respect.
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
              Expédition sécurisée dans toute la France avec un emballage adapté.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WineShowcase;