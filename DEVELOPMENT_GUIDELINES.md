---
trigger: always_on
---

# Antigravity Development Guidelines & Architecture Rules

Essas diretrizes definem o padrão **OBRIGATÓRIO** de desenvolvimento do projeto. Devem ser seguidas rigorosamente para manter a escalabilidade.

## 1. Arquitetura de Componentes

### 📂 Estrutura de Pastas
Organize por **Domínio/Funcionalidade**, nunca por tipo técnico.
- `src/components/common/`: UI Kits genéricos (Botões, Inputs, Modais).
- `src/components/[feature]/`: Componentes de negócio (ex: `auth/`, `home/`, `cart/`).
- `src/components/layout/`: Blocos estruturais (Sidebar, Navbar, Footers).
- `src/pages/`: Controladores de rota. **Não devem conter CSS complexo nem lógica de renderização "crua".**

### 🧠 Responsabilidade (Separation of Concerns)
- **Service Layer (`src/services/`)**: **OBRIGATÓRIO** para qualquer comunicação externa (API, Supabase, LocalStorage).
    - 🚫 *Proibido:* Chamar `supabase.from('...').select()` dentro de um componente.
    - ✅ *Correto:* Chamar `ProductService.getAll()` dentro de um `useEffect`.
- **Pages**: Gerenciam Estado Global da tela e busca de dados (Data Fetching).
- **Components**: Recebem dados via `props` e exibem UI. Devem ser "burros" (Stateless) preferencialmente.

## 2. Estilização (CSS Modules)

### 🎨 Regra de Ouro do CSS
🚫 **PROIBIDO:** Inline styles (`style={{ margin: 10 }}`) para layout estático.
✅ **OBRIGATÓRIO:** CSS Modules (`styles.container`).

1.  Arquivos devem ser nomeados como `[Componente].module.css`.
2.  Importe os estilos como objeto: `import styles from './Componente.module.css'`.
3.  Aplique usando `className={styles.nomeDaClasse}`.
4.  Evite seletores aninhados profundos. Prefira classes diretas no elemento.

## 3. Protocolo de Alterações e Manutenção (IMPORTANTE) ⚠️

Ao receber um pedido de alteração em uma página ou componente existente:

1.  **Localize o Componente Alvo**: Não edite a lógica na `Page` se o problema é visual. Vá até o arquivo do componente específico (ex: `src/components/ProductCard.jsx`).
2.  **Edição Visual = Edição de CSS Module**:
    - Se o pedido é "Mude a cor do botão", **NUNCA** adicione um `style={{ backgroundColor: ... }}` no JSX.
    - ✅ **Correto**: Abra o arquivo `.module.css` correspondente (ex: `ProductCard.module.css`) e altere a classe lá.
3.  **Preservação da Estrutura**: Mantenha a separação. Se precisar adicionar uma nova div, adicione também sua classe no CSS Module. Não quebre o padrão por "preguiça" ou "pressa".

## 4. Gerenciamento de Estado

- **Local (useState)**: Apenas para UI efêmera (ex: abrir/fechar modal).
- **Context (useContext)**: Apenas para dados globais (Auth, Carrinho).
- **Server State**: Prefira recarregar dados do servidor a gerenciar caches manuais complexos.

## 5. Assets e Recursos

- **Nomes**: `PascalCase` para componentes, `camelCase` para hooks/utils.
- **Imagens**: Importar de `src/assets/`. Não usar caminhos mágicos (strings soltas).

## 6. Workflow de Versionamento e Deploy (GIT) 🚀

**Repositório:** `https://github.com/jubileuagencia/deliverytest`
**Estratégia:** Snapshot Branching (Incremental +0.01).

### 📜 Ciclo de Release (Snapshot Protocol)

Este protocolo define exatamente como o código sai do ambiente de desenvolvimento (`dev`) para a `main`.

1.  **Congelamento de Versão (Snapshot)**:
    *   Antes de qualquer push para a `main`, você deve preservar o estado ATUAL dela em um branch de backup.
    *   ✅ **AÇÃO**: Se a `main` hoje está na versão `v0.02`, crie um branch chamado `v0.02` a partir dela.
    *   *Significado:* "O branch `v0.02` contém exatamente o código que rodou como v0.02".

2.  **Atualização da Main (Release)**:
    *   A versão em desenvolvimento (ex: `v0.03`) sobrescreve a `main`.
    *   ✅ **AÇÃO**: O `package.json` deve ser incrementado manualmente (`0.0.2` -> `0.0.3`).
    *   🚫 **PROIBIDO**: Sobrescrever a `main` sem antes garantir que a versão anterior tem seu próprio branch de backup.

### Exemplo do Estado Final no GitHub:
*   `refs/heads/v0.01`: Código legado da versão 0.01.
*   `refs/heads/v0.02`: Código legado da versão 0.02.
*   `refs/heads/main`: Código da versão atual (v0.03).

---

## 7. Padrões de Design (Design System) 🎨

O projeto possui regras visuais estritas (Cores, Tipografia, Estilo Clean).
� **CONSULTE O ARQUIVO:** [`DESIGN_SYSTEM.md`](./DESIGN_SYSTEM.md)
**OBS:** As regras visuais definidas lá são tão obrigatórias quanto as regras de código deste documento.

## 8. Checklist para Alterações ✅

Antes de confirmar uma tarefa:
1.  [ ] A alteração visual foi feita no arquivo `.module.css` e não inline?
2.  [ ] A lógica de dados permanece isolada em `src/services`?
3.  [ ] O componente continua independente e reutilizável?
4.  [ ] Nada foi quebrado no Mobile ou Desktop?

---

## 9. Ambiente de Desenvolvimento (VPS) ☁️

O desenvolvimento ocorre centralizado em um servidor **VPS Linux** rodando como usuário `root`.

### ⚠️ Regras do Ambiente Remoto
1.  **Execução Centralizada**:
    *   Toda edição e execução de comandos (`npm`, `git`) acontece no servidor remoto.
    *   ✅ **Zero Sudo**: Como já somos `root`, comandos `sudo` são desnecessários e proibidos.
    *   ✅ **Escopo**: Mantenha arquivos restritos a `/root/dev-antigravity`.

2.  **Filosofia "Hot-Server"**:
    *   O ambiente é "vivo". Alterações refletem imediatamente via HMR (Vite).
    *   **CUIDADO**: Se você quebrar o build, quebra o acesso de quem estiver testando a URL de dev.
    *   Sempre rode o linter/build antes de "avisar" que terminou uma feature.

    *   Lembre-se: O servidor não é sua máquina local. Arquivos temporários fora do repositório podem ser perdidos se o container/vps reiniciar. Confie no Git.

## 10. Automação e Scripts (Python/Supabase) 🐍

Para atualizações em massa no banco de dados (ex: ajustar preços, corrigir imagens, migrações de dados):

1.  **Use Scripts Python**:
    *   Crie scripts na pasta `scripts/`.
    *   Utilize a `SERVICE_ROLE_KEY` para operações administrativas (bypassing RLS).
    *   **NUNCA** faça updates manuais arriscados diretamente no painel do Supabase se puder scriptar e validar antes.

2.  **Ignorar no Git**:
    *   A pasta `scripts/` deve estar no `.gitignore` para evitar poluir o repositório com scripts de uso único ou rascunhos.
    *   Se um script for útil para o time (ex: `seed_database.py`), ele deve ser explicitamente adicionado (`git add -f`) ou movido para uma pasta de ferramentas versionada.