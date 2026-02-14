# Pete Feedback — Latest Tasks (Feb 12, 2026)

## Project Type
**WEB** — React + Vite + Tailwind CSS 4 + Motion/React

---

## 🆕 NEW TASKS (Priority)

### Task A: ProcessSteps ("How to get started with Curi") — Reduce Scroll by 70% ✅

**File:** `src/app/components/ProcessSteps.tsx`
**Priority:** P0
**Effort:** Small
**Status:** ✅ COMPLETED (Feb 11)

**Problem:** Pete: "For the How to get started with Curi section, reduce the scroll required to get to next item to 30% of what it is now."

**Current State:**
- Section likely uses `h-[350vh]` or similar tall scroll container
- Each step requires significant scrolling before advancing to next

**Fix:**
- Identify current scroll height for ProcessSteps section
- Reduce total scroll height to **30% of current value**
  - Example: If currently `h-[350vh]` → reduce to `h-[105vh]`
- Adjust step transition scroll ranges proportionally to maintain smooth progression
- Update `useScroll` offset ranges to match new compressed scroll timeline

**Verify:**
- Steps advance 3x faster than before
- All 6 steps still visible and properly animated
- No dead scroll zones
- Smooth transitions between steps

---

### Task B: Quadrants — Reduce Competitor Logo Hover Brightness ✅

**File:** `src/app/components/QuadrantSection.tsx` (or similar)
**Priority:** P0
**Effort:** Small
**Status:** ✅ COMPLETED (Feb 11)

**Problem:** Pete: "For the Quadrants, it's looking great, but too much white contrast on the hover over of competitor logos. Reduce the white down so it increases only by 5% so it's clear it's selected but the swell does the job."

**Current State:**
- Competitor logos have hover effect with significant brightness increase
- Too much white/brightness contrast on hover

**Fix:**
- Find hover/active state styling for competitor logos in Quadrants section
- Current likely: `brightness(1.5)` or `brightness(2)` or similar high value
- Change to: `brightness(1.05)` — only 5% brightness increase
- Keep the swell/scale animation as-is (Pete says "swell does the job")
- Ensure hover is still noticeable but subtle

**Verify:**
- Logo hover shows only +5% brightness increase
- Swell animation remains prominent
- Hover state is still clearly visible but not overpowering

---

### Task C: Section Reordering — Move "Moment by Moment" After Quadrants ✅

**File:** `src/app/pages/HomePage.tsx`
**Priority:** P0
**Effort:** Small
**Status:** ✅ COMPLETED (Feb 11)

**Problem:** Pete: "We need to change the layout of sections, the Moment by moment right before pricing section is too similar (3 horizontal cards). Put the Moment by Moment after quadrants."

**Current Order Issue:**
- "Moment by Moment" section currently appears right before Pricing
- Has 3 horizontal cards layout
- Too similar to another nearby section with 3 horizontal cards (layout fatigue)

**Required New Order:**
```
...
→ Quadrants Section
→ Moment by Moment Section  ← MOVE HERE
...
→ Pricing Section  ← Moment by Moment was here before
```

**Fix:**
- Locate "Moment by Moment" section component in HomePage.tsx
- Move it to appear immediately after Quadrants section
- Verify section spacing/padding remains consistent

**Verify:**
- Moment by Moment appears right after Quadrants
- No longer adjacent to Pricing section
- Visual flow makes sense
- Section spacing uniform

---

## 📋 PENDING TASKS (From Previous Feedback)

### Task 2: CultureSection Redesign — Shrinking Title + 3-Card Layout

**File:** `src/app/components/CultureSection.tsx`
**Priority:** P0
**Effort:** Large
**Status:** ⏳ Awaiting Pete's images and copy

**Problem:** Pete wants major redesign with shrinking "Culture Realized" title and 3-card highlighted progression layout.

**Requirements:**
1. "Culture Realized" text starts huge and shrinks as user scrolls (NOT sticky)
2. 3-card section below with image on right (opposite of ProcessSteps layout)
3. First card highlighted, others grayed out
4. Highlight advances on scroll: card 1 → 2 → 3
5. Speech bubbles remain with fade behavior
6. No sticky delay when exiting section

**Blocked By:** Waiting for Pete to provide final images and copy

---

### Task 4: Flywheel — Label Updates + Highlight Fix + Swell Delay + Dead Scroll Fix

**Files:** `src/app/components/CircularCycleDiagram.tsx`, `src/app/components/FlywheelSection.tsx`
**Priority:** P0
**Effort:** Medium

