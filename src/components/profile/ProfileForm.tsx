import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader2 } from "lucide-react";

export const ProfileForm = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    avatarUrl: "",
    dateOfBirth: "",
    newsletter: false,
    notifications: true,
    language: "fr",
  });

  useEffect(() => {
    if (user) {
      loadProfile();
    }
  }, [user]);

  const loadProfile = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", user.id)
      .single();

    if (error) {
      console.error("Erreur de chargement du profil:", error);
      return;
    }

    if (data) {
      setFormData({
        name: data.name || "",
        email: data.email || "",
        phone: data.phone || "",
        address: data.address || "",
        avatarUrl: data.avatar_url || "",
        dateOfBirth: data.date_of_birth || "",
        newsletter: data.newsletter || false,
        notifications: data.notifications !== false,
        language: data.language || "fr",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);

    const { error } = await supabase
      .from("profiles")
      .update({
        name: formData.name,
        phone: formData.phone,
        address: formData.address,
        avatar_url: formData.avatarUrl,
        date_of_birth: formData.dateOfBirth || null,
        newsletter: formData.newsletter,
        notifications: formData.notifications,
        language: formData.language,
      })
      .eq("user_id", user.id);

    setLoading(false);

    if (error) {
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour le profil",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Succès",
      description: "Profil mis à jour avec succès",
    });
  };

  const getInitials = () => {
    return formData.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Informations Personnelles</CardTitle>
        <CardDescription>
          Gérez vos informations personnelles et vos préférences
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={formData.avatarUrl} />
              <AvatarFallback className="text-lg">{getInitials()}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <Label htmlFor="avatarUrl">URL de l'avatar</Label>
              <Input
                id="avatarUrl"
                value={formData.avatarUrl}
                onChange={(e) =>
                  setFormData({ ...formData, avatarUrl: e.target.value })
                }
                placeholder="https://exemple.com/avatar.jpg"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nom complet *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                disabled
                className="bg-muted"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Téléphone</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                placeholder="+33 6 12 34 56 78"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dateOfBirth">Date de naissance</Label>
              <Input
                id="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) =>
                  setFormData({ ...formData, dateOfBirth: e.target.value })
                }
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Adresse complète</Label>
            <Textarea
              id="address"
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              placeholder="123 Rue de la Paix, 75001 Paris"
              rows={3}
            />
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Préférences</h3>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="newsletter">Newsletter</Label>
                <p className="text-sm text-muted-foreground">
                  Recevoir les actualités et offres spéciales
                </p>
              </div>
              <Switch
                id="newsletter"
                checked={formData.newsletter}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, newsletter: checked })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="notifications">Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Recevoir des notifications sur vos commandes
                </p>
              </div>
              <Switch
                id="notifications"
                checked={formData.notifications}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, notifications: checked })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="language">Langue</Label>
              <Select
                value={formData.language}
                onValueChange={(value) =>
                  setFormData({ ...formData, language: value })
                }
              >
                <SelectTrigger id="language">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fr">Français</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button type="submit" disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Enregistrer les modifications
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
