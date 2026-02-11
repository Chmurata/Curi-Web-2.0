# Pete Feedback — Feb 10, 2026

## Goal
Address all feedback from Pete's 3 messages: fix scroll/sticky issues, redesign CultureSection, update Flywheel labels & animation, fix ProcessSteps layout, simplify PlansSection & OneConversationSection, reorder sections, and audit iPhone 15 responsiveness.

## Project Type
**WEB** — React + Vite + Tailwind CSS 4 + Motion/React

## Priority Summary

| # | Task | Priority | Files | Effort |
|---|------|----------|-------|--------|
| 1 | ~~Hero sticky delay removal (resolved by CultureSection overlap)~~ | ✅ DONE | `Hero.tsx` | Small |
| 2 | CultureSection redesign (shrink title + cards + image layout) | P0 | `CultureSection.tsx` | Large |
| 3 | ~~InfiniteScroll spacing reduction (-50%)~~ | ✅ DONE | `InfiniteScroll.tsx` | Small |
| 4 | Flywheel: ~~dead scroll fix~~ ✅ + label copy update (awaiting Pete) | P0 | `CircularCycleDiagram.tsx`, `FlywheelSection.tsx` | Medium |
| 5 | ~~Flywheel section reorder (move after FeaturesList)~~ | ✅ DONE | `HomePage.tsx` | Small |
| 6 | ~~ProcessSteps: uniform spacing + fixed circle position~~ | ✅ DONE | `ProcessSteps.tsx`, `HomePage.tsx` | Medium |
| 7 | ProcessSteps: button cutoff fix | P1 | `ProcessSteps.tsx` | Small |
| 8 | ~~PlansSection: remove staggered build, all scroll at once~~ | ✅ DONE | `PlansSection.tsx` | Small |
| 9 | ~~OneConversationSection: simplify to headline + button + dissolve~~ | ✅ DONE | `OneConversationSection.tsx` | Medium |
| 10 | Mobile responsiveness + performance fix (4 phases) | P0 | Multiple + App.tsx | Large |

---

## Task 1: Hero Section — Remove Remaining Sticky Delay

**File:** `src/app/components/Hero.tsx`
**Agent:** `frontend-specialist`
**Skills:** `frontend-design`, `animation-guide`

**Problem:** After the CTA button is visible, the Hero still sticks for 1-2 scroll ticks before releasing. Pete says "Is the delay completely removed there?"

**Current State:**
- Section height: `h-[300vh]` mobile / `h-[360vh]` desktop
- Phone exits via `phoneY: [0, 0.6] → ["0vh", "-165vh"]`
- But sticky container persists through remaining 40% of scroll progress (0.6-1.0) = deadzone

**Fix:**
- Reduce total section height so it ends closer to when animations complete
- Desktop: `360vh → 260vh` (phone animation completes ~0.6, so 260 * 0.6 = 156vh of real animation)
- Mobile: `300vh → 220vh`
- Alternatively, shift the `phoneY` range from `[0, 0.6]` to `[0, 0.85]` to fill the scroll
- Verify by scrolling: once button and phone are visible, next scroll tick should advance to CultureSection

**Verify:** Scroll past Hero — no dead scroll ticks after CTA button appears

---

## Task 2: CultureSection Redesign — Shrinking Title + Image/Card Layout

**File:** `src/app/components/CultureSection.tsx`
**Agent:** `frontend-specialist`
**Skills:** `frontend-design`, `ux-psychology`, `animation-guide`

**Problem:** Pete wants a major redesign:
> "Start it big (huge) and as user scrolls it gets smaller and smaller but is NOT sticky. Use the opposite layout but same section as 'How to get started with Curi.' It will be a 3 card section, but all three items are visible right away, with first image loaded. First item is highlighted and others are grayed out. On next user scroll the second one becomes highlighted, then the third then continue scrolling with no delay. The speech bubbles can be on the side fading like they do."

