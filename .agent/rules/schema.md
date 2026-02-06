# 🗄️ Database Schema (Verified v0.08)

Esquema atual do banco de dados (Public Schema), extraído via introspecção na v0.08.

## Tabela: `app_config`
Armazena configurações globais do aplicativo (ex: descontos).
*   `id` (uuid, PK)
*   `key` (text, Unique) - Chave da configuração (ex: 'tier_discounts')
*   `value` (jsonb) - Valor JSON
*   `created_at` (timestamp, Default: now())

## Tabela: `categories`
Categorias de produtos.
*   `id` (uuid, PK)
*   `name` (text) - Nome da categoria
*   `icon` (text) - Ícone representativo
*   `color` (text) - Cor hex
*   `created_at` (timestamp)

## Tabela: `products`
Catálogo de produtos.
*   `id` (uuid, PK)
*   `name` (text)
*   `description` (text)
*   `price` (numeric)
*   `unit` (text) - Unidade de medida (ex: 'kg', 'un')
*   `image_url` (text)
*   `category_id` (uuid, FK -> categories.id)
*   `stock_quantity` (integer)
*   `created_at` (timestamp)

## Tabela: `profiles`
Dados estendidos do usuário (após Auth).
*   `id` (uuid, PK, FK -> auth.users.id)
*   `company_name` (text) - Razão Social / Nome Fantasia
*   `cnpj` (text)
*   `phone` (text)
*   `tier` (text) - Nível de fidelidade ('bronze', 'silver', 'gold')
*   `created_at` (timestamp)

## Tabela: `user_addresses`
Endereços de entrega dos usuários.
*   `id` (uuid, PK)
*   `user_id` (uuid, FK -> auth.users.id)
*   `zip_code` (text)
*   `street` (text)
*   `number` (text)
*   `district` (text)
*   `city` (text)
*   `state` (text)
*   `is_main` (boolean) - Define se é a "Sede"
*   `created_at` (timestamp)

## Tabela: `orders`
Pedidos realizados.
*   `id` (uuid, PK)
*   `user_id` (uuid, FK -> auth.users.id)
*   `status` (enum) - 'pending', 'approved', 'preparing', 'shipped', 'delivered', 'rejected', 'cancelled'
*   `payment_method` (enum) - 'pix', 'boleto'
*   `subtotal` (numeric)
*   `discount` (numeric)
*   `total` (numeric)
*   `address_id` (uuid, FK -> user_addresses.id)
*   `created_at` (timestamp)

## Tabela: `order_items`
Itens dentro de um pedido (Snapshot).
*   `id` (uuid, PK)
*   `order_id` (uuid, FK -> orders.id)
*   `product_id` (uuid, FK -> products.id)
*   `quantity` (integer)
*   `unit_price` (numeric) - Preço unitário no momento da compra
*   `total_price` (numeric) - Total da linha
*   `created_at` (timestamp)

---
*Gerado automaticamente em 2026-02-06. Mantenha atualizado.*