**Sub-tasks:**

**4a. Update Labels (Awaiting Pete's Review)**
- Replace current 6 labels with Pete's new copy:
  1. "Employee 1 Receives Coaching"
  2. "Sends Invitation to Engage"
  3. "Employee 2 Receives Coaching"
  4. "Successful Facilitated Conversation"
  5. "Employees Insight: All Parties Receive Coaching"
  6. "Insight Builds Confidence to Engage in Challenging Conversations"
- Update headline: "The Employee Interaction Confidence Flywheel"

**4b. Label Highlight Not Working**
- Current highlight window too narrow (0.04 scroll progress)
- Brightness change insufficient for visibility
- **Fix:**
  - Widen highlight window: `start + 0.04` → `start + 0.12`
  - Increase brightness: `1.5 → 2.0`
  - Add color shift: white → `#7dd3fc` (light blue glow)
  - Add scale pulse: `1 → 1.15 → 1`

**4c. Swell Too Soon — Delay Until Background Painted**
- Current: Labels swell at 0.05 + (i * 0.10)
- Background arrows should paint first (0.0-0.3)
- **Fix:** Shift label swell start to `0.30 + (i * 0.07)`

**4d. Dead Scrolling — Reduce from 400vh to 280vh**
- Current: `h-[400vh]` with 140vh of dead scroll
- **Fix:** Reduce to `h-[280vh]`
- Update segment timing: `start = 0.05 + (i * 0.09)`, duration = 0.09
- Update flywheel rotation: `[0.3, 1.0]` → `[0.25, 0.65]`
- Update hasAppeared threshold: `0.7` → `0.62`

---

### Task 7: ProcessSteps — Button Cutoff Fix

**File:** `src/app/components/ProcessSteps.tsx`
**Priority:** P1
**Effort:** Small

**Problem:** CTA button gets cut off on resize at certain viewport sizes.

**Root Cause:** Likely `overflow: hidden` on sticky container or insufficient padding.

**Fix:**
- Remove `overflow-hidden` where safe, change to `overflow-visible`
- Add `pb-16` or `pb-20` to content container for button clearance
- Test at tablet breakpoints (640-1024px)

**Verify:** Button never clips at any viewport width

---

### Task 10: Mobile Responsiveness — User-Driven Testing

**Files:** Multiple sections
**Priority:** P0
**Effort:** Large (Iterative)
**Approach:** Fix sections individually based on real device testing

**Workflow:**
1. User tests specific sections on mobile device
2. Reports which sections have lag/stuttering
3. We fix those sections with performance optimizations (NOT removing animations)
4. Repeat until all sections are smooth

**Current Issues Reported:**
- ✅ **Hero Section:**
  - Stuttering/lag on phone frame scroll
  - Culture Realized text too far below phone (spacing issue)

**Optimization Strategy (Keep ALL Animations):**
- Image optimization (WebP, srcset, compression)
- GPU acceleration (`will-change`, `translate3d`, `preserve-3d`)
- Render optimization (`content-visibility`, `contain`)
- Motion value optimization (useSpring configs)

**Next:** User will test and report additional problematic sections

---

## Summary Checklist

**New Tasks (Top Priority):**
- [x] Task A: ProcessSteps - Reduce scroll to 30% of current ✅
- [x] Task B: Quadrants - Reduce hover brightness to +5% only ✅
- [x] Task C: Reorder sections - Move "Moment by Moment" after Quadrants ✅

**Pending Tasks:**
- [ ] Task 2: CultureSection redesign (awaiting Pete's assets)
- [ ] Task 4a: Flywheel label updates (awaiting Pete's review)
- [ ] Task 4b: Flywheel highlight fix
- [ ] Task 4c: Flywheel swell delay
- [ ] Task 4d: Flywheel dead scroll fix
- [ ] Task 7: ProcessSteps button cutoff
- [ ] Task 10: Mobile responsive fixes (Hero section in progress)

---

## Done When

**New Tasks:**
- [x] ProcessSteps advances to next step 3x faster than before ✅
- [x] Quadrant competitor logos hover at +5% brightness only ✅
- [x] "Moment by Moment" section appears immediately after Quadrants ✅
- [x] Section flow feels natural with new order ✅

**Mobile (In Progress):**
- [ ] Hero section scroll is smooth on mobile (no stuttering)
- [ ] Culture Realized text properly positioned relative to phone
- [ ] All animations remain intact and perform well
