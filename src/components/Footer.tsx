import { Wine, Mail, Phone, MapPin, Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-wine-burgundy text-wine-cream">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Wine className="h-8 w-8 text-wine-gold" />
              <div className="flex flex-col">
                <span className="font-serif font-bold text-xl">
                  Eden'Wine
                </span>
                <span className="text-sm text-wine-cream/70">
                  Vins d'Excellence
                </span>
              </div>
            </div>
            <p className="text-wine-cream/80 text-sm leading-relaxed">
              Découvrez l'excellence du vignoble français à travers notre 
              sélection passionnée de vins d'exception.
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h3 className="font-serif font-semibold text-wine-gold">Navigation</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#accueil" className="hover:text-wine-gold transition-wine">
                  Accueil
                </a>
              </li>
              <li>
                <a href="#vins" className="hover:text-wine-gold transition-wine">
                  Nos Vins
                </a>
              </li>
              <li>
                <a href="#cave" className="hover:text-wine-gold transition-wine">
                  Notre Cave
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-wine-gold transition-wine">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-serif font-semibold text-wine-gold">Contact</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-wine-gold" />
                <span>123 Rue des Vignes, 21000 Dijon</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-wine-gold" />
                <span>+33 3 80 00 00 00</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-wine-gold" />
                <span>contact@chateaudesvignes.fr</span>
              </div>
            </div>
          </div>

          {/* Social */}
          <div className="space-y-4">
            <h3 className="font-serif font-semibold text-wine-gold">Suivez-nous</h3>
            <div className="flex space-x-4">
              <a href="#" className="p-2 bg-wine-gold/20 rounded-lg hover:bg-wine-gold/30 transition-wine">
                <Facebook className="h-5 w-5 text-wine-gold" />
              </a>
              <a href="#" className="p-2 bg-wine-gold/20 rounded-lg hover:bg-wine-gold/30 transition-wine">
                <Instagram className="h-5 w-5 text-wine-gold" />
              </a>
              <a href="#" className="p-2 bg-wine-gold/20 rounded-lg hover:bg-wine-gold/30 transition-wine">
                <Twitter className="h-5 w-5 text-wine-gold" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-wine-cream/20 mt-12 pt-8 text-center text-sm text-wine-cream/70">
          <p>
            © 2024 Eden'Wine. Tous droits réservés. 
            <span className="mx-2">•</span>
            L'abus d'alcool est dangereux pour la santé.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;