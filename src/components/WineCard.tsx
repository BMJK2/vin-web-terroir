import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Wine, Plus } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

interface WineCardProps {
  name: string;
  region: string;
  year: string;
  price: string;
  rating: number;
  image: string;
  type: string;
  description: string;
}

const WineCard = ({ name, region, year, price, rating, image, type, description }: WineCardProps) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      name,
      region,
      year,
      price: parseFloat(price),
      image,
      type
    });
  };

  return (
    <Card className="group overflow-hidden border-0 shadow-elegant hover:shadow-wine transition-wine bg-card">
      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-64 object-cover group-hover:scale-105 transition-wine"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-wine-burgundy/20 to-transparent opacity-0 group-hover:opacity-100 transition-wine"></div>
        
        {/* Wine Type Badge */}
        <Badge 
          variant="secondary" 
          className="absolute top-4 left-4 bg-wine-gold/90 text-wine-dark font-medium"
        >
          {type}
        </Badge>

        {/* Add to Cart Button */}
        <Button
          variant="wine"
          size="icon"
          className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-wine"
          onClick={handleAddToCart}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      <CardContent className="p-6">
        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${
                i < rating ? "text-wine-gold fill-wine-gold" : "text-muted-foreground"
              }`}
            />
          ))}
          <span className="text-sm text-muted-foreground ml-2">({rating}/5)</span>
        </div>

        {/* Wine Info */}
        <div className="space-y-2 mb-4">
          <h3 className="font-serif text-xl font-semibold text-wine-burgundy group-hover:text-wine-gold transition-wine">
            {name}
          </h3>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Wine className="h-4 w-4" />
            <span className="text-sm">{region} • {year}</span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {description}
          </p>
        </div>

        {/* Price and Action */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="text-2xl font-bold text-wine-burgundy">
              {price}€
            </div>
            <div className="text-xs text-muted-foreground">
              Prix TTC
            </div>
          </div>
          <Button variant="elegant" size="sm" onClick={handleAddToCart}>
            Ajouter au Panier
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default WineCard;