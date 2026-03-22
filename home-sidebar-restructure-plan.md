# Home + Sidebar Restructure Plan

## Step 1 - Move sidebar layout to the route group

- Create `app/[locale]/(database)/layout.tsx` using the current sidebar shell.
- Remove `app/[locale]/(database)/database/layout.tsx` to prevent duplicate sidebars.

## Step 2 - Replace landing page with new Home route

- Add `app/[locale]/(database)/page.tsx` as the new Home page.
- Remove `app/[locale]/(marketing)/page.tsx` to avoid route conflict at `/`.

## Step 3 - Add sidebar sections and limit options

- Update `components/layout/sidebar.tsx` to render grouped sections.
- Section **Home**: `Home` -> `/`.
- Section **Database**: `Classes`, `Items`, `Monsters` -> `/database/classes`, `/database/items`, `/database/monsters`.
- Adjust active state so Home is active only on exact `/`.

## Step 4 - Update constants for grouped sidebar data

- Update `lib/constants.ts` to support grouped sidebar sections.
- Replace flat sidebar data structure with section-based structure.

## Step 5 - Sync translations in both locales

- Update `i18n/messages/en.json` with new sidebar section labels and `sidebar.home`.
- Update `i18n/messages/pt.json` with matching keys.

## Step 6 - Validate changes

- Run `pnpm check`.
- Run `pnpm build`.

## Notes

- Keep `app/[locale]/(marketing)/download/page.tsx` so `/download` still works.
- Landing components can stay temporarily and be removed in a follow-up cleanup.
