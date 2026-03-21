# AGENTS.md

## Purpose
- This file guides coding agents working in this repository.
- Follow repo-specific commands, architecture, and style conventions.
- Prefer minimal, targeted edits that match existing patterns.

## Source Rules Included
- No Cursor rules were found in `.cursorrules` or `.cursor/rules/`.

## Project Snapshot
- Stack: Next.js 16, React 19, TypeScript, next-intl, Supabase, shadcn/ui, Tailwind CSS v4.
- Package manager: pnpm (`pnpm-lock.yaml` present).
- App router with locale segment under `app/[locale]/`.
- Middleware entrypoint is `proxy.ts` (Next 16 style), not `middleware.ts`.

## Repository Layout
- `app/`: routes, layouts, route handlers.
- `app/[locale]/`: all user-facing localized pages.
- `app/[locale]/database/`: data sections with shared sidebar layout.
- `components/layout/`: header/footer/sidebar/switchers.
- `components/landing/`: homepage-only sections.
- `components/ui/`: shadcn/ui primitives.
- `i18n/`: locale routing/navigation wrappers and messages.
- `lib/supabase/`: browser/server/admin Supabase clients + session middleware.
- `lib/constants.ts`: site constants, locales, database section metadata.
- `types/`: DB and domain types.

## Build, Lint, Format, Test Commands

### Install
- `pnpm install`

### Run App
- `pnpm dev` - start local dev server.
- `pnpm build` - production build (also catches many type/runtime route issues).
- `pnpm start` - run production server after build.

### Lint and Format (Biome only)
- `pnpm lint` - run Biome checks (`biome check .`).
- `pnpm format` - write formatting changes (`biome format --write .`).
- `pnpm check` - check + apply safe fixes (`biome check --write .`).

### Targeted File Checks
- `pnpm exec biome check app/[locale]/page.tsx`
- `pnpm exec biome format --write components/layout/header.tsx`

### Type Checking
- No dedicated `typecheck` script exists.
- Use `pnpm exec tsc --noEmit` for explicit TS verification.

### Tests (Current State)
- There is currently no test runner configured in `package.json`.
- There are no `*.test.*` / `*.spec.*` files in this repo today.
- There is no single-test command available yet.
- For validation, run: `pnpm lint` and `pnpm build` (and `pnpm exec tsc --noEmit` when needed).

### Single Test Guidance (When Tests Are Added)
- Add a `test` script first, then document single-test usage here.
- Typical single-file patterns (depends on chosen framework):
- `pnpm test -- path/to/file.test.ts`
- `pnpm test -- -t "test name"`

## Required Architecture Conventions

### Routing and Layouts
- Keep user-facing routes under `app/[locale]/`.
- Keep root `app/layout.tsx` focused on global metadata/fonts/shell concerns.
- Keep locale concerns in `app/[locale]/layout.tsx`.
- Keep DB section pages under `app/[locale]/database/*`.

### i18n Rules
- Use `Link`, `useRouter`, `usePathname` from `@/i18n/navigation`.
- Do not import `next/link` or `next/navigation` directly for locale-aware navigation.
- Keep supported locales centralized in `lib/constants.ts` and `i18n/routing.ts`.
- Update both `i18n/messages/en.json` and `i18n/messages/pt.json` together.
- Keep translation keys stable and grouped by namespace (`nav`, `sidebar`, `database`, etc.).

### Supabase Rules
- Use `lib/supabase/client.ts` only in Client Components.
- Use `lib/supabase/server.ts` in Server Components and Route Handlers.
- Use `lib/supabase/admin.ts` only on server for admin operations.
- Never expose `SUPABASE_SERVICE_ROLE_KEY` to client-side code.
- Session refresh runs via `updateSession` in `lib/supabase/middleware.ts`, orchestrated from `proxy.ts`.

## Code Style and Formatting

### Formatter/Linter Source of Truth
- Biome is the only formatter/linter.
- Do not introduce ESLint/Prettier config.
- Respect `biome.json` settings:
- `indentStyle: space`
- `indentWidth: 2`
- `lineWidth: 100`
- `quoteStyle: double`
- `semicolons: always`
- organize imports enabled via Biome assist.

### Imports
- Prefer `import type` for type-only imports.
- Keep import groups consistent: external packages -> `@/` aliases -> relative imports.
- Prefer project alias paths (`@/...`) over deep relative traversal.
- Let Biome organize/sort imports; do not hand-sort against formatter output.

### TypeScript
- TS strict mode is enabled; keep code strict-safe.
- Avoid `any`; prefer explicit interfaces/types or inferred narrow types.
- Reuse domain aliases from `types/models.ts` and exports from `types/index.ts`.
- Treat `types/database.ts` as generated/schema-driven; regenerate via Supabase tooling when needed.
- Type route params explicitly (this codebase commonly uses `params: Promise<{ ... }>` in pages/layouts).

### Naming Conventions
- Components: PascalCase (`Header`, `ThemeSwitcher`).
- Component file names: kebab-case (`theme-switcher.tsx`).
- Route module names: Next.js conventions (`page.tsx`, `layout.tsx`, `route.ts`).
- Constants: UPPER_SNAKE_CASE (`SITE_NAME`, `LOCALES`).
- DB/domain type aliases: PascalCase (`GameClass`, `Monster`, `Boss`).
- Insert/update aliases use suffixes (`GameClassInsert`, `GameClassUpdate`).

### React and Next.js Patterns
- Default to Server Components; add `"use client"` only when required.
- Keep client-only logic (state/effects/browser APIs) in client components.
- Use `notFound()` for invalid locale/slug-style route states.
- Keep layout composition simple and declarative.
- Prefer small, composable sections over monolithic page components.

### Tailwind and UI
- Use existing design tokens and utility classes from `app/globals.css`.
- Use `cn()` from `@/lib/utils` for class merging.
- Prefer existing shadcn/ui primitives before creating custom primitives.
- `components/ui/` is generated/shadcn-owned; avoid large manual rewrites there.

## Error Handling and Logging
- Fail fast for missing required env vars (throw descriptive `Error`).
- Return structured JSON from route handlers for expected failures.
- Prefer explicit `ok` and `error` fields for API-like responses.
- Log warnings for recoverable background failures (example: keep-alive route).
- Do not swallow errors silently; if catching, document why it is safe.

## Environment and Secrets
- Required env vars (see `.env.example`):
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- Optional fallback currently supported in code: `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`.
- Never commit real secrets in tracked files.

## Agent Working Agreements
- Keep diffs focused; avoid opportunistic refactors unless requested.
- Do not rename/move route segments without checking locale routing impact.
- When adding UI text, update both locale message files in the same change.
- When adding DB-backed features, use the correct Supabase client for runtime context.
- Before finishing substantial changes, run `pnpm check` and `pnpm build`.

## Pre-PR Checklist for Agents
- Code formatted and lint-clean (`pnpm check` or `pnpm lint` + `pnpm format`).
- Build succeeds (`pnpm build`).
- Type safety verified (`pnpm exec tsc --noEmit` when TS-sensitive changes are made).
- i18n keys synced in both `en.json` and `pt.json`.
- No secrets or env values committed.
- Changes respect the architecture and conventions in this file.
