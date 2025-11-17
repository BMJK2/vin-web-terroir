-- Add webhook_url column to user_ai_connections for n8n integration
ALTER TABLE user_ai_connections 
ADD COLUMN webhook_url text;