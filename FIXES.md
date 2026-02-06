# 🛠️ Logs de Correções Futuras (FIXES)

Este documento centraliza débitos técnicos e violações de regras identificados, para correção futura.

## 1. Violações de Estilo
*   **Arquivo**: `src/pages/Home.jsx`
*   **Problema**: Inline styles (`style={{ paddingBottom... }}`).
*   **Correção**: Mover para `Home.module.css`.

## 2. Design System
*   **Arquivo**: `src/components/ProductCard.module.css`
*   **Problema**: Sombra hardcoded (`0 4px 6px...`).
*   **Correção**: Usar `var(--shadow-lg)`.

---
*Gerado em v0.07. Adicione novos itens livremente.*