**Requirements:**
1. "Culture Realized" text starts huge (like current background text) and shrinks as user scrolls — NOT sticky, scrolls naturally upward while shrinking
2. Below the shrinking title: 3-card section visible immediately
   - Layout: opposite of ProcessSteps (if ProcessSteps is image-left/content-right, this should be content-left/image-right)
   - Cards on left (narrower), image on right
3. First card highlighted (full opacity, active styling), others grayed out
4. On scroll: highlight advances card 1 → 2 → 3, then continues — no sticky delay
5. Speech bubbles remain on sides with current fade behavior
6. Pete will provide images and copy

**Implementation Approach:**
- Remove current sticky `h-[150vh]` container and negative margin hack
- Replace with natural-flow section
- "Culture Realized" text: use `useScroll` + `useTransform` for scale `[1, 0.4]` as it scrolls through viewport — apply to a non-sticky element so it scrolls up naturally
- Cards: flex column on left (~40% width), image container on right (~55% width)
- Active card state: track scroll progress, divide into 3 zones
- Active card: `opacity-100`, subtle `scale(1.02)`, left border accent `border-l-3 border-[#2b72ba]`
- Inactive cards: `opacity-40`, `scale(1)`
- Section height: keep minimal, no extra vh — just enough content height + small scroll range for card switching
- Speech bubbles: keep parallax behavior from current implementation

**Verify:**
- "Culture Realized" shrinks as you scroll, no sticking
- Cards switch highlight on scroll, image swaps per card
- No delay exiting section

---

## Task 3: InfiniteScroll — Reduce Spacing by 50% ✅ COMPLETE

**File:** `src/app/components/InfiniteScroll.tsx`
**Agent:** `frontend-specialist`

**Problem:** Pete: "Please remove the space to the scrolling icons by another 50%."

**Current State:**
- Top margin: `-mt-[8vh]` mobile / `mt-0` desktop
- Padding: `clamp(1rem, 2vw, 1.6rem)` horizontal, `clamp(1rem, 3.2vw, 3.2rem)` top

**Fix:**
- Reduce top padding by 50%: `clamp(1rem, 3.2vw, 3.2rem)` → `clamp(0.5rem, 1.6vw, 1.6rem)`
- Reduce vertical padding: `clamp(1rem, 2vw, 1.6rem)` → `clamp(0.5rem, 1vw, 0.8rem)`
- Adjust mobile margin: `-mt-[8vh]` → `-mt-[4vh]` (or further reduce)

**Verify:** Visual gap between CultureSection and InfiniteScroll is ~50% of current

---

## Task 4: Flywheel — Label Update + Highlight Fix + Swell Delay

**Files:** `src/app/components/CircularCycleDiagram.tsx`, `src/app/components/FlywheelSection.tsx`
**Agent:** `frontend-specialist`
**Skills:** `frontend-design`, `animation-guide`

**Problem (3 issues):**

### 4a. Update Labels
Pete's new copy:
- **Headline:** "The Employee Interaction Confidence Flywheel"
- **Step 1:** "Employee 1 Receives Coaching"
- **Step 2:** "Sends Invitation to Engage"
- **Step 3:** "Employee 2 Receives Coaching"
- **Step 4:** "Successful Facilitated Conversation"
- **Step 5:** "Employees Insight: All Parties Receive Coaching"
- **Step 6:** "Insight Builds Confidence to Engage in Challenging Conversations"
- (Cycle back to 1)

**Current labels** (to replace):
1. "User A Coaching"
2. "User B Coaching"
3. "Improved Outcomes"
4. "Confidence"
5. "Courageous Action"
6. "Higher Impact Conversations"

### 4b. Label Highlight Not Working
Pete: "The flywheel still isn't highlighting the labels when they arrive."

