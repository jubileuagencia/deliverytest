# 🗺️ Roadmap Status vs Codebase (Snapshot)

Este documento cruza as tarefas do Notion com a realidade do código atual (`src/`).

### 📊 Resumo Executivo
*   **Total Notion**: 91 Tarefas
*   **Implementado (Aparentemente)**: ~30% (Estrutura visual e páginas básicas)
*   **Em Progresso/Parcial**: ~20% (Carrinho, Auth, Lógica de Preço)
*   **Pendente**: ~50% (Admin, Pagamentos, Regras de Negócio Refinadas)

---

## ✅ Implementado / Estruturado (Codebase Confirma)

As seguintes funcionalidades possuem arquivos correspondentes e estrutura básica:

*   **Páginas Principais**: `Home`, `LoginPage`, `RegisterPage`, `CartPage`, `SearchPage`, `CategoryPage`, `ProductPage`.
*   **Componentes UI**: `Header`, `ProductCard`, `ProductDetailsModal`, `CartNotification`.
*   **Funcionalidades Básicas**:
    *   [x] Listar produtos (`Home.jsx`, `FeaturedProducts.jsx`)
    *   [x] Adicionar ao carrinho (`services/cart/`) e `App.jsx`
    *   [x] Busca no header (`Header.jsx`, `SearchPage.jsx`)
    *   [x] Grids de produtos responsivos (CSS Modules presentes)
    *   [x] Click em produto vai para detalhe (`ProductDetailsModal` e rota `/produto/:id`)

## ⚠️ Em Desenvolvimento / Parcial (Requer Atenção)

Funcionalidades que existem no código mas precisam de refinamento ou conexão com backend:

*   **Autenticação**: `AuthContext` existe, mas `LoginPage`/`RegisterPage` precisam ser validados contra o Supabase RLS.
*   **Carrinho**: Lógica existe (`useCart` parcial no `App.jsx`), mas a **persistência** e **sincronização** precisam de revisão (falado no `SYSTEM_ANALYSIS.md`).
*   **Gestão de Preços (Tier)**:
    *   O código atual **NÃO** parece ter a lógica de preços Bronze/Prata/Ouro implementada nos componentes de exibição (`ProductCard`).
    *   *Status Notion*: "Login como Ouro → ver preço 1.08x maior" (Ainda não visto no código).

## ❌ Pendente / Não Encontrado (To-Do Real)

Tarefas do Notion que não encontrei evidência clara no código:

*   **Área Administrativa (Admin)**: Não vi pasta `src/pages/admin` ou rotas de admin claras.
    *   *Notion*: "Fase 10 a 12 (Admin - Clientes/Produtos/Pedidos)"
*   **Checkout & Pagamentos**:
    *   *Notion*: "Boleto: código de barras copiável", "PIX: QR code gerado".
    *   Não há integração de gateway de pagamento visível.
*   **Histórico de Pedidos**: Página `/pedidos` não encontrada em `src/pages`.

## 🗑️ Descartado / Não Faz Sentido
*(Espaço reservado para tarefas do Notion que decidirmos ignorar)*

---

## 🎯 Próximos Passos Sugeridos
1.  **Validar Preços por Tier:** Implementar a lógica visual de preços riscados e variação por cliente (já que definimos isso nas regras).
2.  **Criar Admin:** Iniciar a estrutura das páginas administrativas.
3.  **Refinar Carrinho:** Mover lógica do `App.jsx` para um hook mais robusto.
