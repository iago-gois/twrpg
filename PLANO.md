# TWRPG Database — Plano de Ação

> Website de banco de dados para o jogo TWRPG
> Stack: Next.js 16 · Supabase · shadcn/ui · Tailwind CSS v4 · next-intl (EN/PT)

---

## Visão Geral

- **Usuários públicos:** somente leitura
- **Admin:** único administrador que gerencia conteúdo via painel CRUD interno e cria contas
- **Rotas:** páginas de dados agrupadas em `/database/`, admin em `/admin/`, i18n via `[locale]`
- **Componentes:** shadcn/ui como base, componentes reutilizáveis para tabelas, filtros e formulários

---

## Progresso Atual

- [x] Supabase instalado (`@supabase/supabase-js`, `@supabase/ssr`)
- [x] next-intl instalado
- [x] shadcn/ui inicializado (`components.json`, `globals.css` atualizado, `lib/utils.ts` criado)
- [ ] Componentes shadcn ainda não adicionados

---

## Estrutura de Pastas Final

```
twrpg/
├── app/
│   ├── globals.css
│   ├── layout.tsx                          # root layout: <html>, <body>, fonts
│   │
│   ├── [locale]/
│   │   ├── layout.tsx                      # NextIntlClientProvider, Header, Footer
│   │   ├── page.tsx                        # Home — news, patch notes
│   │   │
│   │   ├── database/
│   │   │   ├── layout.tsx                  # layout da seção (sidebar)
│   │   │   ├── classes/
│   │   │   │   ├── page.tsx               # lista de classes
│   │   │   │   └── [slug]/page.tsx        # detalhe da classe
│   │   │   ├── builds/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [id]/page.tsx
│   │   │   ├── items/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [slug]/page.tsx
│   │   │   ├── recipes/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [slug]/page.tsx
│   │   │   ├── skills/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [slug]/page.tsx
│   │   │   ├── monsters/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [slug]/page.tsx
│   │   │   ├── bosses/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [slug]/page.tsx
│   │   │   ├── dungeons/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [slug]/page.tsx
│   │   │   ├── npcs/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [slug]/page.tsx
│   │   │   ├── quests/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [slug]/page.tsx
│   │   │   └── guides/
│   │   │       ├── page.tsx
│   │   │       └── [slug]/page.tsx
│   │   │
│   │   ├── download/
│   │   │   └── page.tsx                    # download do mapa (.w3x)
│   │   │
│   │   └── admin/
│   │       ├── layout.tsx                  # guard de autenticação
│   │       ├── page.tsx                    # dashboard admin
│   │       ├── login/page.tsx              # login do admin
│   │       ├── users/page.tsx              # gerenciar contas
│   │       ├── classes/
│   │       │   ├── page.tsx               # lista CRUD
│   │       │   ├── new/page.tsx           # criar
│   │       │   └── [id]/edit/page.tsx     # editar
│   │       ├── items/...                   # mesmo padrão
│   │       ├── recipes/...
│   │       ├── skills/...
│   │       ├── monsters/...
│   │       ├── bosses/...
│   │       ├── dungeons/...
│   │       ├── npcs/...
│   │       ├── quests/...
│   │       ├── guides/...
│   │       └── builds/...
│   │
│   └── api/
│       └── auth/
│           └── callback/route.ts           # callback do Supabase Auth
│
├── components/
│   ├── ui/                                 # shadcn/ui (gerado automaticamente)
│   ├── layout/
│   │   ├── header.tsx
│   │   ├── footer.tsx
│   │   ├── sidebar.tsx
│   │   └── locale-switcher.tsx
│   ├── database/
│   │   ├── data-table.tsx
│   │   ├── search-bar.tsx
│   │   ├── filter-panel.tsx
│   │   └── pagination.tsx
│   ├── admin/
│   │   ├── resource-form.tsx
│   │   ├── resource-table.tsx
│   │   └── image-upload.tsx
│   └── common/
│       ├── loading.tsx
│       ├── empty-state.tsx
│       └── error-boundary.tsx
│
├── lib/
│   ├── supabase/
│   │   ├── client.ts                       # createBrowserClient
│   │   ├── server.ts                       # createServerClient
│   │   ├── admin.ts                        # service-role client
│   │   └── middleware.ts                   # refresh de sessão
│   ├── utils.ts                            # cn() helper (já criado)
│   └── constants.ts                        # constantes do site
│
├── i18n/
│   ├── request.ts                          # getRequestConfig
│   ├── routing.ts                          # defineRouting
│   ├── navigation.ts                       # createNavigation
│   └── messages/
│       ├── en.json
│       └── pt.json
│
├── types/
│   ├── database.ts                         # tipos gerados do Supabase
│   ├── models.ts                           # interfaces do app
│   └── index.ts
│
├── hooks/
│   ├── use-supabase.ts
│   ├── use-search.ts
│   └── use-pagination.ts
│
├── middleware.ts                            # i18n + Supabase session
│
└── public/
    ├── images/
    │   ├── classes/
    │   ├── items/
    │   ├── monsters/
    │   └── bosses/
    └── maps/                               # arquivos .w3x
```

