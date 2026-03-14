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
├─ middleware.ts
├─ next.config.ts
├─ package.json
├─ tsconfig.json
└─ biome.json
```

### Current Biome Config
Source: `C:\Users\iago\Documents\twrpg\biome.json`
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
		"indentStyle": "tab"
	},
	"linter": {
		"enabled": true,
		"rules": {
			"recommended": true
		}
	},
	"javascript": {
		"formatter": {
			"quoteStyle": "double"
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
- [ ] Split components by responsibility: presentation vs data vs layout.
- [ ] Keep component props minimal and serializable for Server Components.
- [ ] Move static JSX outside components to avoid re-creation on each render.
- [ ] Prefer composition over prop drilling in layout/section components.

### Hooks & State
- [ ] Remove derived state in effects; derive in render where possible.
- [ ] Use functional `setState` for state based on previous values.
- [ ] Avoid subscribing to state used only in callbacks; read inside handlers.
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
│  ├─ (marketing)
│  ├─ (dashboard)
│  ├─ api
│  ├─ [locale]
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
- [ ] Use route groups in `app` to isolate layouts and loading boundaries.
- [ ] Keep feature-specific components in `features/` to avoid a bloated `components/`.
- [ ] Centralize hooks in `lib/hooks` and domain logic in `features/*/`.
- [ ] Keep Supabase clients and query helpers in `lib/supabase`.
- [ ] Define shared Zod schemas or validators in `lib/validators`.

---

## 3) Biome Configuration (Strict, Modern)
### Recommended `biome.json` Snippet
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
- [ ] Switch to 2-space indentation for consistency across JS/TS/CSS.
- [ ] Enable `nursery` recommended rules to catch early issues.
- [ ] Set `lineWidth` to reduce diffs and improve readability.
- [ ] Keep import organization on save.

---

## 4) Data Fetching (Supabase Best Practices)
### Server-Side First
- [ ] Fetch data in Server Components or Route Handlers when possible.
- [ ] Keep service-role keys in server-only files; never expose to client.
- [ ] Centralize Supabase clients in `lib/supabase` with clear server/client entry points.
- [ ] Use React `cache()` for per-request deduplication of Supabase queries.

### Efficient Queries
- [ ] Always `select` only needed columns.
- [ ] Use pagination with `range()` or `limit()` for large datasets.
- [ ] Prefer `rpc()` for complex server-side operations.
- [ ] Batch independent requests with `Promise.all()`.

### Client Fetching
- [ ] Use SWR or React Query for client dedupe and revalidation.
- [ ] Avoid cascading client fetch waterfalls; prefetch in parent where possible.
- [ ] Add suspense boundaries for streaming and smoother UX.

---

## Implementation Order (Suggested)
1. [ ] Normalize architecture and move feature logic into `features/`.
2. [ ] Refactor data fetching to server-first patterns.
3. [ ] Apply rendering optimizations and async parallelization.
4. [ ] Enforce Biome strict rules and fix lint/format issues.
5. [ ] Add performance checks (bundle analysis, render profiling).
