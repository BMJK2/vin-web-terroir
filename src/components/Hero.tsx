import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-wine.jpg";

const Hero = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Cave à vin élégante"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-wine-burgundy/80 via-wine-burgundy/50 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 z-10 text-center md:text-left">
        <div className="max-w-2xl">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-wine-gold/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
            <Star className="h-4 w-4 text-wine-gold" />
            <span className="text-wine-gold font-medium">Sélection Premium</span>
          </div>

          {/* Title */}
          <h1 className="font-serif text-5xl md:text-7xl font-bold text-wine-cream mb-6 leading-tight">
            L'Excellence du
            <span className="text-wine-gold block">Vignoble Français</span>
          </h1>

          {/* Subtitle */}
          <p className="text-wine-cream/90 text-xl mb-8 leading-relaxed">
            Découvrez notre collection exceptionnelle de vins fins, 
            sélectionnés avec passion par nos maîtres sommeliers.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="gold" size="xl" className="group" asChild>
              <Link to="/vins">
                Découvrir nos Vins
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button variant="outline" size="xl" className="border-wine-cream/30 text-wine-cream hover:bg-wine-cream/10" asChild>
              <Link to="/histoire">
                Notre Histoire
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="flex justify-center md:justify-start gap-8 mt-12">
            <div className="text-center">
              <div className="text-2xl font-bold text-wine-gold">500+</div>
              <div className="text-wine-cream/80 text-sm">Vins Sélectionnés</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-wine-gold">25</div>
              <div className="text-wine-cream/80 text-sm">Années d'Expérience</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-wine-gold">98%</div>
              <div className="text-wine-cream/80 text-sm">Clients Satisfaits</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-wine-cream/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-wine-cream/50 rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;