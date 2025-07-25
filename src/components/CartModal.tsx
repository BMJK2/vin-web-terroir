import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Trash2, Minus, Plus, ShoppingBag, User } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface CartModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CartModal = ({ open, onOpenChange }: CartModalProps) => {
  const { items, removeFromCart, updateQuantity, clearCart, totalPrice, totalItems } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleCheckout = () => {
    if (!isAuthenticated) {
      onOpenChange(false);
      navigate('/login', { state: { from: { pathname: '/checkout' } } });
      toast({
        title: "Connexion requise",
        description: "Veuillez vous connecter pour finaliser votre commande",
      });
    } else {
      // TODO: Implement actual checkout flow
      toast({
        title: "Commande en cours",
        description: "Fonctionnalité de commande à implémenter",
      });
      onOpenChange(false);
    }
  };

  if (items.length === 0) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="w-[95vw] max-w-lg mx-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5" />
              Votre Panier
            </DialogTitle>
          </DialogHeader>

          <div className="flex flex-col items-center justify-center py-8 text-center">
            <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Votre panier est vide</h3>
            <p className="text-muted-foreground mb-6">
              Découvrez notre sélection de vins exceptionnels
            </p>
            <Button onClick={() => onOpenChange(false)}>
              Continuer les achats
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95vw] max-w-2xl mx-auto max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5" />
              <span className="text-sm sm:text-base">Votre Panier ({totalItems} article{totalItems > 1 ? 's' : ''})</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearCart}
              className="text-destructive hover:text-destructive"
            >
              <Trash2 className="h-4 w-4 mr-1" />
              Vider
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex flex-col sm:flex-row gap-4 p-3 sm:p-4 border rounded-lg">
              <img
                src={item.image}
                alt={item.name}
                className="w-full sm:w-16 h-32 sm:h-16 object-cover rounded"
              />
              
              <div className="flex-1 space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <h4 className="font-semibold text-wine-burgundy text-sm sm:text-base break-words">{item.name}</h4>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      {item.region} • {item.year}
                    </p>
                    <Badge variant="outline" className="mt-1 text-xs">
                      {item.type}
                    </Badge>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-destructive hover:text-destructive"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-8 text-center font-medium">
                      {item.quantity}
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>

                  <div className="text-left sm:text-right">
                    <div className="font-semibold text-wine-burgundy text-sm sm:text-base">
                      {(item.price * item.quantity).toFixed(2)}€
                    </div>
                    <div className="text-xs sm:text-sm text-muted-foreground">
                      {item.price}€ l'unité
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Separator />

        <div className="space-y-4">
          <div className="flex items-center justify-between text-lg font-semibold">
            <span>Total</span>
            <span className="text-wine-burgundy">{totalPrice.toFixed(2)}€</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <Button 
              variant="outline" 
              className="flex-1 text-sm sm:text-base"
              onClick={() => onOpenChange(false)}
            >
              Continuer les achats
            </Button>
            <Button 
              variant="wine" 
              className="flex-1 text-sm sm:text-base"
              onClick={handleCheckout}
            >
              {isAuthenticated ? (
                "Valider la commande"
              ) : (
                <>
                  <User className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="hidden sm:inline">Se connecter pour commander</span>
                  <span className="sm:hidden">Se connecter</span>
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CartModal;