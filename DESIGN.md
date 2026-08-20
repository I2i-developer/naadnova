---
name: Vibrant Sonic Flow
colors:
  surface: '#fbf8fc'
  surface-dim: '#dbd9dc'
  surface-bright: '#fbf8fc'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f3f6'
  surface-container: '#efedf0'
  surface-container-high: '#e9e7eb'
  surface-container-highest: '#e4e2e5'
  on-surface: '#1b1b1e'
  on-surface-variant: '#44474e'
  inverse-surface: '#303033'
  inverse-on-surface: '#f2f0f3'
  outline: '#75777f'
  outline-variant: '#c5c6cf'
  surface-tint: '#4d5e81'
  primary: '#000515'
  on-primary: '#ffffff'
  primary-container: '#0a1e3d'
  on-primary-container: '#7586ab'
  inverse-primary: '#b5c7ee'
  secondary: '#821dda'
  on-secondary: '#ffffff'
  secondary-container: '#9c42f4'
  on-secondary-container: '#fffbff'
  tertiary: '#150002'
  on-tertiary: '#ffffff'
  tertiary-container: '#46000d'
  on-tertiary-container: '#ff2f53'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d7e2ff'
  primary-fixed-dim: '#b5c7ee'
  on-primary-fixed: '#061b3a'
  on-primary-fixed-variant: '#354768'
  secondary-fixed: '#efdbff'
  secondary-fixed-dim: '#dcb8ff'
  on-secondary-fixed: '#2c0051'
  on-secondary-fixed-variant: '#6700b5'
  tertiary-fixed: '#ffdada'
  tertiary-fixed-dim: '#ffb3b5'
  on-tertiary-fixed: '#40000b'
  on-tertiary-fixed-variant: '#920025'
  background: '#fbf8fc'
  on-background: '#1b1b1e'
  surface-variant: '#e4e2e5'
  sonic-glow: '#00f2ff'
  electric-violet: '#bf40bf'
  nova-red: '#e60000'
  deep-ocean: '#051124'
typography:
  display-lg:
    fontFamily: Sora
    fontSize: 64px
    fontWeight: '800'
    lineHeight: 72px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Sora
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
  headline-lg-mobile:
    fontFamily: Sora
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  headline-md:
    fontFamily: Sora
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-sm:
    fontFamily: Sora
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Hanken Grotesk
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.08em
  caption:
    fontFamily: Hanken Grotesk
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
  unit: 8px
  gutter-md: 24px
  margin-mobile: 20px
  margin-desktop: 64px
  stack-section: 80px
  container-max: 1440px
---

## Brand & Style

This design system evolves from a traditional conservatory aesthetic into a high-energy, immersive musical ecosystem. The personality is **electric, visionary, and rhythmic**, capturing the precise moment where technical mastery meets creative explosion. It targets a modern generation of musicians who view music as a multi-sensory experience.

The design style is a blend of **Corporate Modern** structure with **Glassmorphism** and **Vaporwave** accents. It maintains professional reliability through a clean grid but injects "sonic energy" via vibrant gradients, glowing focal points, and translucent layers that mimic the depth and resonance of sound.

**Key Visual Principles:**
- **Chromatic Resonance:** Use deep navies to provide a "silent" background that allows vibrant purples and reds to "pop" like neon notes.
- **Rhythmic Geometry:** Employ angular overlays and light leaks inspired by the geometric facets of the reference image to create a sense of movement.
- **Luminous Depth:** Use glow effects and backlighting behind primary containers to simulate the "spotlight" of a stage performance.

## Colors

The palette is extracted directly from the Naadnova identity, moving from deep structural tones to energetic accents. While the default mode is light for legibility, the "light" surfaces are treated with rich, atmospheric gradients rather than flat neutrals.

- **Primary (Deep Navy):** `#0a1e3d`. Represents the foundation and professional structure. Used for primary text, navigation backgrounds, and heavy structural elements.
- **Secondary (Vibrant Purple):** `#8a2be2`. The color of creativity and "flow." Used for interactive states, secondary buttons, and active progress indicators.
- **Tertiary (Energetic Red/Pink):** `#ff1e4d`. The "heartbeat" of the design. Reserved for high-impact calls to action, urgent notifications, and brand focal points.
- **Neutral (Atmospheric White):** A cool-toned white that prevents the vibrant palette from becoming overwhelming, ensuring a clean learning environment.

