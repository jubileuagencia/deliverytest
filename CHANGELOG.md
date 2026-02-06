# 📜 Changelog

Todos as alterações notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
e este projeto adere ao [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [v0.08] - 2026-02-06
### 🚀 Added (Funcionalidades)

#### 🛍️ Checkout & Pedidos
*   **Fluxo de Checkout Completo**: Implementado wizard de 4 passos (`CheckoutPage`):
    *   1. Seleção/Criação de Endereço (`StepAddress`).
    *   2. Pagamento (Pix/Boleto) (`StepPayment`).
    *   3. Revisão de Valores e Itens (`StepReview`).
    *   4. Sucesso com Mock de QR Code (`StepSuccess`).
*   **Histórico de Pedidos (`/pedidos`)**:
    *   Nova página listando compras anteriores.
    *   **OrderCard**: Componente visual com status colorido (ex: "Em Separação", "Entregue").
    *   Integração com Menu Inferior (Novo ícone "Pedidos").
*   **Detalhes do Pedido (`/pedido/:id`)**: Página dedicada com lista de itens, endereço de entrega e resumo financeiro.

#### 🗄️ Backend & Dados
*   **Novas Tabelas**: `orders`, `order_items`, `user_addresses`.
*   **Novos Status**: Enum `order_status` expandido com `preparing`, `shipped`, `delivered`.
*   **Otimização**: Implementada função `clearCartDB` para limpar carrinho com 1 única query (redução de N+1).

### 🐛 Fixed
*   **Redirect Loop**: Correção na lógica de "Carrinho Vazio" que impedia visualizar a tela de sucesso.
*   **Inline Styles**: Remoção de estilos hardcoded em `StepSuccess` (QR Code).

### ⭐ Documentation & Process
*   **Log de Correções (`FIXES.md`)**: Documento criado na raiz para centralizar débitos técnicos.
*   **Regras de Git e Segurança**: Incorporação oficial do Workflow de Git em `developmentguidelines.md`.

---

## [v0.07] - 2026-02-06
### ⭐ Added (Governança)
*   **Regras do Projeto (`.agent/rules/`)**: Oficialização dos arquivos de `bestpractices`, `designsystem`, `developmentguidelines` e `projectconcept` no controle de versão.
*   **Workflow de Git (`git_workflow.md`)**: Definição do processo obrigatório de backup (branch de versão) antes de deploys na main.
*   **Log de Débitos (`fixes.md`)**: Arquivo para registrar violações não-bloqueantes para correção futura.
*   **Auditoria de Conformidade (`compliance_audit.md`)**: Relatório inicial de adesão às novas regras.

### 🔧 Fixed
*   **Security Patch**: Remoção do arquivo `run_migration.cjs` do rastreamento do Git (continha token exposto).
*   Correção do `.gitignore` para permitir o versionamento da pasta `.agent/rules`.

---
## [v0.06] - Anterior
*   Versão estável anterior (Snapshot).
