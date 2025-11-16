import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Plus, Trash2, MessageSquare } from 'lucide-react';

interface AIConnection {
  id: string;
  provider: string;
  model_name: string;
  display_name: string;
  is_active: boolean;
  created_at: string;
}

interface AIConnectionsProps {
  onOpenChat: (connectionId: string) => void;
}

export const AIConnections = ({ onOpenChat }: AIConnectionsProps) => {
  const [connections, setConnections] = useState<AIConnection[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    provider: '',
    model_name: '',
    display_name: '',
    api_key: '',
  });
  const { toast } = useToast();

  useEffect(() => {
    loadConnections();
  }, []);

  const loadConnections = async () => {
    try {
      const { data, error } = await supabase
        .from('user_ai_connections')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setConnections(data || []);
    } catch (error: any) {
      toast({
        title: 'Erreur',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Non authentifié');

      const { error } = await supabase
        .from('user_ai_connections')
        .insert({
          user_id: user.id,
          provider: formData.provider,
          model_name: formData.model_name,
          display_name: formData.display_name,
          api_key_encrypted: formData.api_key,
          is_active: true,
        });

      if (error) throw error;

      toast({
        title: 'Succès',
        description: 'Connexion IA ajoutée avec succès',
      });

      setIsDialogOpen(false);
      setFormData({ provider: '', model_name: '', display_name: '', api_key: '' });
      loadConnections();
    } catch (error: any) {
      toast({
        title: 'Erreur',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('user_ai_connections')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: 'Succès',
        description: 'Connexion supprimée',
      });

      loadConnections();
    } catch (error: any) {
      toast({
        title: 'Erreur',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const getProviderIcon = (provider: string) => {
    switch (provider) {
      case 'openai': return '🤖';
      case 'anthropic': return '🧠';
      case 'google': return '🔍';
      case 'lovable': return '💝';
      default: return '🤖';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">Connexions IA</h3>
          <p className="text-sm text-muted-foreground">
            Connectez vos propres modèles d'IA
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Ajouter
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Nouvelle connexion IA</DialogTitle>
              <DialogDescription>
                Ajoutez une connexion à un modèle d'IA
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="display_name">Nom d'affichage</Label>
                <Input
                  id="display_name"
                  value={formData.display_name}
                  onChange={(e) => setFormData({ ...formData, display_name: e.target.value })}
                  placeholder="Mon assistant IA"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="provider">Fournisseur</Label>
                <Select
                  value={formData.provider}
                  onValueChange={(value) => setFormData({ ...formData, provider: value })}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="openai">OpenAI</SelectItem>
                    <SelectItem value="anthropic">Anthropic</SelectItem>
                    <SelectItem value="google">Google</SelectItem>
                    <SelectItem value="lovable">Lovable AI (gratuit)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="model_name">Nom du modèle</Label>
                <Input
                  id="model_name"
                  value={formData.model_name}
                  onChange={(e) => setFormData({ ...formData, model_name: e.target.value })}
                  placeholder={
                    formData.provider === 'openai' ? 'gpt-5-2025-08-07' :
                    formData.provider === 'anthropic' ? 'claude-sonnet-4-5' :
                    formData.provider === 'google' ? 'gemini-pro' :
                    formData.provider === 'lovable' ? 'google/gemini-2.5-flash' :
                    'nom-du-modèle'
                  }
                  required
                />
              </div>
              {formData.provider !== 'lovable' && (
                <div className="space-y-2">
                  <Label htmlFor="api_key">Clé API</Label>
                  <Input
                    id="api_key"
                    type="password"
                    value={formData.api_key}
                    onChange={(e) => setFormData({ ...formData, api_key: e.target.value })}
                    placeholder="sk-..."
                    required
                  />
                </div>
              )}
              <DialogFooter>
                <Button type="submit">Ajouter</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <p className="text-muted-foreground">Chargement...</p>
      ) : connections.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">
              Aucune connexion IA configurée
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {connections.map((connection) => (
            <Card key={connection.id}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{getProviderIcon(connection.provider)}</span>
                  <div>
                    <CardTitle className="text-base">{connection.display_name}</CardTitle>
                    <CardDescription>
                      {connection.provider} • {connection.model_name}
                    </CardDescription>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onOpenChat(connection.id)}
                  >
                    <MessageSquare className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(connection.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
