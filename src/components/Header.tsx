import { Button } from "@/components/ui/button";
import { Wine, Menu, ShoppingCart, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Header = () => {
  const location = useLocation();
  return (
    <header className="w-full bg-wine-burgundy backdrop-blur-md sticky top-0 z-50 shadow-elegant">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-wine">
            <Wine className="h-8 w-8 text-wine-gold" />
            <div className="flex flex-col">
              <span className="font-serif font-bold text-xl text-wine-cream">
                Château des Vignes
              </span>
              <span className="text-sm text-wine-cream/70">
                Vins d'Excellence
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`text-wine-cream hover:text-wine-gold transition-wine ${
                location.pathname === '/' ? 'text-wine-gold' : ''
              }`}
            >
              Accueil
            </Link>
            <Link 
              to="/vins" 
              className={`text-wine-cream hover:text-wine-gold transition-wine ${
                location.pathname === '/vins' ? 'text-wine-gold' : ''
              }`}
            >
              Nos Vins
            </Link>
            <Link 
              to="/collection" 
              className={`text-wine-cream hover:text-wine-gold transition-wine ${
                location.pathname === '/collection' ? 'text-wine-gold' : ''
              }`}
            >
              Collection
            </Link>
            <Link 
              to="/histoire" 
              className={`text-wine-cream hover:text-wine-gold transition-wine ${
                location.pathname === '/histoire' ? 'text-wine-gold' : ''
              }`}
            >
              Notre Histoire
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="text-wine-cream hover:text-wine-gold">
              <ShoppingCart className="h-5 w-5" />
            </Button>
            <Button variant="gold" size="sm" className="hidden md:inline-flex" asChild>
              <Link to="/collection">
                Découvrir
              </Link>
            </Button>
            
            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden text-wine-cream">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex items-center space-x-2 mb-8">
                  <Wine className="h-6 w-6 text-wine-gold" />
                  <span className="font-serif font-bold text-lg text-wine-burgundy">
                    Château des Vignes
                  </span>
                </div>
                
                <nav className="flex flex-col space-y-4">
                  <Link 
                    to="/" 
                    className={`text-wine-burgundy hover:text-wine-gold transition-wine text-lg ${
                      location.pathname === '/' ? 'text-wine-gold font-semibold' : ''
                    }`}
                  >
                    Accueil
                  </Link>
                  <Link 
                    to="/vins" 
                    className={`text-wine-burgundy hover:text-wine-gold transition-wine text-lg ${
                      location.pathname === '/vins' ? 'text-wine-gold font-semibold' : ''
                    }`}
                  >
                    Nos Vins
                  </Link>
                  <Link 
                    to="/collection" 
                    className={`text-wine-burgundy hover:text-wine-gold transition-wine text-lg ${
                      location.pathname === '/collection' ? 'text-wine-gold font-semibold' : ''
                    }`}
                  >
                    Collection
                  </Link>
                  <Link 
                    to="/histoire" 
                    className={`text-wine-burgundy hover:text-wine-gold transition-wine text-lg ${
                      location.pathname === '/histoire' ? 'text-wine-gold font-semibold' : ''
                    }`}
                  >
                    Notre Histoire
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;