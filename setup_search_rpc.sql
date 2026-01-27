-- Enable the unaccent extension to ignore accents (maçã -> maca)
CREATE EXTENSION IF NOT EXISTS unaccent;

-- Drop existing function first to allow return type changes
DROP FUNCTION IF EXISTS search_products_v2(text);

-- Create a search function that handles:
-- 1. Partial matches (bana -> Banana)
-- 2. Accent insensitivity (brocolis -> Brócolis)
-- 3. Joins with categories to return the structure the frontend expects
CREATE OR REPLACE FUNCTION search_products_v2(query_term text)
RETURNS TABLE (
  id uuid,
  name text,
  price numeric,
  description text,
  image_url text,
  category_id uuid,
  categories json -- Return categories as a JSON object to match pure Supabase select
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    p.id,
    p.name,
    p.price,
    p.description,
    p.image_url,
    p.category_id,
    json_build_object('name', c.name) as categories
  FROM products p
  LEFT JOIN categories c ON p.category_id = c.id
  WHERE 
    unaccent(p.name) ILIKE unaccent('%' || query_term || '%');
END;
$$ LANGUAGE plpgsql;
