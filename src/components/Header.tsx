import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Wine, Menu, ShoppingCart, User, LogOut, Settings } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import CartModal from "./CartModal";
import { useState } from "react";

const Header = () => {
  const location = useLocation();
  const { totalItems } = useCart();
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const [cartOpen, setCartOpen] = useState(false);

  const getUserInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };
  return (
    <header className="w-full bg-wine-burgundy backdrop-blur-md sticky top-0 z-50 shadow-elegant">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-wine">
            <Wine className="h-8 w-8 text-wine-gold" />
            <div className="flex flex-col">
              <span className="font-serif font-bold text-xl text-wine-cream">
                Eden's Wine
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
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-wine-cream hover:text-wine-gold relative"
              onClick={() => setCartOpen(true)}
            >
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-wine-gold text-wine-dark"
                >
                  {totalItems}
                </Badge>
              )}
            </Button>

            {/* User Menu */}
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user?.avatar} />
                      <AvatarFallback className="bg-wine-gold text-wine-dark text-xs">
                        {getUserInitials(user?.name || '')}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium">{user?.name}</p>
                      <p className="w-[200px] truncate text-sm text-muted-foreground">
                        {user?.email}
                      </p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      Mon Profil
                    </Link>
                  </DropdownMenuItem>
                  {isAdmin && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link to="/admin" className="cursor-pointer">
                          <Settings className="mr-2 h-4 w-4" />
                          Administration
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    Se déconnecter
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="ghost" size="sm" asChild className="text-wine-cream hover:text-wine-gold">
                <Link to="/login">
                  <User className="mr-2 h-4 w-4" />
                  Connexion
                </Link>
              </Button>
            )}

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
                    Eden's Wine
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
      
      <CartModal open={cartOpen} onOpenChange={setCartOpen} />
    </header>
  );
};

export default Header;