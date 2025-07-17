import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Users, Award, Calendar, Heart } from "lucide-react";
import { Link } from "react-router-dom";

const History = () => {
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
              <Heart className="h-4 w-4 text-wine-gold" />
              <span className="text-wine-gold font-medium">Tradition & Passion</span>
            </div>
            
            <h1 className="font-serif text-5xl md:text-6xl font-bold mb-6">
              Notre Histoire
            </h1>
            
            <p className="text-xl leading-relaxed text-wine-cream/90 max-w-2xl mx-auto">
              25 années de passion, de tradition et d'excellence dans l'art de la sélection vinicole.
            </p>
          </div>
        </div>
      </section>

      {/* Story Content */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
              <div>
                <h2 className="font-serif text-3xl font-bold text-wine-burgundy mb-6">
                  Les Débuts d'une Passion
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                  Fondé en 1999 par Jean-Pierre Château, Vignoble Malagasy est né d'une passion 
                  inconditionnelle pour les grands vins français. Tout a commencé par un rêve simple : 
                  partager les trésors cachés de nos terroirs avec les amateurs de bons vins.
                </p>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Diplômé de l'École du Vin de Bordeaux et fort de plus de 30 ans d'expérience dans 
                  le secteur viticole, Jean-Pierre a su créer un réseau de relations privilégiées 
                  avec les plus grands domaines de France.
                </p>
              </div>
              <div className="bg-wine-cream/30 rounded-2xl p-8">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-wine-burgundy">1999</div>
                    <div className="text-sm text-muted-foreground">Fondation</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-wine-burgundy">500+</div>
                    <div className="text-sm text-muted-foreground">Références</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-wine-burgundy">50+</div>
                    <div className="text-sm text-muted-foreground">Domaines Partenaires</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-wine-burgundy">10k+</div>
                    <div className="text-sm text-muted-foreground">Clients Satisfaits</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="space-y-12">
              <div className="text-center mb-16">
                <h2 className="font-serif text-3xl font-bold text-wine-burgundy mb-4">
                  Les Grandes Étapes
                </h2>
                <p className="text-muted-foreground text-lg">
                  Retracez l'évolution de notre maison à travers les années
                </p>
              </div>

              <div className="space-y-8">
                <div className="flex items-start space-x-6 p-6 bg-wine-cream/20 rounded-xl">
                  <div className="flex-shrink-0 w-16 h-16 bg-wine-gold/10 rounded-full flex items-center justify-center">
                    <Calendar className="h-8 w-8 text-wine-gold" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-semibold text-wine-burgundy mb-2">
                      1999 - Les Premiers Pas
                    </h3>
                    <p className="text-muted-foreground">
                      Ouverture de notre première cave à Dijon avec une sélection de 50 références 
                      issues principalement de Bourgogne et de Bordeaux.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-6 p-6 bg-wine-cream/20 rounded-xl">
                  <div className="flex-shrink-0 w-16 h-16 bg-wine-gold/10 rounded-full flex items-center justify-center">
                    <Award className="h-8 w-8 text-wine-gold" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-semibold text-wine-burgundy mb-2">
                      2005 - Reconnaissance Nationale
                    </h3>
                    <p className="text-muted-foreground">
                      Premier prix de la "Meilleure Cave de France" décerné par le Guide Hachette des Vins. 
                      Extension de notre sélection aux vins de Loire et du Rhône.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-6 p-6 bg-wine-cream/20 rounded-xl">
                  <div className="flex-shrink-0 w-16 h-16 bg-wine-gold/10 rounded-full flex items-center justify-center">
                    <Users className="h-8 w-8 text-wine-gold" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-semibold text-wine-burgundy mb-2">
                      2015 - Expansion et Modernisation
                    </h3>
                    <p className="text-muted-foreground">
                      Lancement de notre boutique en ligne et développement des services de 
                      conseil personnalisé. Notre équipe s'agrandit avec l'arrivée de sommeliers experts.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-6 p-6 bg-wine-cream/20 rounded-xl">
                  <div className="flex-shrink-0 w-16 h-16 bg-wine-gold/10 rounded-full flex items-center justify-center">
                    <Heart className="h-8 w-8 text-wine-gold" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-semibold text-wine-burgundy mb-2">
                      Aujourd'hui - L'Excellence Continue
                    </h3>
                    <p className="text-muted-foreground">
                      Avec plus de 500 références et des partenariats exclusifs avec les plus grands 
                      domaines, nous continuons à partager notre passion pour l'excellence vinicole française.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default History;