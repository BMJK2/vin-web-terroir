import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

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
      });
    } else if (connection.provider === 'google') {
      body = JSON.stringify({
        contents: messages.map((m: any) => ({
          role: m.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: m.content }],
        })),
      });
    } else {
      body = JSON.stringify({
        model: connection.model_name,
        messages: messages,
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

    // Parse response based on provider
    let content = '';
    if (connection.provider === 'anthropic') {
      content = data.content[0].text;
    } else if (connection.provider === 'google') {
      content = data.candidates[0].content.parts[0].text;
    } else {
      content = data.choices[0].message.content;
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
