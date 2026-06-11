---
name: Elite Performance System
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#393939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#201f1f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353534'
  on-surface: '#e5e2e1'
  on-surface-variant: '#c5c9ac'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#8f9378'
  outline-variant: '#444932'
  surface-tint: '#b0d500'
  primary: '#ffffff'
  on-primary: '#2a3400'
  primary-container: '#caf300'
  on-primary-container: '#596c00'
  inverse-primary: '#536600'
  secondary: '#ffb59e'
  on-secondary: '#5e1700'
  secondary-container: '#ff571a'
  on-secondary-container: '#521300'
  tertiary: '#ffffff'
  on-tertiary: '#1b343d'
  tertiary-container: '#cde7f3'
  on-tertiary-container: '#506873'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#caf300'
  primary-fixed-dim: '#b0d500'
  on-primary-fixed: '#171e00'
  on-primary-fixed-variant: '#3e4c00'
  secondary-fixed: '#ffdbd0'
  secondary-fixed-dim: '#ffb59e'
  on-secondary-fixed: '#3a0b00'
  on-secondary-fixed-variant: '#852400'
  tertiary-fixed: '#cde7f3'
  tertiary-fixed-dim: '#b1cad7'
  on-tertiary-fixed: '#041e28'
  on-tertiary-fixed-variant: '#324a54'
  background: '#131313'
  on-background: '#e5e2e1'
  surface-variant: '#353534'
typography:
  display-lg:
    fontFamily: Montserrat
    fontSize: 48px
    fontWeight: '800'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Montserrat
    fontSize: 36px
    fontWeight: '800'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Montserrat
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Montserrat
    fontSize: 24px
    fontWeight: '700'
    lineHeight: '1.2'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 48px
  xl: 80px
  container-margin-mobile: 20px
  container-margin-desktop: 120px
  gutter: 24px
---

## Brand & Style

The brand personality is **energetic, elite, and disciplined**. It is designed for the modern athlete who values performance and high-end experiences. The UI must evoke a sense of "premium urgency"—the feeling of a high-intensity workout in a luxury environment. 

The aesthetic follows a **High-Contrast Modern** direction with **Subtle Glassmorphism**. This design system leverages deep charcoal backgrounds to create a focused, low-distraction environment where vibrant accents guide the user toward action. The visual language is sharp and professional, utilizing large whitespace to ensure the "premium" feel isn't lost in the "energetic" pace. High-quality athletic photography should be treated with dark overlays or desaturated tones to allow the UI elements to pop.

## Colors

The color palette is built on a "Dark Mode First" philosophy. 

- **Primary (Electric Lime - #D4FF00):** This is the "Pulse." It is used for primary CTAs, active states, and progress indicators. It represents energy and visibility.
- **Secondary (High-Contrast Orange - #FF4D00):** Used for "Hard" effort indicators, alerts, or secondary conversion points like "Limited Offers" (Ofertas Limitadas).
- **Background (#121212):** A deep, matte charcoal that provides the foundation for the premium aesthetic. 
- **Surface (#1E1E1E):** A slightly lighter gray used for cards and containers to create subtle depth against the background.

## Typography

Typography in this design system is about **impact and clarity**. 

**Montserrat** is used for all headlines and display text. To emphasize the "sporty" and "aggressive" nature of fitness, headlines should frequently use `uppercase` styling and heavy weights (700+). This creates a sense of strength and authority.

**Inter** handles the functional aspects of the UI. It provides a clean, neutral balance to the loud headlines. Body text should maintain generous line height (1.6) to ensure readability during high-activity use (e.g., a user checking their workout while on a treadmill). Argentine Spanish (Rioplatense) phrasing should be used for labels to maintain local relatability, such as "Entrená Ahora" instead of "Entrena Ahora."

## Layout & Spacing

The layout uses a **Fluid Grid** system optimized for mobile-first consumption. 

- **Mobile:** A 4-column grid with 20px side margins. Content should be stacked vertically to prioritize the thumb-zone for quick actions (e.g., "Reservar Clase").
- **Desktop:** A 12-column grid with a maximum container width of 1440px. Use large `xl` (80px) vertical spacers between sections to maintain the premium, "breathable" feel.

Spacing follows an **8px base unit**. Elements are grouped using tighter scales (4px, 12px) while major layout sections use larger leaps (48px, 80px) to clearly define content blocks.

## Elevation & Depth

Visual hierarchy is achieved through **Tonal Layering and Glassmorphism**, avoiding traditional heavy drop shadows which can feel dated.

1.  **Level 0 (Background):** #121212.
2.  **Level 1 (Cards/Containers):** #1E1E1E or a semi-transparent blur (Glassmorphism). For glass effects, use a background blur of 20px and a 1px border with 10% white opacity to define edges.
3.  **Level 2 (Floating Elements):** For modals or high-priority pop-overs, use a subtle ambient shadow: `0px 20px 40px rgba(0,0,0,0.5)`.

This approach ensures the UI feels light and modern, even with a dark color palette.

## Shapes

The design system uses a **Rounded (Level 2)** shape language. 

- **Buttons & Small Components:** 0.5rem (8px) radius. This provides a professional and modern look that isn't as "industrial" as sharp corners, nor as "playful" as full pills.
- **Large Cards & Sections:** 1rem (16px) radius for `rounded-lg`.
- **Feature Images:** Should mirror the 1rem radius to maintain consistency across the layout.

## Components

### Buttons
- **Primary:** Background #D4FF00, Text #000000, Bold Uppercase. No shadow, flat and punchy.
- **Secondary:** Transparent background, 2px stroke #D4FF00, Text #D4FF00.
- **Ghost:** Text #FFFFFF, no border. Used for "Volver" or secondary navigation.

### Cards
Cards utilize the **Glassmorphic** style. They feature a subtle 1px border (#FFFFFF at 10% opacity) and a background blur. When used over athletic photography, this ensures text remains legible while maintaining a sense of depth.

### Input Fields
Darker than the surface (#000000), 1px border (#333333). On focus, the border transitions to #D4FF00. Placeholders should be a medium gray.

### Chips/Tags
Used for "Nivel de Intensidad" (Intensity Level) or "Categoría". Small, 4px radius, using secondary colors like Orange (#FF4D00) for "Alta Intensidad" (High Intensity).

### Lists
Clean, border-bottom separators (#222222). Left-aligned icons in Electric Lime to draw the eye to list items.