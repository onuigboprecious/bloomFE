# Enlazer Dashboard — Design System

Instagram-inspired visual language for the Enlazer dashboard, adapted to Enlazer's
own brand colors. This is a **visual/layout system**, not a feature change — all
existing data, forms, and API calls stay as-is.

---

## 1. Design Principles

- **Story-ring identity** — the circular gradient ring (borrowed from Instagram's
  avatar/story pattern) is the one recurring visual signature. Use it sparingly:
  avatar, story-bar channel icons, and the primary CTA gradient. Don't apply it
  to everything or it stops meaning anything.
- **Numbers up front** — key stats (Taps / Viewers / Conversion) live directly
  under the profile name, not buried in a separate analytics card.
- **Flat over boxed** — nav items and chips lose the bordered-card chrome in
  favor of flat lists with a single accent marker on the active state.
- **Mobile is its own layout**, not a squeezed desktop view — bottom tab bar,
  centered/stacked profile header, edge-to-edge horizontal scroll for channels.

---

## 2. Color Tokens

| Token | Value | Usage |
|---|---|---|
| `--bg` | `#070B14` | Page background (base) |
| `--bg-radial` | `radial-gradient(circle at 20% -10%, #0C1526 0%, #070B14 55%)` | Page background (applied) |
| `--card` | `#10192B` | Card surface |
| `--card-hover` | `#16223A` | Card hover / chip background |
| `--border` | `#1E2A42` | Card borders, dividers |
| `--grad` | `linear-gradient(135deg, #22D3EE 0%, #6366F1 55%, #A855F7 100%)` | Avatar ring, active states, primary buttons, story icons |
| `--accent` | `#38BDF8` | Links, active nav accent bar, badges |
| `--success` | `#34D399` | "Live & Public" status, positive metrics |
| `--text` | `#F1F5F9` | Primary text |
| `--text-dim` | `#8B98AE` | Secondary text, bios, subtitles |
| `--text-faint` | `#5A6784` | Labels, uppercase micro-copy, placeholders |

**Rule:** the gradient (`--grad`) is the only gradient in the system. Don't
introduce a second gradient direction or palette elsewhere — it dilutes the
story-ring as a signature.

---

## 3. Typography

- **Family:** one sans-serif family throughout (system font stack: `-apple-system,
  "Segoe UI", "Helvetica Neue", Arial, sans-serif`, or swap for a licensed
  family if the brand adopts one — keep it singular).
- **Weights:** 800 for names/headlines, 700 for section titles and stat numbers,
  600 for labels/buttons, 400 for body/bio text.
- **Avoid:** tracked-out uppercase eyebrow labels above every section, middle-dot
  meta strings, monospace for data labels — none of these appear anywhere in
  this system.
- **Stat numbers:** 18–20px, weight 800. Labels beneath: 10–11px, uppercase,
  `--text-faint`, letter-spacing 0.05–0.06em.

---

## 4. Core Components

### 4.1 Avatar / Story Ring
- Circle, gradient border (`--grad`) at 2.5–3px, inner image inset with a
  dark border matching the surface it sits on (creates the "ring" separation).
- Sizes: 88px (desktop profile header), 76px (mobile profile header), 52px
  (story-bar channel icons), 38px (sidebar mini avatar).

### 4.2 Profile Header
- **Desktop:** avatar left, name/handle/stats/bio stacked right, status pill +
  primary CTA aligned top-right.
- **Mobile:** centered column — avatar → name (+ verified badge) → handle →
  stat row → bio → two side-by-side buttons (primary "Copy Link" / secondary
  "Edit").
- Stat row: 3 blocks (Taps / Viewers / Conversion), no card chrome, divided
  only by spacing — pulls from the same data as the Tap Analytics section.

### 4.3 Story Bar (Social Channels)
- Horizontal scroll row of circular gradient-ring icon bubbles, one per
  connected channel, label underneath (platform name, not handle).
- Trailing "+" bubble opens the existing add-channel form.
- Replaces the previous 2-column square chip grid.

### 4.4 Sidebar Nav (Desktop)
- Flat vertical list, no per-item border/box.
- Active item: 2px left accent bar in `--accent`, subtle gradient wash
  background (`rgba(56,189,248,0.16)` → `rgba(168,85,247,0.05)`), full
  brightness text.
- Inactive items: `--text-dim`, no background.

### 4.5 Bottom Tab Bar (Mobile)
- Fixed, 64px height, 5 icons: Profile / Hardware / Contacts / Analytics /
  Settings.
- Active icon: filled with `--grad`; inactive: `--card-hover` flat fill.
- Label beneath each icon, active label in `--text`, inactive in `--text-faint`.
- Replaces the sidebar entirely on mobile — not a collapsed/hamburger version
  of it.

### 4.6 Section Cards
- `--card` background, 1px `--border`, 16px radius, 20–22px padding.
- Section title row: title (13.5px, weight 700) + optional status badge
  (pill, `--accent` text on `rgba(56,189,248,0.1)` background).
- Used for Personal Identity, Social Channels, Hardware, Received Contacts,
  Analytics, Settings blocks — same shell throughout for consistency.

### 4.7 Buttons
- **Primary:** `--grad` fill, white text, weight 700, 12px radius.
- **Secondary:** `--card-hover` fill, 1px `--border`, `--text` color.

---

## 5. Responsive Behavior

| Breakpoint | Layout |
|---|---|
| `375px` (mobile) | Bottom tab bar, stacked centered profile header, edge-to-edge story bar, single-column section cards, simplified top bar (wordmark + status pill only). |
| `768px` (tablet) | Transitional — confirm sidebar vs. tab-bar switch happens cleanly here; test both orientations. |
| `1024px+` (desktop) | Left icon rail sidebar, two/three-column section grids where current desktop layout already does this (e.g. Personal Identity fields). |

Implement as a real breakpoint switch (`md:` or equivalent), not a separate
mobile route — same component tree, responsive classes/styles.

---

## 6. What Stays the Same

- All form fields, validation, and data bindings.
- All API calls and data sources (stat numbers just move location, not source).
- Existing feature set across all 5 dashboard sections.
- Keyboard focus visibility and accessibility baseline.

---

## 7. Reference

A static HTML mockup demonstrating these tokens and components (desktop +
mobile frame side by side) was generated alongside this doc:
`enlazer-redesign.html`.
