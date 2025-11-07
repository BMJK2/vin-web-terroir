import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { ShoppingBag } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

interface Order {
  id: string;
  created_at: string;
  status: string;
  total: number;
  order_items: {
    quantity: number;
    price: number;
    wine_id: string;
    wines: {
      name: string;
      image: string;
    };
  }[];
}

export const OrderHistory = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadOrders();
    }
  }, [user]);

  const loadOrders = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from("orders")
      .select(`
        *,
        order_items (
          quantity,
          price,
          wine_id,
          wines (
            name,
            image
          )
        )
      `)
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Erreur de chargement des commandes:", error);
      toast({
        title: "Erreur",
        description: "Impossible de charger l'historique des commandes",
        variant: "destructive",
      });
      return;
    }

    setOrders(data || []);
    setLoading(false);
  };

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
      pending: { label: "En attente", variant: "secondary" },
      confirmed: { label: "Confirmée", variant: "default" },
      shipped: { label: "Expédiée", variant: "default" },
      delivered: { label: "Livrée", variant: "outline" },
      cancelled: { label: "Annulée", variant: "destructive" },
    };

    const config = statusConfig[status] || { label: status, variant: "secondary" };
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Historique des Commandes</CardTitle>
        <CardDescription>
          Consultez toutes vos commandes passées
        </CardDescription>
      </CardHeader>
      <CardContent>
        {orders.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <ShoppingBag className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Aucune commande pour le moment</p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="border rounded-lg p-4 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="font-medium">
                      Commande du{" "}
                      {format(new Date(order.created_at), "d MMMM yyyy", {
                        locale: fr,
                      })}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {order.order_items.length} article(s)
                    </p>
                  </div>
                  <div className="text-right">
                    {getStatusBadge(order.status)}
                    <p className="font-bold text-lg mt-1">
                      {order.total.toFixed(2)} €
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  {order.order_items.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 text-sm"
                    >
                      <img
                        src={item.wines.image}
                        alt={item.wines.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div className="flex-1">
                        <p className="font-medium">{item.wines.name}</p>
                        <p className="text-muted-foreground">
                          Quantité: {item.quantity} × {item.price.toFixed(2)} €
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