**Gradients:**
- **Nova Gradient:** A linear transition from `Deep Ocean` to `Electric Violet` used for hero sections and large containers.
- **Pulse Gradient:** A radial glow using `Nova Red` and `Sonic Glow` for interactive icons or "Live" status indicators.

## Typography

The typography shifts to a more modern, technical feel while maintaining an editorial elegance.

- **Headlines:** Set in **Sora**. This geometric sans-serif features a rhythmic "ink-trap" aesthetic that mirrors the precision of musical notation and the futuristic feel of the wordmark. Its high x-height ensures impact at all sizes.
- **Body & UI Elements:** Set in **Hanken Grotesk**. This font is sharp, contemporary, and highly legible, making it ideal for technical music theory and instructional content.
- **Rhythmic Letter Spacing:** Labels and captions use increased letter spacing to create "air" within the technical layout, preventing it from feeling dense.

## Layout & Spacing

The layout follows a **Fluid Grid** model that emphasizes horizontal movement, mimicking a musical timeline.

- **Grid System:** A 12-column grid with wider margins (64px) on desktop to allow the "Sonic Flow" gradients to bleed off the edges, creating an expansive feel.
- **Visual Pacing:** Use asymmetrical spacing (e.g., larger padding on the left than the right) to lead the eye through instructional content in a rhythmic sequence.
- **Breakpoints:**
  - **Mobile:** < 600px (20px margins, tight 12px gutters for high-density information).
  - **Tablet:** 600px - 1100px (40px margins, 24px gutters).
  - **Desktop:** > 1100px (Fixed 1440px max-width, allowing background facets to fill the remaining viewport).

## Elevation & Depth

Hierarchy is established through **Luminous Layering** rather than traditional shadows.

- **Glassmorphism:** Secondary panels and modal overlays use a 12px backdrop blur with a 10% white tint. This allows the vibrant background gradients to "shimmer" through the UI.
- **Glow Borders:** High-priority cards use a 1px border with a variable opacity gradient (e.g., Primary Navy to Secondary Purple) to define edges without adding visual weight.
- **Outer Glows:** Interactive elements like buttons do not use black shadows; instead, they use a soft, colored "aura" (e.g., a purple glow for a purple button) to indicate elevation.
- **Faceted Backgrounds:** Use low-opacity geometric overlays (10-15%) in the background to create a sense of 3D space and architectural depth.

## Shapes

The shape language is **Structured yet Fluid**. It avoids the extreme "pill" shapes of the previous system in favor of precise, modern corners.

- **Component Radius:** 0.5rem (8px) provides a clean, professional feel for inputs and buttons.
- **Container Radius:** 1rem (16px) for cards and lessons to soften the geometric facet motifs of the background.
- **The "Nova" Angle:** Use occasional 45-degree angled clips on one corner of primary containers to echo the rhythmic energy of the logo's background facets.

## Components

### Buttons & Interaction
- **Primary Action (Energetic):** Uses the `Nova Red` to `Electric Violet` gradient. Text is white. On hover, the gradient shifts or "pulses."
- **Secondary Action (Technical):** Transparent background with a 2px `Secondary Purple` border and high-blur glass effect.
- **Ghost Actions:** Navy text with a subtle `Sonic Glow` underline on hover.

### Cards & Containers
- **Content Cards:** Glass-morphic surfaces with a 1px border. Feature high-contrast imagery with a 15% navy overlay to ensure text remains legible.
- **Live Lesson Chips:** Deep Navy background with a pulsing `Nova Red` dot to indicate real-time activity.

### Inputs & Selection
- **Search & Forms:** Clean white background with a `Deep Navy` border. On focus, the border glows with `Sonic Glow` (`#00f2ff`).
- **Progress Sliders:** The track is a subtle grey-navy, while the "active" portion is a vibrant purple-to-pink gradient.

### Specialized Elements
- **Visualizers:** Integrated waveform components should use the `Sonic Glow` color to represent active sound.
- **Rhythmic Dividers:** Instead of solid lines, use a series of dots or small vertical bars of varying heights (mimicking an equalizer) to separate sections.