**Current highlight logic** (CircularCycleDiagram.tsx):
- Highlight range: `[start, start + 0.04, start + 0.08, end]` → `[0, 1, 1, 0]`
- Filter: `brightness(${1 + v * 0.5}) drop-shadow(0 0 ${v * 12}px rgba(255,255,255,${v * 0.8}))`

**Root cause analysis:**
- The highlight window is too narrow: only 0.04 scroll progress of full brightness
- The `brightness(1.5)` + white drop-shadow on white text may not create enough visual contrast
- Need: stronger visual differentiation — try color change, scale boost, or background highlight

**Fix:**
- Widen highlight window: `start + 0.04` → `start + 0.12` for longer visibility
- Increase brightness multiplier: `1.5 → 2.0`
- Add color shift: highlight text goes from white to `#7dd3fc` (light blue glow) during swell
- Add scale pulse: `1 → 1.15 → 1` during highlight for visual pop
- Consider adding a subtle background pill behind the active label

### 4c. Swell Too Soon — Delay Until Background Painted
Pete: "The flywheel label swells are too soon, there's no contrast to see it. Delay the swell until after the background is painted."

**Current timing:** Each segment starts at `0.05 + (i * 0.10)` — so segment 1 swells at 0.05.

**Fix:**
- The background/arrows should paint first (0.0-0.3), THEN labels start appearing
- Shift label swell start: `0.05 + (i * 0.10)` → `0.30 + (i * 0.07)`
- This means arrows build 0.0-0.3, then labels swell 0.30-0.72
- Ensures background is fully visible before any label animation begins

### 4d. Dead Scrolling — Excessive Scroll Runway

**Problem:** After the flywheel animation completes, there's significant dead scrolling where nothing visible changes but the user must keep scrolling to exit. Equally annoying going back up — must scroll through 400vh to pass through the section. Breaks the page flow.

**Root Cause (Scroll Math):**
- Container: `h-[400vh]` with offset `["start start", "end start"]`
- Sticky pins from progress 0 to 0.75 (300vh of pinned scroll)
- **Last meaningful animation** (segment 6 build): finishes at progress **0.65** (260vh)
- Flywheel rotation `[0.3, 1.0]` = 60° over 280vh = **0.21°/vh** — imperceptible
- `hasAppeared` locks at 0.7 — even the subtle rotation becomes invisible on segments
- **Dead zones:**
  - 0.65→0.75 = **40vh pinned dead scrolling** (nothing changes, stuck on screen)
  - 0.75→1.0 = **100vh** section scrolling away
- **Total wasted scroll: ~140vh** (35% of the section)

**Fix — Reduce to `h-[280vh]`:**

New scroll geometry:
- Pinned scroll: 280vh - 100vh = **180vh** (was 300vh — 40% reduction)
- Unpin point: progress 1 - (100/280) = **0.643**

New animation timing (compressed to fit before unpin at 0.643):
```
Segments: start = 0.05 + (i × 0.09), duration = 0.09
  Seg 0: 0.05 → 0.14     (14vh → 39vh)
  Seg 1: 0.14 → 0.23     (39vh → 64vh)
  Seg 2: 0.23 → 0.32     (64vh → 90vh)
  Seg 3: 0.32 → 0.41     (90vh → 115vh)
  Seg 4: 0.41 → 0.50     (115vh → 140vh)
  Seg 5: 0.50 → 0.59     (140vh → 165vh)

Last animation done: 0.59 (165vh)
hasAppeared lock: 0.62 (was 0.7)
Flywheel rotation: [0.25, 0.65] (was [0.3, 1.0]) — more perceptible
Logo opacity: [0, 0.08] (was [0, 0.1])

Pinned dead zone: 0.59→0.643 = ~14vh (was 40vh — 65% reduction)
```

**Implementation steps:**
1. Change container: `h-[400vh]` → `h-[280vh]`
2. Update segment timing: `start = 0.05 + (i * 0.09)`, `end = start + 0.09`
3. Update text swell timing to match new segment ranges
4. Update flywheel rotation: `[0.3, 1.0]` → `[0.25, 0.65]`
5. Update `hasAppeared` threshold: `0.7` → `0.62`
6. Update logo opacity: `[0, 0.1]` → `[0, 0.08]`

