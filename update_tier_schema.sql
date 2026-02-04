-- Add tier column to profiles if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'tier') THEN
        ALTER TABLE public.profiles ADD COLUMN tier TEXT DEFAULT 'bronze' CHECK (tier IN ('bronze', 'silver', 'gold'));
    END IF;
END $$;

-- Create app_config table
CREATE TABLE IF NOT EXISTS public.app_config (
    key TEXT PRIMARY KEY,
    value JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS on app_config
ALTER TABLE public.app_config ENABLE ROW LEVEL SECURITY;

-- Policy: Everyone (authenticated) can view config
CREATE POLICY "Authenticated users can view app_config" 
  ON public.app_config FOR SELECT 
  TO authenticated
  USING (true);

-- Policy: Only service_role can insert/update (Admin via API/Script)
-- We don't need explicit policies for service_role as it bypasses RLS, 
-- but we ensure NO ONE ELSE can write.

-- Insert initial values safely (User ID not needed for config)
INSERT INTO public.app_config (key, value)
VALUES ('tier_discounts', '{"silver": 0.04, "gold": 0.08}'::jsonb)
ON CONFLICT (key) DO NOTHING;

-- Create function to auto-update updated_at
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger for updated_at
DROP TRIGGER IF EXISTS on_app_config_updated ON public.app_config;
CREATE TRIGGER on_app_config_updated
  BEFORE UPDATE ON public.app_config
  FOR EACH ROW
  EXECUTE PROCEDURE public.handle_updated_at();

-- Enable Realtime for app_config
ALTER PUBLICATION supabase_realtime ADD TABLE public.app_config;
