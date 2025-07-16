import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WineShowcase from "@/components/WineShowcase";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Wine, Award, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const Wines = () => {
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
            
            <div className="inline-flex items-center space-x-2 bg-wine-gold/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Wine className="h-4 w-4 text-wine-gold" />
              <span className="text-wine-gold font-medium">Collection Complète</span>
            </div>
            
            <h1 className="font-serif text-5xl md:text-6xl font-bold mb-6">
              Découvrez Nos Vins
            </h1>
            
            <p className="text-xl leading-relaxed text-wine-cream/90 max-w-2xl mx-auto">
              Explorez notre sélection exceptionnelle de vins français, 
              soigneusement choisis pour leur qualité et leur caractère unique.
            </p>
          </div>
        </div>
      </section>

      {/* Wine Showcase */}
      <WineShowcase />

      {/* Additional Info */}
      <section className="py-16 bg-wine-cream/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-wine-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-wine-gold" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-wine-burgundy mb-3">
                Appellations Contrôlées
              </h3>
              <p className="text-muted-foreground">
                Tous nos vins respectent les standards d'appellation et de qualité française.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-wine-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Wine className="h-8 w-8 text-wine-gold" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-wine-burgundy mb-3">
                Conservation Optimale
              </h3>
              <p className="text-muted-foreground">
                Nos vins sont conservés dans des conditions idéales de température et d'humidité.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-wine-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-wine-gold" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-wine-burgundy mb-3">
                Terroirs Authentiques
              </h3>
              <p className="text-muted-foreground">
                Découvrez la richesse des terroirs français à travers chaque bouteille.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Wines;