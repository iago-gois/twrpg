# Frontend Refactor Action Plan (Next.js + Supabase)

## Current State (from repo)
### Folder Structure
```
C:\Users\iago\Documents\twrpg
├─ app
│  ├─ [locale]
│  ├─ globals.css
│  └─ layout.tsx
├─ components
│  ├─ landing
│  │  ├─ hero-section.tsx
│  │  ├─ news-section.tsx
│  │  └─ quick-links.tsx
│  ├─ layout
│  │  ├─ footer.tsx
│  │  ├─ header.tsx
│  │  ├─ locale-switcher.tsx
│  │  ├─ sidebar.tsx
│  │  └─ theme-switcher.tsx
│  └─ ui
│     ├─ badge.tsx
│     ├─ button.tsx
│     ├─ card.tsx
│     ├─ dialog.tsx
│     ├─ discord-icon.tsx
│     ├─ dropdown-menu.tsx
│     ├─ input.tsx
│     ├─ select.tsx
│     ├─ sheet.tsx
│     ├─ table.tsx
│     └─ tabs.tsx
├─ i18n
│  ├─ messages
│  │  ├─ en.json
│  │  └─ pt.json
│  ├─ navigation.ts
│  ├─ request.ts
│  └─ routing.ts
├─ lib
│  ├─ supabase
│  │  ├─ admin.ts
│  │  ├─ client.ts
│  │  ├─ config.ts
│  │  ├─ middleware.ts
│  │  └─ server.ts
│  ├─ constants.ts
│  └─ utils.ts
├─ public
│  ├─ file.svg
│  ├─ globe.svg
│  ├─ hero-bg.png
│  ├─ next.svg
│  ├─ twrpg_icon_white.png
│  ├─ vercel.svg
│  └─ window.svg
├─ types
│  ├─ database.ts
│  ├─ index.ts
│  └─ models.ts
├─ proxy.ts
├─ next.config.ts
├─ package.json
├─ tsconfig.json
└─ biome.json
```

### Current Biome Config
Source: `C:\Users\iago\Documents\twrpg\biome.json`

Status: already aligned with strict settings used in this repo.

```json
{
	"$schema": "https://biomejs.dev/schemas/2.4.4/schema.json",
	"vcs": {
		"enabled": true,
		"clientKind": "git",
		"useIgnoreFile": true
	},
	"files": {
		"ignoreUnknown": false
	},
	"formatter": {
		"enabled": true,
		"indentStyle": "space",
		"indentWidth": 2,
		"lineWidth": 100
	},
	"linter": {
		"enabled": true,
		"rules": {
			"recommended": true,
			"nursery": {
				"recommended": true
			}
		}
	},
	"javascript": {
		"formatter": {
			"quoteStyle": "double",
			"semicolons": "always"
		}
	},
	"css": {
		"parser": {
			"tailwindDirectives": true
		}
	},
	"assist": {
		"enabled": true,
		"actions": {
			"source": {
				"organizeImports": "on"
			}
		}
	}
}
```

---

## Action Plan & Checklist

## 1) React/Next Best Practices (Component Design, Hooks, Render Optimization)
### Component Design
- [x] Split components by responsibility: presentation vs data vs layout.
- [ ] Keep component props minimal and serializable for Server Components.
- [x] Move static JSX outside components to avoid re-creation on each render.
- [ ] Prefer composition over prop drilling in layout/section components.

### Hooks & State
- [ ] Remove derived state in effects; derive in render where possible.
- [x] Use functional `setState` for state based on previous values.
- [x] Avoid subscribing to state used only in callbacks; read inside handlers.
- [ ] Use `useMemo` or `useCallback` only for expensive work or stable deps.
- [ ] Hoist non-primitive default props to module scope for stable references.

### Render & Re-render Optimization (Vercel Best Practices)
- [ ] Start independent async work early and `await` late (`async-parallel`, `async-defer-await`).
- [ ] Parallelize server fetching across components (`server-parallel-fetching`).
- [ ] Reduce data serialized into Client Components (`server-serialization`).
- [ ] Use `next/dynamic` for heavy or conditional components (`bundle-dynamic-imports`).
- [ ] Avoid barrel imports for leaf components (`bundle-barrel-imports`).

---

## 2) Project Architecture (Scalable Structure)
### Proposed Structure
```
C:\Users\iago\Documents\twrpg
├─ app
│  ├─ [locale]
│  │  ├─ (marketing)
│  │  ├─ (database)
│  │  └─ layout.tsx
│  ├─ api
│  ├─ globals.css
│  └─ layout.tsx
├─ components
│  ├─ ui
│  ├─ layout
│  ├─ sections
│  └─ providers
├─ features
│  ├─ auth
│  ├─ news
│  └─ profile
├─ lib
│  ├─ supabase
│  ├─ hooks
│  ├─ utils
│  └─ validators
├─ types
├─ styles
└─ public
```

### Checklist
- [x] Use route groups inside `app/[locale]/` to isolate layouts and loading boundaries.
- [x] Keep feature-specific components in `features/` to avoid a bloated `components/`.
- [ ] Keep domain hooks and logic colocated in `features/*`; reserve `lib/hooks` for truly shared hooks.
- [ ] Keep Supabase clients and query helpers in `lib/supabase`.
- [ ] Define shared Zod schemas or validators in `lib/validators`.
- [x] Refactor incrementally by vertical slice (one feature at a time), not by mass file moves.

