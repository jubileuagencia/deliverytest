-- Add new columns for B2B details if they don't exist
ALTER TABLE products ADD COLUMN IF NOT EXISTS description text;
ALTER TABLE products ADD COLUMN IF NOT EXISTS category text;

-- Clear existing cart items to avoid foreign key violations
DELETE FROM cart_items;

-- Clear existing products
DELETE FROM products;

-- Insert new B2B Produce products
INSERT INTO products (name, description, price, image_url, category) VALUES
('Maçã Gala Selecionada', 'Caixa 18kg - Cat 1', 120.00, 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6', 'Fruits'),
('Banana Prata Climatizada', 'Caixa 20kg - Extra', 85.50, 'https://images.unsplash.com/photo-1603833665858-e61d17a86224', 'Fruits'),
('Tomate Italiano', 'Caixa 22kg - Madu', 95.00, 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea', 'Vegetables');