**Result:**
- Total section scroll: **280vh** (was 400vh — 30% shorter)
- Pinned dead zone: **~14vh** (was 40vh — barely noticeable)
- Scrolling up/down through section: **120vh faster**
- Animation density INCREASES — same content in less scroll = feels more dynamic

**Verify:**
- All 6 segments still build in sequentially with clear pacing
- No dead/stuck feeling after last segment appears
- Scrolling up through the section feels proportional to its content
- Flywheel rotation is more visibly perceptible
- `hasAppeared` still locks correctly (segments don't re-animate on scroll back)
- New labels appear correctly on all 6 positions
- Labels visibly highlight with clear contrast when they appear
- Labels don't start swelling until arrows/background are fully painted
- "The Employee Interaction Confidence Flywheel" headline displays correctly

---

## Task 5: Reorder Flywheel Section ✅ COMPLETE

**File:** `src/app/pages/HomePage.tsx`
**Agent:** `frontend-specialist`

**Problem:** Pete: "Move Flywheel section to be after 'How Curi Creates Endless' section."

**Current order:**
```
6. CultureBehaviorSection  ← "How Curi Creates Endless..."
7. FlywheelSection
8. FeaturesList
```

**Required order:**
```
6. CultureBehaviorSection  ← "How Curi Creates Endless..."
7. FlywheelSection          ← Already here — confirm this is correct position
```

**Action:** Verify current order matches Pete's intent. If "How Curi Creates Endless" is `CultureBehaviorSection`, Flywheel is already right after it. If it refers to a different section, adjust accordingly. Read the section headlines to confirm mapping.

**Verify:** Flywheel appears immediately after the "How Curi Creates Endless" section

---

## Task 6: ProcessSteps — Uniform Spacing + Fixed Circle Position ✅ COMPLETE

**File:** `src/app/components/ProcessSteps.tsx`
**Agent:** `frontend-specialist`
**Skills:** `frontend-design`, `ux-psychology`

**Problem (2 issues):**

### 6a. Section Spacing
Pete: "Now it's a little close to the section before, but just a little bit. Please make all section spacing uniform."

**Fix:**
- Add consistent `paddingTop` / `marginTop` to ProcessSteps: use `clamp(4rem, 8vh, 6rem)`
- Audit all section margins/padding across HomePage and normalize to a uniform value
- Suggested uniform gap: `clamp(3rem, 6vh, 5rem)` between all major sections

### 6b. Circle/Number Badge Shifts Position
Pete: "The round element with the number, and the headline, should remain always in the same position, then the text can go further down as needed. But right now the circle shifts places from 1 to 2 to 3."

**Root Cause:** The content container re-renders fully on step change via `AnimatePresence`, causing the badge and headline to shift vertically depending on content length of each step.

**Fix:**
- Make badge + headline a separate fixed-position element outside the AnimatePresence
- Only animate the description text and image within AnimatePresence
- Structure:
  ```
  <div className="sticky">
    <Badge>{activeStep + 1}</Badge>      ← FIXED position
    <Headline>{steps[activeStep].title}</Headline>  ← FIXED position, content swaps
    <AnimatePresence>
      <Description />                     ← Animates in/out
    </AnimatePresence>
  </div>
  ```
- Badge and headline remain at exact same Y coordinate regardless of step

**Verify:**
- Circle badge stays pinned in same position across all 6 steps
- Only description text animates below
- Spacing to previous section is consistent with other section gaps

---

## Task 7: ProcessSteps — Button Cutoff Fix

**File:** `src/app/components/ProcessSteps.tsx`
**Agent:** `frontend-specialist`

**Problem:** Pete attached a screenshot showing the CTA button getting cut off on resize. "There must be a way to fix this button getting cut off."

**Root Cause:** Likely `overflow: hidden` on the sticky container or a fixed `minHeight` that doesn't account for the button at certain viewport sizes.

**Fix:**
- Check for `overflow-hidden` on parent containers — change to `overflow-visible` where safe
- Ensure CTA button has sufficient `marginBottom` and `paddingBottom` on the sticky container
- Add `pb-16` or `pb-20` to the content container to ensure button clearance
- Test at multiple viewport sizes (especially tablet breakpoints 640-1024px)

**Verify:** Resize browser window — button never gets clipped at any width

---

## Task 8: PlansSection — Remove Staggered Build ✅ COMPLETE

**File:** `src/app/components/PlansSection.tsx`
**Agent:** `frontend-specialist`

**Problem:** Pete: "Our plans, remove the build, they all scroll at once with the headline."

**Current State:**
- Section height: `h-[140vh]` with sticky viewport
- Cards Y: scrollYProgress `[0, 0.5]` → `["110vh", "0vh"]` — slide up animation

**Fix:**
- Remove the `h-[140vh]` scroll container and sticky positioning entirely
- Remove the `useScroll` / `useTransform` animation on cards
- Make it a simple static section: headline + 3 cards in a grid, all visible immediately
- Section scrolls naturally with the page — no sticky, no animation build
- Keep hover effects on cards (gradient border, shadow)
- Reduce to `min-h-auto` with natural content height + padding

**Verify:** Plans section loads with all 3 cards visible, scrolls naturally, no sticky

---

## Task 9: OneConversationSection — Simplify to Headline + Dissolve ✅ COMPLETE

**File:** `src/app/components/OneConversationSection.tsx`
**Agent:** `frontend-specialist`
**Skills:** `frontend-design`, `animation-guide`

**Problem:** Pete wants major simplification:
> "Remove all of the body copy. Headline stays with button. Black headline, and empty space for 'Let's start yours' and button all scroll right away after phone image. After button is on screen 'Let's start yours' dissolves into place. Less scrolling fatigue."

**Requirements:**
1. Remove all body/subtext copy
2. Keep phone image at top (current animation fine)
3. After phone, "Let's start yours" headline in **black** (`#0b1220`)
4. CTA button directly below
5. Phone and button area scroll naturally — no sticky delay
6. After button is on screen: "Let's start yours" dissolves (fades) into place
7. Goal: less scrolling fatigue, quick section

**Implementation:**
- Remove `subtext` elements entirely
- Change headline color from partial blue to all black: `text-[#0b1220]`
- Keep phone rotation/scale animation but tighten scroll range
- "Let's start yours" opacity: `useInView` trigger — when in viewport, fade from 0 → 1 over 0.6s with 0.2s delay
- Remove extra spacing (`space-y-5` subtext sections)
- Total section should feel compact: phone → small gap → headline dissolve → button

**Verify:**
- No body copy visible
- Headline is black
- "Let's start yours" fades in after scrolling button into view
- Section is noticeably shorter/faster than current

---

## Task 10: Mobile Responsiveness & Performance Fix (Revised)

**Files:** Multiple — all sections + App.tsx + Header.tsx
**Agent:** `frontend-specialist`
**Skills:** `frontend-design`, `ux-psychology`, `animation-guide`

**Problem:** Pete: "iPhone 15 has a lot of issues, check buttons, scroll issues etc."
User confirmed: overall mobile responsiveness issues — slow loading, rendering problems, stuttering on scroll.

**Root Causes (from audit):**
1. **174 Framer Motion hooks** running simultaneously (33 useScroll + 133 useTransform)
2. **23 backdrop-blur instances** — GPU-killer on mobile Safari
3. **3 animated blur orbs in App.tsx** running continuously with blur-[100px]
4. **31 images, ZERO lazy loading** — all load immediately
5. **Massive scroll runways** — Hero=300vh, Culture=280vh, Flywheel=400vh, Quadrant=300vh
6. **Header.tsx scroll listener** — getBoundingClientRect() on every frame = layout thrashing
7. **Speech bubble animations** — CultureSection: 20 motion values fire on mobile despite being hidden
8. **No prefers-reduced-motion** handling anywhere

---

### Phase 1: Performance Quick Wins (Low Risk)

**1a. Lazy load all below-fold images**
- Files: ALL components with `<img>` tags
- Add `loading="lazy" decoding="async"` to every `<img>` except Hero phone (above fold)
- Affects: ~25 images across SayDoGapSection, ActivationSection, CultureBehaviorSection, ProcessSteps, Testimonials, etc.

**1b. App.tsx — disable blur orbs on mobile**
- File: `App.tsx`
- Wrap the 3 blur orb divs in a `hidden md:block` wrapper
- Or reduce blur from `blur-[100px]`/`blur-[80px]` to `blur-[30px]` on mobile

**1c. Header.tsx — replace scroll listener with IntersectionObserver**
- File: `Header.tsx`
- Replace `getBoundingClientRect()` scroll listener with `IntersectionObserver` on quadrant-section
- Eliminates layout thrashing (60 reads/sec → 0)

**1d. Add global `prefers-reduced-motion` support**
- File: `App.tsx` or global CSS
- Add `@media (prefers-reduced-motion: reduce)` to disable animations
- Respect user accessibility preferences

---

### Phase 2: Mobile Animation Optimization (Medium Risk)

**2a. CultureSection — skip speech bubble hooks on mobile**
- File: `CultureSection.tsx`
- Currently: 20 `useTransform` hooks for speech bubbles fire on ALL screens, hidden via `hidden md:block`
- Fix: Gate the bubble motion values behind `!isMobile` check, return static values on mobile
- Saves: ~20 motion values from firing every frame on mobile

**2b. Reduce scroll runway heights on mobile**
- Hero: `h-[300vh]` → `h-[200vh]` on mobile (still enough for phone animation)
- CultureSection deck: `h-[280vh]` → already uses MobileCard (no deck on mobile, OK)
- Flywheel: `h-[400vh]` → `h-[250vh]` on mobile
- QuadrantSection: `h-[300vh]` → `h-[200vh]` on mobile
- ProcessSteps: `h-[350vh]` → `h-[250vh]` on mobile
- FeaturesList: `h-[250vh]` → `h-[180vh]` on mobile
- TestimonialsSection: `h-[170vh]` → keep (already reasonable)

**2c. QuadrantSection — simplify on mobile**
- File: `QuadrantSection.tsx`
- Reduce 29 `useTransform` hooks on mobile
- Simplify: show all quadrants + logos simultaneously without sequential animation on mobile
- Remove traveling dot animation on mobile (TravelingDot + getTotalLength = layout thrashing)
- Remove blur-[80px] light leak orbs on mobile: `hidden md:block`

**2d. Flywheel — reduce animation complexity on mobile**
- File: `CircularCycleDiagram.tsx`
- Reduce 18 motion values from hooks-in-loop
- On mobile: show all segments immediately, no scroll-driven build
- Remove background Orb blur effects on mobile (line 113-138)

---

### Phase 3: Mobile Layout Fixes (Low Risk)

**3a. SayDoGapSection + CultureBehaviorSection — phone sizing**
- Phone `clamp(230px, 22vw, 280px)` → at 393px this becomes 86px, WAY too small
- Fix: `clamp(200px, 55vw, 280px)` — at 393px → 216px (readable)
- Same for height: `clamp(380px, 100vw, 540px)` at mobile breakpoint
- Text maxWidth: `clamp(300px, 45vw, 500px)` → `clamp(300px, 85vw, 500px)` on mobile

**3b. ActivationSection — zoom to transform**
- CSS `zoom` is not GPU-accelerated, causes layout recalcs on Safari
- Replace `zoom: clamp(...)` with `transform: scale(...)` + adjust container sizing
- Or keep zoom but set a mobile-specific min zoom floor

**3c. QuadrantSection — readability at 393px**
- SVG viewBox 1000×800 squeezed to 393px width = text barely readable
- Consider: on mobile, stack the 4 quadrants vertically instead of SVG
- Or increase SVG text sizes for mobile

**3d. Touch target audit**
- Testimonial "See More" buttons: add `min-h-[44px] min-w-[44px]` padding
- Ensure all interactive elements meet 44×44px minimum

---

### Phase 4: Backdrop-Blur Reduction (Medium Risk)

**4a. Mobile nav — reduce blur**
- BubbleMenu: `backdrop-blur-2xl` → `backdrop-blur-sm` (or solid bg on mobile)
- MobileNav: `backdrop-blur-xl` → `backdrop-blur-sm`
- These are the highest-impact blur sources on mobile Safari

**4b. Modal overlays — solid backgrounds on mobile**
- DemoRequestModal, LoginModal: replace backdrop-blur with solid `bg-black/60`
- Eliminates GPU blur sampling during overlay

**4c. Remove unused backdrop-blur in concept files**
- CultureSection: cards already changed to `bg-white` (no blur)
- Clean up any remaining `backdrop-blur-sm/md` in card components

---

### Verify Checklist (Updated)
- [ ] Hero: phone element sizing correct at 393px, no dead scroll ticks
- [ ] CTA buttons: minimum 44×44px touch targets, no clipping
- [ ] CultureSection: mobile cards render correctly, no invisible animations running
- [ ] InfiniteScroll: items not cut off
- [ ] Flywheel: diagram fits 393px, labels readable, no scroll jank
- [ ] ProcessSteps: circle badge, text, images properly sized at 393px
- [ ] PlansSection: cards stack to single column, all content visible
- [ ] OneConversationSection: phone + headline + button fit at 393px
- [ ] QuadrantSection: readable on mobile, no blur-induced stutter
- [ ] Footer: all links tappable, no overflow
- [ ] App.tsx blur orbs not running on mobile
- [ ] Header scroll listener replaced with IntersectionObserver
- [ ] All below-fold images lazy loaded
- [ ] Scroll is smooth (no stutter) on iPhone 15 / mobile Chrome
- [ ] `prefers-reduced-motion` respected
- [ ] `npm run build` passes

---

## Section Spacing Normalization (Cross-cutting)

Pete: "Please make all section spacing uniform."

**Apply across all sections in HomePage.tsx:**
- Define a standard section gap: `clamp(4rem, 8vh, 6rem)`
- Apply as `marginTop` or `paddingTop` to each section wrapper
- Exceptions: sections that overlap intentionally (CultureSection over Hero)

---

## Done When
- [x] Hero releases immediately after animations complete — resolved by CultureSection overlap
- [ ] CultureSection: title shrinks while scrolling up, 3 cards with highlight progression, image on right
- [x] InfiniteScroll gap reduced 50%
- [ ] Flywheel: new labels (awaiting Pete's review for copy update)
- [x] Flywheel: no dead scrolling after animation — dynamic sticky collapse with scroll compensation
- [x] Flywheel positioned after "How Curi Creates Endless" section (FeaturesList)
- [x] ProcessSteps: badge stays fixed, uniform spacing, button not clipped
- [x] PlansSection: all cards appear at once, no build animation
- [x] OneConversationSection: black headline, no body copy, "Let's start yours" dissolves in
- [ ] Mobile responsive + performance fix complete (4 phases)
- [ ] Smooth scrolling on mobile, no stutter/jank
- [ ] All images lazy loaded, blur orbs disabled on mobile
- [x] All section spacing normalized (HomePage wrapper: clamp(3rem, 6vh, 5rem) gap)
- [ ] `npm run build` passes with no errors
