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

## Agent Baselines
- These baselines are mandatory defaults for AI agents creating or evolving applications in this ecosystem.
- They extend existing repo rules in this file; if there is a conflict, repository-specific conventions above take precedence.

### Project Architecture and Folder Structure
- Keep user-facing routes in `app/[locale]/` and keep locale-specific concerns in locale layouts.
- Use route groups to separate major surfaces (for example marketing vs app/database) when complexity grows.
- Organize domain logic by feature slice; keep shared platform concerns in `lib/`, shared types in `types/`, and primitives in `components/ui/`.
- Keep server-only code and secrets in server contexts (`lib/supabase/server.ts`, `lib/supabase/admin.ts`, route handlers, server actions).
- Refactor incrementally by vertical slice instead of broad directory reshuffles.

### React Component Design (shadcn/ui-Aligned)
- Default to Server Components and add `"use client"` only for interactivity, browser APIs, or client state.
- Prefer composition with existing shadcn/ui primitives before adding new primitives; avoid large manual rewrites inside `components/ui/`.
- Keep components small and single-purpose (layout, data, presentation), with minimal and explicit props.
- Keep Server Component props serializable and avoid passing heavy nested objects to client boundaries.
- Favor declarative JSX and avoid effect-driven UI state when values can be derived during render.

### Reusability and Composability
- Build reusable feature units from small composable parts (`children`, slots, and focused subcomponents) instead of monolith components.
- Promote shared logic into custom hooks/utilities only after a second real use case.
- Avoid prop drilling across many levels; prefer local composition first, then narrowly scoped context when needed.
- Keep feature-specific logic colocated with the feature and extract to shared modules only when truly cross-feature.

### Type Safety and API Design
- Maintain strict TypeScript safety: avoid `any`, prefer explicit domain types, and use `import type` where applicable.
- Reuse canonical types from `types/models.ts` and `types/index.ts`; treat `types/database.ts` as generated.
- Validate untrusted input at boundaries (route handlers, server actions, external APIs) with schema-based validation.
- Return consistent API payloads with stable shapes (`ok`, `error`, and typed data/error fields).
- Prefer additive API evolution; avoid breaking response contracts without a migration path.

### Styling Conventions
- Use Tailwind CSS utilities and existing tokens from `app/globals.css` as the default styling system.
- Use `cn()` from `@/lib/utils` for conditional class merging.
- Keep styling mobile-first, responsive, and consistent with existing spacing/typography patterns.
- Avoid one-off inline styles unless values are truly dynamic and cannot be expressed with utilities/tokens.

### Accessibility
- Use semantic HTML first; use ARIA only when semantic elements are insufficient.
- Ensure full keyboard accessibility, visible focus states, and logical tab order for all interactive UI.
- Provide accessible names for controls and alt text for meaningful images.
- Maintain sufficient contrast and avoid relying on color alone to communicate state.

### Testing Expectations
- Minimum validation for all substantial changes: `pnpm check` and `pnpm build`; add `pnpm exec tsc --noEmit` for TS-sensitive work.
- When a test runner is available, add or update targeted tests for critical logic, regressions, and contract-sensitive behavior.
- Prefer focused tests near feature boundaries (data transforms, validators, route handlers, and critical UI behavior).
- For bug fixes, include regression coverage whenever practical.

### Performance Considerations
- Apply Vercel React best practices by priority: eliminate async waterfalls, optimize bundle size, then improve server/client rendering behavior.
- Start independent async work early and await late (`Promise.all`, deferred awaits, Suspense boundaries).
- Reduce client bundle cost with direct imports, conditional/dynamic loading for heavy components, and deferred non-critical third-party code.
- Minimize server-to-client serialization and fetch only required fields from data sources.
- Prevent unnecessary rerenders by deriving state in render, using stable dependencies, and memoizing only expensive work.

### Dependency Management
- Prefer existing dependencies and platform capabilities before introducing new packages.
- Add new dependencies only with clear justification (bundle impact, maintenance, and security considered).
- Keep package usage aligned with `pnpm`; do not introduce alternate lockfiles or package managers.
- Avoid large utility libraries when a small local utility or native API is sufficient.

### Code Quality and Maintainability
- Keep diffs small, reviewable, and scoped to the requested outcome.
- Preserve consistent naming conventions and file organization patterns already used in the repository.
- Remove dead code and avoid speculative abstractions.
- Handle errors explicitly and log recoverable failures with actionable context.

### Documentation Standards
- Update docs when behavior, architecture, or developer workflow changes.
- Keep i18n documentation and message keys synchronized across supported locales.
- Document new environment variables, setup steps, and operational caveats in repo docs.
- Write concise rationale in PR descriptions or change notes for non-obvious technical decisions.

### Safe Refactoring and Backwards Compatibility
- Protect existing public contracts (routes, API responses, shared component props) unless a change is explicitly intended.
- Prefer additive changes and deprecate in place before removal when consumers may depend on current behavior.
- Avoid renaming/moving key route segments without verifying locale routing and navigation behavior end-to-end.
- Validate refactors with quality gates and ensure no regression in i18n parity, build, and type safety.

## Pre-PR Checklist for Agents
- Code formatted and lint-clean (`pnpm check` or `pnpm lint` + `pnpm format`).
- Build succeeds (`pnpm build`).
- Type safety verified (`pnpm exec tsc --noEmit` when TS-sensitive changes are made).
- i18n keys synced in both `en.json` and `pt.json`.
- No secrets or env values committed.
- Changes respect the architecture and conventions in this file.
