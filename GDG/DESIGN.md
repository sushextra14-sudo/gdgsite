---
name: DevGlow Dark
colors:
  surface: '#121317'
  surface-dim: '#121317'
  surface-bright: '#38393e'
  surface-container-lowest: '#0d0e12'
  surface-container-low: '#1a1b20'
  surface-container: '#1f1f24'
  surface-container-high: '#292a2e'
  surface-container-highest: '#343439'
  on-surface: '#e3e2e8'
  on-surface-variant: '#c3c5d7'
  inverse-surface: '#e3e2e8'
  inverse-on-surface: '#2f3035'
  outline: '#8d90a0'
  outline-variant: '#434654'
  surface-tint: '#b5c4ff'
  primary: '#b5c4ff'
  on-primary: '#00297b'
  primary-container: '#648aff'
  on-primary-container: '#00236c'
  inverse-primary: '#1953d6'
  secondary: '#d0bcff'
  on-secondary: '#3c0091'
  secondary-container: '#571bc1'
  on-secondary-container: '#c4abff'
  tertiary: '#6ddd81'
  on-tertiary: '#003914'
  tertiary-container: '#30a550'
  on-tertiary-container: '#003210'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#dbe1ff'
  primary-fixed-dim: '#b5c4ff'
  on-primary-fixed: '#00164d'
  on-primary-fixed-variant: '#003cac'
  secondary-fixed: '#e9ddff'
  secondary-fixed-dim: '#d0bcff'
  on-secondary-fixed: '#23005c'
  on-secondary-fixed-variant: '#5516be'
  tertiary-fixed: '#89fa9b'
  tertiary-fixed-dim: '#6ddd81'
  on-tertiary-fixed: '#002108'
  on-tertiary-fixed-variant: '#005320'
  background: '#121317'
  on-background: '#e3e2e8'
  surface-variant: '#343439'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 56px
    fontWeight: '800'
    lineHeight: 64px
  display-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 36px
    fontWeight: '800'
    lineHeight: 44px
  headline-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
  headline-xl-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  title-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
  label-code:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 18px
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 3rem
  margin-mobile: 1.25rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
  space-2xl: 4rem
---

## Brand & Style

This design system embodies the high-octane, visionary atmosphere of a flagship developer community. Targeted at student engineers, tech enthusiasts, open-source contributors, and research innovators, the visual narrative blends deep space tech realism with luminous cybernetics. 

Drawing heavily from the modern dark aesthetic—characterized by deep matte charcoal canvas surfaces, cybernetic geometric wireframes, glowing neon cyan/electric blue rays, and violet edge highlights—the style is executed through high-precision glassmorphism and subtle emissive luminescence. The interface commands focused attention through deep dark background values while infusing vibrant developer optimism using Google’s signature quad-color spectrum (Google Blue, Red, Yellow, Green) for system states, event badges, and interactive feedback.

## Colors

The palette relies on a high-contrast dark foundation anchored by rich matte obsidian and cosmic slate tones:
- **Canvas & Backgrounds:** Base canvas begins at `#0B0C10` with surface elevation tiers stepping up through `#12131A` (cards, navbars) to `#1A1D27` (elevated states).
- **Core Accents:** Electric Cobalt Blue (`#4D7BFE`) and Vivid Tech Violet (`#8B5CF6`) serve as primary energetic anchors, delivering high-vibrancy gradients and glowing borders.
- **Google Developer Signature Palette:**
  - Google Blue: `#4285F4` (Primary actions, technical announcements)
  - Google Red: `#EA4335` (Urgent updates, deadlines, live sessions)
  - Google Yellow: `#FBBC04` (Hackathons, star speaker callouts, warnings)
  - Google Green: `#34A853` (Success states, registrations open, completed workshops)
- **Text & Contrast:** Primary text is set to high-clarity `#F8FAFC`, secondary labels to muted `#94A3B8`, and disabled elements to `#475569`.

## Typography

The typographic hierarchy is balanced between approachable technical clarity and contemporary engineering precision:
- **Headings (Plus Jakarta Sans):** Geometric curves and robust vertical architecture provide crisp readability in dark modes across display headers and card titles.
- **Body Text (Inter):** Highly legible, neutral sans-serif engineered to eliminate optical fatigue against dark surfaces.
- **Technical & Metadata (JetBrains Mono):** Dedicated monospaced rhythm utilized for hackathon timestamps, terminal snippets, tags, dates, and developer badge counters.

