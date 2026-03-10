# TWRPG Database — Copilot Instructions

## Project Overview
Fan-made database website for **The World RPG** (a Warcraft III custom map). Stack: **Next.js 16 · React 19 · Supabase · shadcn/ui · Tailwind CSS v4 · next-intl**.

## Developer Commands
```bash
pnpm dev        # start dev server
pnpm build      # production build
pnpm lint       # Biome lint check
pnpm format     # Biome format (write)
pnpm check      # Biome lint + format (write) — use before committing
```
**No ESLint or Prettier.** Formatting is handled exclusively by [Biome](biome.json): tabs for indentation, double quotes for JS/TS strings.

## Route Architecture
All user-facing pages live under `app/[locale]/`. The root layout at [app/layout.tsx](app/layout.tsx) only sets fonts and metadata; the locale layout at [app/[locale]/layout.tsx](app/[locale]/layout.tsx) wraps `NextIntlClientProvider`, Header, and Footer.

| Segment | Layout | Purpose |
|---|---|---|
| `[locale]/` | Header + Footer | Landing page |
| `[locale]/database/` | Header + Footer + [Sidebar](components/layout/sidebar.tsx) | All game data sections |
| `[locale]/download/` | Header + Footer | Map download |
| `[locale]/admin/` | Auth-gated (planned) | CRUD admin panel |

Database sections: `classes`, `builds`, `items`, `recipes`, `skills`, `monsters`, `bosses`, `dungeons`, `npcs`, `quests`, `guides`. All share the DB layout defined in [app/[locale]/database/layout.tsx](app/[locale]/database/layout.tsx). `bosses` has its own route for UX clarity but shares the `monsters` table using a `type = "boss"` discriminator.

## Supabase Client Usage
Three distinct clients — **never mix them up**:
- [lib/supabase/client.ts](lib/supabase/client.ts) — `createBrowserClient`; for Client Components only
- [lib/supabase/server.ts](lib/supabase/server.ts) — `createServerClient` with `cookies()`; for Server Components and Route Handlers
- [lib/supabase/admin.ts](lib/supabase/admin.ts) — service role key; server-only, bypass RLS for admin ops

Auth is Supabase Auth + Row Level Security. The middleware at [middleware.ts](middleware.ts) chains Supabase session refresh **then** next-intl locale routing, merging cookies from both responses.

## i18n Pattern
- Always use `Link` and `useRouter` from `@/i18n/navigation`, **not** `next/link` or `next/navigation` directly — these wrappers inject the active locale automatically.
- Translations live in [i18n/messages/en.json](i18n/messages/en.json) and [i18n/messages/pt.json](i18n/messages/pt.json). **Both files must be updated together** when adding new strings.
- In Server Components: `import { useTranslations } from "next-intl"` (works server-side with App Router).
- Locale config and supported locales (`en`, `pt`) are co-located in [lib/constants.ts](lib/constants.ts) and imported by [i18n/routing.ts](i18n/routing.ts).

## TypeScript Types
- [types/database.ts](types/database.ts) — auto-generated Supabase types; do not edit manually (regenerate via Supabase CLI).
- [types/models.ts](types/models.ts) — convenience aliases (`GameClass`, `Item`, `Monster`, etc.) and Insert/Update variants. `Boss = Monster & { type: "boss" }`.
- [types/index.ts](types/index.ts) — re-exports.

## Component Conventions
- `components/ui/` — shadcn/ui generated components; do not hand-edit.
- `components/layout/` — Header, Footer, Sidebar, LocaleSwitcher, ThemeSwitcher.
- `components/landing/` — homepage-only sections (HeroSection, NewsSection, QuickLinks).
- Site-wide constants (site name, Discord URL, database section list) are in [lib/constants.ts](lib/constants.ts).
- `cn()` helper from [lib/utils.ts](lib/utils.ts) (clsx + tailwind-merge).

## Environment Variables
Required in `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY   # server-only, never expose to client
```
