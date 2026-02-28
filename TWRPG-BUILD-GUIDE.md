# TWRPG Landing Page - Build Instructions & Style Guide

## Table of Contents

1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [Color System](#color-system)
4. [Typography](#typography)
5. [Design Tokens (CSS Variables)](#design-tokens)
6. [Layout Architecture](#layout-architecture)
7. [Component Breakdown](#component-breakdown)
8. [Image Assets](#image-assets)
9. [Responsive Design Rules](#responsive-design-rules)
10. [Interaction & Animation Patterns](#interaction--animation-patterns)
11. [Build Steps (From Scratch)](#build-steps-from-scratch)

---

## Project Overview

TWRPG (The Warcraft RPG) is a dark-fantasy gaming landing page for a custom Warcraft 3 RPG map. The design evokes a medieval-fantasy atmosphere with a deep navy/charcoal background, warm gold/amber accents, and crimson call-to-action elements. The aesthetic is inspired by Warcraft 3 Reforged UI and professional esports/gaming sites.

**Key Design Principles:**

- Dark, immersive atmosphere
- High contrast between background and foreground elements
- Gold/amber for primary brand elements and highlights
- Crimson red for urgency/action CTAs
- Clean typography with a fantasy serif for headings

---

## Tech Stack

| Tool              | Version / Notes                    |
| ----------------- | ---------------------------------- |
| Framework         | Next.js 16 (App Router)            |
| Styling           | Tailwind CSS v4                    |
| Font Loading      | `next/font/google`                 |
| Icons             | `lucide-react`                     |
| Image Handling    | `next/image`                       |
| Component Library | shadcn/ui (available but optional) |
| Package Manager   | pnpm                               |

---

## Color System

The site uses exactly 5 core colors. All colors are defined as CSS custom properties and mapped to Tailwind design tokens.

### Core Palette

| Role           | Hex Value | Tailwind Token          | Usage                                  |
| -------------- | --------- | ----------------------- | -------------------------------------- |
| Background     | `#1a1a2e` | `bg-background`         | Page background, deep navy             |
| Card / Surface | `#16213e` | `bg-card`               | Elevated surfaces, cards, footer       |
| Primary        | `#f4a261` | `text-primary`          | Gold/amber highlights, headings, links |
| Accent         | `#e9c46a` | `text-accent`           | Lighter gold, secondary highlights     |
| Destructive    | `#e63946` | `bg-destructive`        | Crimson, main CTAs, download buttons   |
| Foreground     | `#f1faee` | `text-foreground`       | Off-white, body text, headings         |
| Muted FG       | `#8a94a6` | `text-muted-foreground` | Secondary text, descriptions           |
| Secondary      | `#1f2b47` | `bg-secondary`          | Slightly lighter navy, hover states    |
| Border         | `#2a3a5c` | `border-border`         | Subtle borders between sections        |

### Color Usage Rules

- **Never** use raw color values in components. Always reference design tokens: `bg-background`, `text-primary`, `border-border`, etc.
- **Primary (gold)** is used for: hero name text, section labels, link hover states, stat values, icon containers, progress bars, navigation highlights.
- **Destructive (crimson)** is used for: "Download Now" / "Download Map" buttons, and any high-urgency CTA. Always pair with `text-destructive-foreground` for button text.
- **Accent (lighter gold)** is used sparingly for: hero role labels, secondary link hover states.
- **Card** surfaces sit one level above the background and always use `border-border` for their outline.

---

## Typography

Two font families are used. Both are loaded via `next/font/google` in `layout.tsx`.

### Font Stack

| Font       | Tailwind Class | CSS Variable   | Usage                                             |
| ---------- | -------------- | -------------- | ------------------------------------------------- |
| **Cinzel** | `font-serif`   | `--font-serif` | Headings, hero names, section titles, stats, logo |
| **Inter**  | `font-sans`    | `--font-sans`  | Body text, navigation, descriptions, labels       |

### Font Loading (layout.tsx)

```tsx
import { Cinzel, Inter } from 'next/font/google'

const cinzel = Cinzel({ subsets: ["latin"], variable: "--font-serif" });
const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

// Applied on <body>:
<body className={`${cinzel.variable} ${inter.variable} font-sans antialiased`}>
```

### Typography Scale

| Element              | Classes                                                               |
| -------------------- | --------------------------------------------------------------------- |
| Page title (H1)      | `font-serif text-5xl sm:text-6xl lg:text-8xl font-bold tracking-wide` |
| Section heading (H2) | `font-serif text-3xl sm:text-4xl lg:text-5xl font-bold`               |
| Card title (H3)      | `font-serif text-lg font-bold` or `text-2xl lg:text-3xl`              |
| Section label        | `text-sm font-semibold uppercase tracking-widest text-primary`        |
| Body text            | `text-base leading-relaxed text-muted-foreground` (Inter)             |
| Small / meta text    | `text-xs text-muted-foreground`                                       |
| Stat numbers         | `font-serif text-2xl sm:text-3xl font-bold text-primary`              |

### Typography Rules

- All headings use `font-serif` (Cinzel) for the fantasy aesthetic.
- All body text and UI text uses `font-sans` (Inter) for readability.
- Use `text-balance` on hero titles and `text-pretty` on descriptions for clean line breaks.
- Use `leading-relaxed` (line-height ~1.625) for all body/paragraph text.
- Section labels follow the pattern: `text-sm font-semibold uppercase tracking-widest text-primary`.

---

## Design Tokens

All tokens are defined in `app/globals.css` under `:root` and mapped via Tailwind's `@theme inline` block.

```css
:root {
    --background: #1a1a2e;
    --foreground: #f1faee;
    --card: #16213e;
    --card-foreground: #f1faee;
    --primary: #f4a261;
    --primary-foreground: #1a1a2e;
    --secondary: #1f2b47;
    --secondary-foreground: #f1faee;
    --muted: #1f2b47;
    --muted-foreground: #8a94a6;
    --accent: #e9c46a;
    --accent-foreground: #1a1a2e;
    --destructive: #e63946;
    --destructive-foreground: #f1faee;
    --border: #2a3a5c;
    --input: #2a3a5c;
    --ring: #f4a261;
    --radius: 0.5rem;
}
```

The `@theme inline` block in globals.css maps these to Tailwind's `--color-*` variables so classes like `bg-background`, `text-primary`, `border-border` work automatically.

---

## Layout Architecture

### Page Structure

```
<main>
  <Navbar />          -- Fixed top navigation
  <HeroSection />     -- Full-screen hero with background image
  <HeroSpotlight />   -- Interactive hero carousel (2-column grid)
  <NewsSection />     -- 3-column news cards grid
  <QuickLinks />      -- 3-column quick access links grid
  <Footer />          -- 4-column footer with brand + link groups
</main>
```

### Layout Rules

- **Max content width:** `max-w-7xl` (80rem / 1280px) with `px-4 lg:px-8` horizontal padding.
- **Section vertical spacing:** `py-20 lg:py-28` for consistent section rhythm.
- **Section dividers:** `border-t border-border` between major sections (News, Quick Links, Footer).
- **Grid system:** CSS Grid for multi-column layouts (`grid-cols-2`, `grid-cols-3`, `grid-cols-4`).
- **Flexbox:** Used for inline layouts (nav items, badges, button groups, footer bottom bar).
- **Gap-based spacing:** Use `gap-*` classes, never `space-*` or mixed margin/padding with gap.

---

## Component Breakdown

### 1. Navbar (`components/navbar.tsx`)

**Type:** Client component (`"use client"`)

**Structure:**

- Fixed position, full-width, with backdrop blur: `fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md`
- Flexbox row: Logo (left) | Nav Links (center, desktop only) | CTA + Mobile Toggle (right)
- Mobile menu: Collapsible column below navbar, toggled with hamburger/X icon

**Key Elements:**

- Logo: SVG icon in a `border border-primary/40 bg-primary/10` container + "TWRPG" in `font-serif text-primary`
- Nav links array: `{ label, href }` objects rendered as `Link` components
- Download CTA: `bg-destructive` rounded button, hidden on smallest screens (`hidden sm:inline-block`)
- Mobile menu: Conditional render with `border-t border-border/50 bg-background/95 backdrop-blur-md`

**Icons used:** `Menu`, `X` from lucide-react

---

### 2. HeroSection (`components/hero-section.tsx`)

**Type:** Server component (no state)

**Structure:**

- Full-screen section: `min-h-screen` with `pt-16` to account for fixed navbar
- Background: `next/image` fill with two overlay divs:
    - `bg-background/70` (darkening overlay)
    - `bg-gradient-to-t from-background via-background/30 to-transparent` (bottom fade)
- Content centered with `text-center`

**Key Elements:**

- **Server status badge:** Inline-flex pill with green pulse dot + player count
- **Title:** Cinzel serif, responsive sizing, "RPG" word highlighted in `text-primary`
- **Description:** `max-w-2xl mx-auto` paragraph in `text-muted-foreground`
- **Dual CTA buttons:** "Download Map" (destructive bg + shadow) | "Browse Heroes" (outlined primary)
- **Stats row:** 3-column grid with `font-serif text-primary` values and `text-muted-foreground` labels

**Icons used:** `Download`, `ChevronRight` from lucide-react

---

### 3. HeroSpotlight (`components/hero-spotlight.tsx`)

**Type:** Client component (`"use client"`) - manages `activeIndex` state

**Data Structure (per hero):**

```ts
{
  name: string
  role: string
  description: string
  image: string        // path to JPG
  icon: LucideIcon     // Shield, Zap, or Swords
  stats: { strength: number, agility: number, intellect: number }
}
```

**Structure:**

- Section header: Label + Cinzel heading, centered
- 2-column grid (`lg:grid-cols-2 lg:gap-16`):
    - **Left:** Hero portrait image in `aspect-[4/5]` rounded container with bottom gradient overlay, navigation arrows (bottom-left), and counter badge (bottom-right)
    - **Right:** Hero info panel with icon badge, name/role, description, stat bars in a card, and dot selector

**Stat Bars:**

- Container: `rounded-xl border border-border bg-card p-5`
- Each bar: label (20% width) + flexbox bar (`bg-secondary` track, `bg-primary` fill at `width: ${value}%`) + numeric value
- Animated with `transition-all duration-700`

**Dot Navigation:**

- Active: `w-8 bg-primary`, Inactive: `w-2 bg-border`

---

### 4. NewsSection (`components/news-section.tsx`)

**Type:** Server component

**Data Structure (per news item):**

```ts
{ title: string, excerpt: string, date: string, tag: string, image: string }
```

**Structure:**

- Section header: Flexbox row with label+heading (left) and "View all news" link (right)
- 3-column grid of article cards

**Card Pattern:**

- Outer: `rounded-xl border border-border bg-card hover:border-primary/40`
- Image: `aspect-[16/9]` with `group-hover:scale-105` zoom effect
- Tag badge: Absolutely positioned top-left, `bg-primary/90 text-primary-foreground`
- Content: date with clock icon, Cinzel title, description, "Read more" link

**Icons used:** `Clock`, `ArrowRight` from lucide-react

---

### 5. QuickLinks (`components/quick-links.tsx`)

**Type:** Server component

**Data Structure (per link):**

```ts
{ icon: LucideIcon, title: string, description: string, href: string, accent: boolean }
```

**Structure:**

- Centered section header
- 3-column grid of link cards (`sm:grid-cols-2 lg:grid-cols-3`)

**Card Variants:**

- **Default:** `border-border bg-card hover:border-primary/40 hover:bg-secondary`
- **Accent (Download):** `border-destructive/40 bg-destructive/10 hover:border-destructive`

Each card is a flexbox row: icon container (48x48) + text (title + description).

**Icons used:** `Download`, `BookOpen`, `Trophy`, `Users`, `Map`, `MessageCircle` from lucide-react

---

### 6. Footer (`components/footer.tsx`)

**Type:** Server component

**Structure:**

- Full-width `bg-card` with `border-t border-border`
- 4-column grid: Brand column + 3 link columns (Game, Community, Support)
- Brand column: Logo + description + social icon buttons
- Bottom bar: `border-t border-border pt-8` with copyright and credit text

**Social Icons:** Letter-based (`D`, `Y`, `T`) in `h-9 w-9` bordered squares.

---

## Image Assets

All images live in `/public/images/` and are JPG format.

| File                 | Usage                      | Dimensions / Aspect             |
| -------------------- | -------------------------- | ------------------------------- |
| `hero-bg.jpg`        | Hero section background    | Full-screen, `object-cover`     |
| `hero-paladin.jpg`   | Hero spotlight - Paladin   | `aspect-[4/5]`, `object-cover`  |
| `hero-mage.jpg`      | Hero spotlight - Archmage  | `aspect-[4/5]`, `object-cover`  |
| `hero-ranger.jpg`    | Hero spotlight - Ranger    | `aspect-[4/5]`, `object-cover`  |
| `hero-berserker.jpg` | Hero spotlight - Berserker | `aspect-[4/5]`, `object-cover`  |
| `news-update.jpg`    | News card thumbnail        | `aspect-[16/9]`, `object-cover` |

**Image Rules:**

- Always use `next/image` with `fill` and `className="object-cover"` for background/cover images.
- Hero background uses `priority` for LCP optimization.
- All images have meaningful `alt` text for accessibility.

---

## Responsive Design Rules

The site is mobile-first. Breakpoints follow Tailwind defaults:

| Breakpoint | Width   | Key Changes                                                    |
| ---------- | ------- | -------------------------------------------------------------- |
| Default    | < 640px | Single column, stacked layouts, mobile nav                     |
| `sm:`      | 640px+  | 2-column grids, larger heading text, CTA visible               |
| `md:`      | 768px+  | Desktop navigation visible, 2-col news grid                    |
| `lg:`      | 1024px+ | 3-4 column grids, larger section padding, 2-col hero spotlight |

**Specific Responsive Patterns:**

- **Navbar:** Mobile hamburger menu below `md:`, desktop inline nav at `md:` and above.
- **Hero title:** `text-5xl` -> `sm:text-6xl` -> `lg:text-8xl`
- **CTA buttons:** Stacked column on mobile (`flex-col`), inline row at `sm:` (`sm:flex-row`).
- **Stats row:** Always 3-column grid, values scale `text-2xl` -> `sm:text-3xl`.
- **Hero Spotlight:** Stacked on mobile, 2-column grid at `lg:`.
- **News grid:** 1 col -> `md:grid-cols-2` -> `lg:grid-cols-3`.
- **Quick Links:** 1 col -> `sm:grid-cols-2` -> `lg:grid-cols-3`.
- **Footer:** 1 col -> `sm:grid-cols-2` -> `lg:grid-cols-4`.

---

## Interaction & Animation Patterns

| Pattern                      | Implementation                                        |
| ---------------------------- | ----------------------------------------------------- |
| Server status pulse          | `animate-pulse` on a 2x2 green dot                    |
| Navbar backdrop blur         | `bg-background/80 backdrop-blur-md`                   |
| Card hover border glow       | `hover:border-primary/40` transition                  |
| News image zoom on hover     | `group-hover:scale-105` with `duration-500`           |
| Hero spotlight stat bar fill | `transition-all duration-700` on bar width            |
| Dot navigation active state  | Width transition `w-2` -> `w-8` with `transition-all` |
| Link arrow nudge             | `group-hover:translate-x-0.5` on ChevronRight         |
| Button brightness on hover   | `hover:brightness-110` on destructive buttons         |
| Download button shadow       | `shadow-lg shadow-destructive/20` for depth           |

**General Rules:**

- Use `transition-colors` for simple color changes.
- Use `transition-all` when multiple properties animate together.
- Durations: `duration-500` for image zoom, `duration-700` for stat bars, default (150ms) for colors.
- Always use Tailwind transition classes, never raw CSS transitions.

---

## Build Steps (From Scratch)

### Step 1: Project Setup

1. Create a Next.js 16 project with pnpm.
2. Install dependencies: `lucide-react` for icons.
3. shadcn/ui is available but not required for this page (no shadcn components are used directly).

### Step 2: Configure Fonts & Theme

1. Update `app/layout.tsx`:
    - Import `Cinzel` and `Inter` from `next/font/google`.
    - Create font instances with `variable` option for CSS custom properties.
    - Apply both font variables to `<body>` class.
    - Set metadata (title: "TWRPG - The Warcraft RPG") and viewport (themeColor: "#1a1a2e").

2. Update `app/globals.css`:
    - Define all color tokens under `:root` (see [Design Tokens](#design-tokens) section).
    - Set `--font-sans` and `--font-serif` in the `@theme inline` block.
    - Base layer: `body { @apply bg-background text-foreground; }`

### Step 3: Generate Image Assets

Generate or source 6 images and place them in `/public/images/`:

- 1 epic battle scene for hero background
- 4 character portraits (Paladin, Mage, Ranger, Berserker)
- 1 news/update thumbnail

### Step 4: Build Components (in order)

1. **Navbar** - Fixed nav with logo, links array, download CTA, and mobile toggle.
2. **HeroSection** - Full-screen hero with background image, overlays, title, CTAs, stats.
3. **HeroSpotlight** - Client component with state for active hero index, image carousel, stats panel.
4. **NewsSection** - Static news data, 3-column card grid with images and metadata.
5. **QuickLinks** - 6-item grid with icon cards, one accent variant for Download.
6. **Footer** - 4-column layout with brand, link groups, social icons, copyright.

### Step 5: Assemble Page

In `app/page.tsx`, import and compose all 6 components in order inside a `<main>` with `min-h-screen bg-background`.

### Step 6: Verify

- Check all responsive breakpoints (mobile, tablet, desktop).
- Verify font loading (Cinzel for headings, Inter for body).
- Test hero spotlight carousel navigation.
- Ensure all images load with proper alt text.
- Verify color contrast meets accessibility standards (gold on navy, white on navy).

---

## File Structure

```
app/
  globals.css          -- Theme tokens, font config, Tailwind base
  layout.tsx           -- Root layout with fonts and metadata
  page.tsx             -- Main page composing all sections

components/
  navbar.tsx           -- Fixed top navigation (client component)
  hero-section.tsx     -- Full-screen hero banner
  hero-spotlight.tsx   -- Interactive hero carousel (client component)
  news-section.tsx     -- News cards grid
  quick-links.tsx      -- Quick access links grid
  footer.tsx           -- Site footer

public/images/
  hero-bg.jpg          -- Hero background artwork
  hero-paladin.jpg     -- Paladin character portrait
  hero-mage.jpg        -- Mage character portrait
  hero-ranger.jpg      -- Ranger character portrait
  hero-berserker.jpg   -- Berserker character portrait
  news-update.jpg      -- News thumbnail
```
