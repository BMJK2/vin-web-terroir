import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, CreditCard, ShoppingBag, User as UserIcon, Mail, Phone, MapPin, Calendar, Globe, Bell, Check, X } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { User as UserType } from '@/types/user';

interface UserDetailDialogProps {
  user: UserType | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface PaymentMethod {
  id: string;
  type: string;
  card_last_four?: string;
  card_brand?: string;
  card_exp_month?: number;
  card_exp_year?: number;
  is_default: boolean;
}

interface Order {
  id: string;
  created_at: string;
  total: number;
  status: string;
  items: Array<{
    wine_id: string;
    quantity: number;
    price: number;
  }>;
}

export const UserDetailDialog = ({ user, open, onOpenChange }: UserDetailDialogProps) => {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user && open) {
      loadUserData();
    }
  }, [user, open]);

  const loadUserData = async () => {
    if (!user) return;
    
    setIsLoading(true);
    
    // Load payment methods
    const { data: payments } = await supabase
      .from('payment_methods')
      .select('*')
      .eq('user_id', user.id);
    
    if (payments) setPaymentMethods(payments);
    
    // Load orders
    const { data: ordersData } = await supabase
      .from('orders')
      .select(`
        id,
        created_at,
        total,
        status,
        order_items (
          wine_id,
          quantity,
          price
        )
      `)
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });
    
    if (ordersData) {
      const formattedOrders = ordersData.map(order => ({
        ...order,
        items: order.order_items || []
      }));
      setOrders(formattedOrders);
    }
    
    setIsLoading(false);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
      pending: 'secondary',
      confirmed: 'default',
      shipped: 'default',
      delivered: 'outline',
      cancelled: 'destructive'
    };
    
    const labels: Record<string, string> = {
      pending: 'En attente',
      confirmed: 'Confirmé',
      shipped: 'Expédié',
      delivered: 'Livré',
      cancelled: 'Annulé'
    };
    
    return <Badge variant={variants[status] || 'secondary'}>{labels[status] || status}</Badge>;
  };

  const getUserInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  if (!user) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={user.avatar} />
              <AvatarFallback>{getUserInitials(user.name)}</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                {user.name}
                <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>
                  {user.role === 'admin' ? 'Admin' : 'Utilisateur'}
                </Badge>
                <Badge variant={user.isActive ? 'default' : 'destructive'}>
                  {user.isActive ? 'Actif' : 'Inactif'}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground font-normal">{user.email}</p>
            </div>
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="profile" className="mt-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="profile">Profil</TabsTrigger>
            <TabsTrigger value="payment">Paiement</TabsTrigger>
            <TabsTrigger value="orders">Commandes</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <UserIcon className="h-5 w-5" />
                  Informations personnelles
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Email:</span>
                    <span className="font-medium">{user.email}</span>
                  </div>
                  {user.phone && (
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Téléphone:</span>
                      <span className="font-medium">{user.phone}</span>
                    </div>
                  )}
                </div>

                {user.address && (
                  <div className="flex items-start gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      <span className="text-muted-foreground">Adresse:</span>
                      <p className="font-medium">{user.address}</p>
                    </div>
                  </div>
                )}

                <Separator />

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Inscrit le:</span>
                    <span className="font-medium">
                      {new Date(user.createdAt).toLocaleDateString('fr-FR')}
                    </span>
                  </div>
                  {user.lastLogin && (
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Dernière connexion:</span>
                      <span className="font-medium">
                        {new Date(user.lastLogin).toLocaleDateString('fr-FR')}
                      </span>
                    </div>
                  )}
                </div>

                <Separator />

                <div>
                  <h4 className="text-sm font-medium mb-3">Préférences</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4 text-muted-foreground" />
                        <span>Langue:</span>
                      </div>
                      <span className="font-medium">{user.preferences.language === 'fr' ? 'Français' : 'English'}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span>Newsletter:</span>
                      </div>
                      {user.preferences.newsletter ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <X className="h-4 w-4 text-red-500" />
                      )}
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <Bell className="h-4 w-4 text-muted-foreground" />
                        <span>Notifications:</span>
                      </div>
                      {user.preferences.notifications ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <X className="h-4 w-4 text-red-500" />
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payment" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Moyens de paiement ({paymentMethods.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <p className="text-sm text-muted-foreground">Chargement...</p>
                ) : paymentMethods.length === 0 ? (
                  <p className="text-sm text-muted-foreground">Aucun moyen de paiement enregistré</p>
                ) : (
                  <div className="space-y-3">
                    {paymentMethods.map((method) => (
                      <div key={method.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <CreditCard className="h-5 w-5 text-muted-foreground" />
                          <div>
                            {method.type === 'card' && method.card_brand && (
                              <>
                                <p className="font-medium capitalize">{method.card_brand}</p>
                                <p className="text-sm text-muted-foreground">
                                  •••• {method.card_last_four}
                                </p>
                                {method.card_exp_month && method.card_exp_year && (
                                  <p className="text-xs text-muted-foreground">
                                    Expire: {method.card_exp_month}/{method.card_exp_year}
                                  </p>
                                )}
                              </>
                            )}
                            {method.type === 'paypal' && (
                              <p className="font-medium">PayPal</p>
                            )}
                            {method.type === 'bank_transfer' && (
                              <p className="font-medium">Virement bancaire</p>
                            )}
                          </div>
                        </div>
                        {method.is_default && (
                          <Badge variant="secondary">Par défaut</Badge>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <ShoppingBag className="h-5 w-5" />
                  Historique des commandes ({orders.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <p className="text-sm text-muted-foreground">Chargement...</p>
                ) : orders.length === 0 ? (
                  <p className="text-sm text-muted-foreground">Aucune commande</p>
                ) : (
                  <div className="space-y-3">
                    {orders.map((order) => (
                      <div key={order.id} className="p-4 border rounded-lg space-y-2">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Commande #{order.id.slice(0, 8)}</p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(order.created_at).toLocaleDateString('fr-FR', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </p>
                          </div>
                          {getStatusBadge(order.status)}
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">
                            {order.items.length} article(s)
                          </span>
                          <span className="font-medium">{formatCurrency(order.total)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
