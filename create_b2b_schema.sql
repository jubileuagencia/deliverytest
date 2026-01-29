-- Create profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  company_name TEXT,
  cnpj TEXT,
  phone TEXT,
  CONSTRAINT profiles_cnpj_check CHECK (char_length(cnpj) >= 14) -- Basic length check
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles Policies
CREATE POLICY "Users can view own profile" 
  ON public.profiles FOR SELECT 
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" 
  ON public.profiles FOR INSERT 
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile" 
  ON public.profiles FOR UPDATE 
  USING (auth.uid() = id);

-- Create addresses table
CREATE TABLE IF NOT EXISTS public.addresses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  cep TEXT NOT NULL,
  street TEXT NOT NULL,
  number TEXT NOT NULL,
  complement TEXT,
  neighborhood TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  is_main BOOLEAN DEFAULT false
);

-- Enable RLS on addresses
ALTER TABLE public.addresses ENABLE ROW LEVEL SECURITY;

-- Addresses Policies
-- Complex RLS: User can access address if the related profile belongs to them
CREATE POLICY "Users can view own addresses" 
  ON public.addresses FOR SELECT 
  USING (
    exists (
      select 1 from public.profiles
      where profiles.id = addresses.profile_id
      and profiles.id = auth.uid()
    )
  );

CREATE POLICY "Users can insert own addresses" 
  ON public.addresses FOR INSERT 
  WITH CHECK (
    exists (
      select 1 from public.profiles
      where profiles.id = addresses.profile_id
      and profiles.id = auth.uid()
    )
  );

CREATE POLICY "Users can update own addresses" 
  ON public.addresses FOR UPDATE 
  USING (
    exists (
      select 1 from public.profiles
      where profiles.id = addresses.profile_id
      and profiles.id = auth.uid()
    )
  );

CREATE POLICY "Users can delete own addresses" 
  ON public.addresses FOR DELETE 
  USING (
    exists (
      select 1 from public.profiles
      where profiles.id = addresses.profile_id
      and profiles.id = auth.uid()
    )
  );
