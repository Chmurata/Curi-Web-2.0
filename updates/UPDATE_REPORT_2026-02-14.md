# Update Report — February 14, 2026

**Status:** Ready for review (not yet pushed)

---

## Summary

This update covers performance optimizations, visual refinements, and content updates across multiple components. The changes focus on making the site faster on mobile, improving the card deck UX in the Culture section, and updating the Flywheel section title and spacing.

---

## What Changed

### 1. Flywheel Section (`CircularCycleDiagram.tsx`)

**Title Update:**
- Changed from "The Curi Confidence Flywheel" to "The Employee Interaction Confidence Flywheel"

**Mobile Spacing Fix:**
- Fixed the large gap between the title and the flywheel diagram on mobile by setting transform-origin to "top center" on small screens
- Added responsive negative margins to close the bottom gap caused by CSS scaling:
  - Mobile: `-20rem`
  - Tablet: `-8rem`
  - Desktop: `0`
- Added `pt-24` top padding on mobile so the title clears the logo and menu button

**Performance:**
- Background orbs are now memoized (wrapped in `React.memo`) so they don't re-render unnecessarily
- Orb animations pause when the section is off-screen (saves GPU resources)
- `willChange` CSS hint is only applied when the section is visible
- Added IntersectionObserver to track section visibility

---

### 2. Culture Realized Section (`CultureSection.tsx`)

**Card Visual Overhaul:**
- Removed heavy box shadows from the cards
- Made card backgrounds fully opaque (`bg-white` instead of `bg-white/80`)
- Removed `backdrop-blur-md` since it's no longer needed with opaque backgrounds
- Standardized all 3 cards to show image on the left and text on the right (removed the alternating layout)

**Improved Card Stacking:**
- Cards 2 and 3 now "peek" from behind card 1 with slight scale and vertical offset, making it clear there are multiple cards in the deck
- Card 2 starts at `scale: 0.96`, `y: 12px`
- Card 3 starts at `scale: 0.92`, `y: 24px`
- Cards smoothly scale up and slide into position as the top card peels away
- Added subtle colored borders per card (`blue-100`, `purple-100`, `teal-100`)

---

### 3. Features List (`FeaturesList.tsx`)

**Performance:**
- Card component wrapped in `React.memo` to prevent unnecessary re-renders
- Reduced initial off-screen position from `1000px` to `400px` (less distance = smoother animation)
- Added `{ clamp: true }` to scroll transforms to prevent over-animation
- Added `willChange: 'transform, opacity'` for GPU acceleration
- Changed card height from fixed `h-[380px]` to `min-h-[380px]` for better content flexibility

---

### 4. Process Steps (`ProcessSteps.tsx`)

**Smoother Animations:**
- Upgraded transition easing from basic `easeInOut` to a custom cubic-bezier curve for smoother deceleration
- Added scale animation (0.95 → 1.0) on step transitions for a subtle zoom effect

**Scroll & Layout:**
- Increased scroll container heights (mobile: `105vh` → `175vh`, tablet: `120vh` → `200vh`, desktop: `150vh` → `250vh`) to give users more time to read each step
- Added `minHeight` to step titles to prevent layout shift when title text changes length

---

### 5. Quadrant Section (`QuadrantSection.tsx`)

**Performance:**
- Memoized sub-components (`AxisCaption`, `MultiLineAxisCaption`, `QuadrantTitle`) with custom prop comparison functions
- Added `useMemo` for expensive calculations
- Total: ~276 lines added, mostly memoization wrappers and prop comparisons

---

### 6. Testimonials Section (`TestimonialsSection.tsx`)

**Content Update:**
- Expanded the preview text for all 4 testimonials — now shows the full first 1-2 sentences instead of cutting off mid-word

**Performance:**
- Card component wrapped in `React.memo`
- Similar scroll animation optimizations as FeaturesList (reduced initial Y, clamped transforms, willChange hints)

---

## New Documentation (Untracked Files)

These docs were created during this development cycle but haven't been tracked in git yet:

| File | Description |
|------|-------------|
| `docs/strategy/ACTION-ITEMS-pete-meeting-feb5.md` | Action items from Pete's Feb 5 meeting |
| `docs/strategy/pete-feedback-feb10.md` | Pete's feedback from Feb 10 |
| `docs/strategy/pete-feedback-feb11.md` | Pete's feedback from Feb 11 |
| `docs/analysis/testimonials-ux-gap-analysis.md` | UX analysis of testimonials section |
| `docs/performance/MOBILE-OPTIMIZATION-SUMMARY.md` | Summary of all mobile performance fixes |
| `docs/performance/featureslist-mobile-performance-fix.md` | Detailed FeaturesList perf fix notes |
| `docs/performance/flywheel-mobile-performance-fix.md` | Detailed Flywheel perf fix notes |
| `docs/performance/quadrantsection-mobile-performance-fix.md` | Detailed QuadrantSection perf fix notes |
| `docs/performance/testimonials-fluid-responsiveness-fix.md` | Testimonials fluid responsiveness notes |
| `updates/culturegrowth-animation-report.md` | CultureGrowth animation implementation report |
| `updates/flywheel-label-review.md` | Flywheel label review and recommendations |
| `CLAUDE.md` | AI assistant context file |

---

## Files Moved

- `docs/ACTION-ITEMS-pete-meeting-feb5.md` → moved to `docs/strategy/`
- `pete-feedback-feb10.md` → moved to `docs/strategy/`

---

## Git Stats

```
6 files modified, 503 lines added, 946 lines removed
12+ new documentation files
2 files relocated
```
