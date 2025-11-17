import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { Send, ArrowLeft, Loader2 } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface AIChatProps {
  connectionId: string;
  connectionName: string;
  onBack: () => void;
}

export const AIChat = ({ connectionId, connectionName, onBack }: AIChatProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const { addToCart, removeFromCart } = useCart();

  useEffect(() => {
    loadHistory();
  }, [connectionId]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const loadHistory = async () => {
    try {
      const { data, error } = await supabase
        .from('ai_chat_messages')
        .select('*')
        .eq('connection_id', connectionId)
        .order('created_at', { ascending: true })
        .limit(50);

      if (error) throw error;
      
      setMessages(data.map(msg => ({
        role: msg.role as 'user' | 'assistant',
        content: msg.content,
      })));
    } catch (error: any) {
      console.error('Error loading history:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('ai-chat', {
        body: {
          connectionId,
          messages: [...messages, { role: 'user', content: userMessage }],
        },
      });

      if (error) throw error;

      // Handle client-side actions
      if (data.actions) {
        for (const action of data.actions) {
          switch (action.action) {
            case 'add_to_cart':
              // Fetch wine details
              const { data: wine } = await supabase
                .from('wines')
                .select('*')
                .eq('id', action.wine_id)
                .single();
              if (wine) {
                // Map wine to CartItem format
                const cartWine = {
                  id: wine.id,
                  name: wine.name,
                  region: wine.region,
                  year: wine.year.toString(),
                  price: wine.price,
                  image: wine.image,
                  type: wine.type,
                };
                // Add to cart multiple times for quantity
                for (let i = 0; i < action.quantity; i++) {
                  addToCart(cartWine);
                }
                toast({
                  title: '✓ Panier',
                  description: `${wine.name} (x${action.quantity}) ajouté au panier`,
                });
              }
              break;
            case 'remove_from_cart':
              removeFromCart(action.wine_id);
              toast({
                title: '✓ Panier',
                description: 'Article retiré du panier',
              });
              break;
            case 'get_cart':
              // Trigger cart modal (could be enhanced)
              toast({
                title: 'ℹ️ Panier',
                description: 'Consultez votre panier en haut à droite',
              });
              break;
          }
        }
      }

      setMessages(prev => [...prev, { role: 'assistant', content: data.content }]);
    } catch (error: any) {
      toast({
        title: 'Erreur',
        description: error.message,
        variant: 'destructive',
      });
      // Remove user message on error
      setMessages(prev => prev.slice(0, -1));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          {connectionName}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col p-0">
        <ScrollArea ref={scrollRef} className="flex-1 p-4">
          <div className="space-y-4">
            {messages.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                Commencez une conversation avec votre IA
              </p>
            ) : (
              messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  </div>
                </div>
              ))
            )}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-muted rounded-lg p-3">
                  <Loader2 className="h-4 w-4 animate-spin" />
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
        <form onSubmit={handleSubmit} className="p-4 border-t">
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Écrivez votre message..."
              disabled={isLoading}
            />
            <Button type="submit" disabled={isLoading || !input.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