## Layout & Spacing

This design system uses a strict 12-column fluid grid on desktop (max width: 1280px) and an adaptive 4-column layout on mobile devices.
- **Desktop (1024px+):** Outer section margins are generous at `3rem` to create focus on center-stage developer modules, with column gutters set to `1.5rem`.
- **Tablet (768px - 1023px):** 8-column layout with `2rem` margins and `1.25rem` gutters.
- **Mobile (<768px):** Reflows into single stacked vertical units with `1.25rem` screen edge margins and `1rem` column gutters.
- **Component Padding Rhythm:** Based entirely on 8-point geometric increments, scaling from `space-xs` (4px) up to `space-2xl` (64px) for expansive hero sections.

## Elevation & Depth

Visual hierarchy uses luminous depth layering, frosted translucency, and electric back-glows:
- **Level 0 (Canvas):** Pure matte `#0B0C10` background, occasionally textured with soft, atmospheric radial gradients (`radial-gradient(circle at 80% 20%, rgba(77, 123, 254, 0.08), transparent 40%)`).
- **Level 1 (Structural Cards & Modules):** Translucent glass panels tinted with `#12131A` at 85% opacity, paired with `backdrop-filter: blur(16px)` and a subtle `1px` perimeter border in `rgba(255, 255, 255, 0.08)`.
- **Level 2 (Hover & Focus States):** Card elevation is conveyed not by deep black drop shadows, but through subtle outer radiance: `0 0 24px -4px rgba(77, 123, 254, 0.25)` and active borders shifting to `rgba(77, 123, 254, 0.5)`.
- **Level 3 (Modals, Overlays & Glow CTAs):** Raised dialogs with `0 20px 40px rgba(0, 0, 0, 0.6)` and accent perimeter rings (`1px solid rgba(139, 92, 246, 0.35)`). Glowing CTA buttons emit an omnidirectional pulse (`0 0 16px rgba(77, 123, 254, 0.45)`).

## Shapes

The design system adopts roundedness level `2`. Standard containers, input fields, cards, and modal components share an 8px (`0.5rem`) base radius, expanding to `1rem` (`rounded-lg`) on primary feature panels and event cards. Interactive tags, micro-badges, and primary action buttons utilize full capsule pill-radii (`9999px`) to create an aerodynamic contrast against technical, grid-aligned card structures.

## Components

### Buttons
- **Primary Glowing CTA:** Gradient fill blending from Electric Blue (`#4D7BFE`) to Vivid Violet (`#8B5CF6`). Crisp white text, pill-rounded (`rounded-full`), with an emissive drop shadow `0 0 18px rgba(77, 123, 254, 0.4)`. Transitions to `0 0 24px rgba(139, 92, 246, 0.6)` on hover.
- **Secondary Ghost:** Transparent fill, `1px` border in `rgba(77, 123, 254, 0.35)`, text color `#F8FAFC`. On hover, backgrounds step to `rgba(77, 123, 254, 0.12)` with full neon border vibrancy.

### Cards & Panels
- **Event & Workshop Card:** Dark glass base (`#12131A` / 80% opacity), `1px` edge border `rgba(255, 255, 255, 0.08)`. Features an optional top accent stroke (2px) in Google Blue, Red, Yellow, or Green to indicate event categories. Top right features JetBrains Mono date badges.

### Chips & Community Tags
- **Tech Track Chips (Cloud, AI/ML, Android, Web):** Capsule pills with translucent dark fills (`rgba(255, 255, 255, 0.05)`), monospace font (`12px`), accompanied by a 6px circular neon dot indicator matching the corresponding Google brand color.

### Input Fields
- **Search & Registration Forms:** `#0E1017` dark surface with inset border `rgba(255, 255, 255, 0.12)`. When focused, switches border to Electric Blue (`#4D7BFE`) with an external diffuse ring `0 0 0 3px rgba(77, 123, 254, 0.25)`.

### Checkboxes & Toggle Controls
- **Toggle Switches:** Unchecked track is `#1E2230`, thumb is `#94A3B8`. Active switch slides over an Electric Blue-to-Violet gradient track with an illuminated white thumb.
- **Checkboxes:** 4px rounded squircle, dark fill, border `rgba(255, 255, 255, 0.2)`. Selected state glows with `#4D7BFE` fill and crisp white checkmark vector.