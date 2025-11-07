import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

interface AddPaymentMethodDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export const AddPaymentMethodDialog = ({
  open,
  onOpenChange,
  onSuccess,
}: AddPaymentMethodDialogProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    type: "card",
    cardNumber: "",
    cardBrand: "Visa",
    expMonth: "",
    expYear: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);

    const lastFour = formData.cardNumber.slice(-4);

    const { error } = await supabase.from("payment_methods").insert({
      user_id: user.id,
      type: formData.type,
      card_last_four: lastFour,
      card_brand: formData.cardBrand,
      card_exp_month: parseInt(formData.expMonth),
      card_exp_year: parseInt(formData.expYear),
      is_default: false,
    });

    setLoading(false);

    if (error) {
      toast({
        title: "Erreur",
        description: "Impossible d'ajouter la méthode de paiement",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Succès",
      description: "Méthode de paiement ajoutée avec succès",
    });

    setFormData({
      type: "card",
      cardNumber: "",
      cardBrand: "Visa",
      expMonth: "",
      expYear: "",
    });

    onSuccess();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ajouter une méthode de paiement</DialogTitle>
          <DialogDescription>
            Ajoutez une nouvelle carte bancaire ou méthode de paiement
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="type">Type de paiement</Label>
            <Select
              value={formData.type}
              onValueChange={(value) => setFormData({ ...formData, type: value })}
            >
              <SelectTrigger id="type">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="card">Carte bancaire</SelectItem>
                <SelectItem value="paypal">PayPal</SelectItem>
                <SelectItem value="bank_transfer">Virement bancaire</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {formData.type === "card" && (
            <>
              <div className="space-y-2">
                <Label htmlFor="cardNumber">Numéro de carte</Label>
                <Input
                  id="cardNumber"
                  value={formData.cardNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, cardNumber: e.target.value.replace(/\s/g, "") })
                  }
                  placeholder="1234 5678 9012 3456"
                  maxLength={16}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cardBrand">Type de carte</Label>
                <Select
                  value={formData.cardBrand}
                  onValueChange={(value) =>
                    setFormData({ ...formData, cardBrand: value })
                  }
                >
                  <SelectTrigger id="cardBrand">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Visa">Visa</SelectItem>
                    <SelectItem value="Mastercard">Mastercard</SelectItem>
                    <SelectItem value="Amex">American Express</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expMonth">Mois d'expiration</Label>
                  <Input
                    id="expMonth"
                    value={formData.expMonth}
                    onChange={(e) =>
                      setFormData({ ...formData, expMonth: e.target.value })
                    }
                    placeholder="MM"
                    type="number"
                    min="1"
                    max="12"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expYear">Année d'expiration</Label>
                  <Input
                    id="expYear"
                    value={formData.expYear}
                    onChange={(e) =>
                      setFormData({ ...formData, expYear: e.target.value })
                    }
                    placeholder="YYYY"
                    type="number"
                    min={new Date().getFullYear()}
                    required
                  />
                </div>
              </div>
            </>
          )}

          <div className="flex gap-2 justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Annuler
            </Button>
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Ajouter
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
