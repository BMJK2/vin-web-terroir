import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Wine } from '@/types/wine';
import { toast } from '@/hooks/use-toast';

interface EditWineDialogProps {
  wine: Wine | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdate: (id: string, updatedWine: Partial<Wine>) => Promise<boolean>;
}

export const EditWineDialog = ({ wine, open, onOpenChange, onUpdate }: EditWineDialogProps) => {
  const [editedWine, setEditedWine] = useState<Wine | null>(null);

  useEffect(() => {
    if (wine) {
      setEditedWine({ ...wine });
    }
  }, [wine]);

  const handleSubmit = async () => {
    if (!editedWine || !wine) return;

    if (!editedWine.name || !editedWine.region || !editedWine.description) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive"
      });
      return;
    }

    const cleanedWine = {
      ...editedWine,
      features: editedWine.features.filter(f => f.trim() !== ''),
      images: editedWine.images.filter(i => i.trim() !== ''),
      grapes: editedWine.grapes.filter(g => g.trim() !== ''),
      pairingNotes: editedWine.pairingNotes.filter(p => p.trim() !== '')
    };

    const success = await onUpdate(wine.id, cleanedWine);
    
    if (success) {
      toast({
        title: "Succès",
        description: "Le vin a été modifié avec succès"
      });
      onOpenChange(false);
    } else {
      toast({
        title: "Erreur",
        description: "Erreur lors de la modification du vin",
        variant: "destructive"
      });
    }
  };

  const updateArrayField = (field: keyof Wine, index: number, value: string) => {
    if (!editedWine) return;
    const currentArray = editedWine[field] as string[];
    const newArray = [...currentArray];
    newArray[index] = value;
    setEditedWine({ ...editedWine, [field]: newArray });
  };

  const addArrayField = (field: keyof Wine) => {
    if (!editedWine) return;
    const currentArray = editedWine[field] as string[];
    setEditedWine({ ...editedWine, [field]: [...currentArray, ''] });
  };

  const removeArrayField = (field: keyof Wine, index: number) => {
    if (!editedWine) return;
    const currentArray = editedWine[field] as string[];
    const newArray = currentArray.filter((_, i) => i !== index);
    setEditedWine({ ...editedWine, [field]: newArray });
  };

  if (!editedWine) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95vw] max-w-4xl mx-auto max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-xl">Modifier le produit</DialogTitle>
          <DialogDescription className="text-sm sm:text-base">
            Modifiez les informations du vin
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Nom du vin*</Label>
              <Input
                id="name"
                value={editedWine.name}
                onChange={(e) => setEditedWine({...editedWine, name: e.target.value})}
                placeholder="Ex: Château Antananarivo Rouge"
              />
            </div>
            <div>
              <Label htmlFor="region">Région*</Label>
              <Input
                id="region"
                value={editedWine.region}
                onChange={(e) => setEditedWine({...editedWine, region: e.target.value})}
                placeholder="Ex: Hautes Terres"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="year">Année</Label>
                <Input
                  id="year"
                  type="number"
                  value={editedWine.year}
                  onChange={(e) => setEditedWine({...editedWine, year: parseInt(e.target.value)})}
                />
              </div>
              <div>
                <Label htmlFor="price">Prix (€)</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  value={editedWine.price}
                  onChange={(e) => setEditedWine({...editedWine, price: parseFloat(e.target.value)})}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="type">Type</Label>
                <Select value={editedWine.type} onValueChange={(value: any) => setEditedWine({...editedWine, type: value})}>
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
                <Select value={editedWine.category} onValueChange={(value: any) => setEditedWine({...editedWine, category: value})}>
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
                value={editedWine.description}
                onChange={(e) => setEditedWine({...editedWine, description: e.target.value})}
                placeholder="Description du vin..."
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="image">URL de l'image*</Label>
              <Input
                id="image"
                value={editedWine.image}
                onChange={(e) => setEditedWine({...editedWine, image: e.target.value})}
                placeholder="Ex: /assets/wine-red-1.jpg"
              />
            </div>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="alcohol">Alcool (%)</Label>
                <Input
                  id="alcohol"
                  type="number"
                  step="0.1"
                  value={editedWine.alcohol}
                  onChange={(e) => setEditedWine({...editedWine, alcohol: parseFloat(e.target.value)})}
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
                  value={editedWine.rating}
                  onChange={(e) => setEditedWine({...editedWine, rating: parseFloat(e.target.value)})}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="volume">Volume</Label>
              <Input
                id="volume"
                value={editedWine.volume}
                onChange={(e) => setEditedWine({...editedWine, volume: e.target.value})}
                placeholder="Ex: 750ml"
              />
            </div>
            <div>
              <Label htmlFor="temperature">Température de service</Label>
              <Input
                id="temperature"
                value={editedWine.servingTemperature}
                onChange={(e) => setEditedWine({...editedWine, servingTemperature: e.target.value})}
                placeholder="Ex: 16-18°C"
              />
            </div>
            <div>
              <Label>Cépages</Label>
              {editedWine.grapes.map((grape, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <Input
                    value={grape}
                    onChange={(e) => updateArrayField('grapes', index, e.target.value)}
                    placeholder="Ex: Cabernet Sauvignon"
                  />
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm"
                    onClick={() => removeArrayField('grapes', index)}
                  >
                    ✕
                  </Button>
                </div>
              ))}
              <Button type="button" variant="outline" size="sm" onClick={() => addArrayField('grapes')}>
                Ajouter un cépage
              </Button>
            </div>
            <div>
              <Label>Caractéristiques</Label>
              {editedWine.features.map((feature, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <Input
                    value={feature}
                    onChange={(e) => updateArrayField('features', index, e.target.value)}
                    placeholder="Ex: Élevage en fût de chêne"
                  />
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm"
                    onClick={() => removeArrayField('features', index)}
                  >
                    ✕
                  </Button>
                </div>
              ))}
              <Button type="button" variant="outline" size="sm" onClick={() => addArrayField('features')}>
                Ajouter une caractéristique
              </Button>
            </div>
            <div>
              <Label>Notes d'accompagnement</Label>
              {editedWine.pairingNotes.map((note, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <Input
                    value={note}
                    onChange={(e) => updateArrayField('pairingNotes', index, e.target.value)}
                    placeholder="Ex: Viandes rouges"
                  />
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm"
                    onClick={() => removeArrayField('pairingNotes', index)}
                  >
                    ✕
                  </Button>
                </div>
              ))}
              <Button type="button" variant="outline" size="sm" onClick={() => addArrayField('pairingNotes')}>
                Ajouter une note
              </Button>
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-end gap-2 sm:space-x-2 mt-6">
          <Button variant="outline" onClick={() => onOpenChange(false)} className="w-full sm:w-auto">
            Annuler
          </Button>
          <Button onClick={handleSubmit} className="w-full sm:w-auto">
            Enregistrer les modifications
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
