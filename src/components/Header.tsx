import { Button } from "@/components/ui/button";
import { Wine, Menu, ShoppingCart } from "lucide-react";

const Header = () => {
  return (
    <header className="w-full bg-background/95 backdrop-blur-md border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Wine className="h-8 w-8 text-wine-burgundy" />
            <div className="flex flex-col">
              <span className="font-serif font-bold text-xl text-wine-burgundy">
                Château des Vignes
              </span>
              <span className="text-xs text-muted-foreground font-sans">
                Vins d'Excellence
              </span>
            </div>
          </div>

          {/* Navigation Desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#accueil" className="text-foreground hover:text-wine-burgundy transition-wine">
              Accueil
            </a>
            <a href="#vins" className="text-foreground hover:text-wine-burgundy transition-wine">
              Nos Vins
            </a>
            <a href="#cave" className="text-foreground hover:text-wine-burgundy transition-wine">
              Notre Cave
            </a>
            <a href="#contact" className="text-foreground hover:text-wine-burgundy transition-wine">
              Contact
            </a>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <ShoppingCart className="h-5 w-5" />
            </Button>
            <Button variant="wine" size="sm" className="hidden md:inline-flex">
              Découvrir
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;