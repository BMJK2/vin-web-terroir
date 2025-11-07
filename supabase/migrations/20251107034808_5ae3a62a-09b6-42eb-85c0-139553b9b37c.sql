-- Add more fields to profiles table
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS avatar_url text,
ADD COLUMN IF NOT EXISTS date_of_birth date,
ADD COLUMN IF NOT EXISTS newsletter boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS notifications boolean DEFAULT true,
ADD COLUMN IF NOT EXISTS language text DEFAULT 'fr';

-- Create payment methods table
CREATE TABLE IF NOT EXISTS public.payment_methods (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  type text NOT NULL CHECK (type IN ('card', 'paypal', 'bank_transfer')),
  card_last_four text,
  card_brand text,
  card_exp_month integer,
  card_exp_year integer,
  is_default boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Enable RLS on payment_methods
ALTER TABLE public.payment_methods ENABLE ROW LEVEL SECURITY;

-- RLS Policies for payment_methods
CREATE POLICY "Users can view their own payment methods"
ON public.payment_methods
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own payment methods"
ON public.payment_methods
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own payment methods"
ON public.payment_methods
FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own payment methods"
ON public.payment_methods
FOR DELETE
USING (auth.uid() = user_id);

-- Add trigger for payment_methods updated_at
CREATE TRIGGER update_payment_methods_updated_at
BEFORE UPDATE ON public.payment_methods
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();