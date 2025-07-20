import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Users, 
  ShoppingCart, 
  TrendingUp, 
  Euro,
  Search,
  Filter,
  MoreHorizontal,
  UserCheck,
  UserX,
  Plus,
  Package
} from 'lucide-react';
import { 
  users, 
  getAdminStats, 
  getRecentUsers, 
  getTopCustomers,
  searchUsers,
  getUsersByRole 
} from '@/data/users';
import { useWines } from '@/hooks/useWines';
import { User } from '@/types/user';
import { Wine } from '@/types/wine';

const Admin = () => {
  const { user, isAdmin } = useAuth();
  const { wines, addWine, removeWine } = useWines();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState<'all' | 'admin' | 'user'>('all');
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    region: '',
    year: new Date().getFullYear(),
    price: 0,
    rating: 0,
    description: '',
    image: '',
    type: 'rouge' as const,
    features: [''],
    images: [''],
    category: 'tradition' as const,
    alcohol: 0,
    volume: '750ml',
    grapes: [''],
    servingTemperature: '',
    pairingNotes: ['']
  });

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card>
          <CardHeader>
            <CardTitle>Accès refusé</CardTitle>
            <CardDescription>
              Vous n'avez pas les permissions nécessaires pour accéder à cette page.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  const stats = getAdminStats();
  const recentUsers = getRecentUsers(5);
  const topCustomers = getTopCustomers(5);

  const filteredUsers = React.useMemo(() => {
    let filtered = searchQuery ? searchUsers(searchQuery) : users;
    
    if (selectedRole !== 'all') {
      filtered = getUsersByRole(selectedRole);
      if (searchQuery) {
        filtered = filtered.filter(user => 
          user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.email.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
    }
    
    return filtered;
  }, [searchQuery, selectedRole]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };

  const getUserInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.region || !newProduct.description) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }

    const productToAdd = {
      ...newProduct,
      features: newProduct.features.filter(f => f.trim() !== ''),
      images: newProduct.images.filter(i => i.trim() !== ''),
      grapes: newProduct.grapes.filter(g => g.trim() !== ''),
      pairingNotes: newProduct.pairingNotes.filter(p => p.trim() !== '')
    };

    addWine(productToAdd);
    setIsAddProductOpen(false);
    setNewProduct({
      name: '',
      region: '',
      year: new Date().getFullYear(),
      price: 0,
      rating: 0,
      description: '',
      image: '',
      type: 'rouge',
      features: [''],
      images: [''],
      category: 'tradition',
      alcohol: 0,
      volume: '750ml',
      grapes: [''],
      servingTemperature: '',
      pairingNotes: ['']
    });
  };

  const updateArrayField = (field: keyof typeof newProduct, index: number, value: string) => {
    const currentArray = newProduct[field] as string[];
    const newArray = [...currentArray];
    newArray[index] = value;
    setNewProduct({ ...newProduct, [field]: newArray });
  };

  const addArrayField = (field: keyof typeof newProduct) => {
    const currentArray = newProduct[field] as string[];
    setNewProduct({ ...newProduct, [field]: [...currentArray, ''] });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Administration</h1>
            <p className="text-muted-foreground">
              Bienvenue {user?.name}, gérez votre boutique de vins
            </p>
          </div>
          <Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Ajouter un produit
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Ajouter un nouveau produit</DialogTitle>
                <DialogDescription>
                  Remplissez les informations du nouveau vin
                </DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Nom du vin*</Label>
                    <Input
                      id="name"
                      value={newProduct.name}
                      onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                      placeholder="Ex: Château Antananarivo Rouge"
                    />
                  </div>
                  <div>
                    <Label htmlFor="region">Région*</Label>
                    <Input
                      id="region"
                      value={newProduct.region}
                      onChange={(e) => setNewProduct({...newProduct, region: e.target.value})}
                      placeholder="Ex: Hautes Terres"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="year">Année</Label>
                      <Input
                        id="year"
                        type="number"
                        value={newProduct.year}
                        onChange={(e) => setNewProduct({...newProduct, year: parseInt(e.target.value)})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="price">Prix (€)</Label>
                      <Input
                        id="price"
                        type="number"
                        step="0.01"
                        value={newProduct.price}
                        onChange={(e) => setNewProduct({...newProduct, price: parseFloat(e.target.value)})}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="type">Type</Label>
                      <Select value={newProduct.type} onValueChange={(value: any) => setNewProduct({...newProduct, type: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="rouge">Rouge</SelectItem>
                          <SelectItem value="blanc">Blanc</SelectItem>
                          <SelectItem value="rosé">Rosé</SelectItem>
                          <SelectItem value="champagne">Champagne</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="category">Catégorie</Label>
                      <Select value={newProduct.category} onValueChange={(value: any) => setNewProduct({...newProduct, category: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="tradition">Tradition</SelectItem>
                          <SelectItem value="collection">Collection</SelectItem>
                          <SelectItem value="premium">Premium</SelectItem>
                          <SelectItem value="reserve">Réserve</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="description">Description*</Label>
                    <Textarea
                      id="description"
                      value={newProduct.description}
                      onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                      placeholder="Description du vin..."
                      rows={3}
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="alcohol">Alcool (%)</Label>
                      <Input
                        id="alcohol"
                        type="number"
                        step="0.1"
                        value={newProduct.alcohol}
                        onChange={(e) => setNewProduct({...newProduct, alcohol: parseFloat(e.target.value)})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="rating">Note (0-5)</Label>
                      <Input
                        id="rating"
                        type="number"
                        step="0.1"
                        min="0"
                        max="5"
                        value={newProduct.rating}
                        onChange={(e) => setNewProduct({...newProduct, rating: parseFloat(e.target.value)})}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="temperature">Température de service</Label>
                    <Input
                      id="temperature"
                      value={newProduct.servingTemperature}
                      onChange={(e) => setNewProduct({...newProduct, servingTemperature: e.target.value})}
                      placeholder="Ex: 16-18°C"
                    />
                  </div>
                  <div>
                    <Label>Cépages</Label>
                    {newProduct.grapes.map((grape, index) => (
                      <Input
                        key={index}
                        value={grape}
                        onChange={(e) => updateArrayField('grapes', index, e.target.value)}
                        placeholder="Ex: Cabernet Sauvignon"
                        className="mb-2"
                      />
                    ))}
                    <Button type="button" variant="outline" size="sm" onClick={() => addArrayField('grapes')}>
                      Ajouter un cépage
                    </Button>
                  </div>
                  <div>
                    <Label>Caractéristiques</Label>
                    {newProduct.features.map((feature, index) => (
                      <Input
                        key={index}
                        value={feature}
                        onChange={(e) => updateArrayField('features', index, e.target.value)}
                        placeholder="Ex: Élevage en fût de chêne"
                        className="mb-2"
                      />
                    ))}
                    <Button type="button" variant="outline" size="sm" onClick={() => addArrayField('features')}>
                      Ajouter une caractéristique
                    </Button>
                  </div>
                </div>
              </div>
              <div className="flex justify-end space-x-2 mt-6">
                <Button variant="outline" onClick={() => setIsAddProductOpen(false)}>
                  Annuler
                </Button>
                <Button onClick={handleAddProduct}>
                  Ajouter le produit
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Utilisateurs totaux</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers}</div>
              <p className="text-xs text-muted-foreground">
                {stats.activeUsers} actifs
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Commandes totales</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalOrders}</div>
              <p className="text-xs text-muted-foreground">
                Toutes les commandes
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Chiffre d'affaires</CardTitle>
              <Euro className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(stats.totalRevenue)}</div>
              <p className="text-xs text-muted-foreground">
                Revenus totaux
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Nouveaux ce mois</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.newUsersThisMonth}</div>
              <p className="text-xs text-muted-foreground">
                Nouveaux utilisateurs
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="users" className="space-y-6">
          <TabsList>
            <TabsTrigger value="users">Gestion des utilisateurs</TabsTrigger>
            <TabsTrigger value="products">Gestion des produits</TabsTrigger>
            <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Utilisateurs</CardTitle>
                <CardDescription>
                  Gérez tous les utilisateurs de votre boutique
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Rechercher par nom, email..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-8"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant={selectedRole === 'all' ? 'default' : 'outline'}
                      onClick={() => setSelectedRole('all')}
                      size="sm"
                    >
                      Tous
                    </Button>
                    <Button
                      variant={selectedRole === 'admin' ? 'default' : 'outline'}
                      onClick={() => setSelectedRole('admin')}
                      size="sm"
                    >
                      Admins
                    </Button>
                    <Button
                      variant={selectedRole === 'user' ? 'default' : 'outline'}
                      onClick={() => setSelectedRole('user')}
                      size="sm"
                    >
                      Utilisateurs
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  {filteredUsers.map((user) => (
                    <div
                      key={user.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50"
                    >
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarImage src={user.avatar} />
                          <AvatarFallback>{getUserInitials(user.name)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                          <p className="text-xs text-muted-foreground">
                            Inscrit le {new Date(user.createdAt).toLocaleDateString('fr-FR')}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>
                          {user.role === 'admin' ? 'Administrateur' : 'Utilisateur'}
                        </Badge>
                        <Badge variant={user.isActive ? 'default' : 'destructive'}>
                          {user.isActive ? (
                            <><UserCheck className="w-3 h-3 mr-1" /> Actif</>
                          ) : (
                            <><UserX className="w-3 h-3 mr-1" /> Inactif</>
                          )}
                        </Badge>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="products" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Produits</CardTitle>
                <CardDescription>
                  Gérez tous les vins de votre boutique
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {wines.map((wine) => (
                    <div
                      key={wine.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50"
                    >
                      <div className="flex items-center space-x-4">
                        <img 
                          src={wine.image} 
                          alt={wine.name}
                          className="h-16 w-12 object-cover rounded"
                        />
                        <div>
                          <p className="font-medium">{wine.name}</p>
                          <p className="text-sm text-muted-foreground">{wine.region} - {wine.year}</p>
                          <p className="text-sm font-medium">{formatCurrency(wine.price)}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={wine.category === 'premium' || wine.category === 'reserve' ? 'default' : 'secondary'}>
                          {wine.category}
                        </Badge>
                        <Badge variant="outline">
                          {wine.type}
                        </Badge>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => removeWine(wine.id)}
                        >
                          Supprimer
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Nouveaux utilisateurs</CardTitle>
                  <CardDescription>
                    Les 5 derniers utilisateurs inscrits
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentUsers.map((user) => (
                      <div key={user.id} className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarImage src={user.avatar} />
                          <AvatarFallback>{getUserInitials(user.name)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                        <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>
                          {user.role}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Meilleurs clients</CardTitle>
                  <CardDescription>
                    Classés par montant total des commandes
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topCustomers.map((customer) => {
                      const totalSpent = customer.orders?.reduce((sum, order) => sum + order.total, 0) || 0;
                      return (
                        <div key={customer.id} className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <Avatar>
                              <AvatarImage src={customer.avatar} />
                              <AvatarFallback>{getUserInitials(customer.name)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{customer.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {customer.orders?.length || 0} commande(s)
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">{formatCurrency(totalSpent)}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;