import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { CreditCard, Trash2, Plus, Check } from "lucide-react";
import { AddPaymentMethodDialog } from "./AddPaymentMethodDialog";

interface PaymentMethod {
  id: string;
  type: string;
  card_last_four: string | null;
  card_brand: string | null;
  card_exp_month: number | null;
  card_exp_year: number | null;
  is_default: boolean;
}

export const PaymentMethods = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [methods, setMethods] = useState<PaymentMethod[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddDialog, setShowAddDialog] = useState(false);

  useEffect(() => {
    if (user) {
      loadPaymentMethods();
    }
  }, [user]);

  const loadPaymentMethods = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from("payment_methods")
      .select("*")
      .eq("user_id", user.id)
      .order("is_default", { ascending: false });

    if (error) {
      console.error("Erreur de chargement des méthodes de paiement:", error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les méthodes de paiement",
        variant: "destructive",
      });
      return;
    }

    setMethods(data || []);
    setLoading(false);
  };

  const setDefaultMethod = async (methodId: string) => {
    if (!user) return;

    // Reset all other methods
    await supabase
      .from("payment_methods")
      .update({ is_default: false })
      .eq("user_id", user.id);

    // Set new default
    const { error } = await supabase
      .from("payment_methods")
      .update({ is_default: true })
      .eq("id", methodId);

    if (error) {
      toast({
        title: "Erreur",
        description: "Impossible de définir la méthode par défaut",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Succès",
      description: "Méthode de paiement par défaut mise à jour",
    });

    loadPaymentMethods();
  };

  const deleteMethod = async (methodId: string) => {
    const { error } = await supabase
      .from("payment_methods")
      .delete()
      .eq("id", methodId);

    if (error) {
      toast({
        title: "Erreur",
        description: "Impossible de supprimer la méthode de paiement",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Succès",
      description: "Méthode de paiement supprimée",
    });

    loadPaymentMethods();
  };

  const getCardBrandIcon = (brand: string | null) => {
    if (!brand) return "💳";
    const brandLower = brand.toLowerCase();
    if (brandLower.includes("visa")) return "💳 Visa";
    if (brandLower.includes("mastercard")) return "💳 Mastercard";
    if (brandLower.includes("amex")) return "💳 Amex";
    return `💳 ${brand}`;
  };

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Méthodes de Paiement</CardTitle>
              <CardDescription>
                Gérez vos cartes bancaires et autres moyens de paiement
              </CardDescription>
            </div>
            <Button onClick={() => setShowAddDialog(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Ajouter
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {methods.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <CreditCard className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Aucune méthode de paiement enregistrée</p>
            </div>
          ) : (
            <div className="space-y-4">
              {methods.map((method) => (
                <div
                  key={method.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="text-2xl">
                      {method.type === "card" && getCardBrandIcon(method.card_brand)}
                      {method.type === "paypal" && "💙"}
                      {method.type === "bank_transfer" && "🏦"}
                    </div>
                    <div>
                      <div className="font-medium flex items-center gap-2">
                        {method.type === "card" && (
                          <>
                            •••• {method.card_last_four}
                          </>
                        )}
                        {method.type === "paypal" && "PayPal"}
                        {method.type === "bank_transfer" && "Virement bancaire"}
                        {method.is_default && (
                          <span className="inline-flex items-center gap-1 text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                            <Check className="h-3 w-3" />
                            Par défaut
                          </span>
                        )}
                      </div>
                      {method.type === "card" && method.card_exp_month && method.card_exp_year && (
                        <p className="text-sm text-muted-foreground">
                          Expire le {String(method.card_exp_month).padStart(2, "0")}/{method.card_exp_year}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {!method.is_default && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setDefaultMethod(method.id)}
                      >
                        Définir par défaut
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteMethod(method.id)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <AddPaymentMethodDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        onSuccess={loadPaymentMethods}
      />
    </>
  );
};
