# 📋 Tarefas Futuras — Levee Lojista

---

## 1. Atualização de Catálogo em Tempo Real (Admin → Lojistas)

**Objetivo:** Ao atualizar/adicionar produtos no painel admin, notificar todos os lojistas conectados para recarregar o catálogo.

### Opções Analisadas

| | Realtime na tabela `products` | Broadcast Channel ⭐ |
|:---|:---|:---|
| **Como funciona** | Supabase escuta INSERT/UPDATE na tabela `products` e dispara evento automaticamente | Admin clica um botão "Publicar Catálogo" que envia sinal broadcast |
| **Automático** | ✅ Sim | ❌ Precisa de botão |
| **Controle** | ❌ Cada edit = 1 evento | ✅ Admin decide quando |
| **Edição em lote** | ❌ 50 edits = 50 reloads nos clientes | ✅ 1 click = 1 reload |
| **Custo Supabase** | Mais mensagens | Menos mensagens |

### Decisão: Broadcast Channel (Opção 2) ⭐

**Razão:** No cenário de hortifruti, o admin atualiza preços de vários produtos de uma vez (cotação do dia). O Broadcast permite editar tudo e publicar com **um clique**, evitando que os lojistas vejam a lista "piscando" durante a edição.

### Implementação (Resumo)
1. **Admin:** Adicionar botão "🔄 Publicar Catálogo" no painel
2. **Admin:** Ao clicar, enviar `supabase.channel('catalog-updates').send({ type: 'broadcast', event: 'catalog_updated' })`
3. **Frontend:** Escutar o canal e recarregar produtos ao receber evento
4. **UX:** Toast sutil tipo "Catálogo atualizado" para o lojista

**Status:** `[ ] Pendente` — será implementado após as fases de auditoria.