---

## 3) Biome Configuration (Strict, Modern)
### Current Status
`biome.json` already matches the strict configuration and does not need a refactor-first pass.

### Reference `biome.json` Snippet
```json
{
	"$schema": "https://biomejs.dev/schemas/2.4.4/schema.json",
	"vcs": {
		"enabled": true,
		"clientKind": "git",
		"useIgnoreFile": true
	},
	"files": {
		"ignoreUnknown": false
	},
	"formatter": {
		"enabled": true,
		"indentStyle": "space",
		"indentWidth": 2,
		"lineWidth": 100
	},
	"linter": {
		"enabled": true,
		"rules": {
			"recommended": true,
			"nursery": {
				"recommended": true
			}
		}
	},
	"javascript": {
		"formatter": {
			"quoteStyle": "double",
			"semicolons": "always"
		}
	},
	"css": {
		"parser": {
			"tailwindDirectives": true
		}
	},
	"assist": {
		"enabled": true,
		"actions": {
			"source": {
				"organizeImports": "on"
			}
		}
	}
}
```

### Checklist
- [x] Use 2-space indentation for consistency across JS/TS/CSS.
- [x] Enable `nursery` recommended rules to catch early issues.
- [x] Set `lineWidth` to reduce diffs and improve readability.
- [x] Keep import organization on save.
- [x] Add per-phase validation gate: `pnpm check` and `pnpm build`.

---

## 4) Data Fetching (Supabase Best Practices)
### Server-Side First
- [ ] Fetch data in Server Components or Route Handlers when possible.
- [ ] Keep service-role keys in server-only files; never expose to client.
- [ ] Centralize Supabase clients in `lib/supabase` with clear server/client entry points.
- [ ] Use React `cache()` for per-request deduplication of Supabase queries.
- [ ] Avoid cross-user caching for authenticated queries; scope caching by request/session.

### Efficient Queries
- [ ] Always `select` only needed columns.
- [ ] Use pagination with `range()` or `limit()` for large datasets.
- [ ] Prefer `rpc()` for complex server-side operations.
- [ ] Batch independent requests with `Promise.all()`.

### Client Fetching
- [ ] Introduce SWR or TanStack Query only where client-side cache/revalidation is truly needed.
- [ ] Avoid cascading client fetch waterfalls; prefetch in parent where possible.
- [ ] Add suspense boundaries for streaming and smoother UX.

---

## 5) Quality Gates and Metrics
### Baseline Before Refactor
- [ ] Capture baseline metrics (LCP/INP, initial JS size, key route response times).
- [ ] Identify top 2-3 slowest routes/components with measurable evidence.

### Phase 1 Metrics Template (fill before coding)
| Metric | Route/Scope | How to Measure | Baseline | Target/Threshold |
| --- | --- | --- | --- | --- |
| LCP (mobile) | `/en` | Lighthouse (mobile), median of 3 runs |  | <= 2.5s |
| LCP (mobile) | `/en/database/monsters` | Lighthouse (mobile), median of 3 runs |  | <= 2.5s |
| INP (mobile) | `/en` and one database list route | Lighthouse/Web Vitals |  | <= 200ms |
| CLS | `/en` and one detail route (e.g. `/en/database/monsters/[slug]`) | Lighthouse/Web Vitals |  | <= 0.10 |
| First Load JS | Home + key database route | `pnpm build` output (`First Load JS`) |  | No regression, or >= 10% reduction |
| Server response time (TTFB) | `/en/database/monsters` and one detail route | browser Network panel or repeated `curl` |  | <= 800ms p75 (local/prod-like env) |
| Supabase query latency | top 2 slow queries | server timing/logs |  | >= 20% reduction |

### Measurement Workflow (repeat every phase)
- [ ] Run production build locally (`pnpm build`) and collect `First Load JS` values for key routes.
- [ ] Run the app in production mode (`pnpm start`) before Lighthouse checks.
- [ ] Record Lighthouse results for mobile and desktop (3 runs per route, keep median).
- [ ] Track at least these routes: `/en`, `/en/database/monsters`, and one representative detail page.
- [ ] Save results in `scripts/perf-baseline.md` (preferred) or a dated section in this document.

### Success Criteria for the Refactor
- [ ] No Core Web Vitals regressions on tracked routes.
- [ ] At least one meaningful improvement in each category: rendering, data-fetching, and bundle size.
- [ ] If a metric regresses, document why and create a follow-up task before merge.

### Per-Phase Definition of Done
- [ ] Lint/format gate passes: `pnpm check`.
- [ ] Build gate passes: `pnpm build`.
- [ ] Type gate passes on TS-heavy phases: `pnpm exec tsc --noEmit`.
- [ ] i18n parity maintained when UI text changes (`i18n/messages/en.json` and `i18n/messages/pt.json`).
- [ ] No architecture regressions (locale-aware navigation remains in `@/i18n/navigation`).

---

## Implementation Order (Suggested)
1. [ ] Establish baseline metrics and quality gates.
2. [ ] Refactor data fetching to server-first patterns and safer caching.
3. [ ] Apply rendering optimizations and async parallelization.
4. [ ] Perform incremental architecture refactors by feature slice.
5. [ ] Run final verification and compare metrics against baseline.