---

## Etapa 1 — Fundação do Projeto

**Objetivo:** instalar dependências e inicializar ferramentas.

| #   | Tarefa                       | Comando / Arquivo                                                                                   | Status |
| --- | ---------------------------- | --------------------------------------------------------------------------------------------------- | ------ |
| 1   | Instalar Supabase            | `pnpm add @supabase/supabase-js @supabase/ssr`                                                      | ✅     |
| 2   | Instalar next-intl           | `pnpm add next-intl`                                                                                | ✅     |
| 3   | Inicializar shadcn/ui        | `pnpm dlx shadcn@latest init`                                                                       | ✅     |
| 4   | Adicionar componentes shadcn | `pnpm dlx shadcn@latest add button input table card dialog dropdown-menu sheet badge tabs select`   | ⬜     |
| 5   | Criar `.env.local`           | variáveis: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` | ⬜     |
| 6   | Criar `lib/constants.ts`     | Nome do site, locales, links padrão                                                                 | ⬜     |

**Verificação:**

- [ ] `pnpm dev` roda sem erros
- [ ] Pasta `components/ui/` existe com componentes gerados

---

## Etapa 2 — Configuração do Supabase

**Objetivo:** criar os clientes Supabase (browser, server, admin) e tipos base.

| #   | Tarefa            | Arquivo                                                                                                                    |
| --- | ----------------- | -------------------------------------------------------------------------------------------------------------------------- |
| 1   | Cliente browser   | `lib/supabase/client.ts` — `createBrowserClient()`                                                                         |
| 2   | Cliente server    | `lib/supabase/server.ts` — `createServerClient()` com cookies                                                              |
| 3   | Cliente admin     | `lib/supabase/admin.ts` — service-role para criar contas                                                                   |
| 4   | Helper middleware | `lib/supabase/middleware.ts` — refresh de sessão                                                                           |
| 5   | Tipos do banco    | `types/database.ts` — placeholder (gerar depois com `npx supabase gen types`)                                              |
| 6   | Interfaces do app | `types/models.ts` — `GameClass`, `Item`, `Recipe`, `Skill`, `Monster`, `Boss`, `Dungeon`, `NPC`, `Quest`, `Guide`, `Build` |
| 7   | Re-exports        | `types/index.ts`                                                                                                           |

**Verificação:**

- [ ] `pnpm build` passa sem erros
- [ ] Imports dos clientes resolvem corretamente

---

## Etapa 3 — Internacionalização (i18n)

**Objetivo:** adicionar roteamento multi-idioma com `[locale]` (EN/PT).

| #   | Tarefa            | Arquivo                                                              |
| --- | ----------------- | -------------------------------------------------------------------- |
| 1   | Definir routing   | `i18n/routing.ts` — locales: `['en', 'pt']`, default: `'en'`         |
| 2   | Request config    | `i18n/request.ts` — carregar mensagens por locale                    |
| 3   | Navigation tipada | `i18n/navigation.ts` — `Link`, `redirect`, `usePathname`             |
| 4   | Mensagens EN      | `i18n/messages/en.json` — keys: `nav.*`, `home.*`, `common.*`        |
| 5   | Mensagens PT      | `i18n/messages/pt.json` — mesmas keys em português                   |
| 6   | Middleware        | `middleware.ts` — combinar next-intl + Supabase session refresh      |
| 7   | Root layout       | `app/layout.tsx` — manter apenas `<html>`, `<body>`, fontes          |
| 8   | Locale layout     | `app/[locale]/layout.tsx` — `NextIntlClientProvider`, Header, Footer |
| 9   | Home page         | `app/[locale]/page.tsx` — mover conteúdo                             |
| 10  | Header            | `components/layout/header.tsx` — nav com links placeholder           |
| 11  | Footer            | `components/layout/footer.tsx`                                       |
| 12  | Seletor de idioma | `components/layout/locale-switcher.tsx` — toggle EN/PT               |

**Verificação:**

- [ ] Acessar `localhost:3000` → redireciona para `/en`
- [ ] Acessar `/pt` → mostra textos em português
- [ ] Seletor de idioma alterna entre EN/PT

---

## Etapa 4 — Estrutura de Páginas Públicas (Shells)

**Objetivo:** criar todas as rotas públicas como shells mínimos (título + "em breve").

| #   | Tarefa          | Arquivos                                                     |
| --- | --------------- | ------------------------------------------------------------ |
| 1   | Layout database | `app/[locale]/database/layout.tsx` — layout com sidebar      |
| 2   | Sidebar         | `components/layout/sidebar.tsx` — links para todas as seções |
| 3   | Classes         | `database/classes/page.tsx` + `[slug]/page.tsx`              |
| 4   | Builds          | `database/builds/page.tsx` + `[id]/page.tsx`                 |
| 5   | Items           | `database/items/page.tsx` + `[slug]/page.tsx`                |
| 6   | Recipes         | `database/recipes/page.tsx` + `[slug]/page.tsx`              |
| 7   | Skills          | `database/skills/page.tsx` + `[slug]/page.tsx`               |
| 8   | Monsters        | `database/monsters/page.tsx` + `[slug]/page.tsx`             |
| 9   | Bosses          | `database/bosses/page.tsx` + `[slug]/page.tsx`               |
| 10  | Dungeons        | `database/dungeons/page.tsx` + `[slug]/page.tsx`             |
| 11  | NPCs            | `database/npcs/page.tsx` + `[slug]/page.tsx`                 |
| 12  | Quests          | `database/quests/page.tsx` + `[slug]/page.tsx`               |
| 13  | Guides          | `database/guides/page.tsx` + `[slug]/page.tsx`               |
| 14  | Download        | `app/[locale]/download/page.tsx`                             |

**Verificação:**

- [ ] Todos os links da sidebar navegam para a página correta
- [ ] `pnpm build` mostra todas as rotas geradas
- [ ] Nenhum 404

---

## Etapa 5 — Autenticação & Shell do Admin

**Objetivo:** implementar login do admin e proteger a área administrativa.

| #   | Tarefa             | Arquivo                                                             |
| --- | ------------------ | ------------------------------------------------------------------- |
| 1   | Auth callback      | `app/api/auth/callback/route.ts`                                    |
| 2   | Admin layout       | `app/[locale]/admin/layout.tsx` — verifica sessão + role admin      |
| 3   | Dashboard          | `app/[locale]/admin/page.tsx` — visão geral com links               |
| 4   | Login              | `app/[locale]/admin/login/page.tsx` — formulário email/senha        |
| 5   | Gerenciar usuários | `app/[locale]/admin/users/page.tsx` — criar contas via service-role |
| 6   | Hook Supabase      | `hooks/use-supabase.ts` — hook tipado do cliente browser            |

**Verificação:**

- [ ] Acessar `/en/admin` → redireciona para `/en/admin/login`
- [ ] Login com credenciais admin → vê dashboard
- [ ] Usuários não-admin são rejeitados

---

## Etapa 6 — Páginas CRUD do Admin

**Objetivo:** construir as páginas de gerenciamento de conteúdo para cada recurso.

| #   | Tarefa              | Arquivo                                                           |
| --- | ------------------- | ----------------------------------------------------------------- |
| 1   | Formulário genérico | `components/admin/resource-form.tsx`                              |
| 2   | Tabela admin        | `components/admin/resource-table.tsx` — ações de editar/excluir   |
| 3   | Upload de imagem    | `components/admin/image-upload.tsx` — Supabase Storage            |
| 4   | CRUD Classes        | `admin/classes/page.tsx`, `new/page.tsx`, `[id]/edit/page.tsx`    |
| 5   | CRUD Items          | `admin/items/...` (mesmo padrão)                                  |
| 6   | CRUD Recipes        | `admin/recipes/...`                                               |
| 7   | CRUD Skills         | `admin/skills/...`                                                |
| 8   | CRUD Monsters       | `admin/monsters/...`                                              |
| 9   | CRUD Bosses         | `admin/bosses/...`                                                |
| 10  | CRUD Dungeons       | `admin/dungeons/...`                                              |
| 11  | CRUD NPCs           | `admin/npcs/...`                                                  |
| 12  | CRUD Quests         | `admin/quests/...`                                                |
| 13  | CRUD Guides         | `admin/guides/...`                                                |
| 14  | CRUD Builds         | `admin/builds/...`                                                |
| 15  | Policies RLS        | Supabase: `SELECT` para `anon`, `INSERT/UPDATE/DELETE` para admin |

**Verificação:**

- [ ] Criar item via `/en/admin/items/new` → aparece na lista
- [ ] Editar item → dados atualizados
- [ ] Excluir item → removido da lista
- [ ] RLS bloqueia escrita anônima

---

## Etapa 7 — Páginas Públicas com Dados Reais

**Objetivo:** substituir os shells por páginas com dados reais do Supabase.

| #   | Tarefa              | Arquivo                                                           |
| --- | ------------------- | ----------------------------------------------------------------- |
| 1   | Tabela de dados     | `components/database/data-table.tsx` — ordenável e filtrável      |
| 2   | Barra de busca      | `components/database/search-bar.tsx` — debounced, URL params      |
| 3   | Painel de filtros   | `components/database/filter-panel.tsx`                            |
| 4   | Paginação           | `components/database/pagination.tsx`                              |
| 5   | Loading             | `components/common/loading.tsx` — skeleton loader                 |
| 6   | Estado vazio        | `components/common/empty-state.tsx`                               |
| 7   | Error boundary      | `components/common/error-boundary.tsx`                            |
| 8   | Hooks               | `hooks/use-search.ts`, `hooks/use-pagination.ts`                  |
| 9   | Implementar páginas | Cada página pública busca dados do Supabase via server components |
| 10  | Páginas de detalhe  | Dados relacionados (ex: item mostra quais monstros dropam)        |
| 11  | Página de download  | Lista versões do mapa com links de download                       |
| 12  | Home page           | Feed de notícias, adições recentes, links rápidos                 |

**Verificação:**

- [ ] `/en/database/items` → mostra itens com busca e filtros
- [ ] Clicar em item → página de detalhe com dados relacionados
- [ ] Paginação funciona
- [ ] `/pt/database/items` → labels em português

---

## Grafo de Dependências

```
Etapa 1 (pacotes)
  └→ Etapa 2 (clientes Supabase)
       └→ Etapa 3 (i18n + layout)
            ├→ Etapa 4 (shells públicos)     ← podem ser paralelos
            └→ Etapa 5 (auth + admin shell)  ←
                 └→ Etapa 6 (admin CRUD)
                      └→ Etapa 7 (páginas públicas com dados)
```

---

## Decisões Tomadas

| Decisão             | Escolha                      | Motivo                                                                |
| ------------------- | ---------------------------- | --------------------------------------------------------------------- |
| Roteamento de dados | `/database/*` agrupado       | Separação limpa entre info e dados do jogo                            |
| Bosses vs Monsters  | Rotas separadas              | Navegação mais clara, mesmo que compartilhem tabela com coluna `type` |
| CRUD admin          | Rotas explícitas por recurso | Type-safety e customização por recurso                                |
| i18n                | `next-intl`                  | Melhor suporte ao App Router, funciona em server components           |
| Auth                | Supabase Auth + RLS          | Role admin via `profiles.role` ou `user_metadata`                     |
| UI                  | shadcn/ui                    | Componentes acessíveis, customizáveis com Tailwind                    |
