-- Clean up existing tables (Order matters due to FK constraints)
DROP TABLE IF EXISTS cart_items;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS categories;

-- Create Categories Table
CREATE TABLE categories (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    name text NOT NULL UNIQUE,
    icon text,
    color text
);

-- Create Products Table with Foreign Key
CREATE TABLE products (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    name text NOT NULL,
    description text,
    price numeric NOT NULL,
    image_url text,
    category_id uuid REFERENCES categories(id) ON DELETE CASCADE
);

-- Re-create Cart Items if needed (simplified for this script, though usually managed by migration)
CREATE TABLE IF NOT EXISTS cart_items (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id uuid REFERENCES auth.users(id),
    product_id uuid REFERENCES products(id) ON DELETE CASCADE,
    quantity integer DEFAULT 1
);

-- Insert Categories
INSERT INTO categories (name, icon, color) VALUES
('Frutas', '🍎', '#FEF2F2'),
('Legumes', '🥕', '#ECFDF5'),
('Raízes', '🥔', '#FFFBEB'),
('Orgânicos', '🥬', '#F0F9FF');

-- Insert Products using Subqueries to find Category ID
-- Frutas
INSERT INTO products (name, description, price, image_url, category_id) VALUES
('Maçã Gala', 'Caixa 18kg - Cat 1', 120.00, 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6', (SELECT id FROM categories WHERE name='Frutas')),
('Banana Prata', 'Caixa 20kg - Climatizada', 85.00, 'https://images.unsplash.com/photo-1603833665858-e61d17a86224', (SELECT id FROM categories WHERE name='Frutas')),
('Laranja Pera', 'Saco 20kg - Doce', 45.00, 'https://images.unsplash.com/photo-1582979512210-99b6a53386f9', (SELECT id FROM categories WHERE name='Frutas')),
('Mamão Formosa', 'Caixa 10kg', 65.00, 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec', (SELECT id FROM categories WHERE name='Frutas')),
('Melancia Graúda', 'Unidade (aprox 12kg)', 25.00, 'https://images.unsplash.com/photo-1587049352846-4a222e784d38', (SELECT id FROM categories WHERE name='Frutas')),
('Abacaxi Pérola', 'Caixa 8 Unidades', 55.00, 'https://images.unsplash.com/photo-1550258987-190a2d41a8ba', (SELECT id FROM categories WHERE name='Frutas')),
('Uva Vitória', 'Caixa 5kg - Sem Semente', 98.00, 'https://images.unsplash.com/photo-1537640538965-1756fb179c1b', (SELECT id FROM categories WHERE name='Frutas')),
('Manga Tommy', 'Caixa 6kg', 42.00, 'https://images.unsplash.com/photo-1553279768-865429fa0078', (SELECT id FROM categories WHERE name='Frutas')),
('Limão Taiti', 'Saco 20kg', 35.00, 'https://images.unsplash.com/photo-1590502593747-42a996133562', (SELECT id FROM categories WHERE name='Frutas')),
('Morango Selecionado', '4 Bandejas de 250g', 30.00, 'https://images.unsplash.com/photo-1464965911861-746a04b4b0a6', (SELECT id FROM categories WHERE name='Frutas'));

-- Legumes
INSERT INTO products (name, description, price, image_url, category_id) VALUES
('Tomate Italiano', 'Caixa 22kg - Madu', 95.00, 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea', (SELECT id FROM categories WHERE name='Legumes')),
('Cebola Roxa', 'Saco 20kg', 75.00, 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb', (SELECT id FROM categories WHERE name='Legumes')),
('Pimentão Vermelho', 'Caixa 10kg', 80.00, 'https://images.unsplash.com/photo-1563565375-f3fdf5d2d3a9', (SELECT id FROM categories WHERE name='Legumes')),
('Abobrinha Italiana', 'Caixa 18kg', 60.00, 'https://images.unsplash.com/photo-1594248512704-54c330f8b444', (SELECT id FROM categories WHERE name='Legumes')),
('Berinjela', 'Caixa 12kg', 55.00, 'https://images.unsplash.com/photo-1615485925694-a03ca5f357aa', (SELECT id FROM categories WHERE name='Legumes')),
('Pepino Japonês', 'Caixa 15kg', 48.00, 'https://images.unsplash.com/photo-1449300079323-02e209d9d3a6', (SELECT id FROM categories WHERE name='Legumes')),
('Chuchu', 'Caixa 20kg', 40.00, 'https://images.unsplash.com/photo-1603048588665-791ca8aea616', (SELECT id FROM categories WHERE name='Legumes')),
('Couve Flor', 'Dúzia', 72.00, 'https://images.unsplash.com/photo-1568584711075-3d021a7c3ca3', (SELECT id FROM categories WHERE name='Legumes')),
('Brócolis Ninja', 'Caixa 10 Unidades', 65.00, 'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc', (SELECT id FROM categories WHERE name='Legumes')),
('Repolho Verde', 'Saco 25kg', 45.00, 'https://images.unsplash.com/photo-1628100863073-61ba4f759656', (SELECT id FROM categories WHERE name='Legumes'));

-- Raízes
INSERT INTO products (name, description, price, image_url, category_id) VALUES
('Batata Inglesa', 'Saco 50kg - Lavada', 180.00, 'https://images.unsplash.com/photo-1518977676601-b53f82aba655', (SELECT id FROM categories WHERE name='Raízes')),
('Batata Doce', 'Caixa 22kg', 65.00, 'https://images.unsplash.com/photo-1596097635121-14b63b7a0c19', (SELECT id FROM categories WHERE name='Raízes')),
('Cenoura', 'Caixa 20kg - AAA', 68.00, 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37', (SELECT id FROM categories WHERE name='Raízes')),
('Beterraba', 'Caixa 20kg', 60.00, 'https://images.unsplash.com/photo-1606756613098-90349479e0a0', (SELECT id FROM categories WHERE name='Raízes')),
('Mandioca', 'Caixa 25kg', 55.00, 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5', (SELECT id FROM categories WHERE name='Raízes')),
('Inhame', 'Caixa 15kg', 120.00, 'https://images.unsplash.com/photo-1623832049386-b4b081604a80', (SELECT id FROM categories WHERE name='Raízes')),
('Mandioquinha', 'Caixa 10kg', 140.00, 'https://images.unsplash.com/photo-1615485290331-507c39379659', (SELECT id FROM categories WHERE name='Raízes')),
('Gengibre', 'Caixa 5kg', 85.00, 'https://images.unsplash.com/photo-1629158739943-75b28292c68a', (SELECT id FROM categories WHERE name='Raízes')),
('Alho Roxo', 'Caixa 10kg', 250.00, 'https://images.unsplash.com/photo-1615486511484-92e172cc416d', (SELECT id FROM categories WHERE name='Raízes')),
('Cebola Branca', 'Saco 20kg', 78.00, 'https://images.unsplash.com/photo-1620574387735-3624d75b2dbc', (SELECT id FROM categories WHERE name='Raízes'));

-- Orgânicos
INSERT INTO products (name, description, price, image_url, category_id) VALUES
('Alface Americana Org', 'Caixa 12 Un', 48.00, 'https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1', (SELECT id FROM categories WHERE name='Orgânicos')),
('Rúcula Orgânica', 'Maço (Dúzia)', 36.00, 'https://images.unsplash.com/photo-1543364195-077a16c30ff3', (SELECT id FROM categories WHERE name='Orgânicos')),
('Tomate Cherry Org', 'Bandeja 12x180g', 96.00, 'https://images.unsplash.com/photo-1546487570-3d779a544f80', (SELECT id FROM categories WHERE name='Orgânicos')),
('Couve Manteiga Org', 'Maço (Dúzia)', 40.00, 'https://images.unsplash.com/photo-1628005612301-2099307c8441', (SELECT id FROM categories WHERE name='Orgânicos')),
('Espinafre Orgânico', 'Maço (Dúzia)', 42.00, 'https://images.unsplash.com/photo-1576045057995-568f588f82fb', (SELECT id FROM categories WHERE name='Orgânicos')),
('Banana Nanica Org', 'Caixa 18kg', 110.00, 'https://images.unsplash.com/photo-1618218169992-80d2a3e0f939', (SELECT id FROM categories WHERE name='Orgânicos')),
('Ovos Caipira Org', 'Caixa 30 Dúzias', 320.00, 'https://images.unsplash.com/photo-1569288052389-dac9b01c9c05', (SELECT id FROM categories WHERE name='Orgânicos')),
('Mel Orgânico', 'Pote 500g (Cx 12)', 240.00, 'https://images.unsplash.com/photo-1587049352846-4a222e784d38', (SELECT id FROM categories WHERE name='Orgânicos')),
('Agrião Orgânico', 'Maço (Dúzia)', 38.00, 'https://images.unsplash.com/photo-1628005612301-2099307c8441', (SELECT id FROM categories WHERE name='Orgânicos')),
('Hortelã Orgânica', 'Maço (Dúzia)', 35.00, 'https://images.unsplash.com/photo-1628005612301-2099307c8441', (SELECT id FROM categories WHERE name='Orgânicos'));
