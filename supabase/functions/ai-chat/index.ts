import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Define available tools
const tools = [
  {
    type: "function",
    function: {
      name: "search_wines",
      description: "Rechercher des vins par nom, type, région ou catégorie",
      parameters: {
        type: "object",
        properties: {
          query: { type: "string", description: "Terme de recherche" },
          type: { type: "string", description: "Type de vin (rouge, blanc, rosé, champagne)" },
          region: { type: "string", description: "Région du vin" }
        }
      }
    }
  },
  {
    type: "function",
    function: {
      name: "get_wine_details",
      description: "Obtenir les détails complets d'un vin spécifique",
      parameters: {
        type: "object",
        properties: {
          wine_id: { type: "string", description: "ID du vin" }
        },
        required: ["wine_id"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "add_to_cart",
      description: "Ajouter un vin au panier",
      parameters: {
        type: "object",
        properties: {
          wine_id: { type: "string", description: "ID du vin" },
          quantity: { type: "number", description: "Quantité à ajouter" }
        },
        required: ["wine_id", "quantity"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "get_cart",
      description: "Voir le contenu actuel du panier",
      parameters: { type: "object", properties: {} }
    }
  },
  {
    type: "function",
    function: {
      name: "remove_from_cart",
      description: "Retirer un vin du panier",
      parameters: {
        type: "object",
        properties: {
          wine_id: { type: "string", description: "ID du vin à retirer" }
        },
        required: ["wine_id"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "get_orders",
      description: "Consulter l'historique des commandes",
      parameters: { type: "object", properties: {} }
    }
  },
  {
    type: "function",
    function: {
      name: "get_order_details",
      description: "Obtenir les détails d'une commande spécifique",
      parameters: {
        type: "object",
        properties: {
          order_id: { type: "string", description: "ID de la commande" }
        },
        required: ["order_id"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "get_profile",
      description: "Consulter les informations du profil utilisateur",
      parameters: { type: "object", properties: {} }
    }
  },
  {
    type: "function",
    function: {
      name: "update_profile",
      description: "Modifier les informations du profil utilisateur",
      parameters: {
        type: "object",
        properties: {
          name: { type: "string", description: "Nom" },
          phone: { type: "string", description: "Téléphone" },
          address: { type: "string", description: "Adresse" }
        }
      }
    }
  },
  {
    type: "function",
    function: {
      name: "get_payment_methods",
      description: "Consulter les moyens de paiement enregistrés",
      parameters: { type: "object", properties: {} }
    }
  }
];

// Execute tool calls
async function executeToolCall(toolName: string, args: any, supabase: any, userId: string) {
  console.log(`Executing tool: ${toolName}`, args);
  
  try {
    switch (toolName) {
      case "search_wines": {
        let query = supabase.from('wines').select('*').eq('is_active', true);
        
        if (args.query) {
          query = query.or(`name.ilike.%${args.query}%,description.ilike.%${args.query}%`);
        }
        if (args.type) {
          query = query.eq('type', args.type);
        }
        if (args.region) {
          query = query.ilike('region', `%${args.region}%`);
        }
        
        const { data, error } = await query.limit(10);
        if (error) throw error;
        return { wines: data };
      }
      
      case "get_wine_details": {
        const { data, error } = await supabase
          .from('wines')
          .select('*')
          .eq('id', args.wine_id)
          .single();
        if (error) throw error;
        return { wine: data };
      }
      
      case "add_to_cart": {
        // This is a client-side action, return instructions
        return { 
          action: "add_to_cart",
          wine_id: args.wine_id,
          quantity: args.quantity,
          message: "Vin ajouté au panier avec succès"
        };
      }
      
      case "get_cart": {
        // This is a client-side action, return instructions
        return { 
          action: "get_cart",
          message: "Veuillez consulter votre panier"
        };
      }
      
      case "remove_from_cart": {
        return { 
          action: "remove_from_cart",
          wine_id: args.wine_id,
          message: "Vin retiré du panier"
        };
      }
      
      case "get_orders": {
        const { data, error } = await supabase
          .from('orders')
          .select('*, order_items(*, wines(name, image))')
          .eq('user_id', userId)
          .order('created_at', { ascending: false })
          .limit(10);
        if (error) throw error;
        return { orders: data };
      }
      
      case "get_order_details": {
        const { data, error } = await supabase
          .from('orders')
          .select('*, order_items(*, wines(*))')
          .eq('id', args.order_id)
          .eq('user_id', userId)
          .single();
        if (error) throw error;
        return { order: data };
      }
      
      case "get_profile": {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', userId)
          .single();
        if (error) throw error;
        return { profile: data };
      }
      
      case "update_profile": {
        const updates: any = {};
        if (args.name) updates.name = args.name;
        if (args.phone) updates.phone = args.phone;
        if (args.address) updates.address = args.address;
        
        const { data, error } = await supabase
          .from('profiles')
          .update(updates)
          .eq('user_id', userId)
          .select()
          .single();
        if (error) throw error;
        return { profile: data, message: "Profil mis à jour avec succès" };
      }
      
      case "get_payment_methods": {
        const { data, error } = await supabase
          .from('payment_methods')
          .select('*')
          .eq('user_id', userId)
          .order('is_default', { ascending: false });
        if (error) throw error;
        return { payment_methods: data };
      }
      
      default:
        return { error: "Unknown tool" };
    }
  } catch (error) {
    console.error(`Error executing ${toolName}:`, error);
    return { error: error.message };
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { connectionId, messages } = await req.json();

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get JWT token from authorization header
    const authHeader = req.headers.get('authorization');
    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'No authorization header' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Verify user
    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);

    if (authError || !user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Get AI connection details
    const { data: connection, error: connError } = await supabase
      .from('user_ai_connections')
      .select('*')
      .eq('id', connectionId)
      .eq('user_id', user.id)
      .single();

    if (connError || !connection) {
      return new Response(JSON.stringify({ error: 'Connection not found' }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    let response;
    let apiUrl = '';
    let headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    // Route to appropriate AI provider
    switch (connection.provider) {
      case 'openai':
        apiUrl = 'https://api.openai.com/v1/chat/completions';
        headers['Authorization'] = `Bearer ${connection.api_key_encrypted}`;
        break;
      case 'anthropic':
        apiUrl = 'https://api.anthropic.com/v1/messages';
        headers['x-api-key'] = connection.api_key_encrypted;
        headers['anthropic-version'] = '2023-06-01';
        break;
      case 'google':
        apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${connection.model_name}:generateContent?key=${connection.api_key_encrypted}`;
        break;
      case 'lovable':
        apiUrl = 'https://ai.gateway.lovable.dev/v1/chat/completions';
        const lovableKey = Deno.env.get('LOVABLE_API_KEY');
        if (!lovableKey) {
          return new Response(JSON.stringify({ error: 'Lovable AI not configured' }), {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }
        headers['Authorization'] = `Bearer ${lovableKey}`;
        break;
      default:
        return new Response(JSON.stringify({ error: 'Unsupported provider' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
    }

    // Format request based on provider
    let body;
    if (connection.provider === 'anthropic') {
      body = JSON.stringify({
        model: connection.model_name,
        messages: messages.map((m: any) => ({
          role: m.role === 'assistant' ? 'assistant' : 'user',
          content: m.content,
        })),
        max_tokens: 1024,
        tools: tools.map(t => ({
          name: t.function.name,
          description: t.function.description,
          input_schema: t.function.parameters
        }))
      });
    } else if (connection.provider === 'google') {
      // Google Gemini format
      body = JSON.stringify({
        contents: messages.map((m: any) => ({
          role: m.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: m.content }],
        })),
        tools: [{
          functionDeclarations: tools.map(t => ({
            name: t.function.name,
            description: t.function.description,
            parameters: t.function.parameters
          }))
        }]
      });
    } else {
      // OpenAI and Lovable AI format
      body = JSON.stringify({
        model: connection.model_name,
        messages: messages,
        tools: tools
      });
    }

    response = await fetch(apiUrl, {
      method: 'POST',
      headers: headers,
      body: body,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI API error:', errorText);
      return new Response(JSON.stringify({ error: 'AI API error', details: errorText }), {
        status: response.status,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const data = await response.json();
    console.log('AI response:', JSON.stringify(data, null, 2));

    // Parse response and handle tool calls
    let content = '';
    let toolCalls: any[] = [];
    let finalResponse = '';

    if (connection.provider === 'anthropic') {
      // Anthropic format
      const contentBlock = data.content[0];
      if (contentBlock.type === 'tool_use') {
        toolCalls = data.content.filter((c: any) => c.type === 'tool_use');
      } else {
        content = contentBlock.text;
      }
    } else if (connection.provider === 'google') {
      // Google format
      const parts = data.candidates[0].content.parts;
      const functionCall = parts.find((p: any) => p.functionCall);
      if (functionCall) {
        toolCalls = [{
          function: {
            name: functionCall.functionCall.name,
            arguments: JSON.stringify(functionCall.functionCall.args)
          }
        }];
      } else {
        content = parts[0].text;
      }
    } else {
      // OpenAI/Lovable format
      const message = data.choices[0].message;
      if (message.tool_calls) {
        toolCalls = message.tool_calls;
      } else {
        content = message.content;
      }
    }

    // Execute tool calls if present
    if (toolCalls.length > 0) {
      const toolResults: any[] = [];
      
      for (const toolCall of toolCalls) {
        const toolName = connection.provider === 'anthropic' 
          ? toolCall.name 
          : toolCall.function.name;
        const toolArgs = connection.provider === 'anthropic'
          ? toolCall.input
          : JSON.parse(toolCall.function.arguments);
        
        const result = await executeToolCall(toolName, toolArgs, supabase, user.id);
        toolResults.push({ tool: toolName, result });
      }

      // Format final response with tool results
      finalResponse = `J'ai exécuté les actions suivantes:\n\n${toolResults.map(r => 
        `✓ ${r.tool}: ${JSON.stringify(r.result, null, 2)}`
      ).join('\n\n')}`;

      content = finalResponse;

      // Return both content and actions for client-side handling
      const clientActions = toolResults
        .filter(r => r.result.action)
        .map(r => r.result);

      await supabase.from('ai_chat_messages').insert([
        { user_id: user.id, connection_id: connectionId, role: 'user', content: messages[messages.length - 1].content },
        { user_id: user.id, connection_id: connectionId, role: 'assistant', content: content },
      ]);

      return new Response(JSON.stringify({ 
        content, 
        actions: clientActions.length > 0 ? clientActions : undefined 
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Save message to history
    await supabase.from('ai_chat_messages').insert([
      { user_id: user.id, connection_id: connectionId, role: 'user', content: messages[messages.length - 1].content },
      { user_id: user.id, connection_id: connectionId, role: 'assistant', content: content },
    ]);

    return new Response(JSON.stringify({ content }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
