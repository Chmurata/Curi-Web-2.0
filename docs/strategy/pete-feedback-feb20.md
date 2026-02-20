# Pete Feedback — Latest Tasks (Feb 20, 2026)

## Project Type
**WEB** — React + Vite + Tailwind CSS 4 + Motion/React

---

## Source
Pete's Slack message (Feb 20, 3:05 AM)

---

## 🆕 NEW TASKS (Priority)

### Task 1: Flywheel — Evolve "The Sticky Hub" (Concept 3) with Ascending Spiral Effect

**File:** `src/app/components/FlywheelStickyHub.tsx`
**Priority:** P0
**Effort:** Large
**Status:** ⬜ PENDING

**Context:** Pete reviewed 3 flywheel concept explorations:
- **Concept 1 — The Relay** (`FlywheelRelay.tsx`)
- **Concept 2 — The DNA Helix** (`FlywheelHelix.tsx`)
- **Concept 3 — The Sticky Hub** (`FlywheelStickyHub.tsx`) ← **WINNER**

**Pete's Feedback (verbatim):**
> "3 is the only one that can fit the 'flywheel' framework. But if you can turn 2 into a 3d cylinder of cards turning and then coming back to 1, that could also work. The idea of the flywheel is that when 6 feeds into 1 again, 1 is more effective/powerful/valuable as a result of the flywheel effect. So ultimate visual would be the first time 6 feeds back into 1, instead of being on the same cylinder plane, it would add another higher level cylinder for the new 1A on the second level, and the 3rd time on a 3rd level. If someone wanted to spin it with their mouse or finger it should spin separate from scroll."
>
> "Otherwise your version 3 is good, leaves more room for explanation of each step. But if there's a way to go around a second/third time then 1-6 would be a bit bigger, brighter and I'd explain in the text what is happening. This might be easiest to implement."

**Pete's Core Concept — The Ascending Flywheel:**
The flywheel effect means each cycle makes step 1 stronger. Visually:
- **Cycle 1:** Steps 1→6 play through on the first level (base)
- **Cycle 2:** When step 6 feeds back into step 1, the new "1A" appears on a HIGHER level — bigger, brighter. Steps 1A→6A play on this elevated plane.
- **Cycle 3:** Step 6A feeds into "1B" on a THIRD level — even bigger, brighter. The flywheel ascends.

**Two Possible Approaches (Pete mentioned both):**

**Approach A — Enhance Sticky Hub (Concept 3) with multi-cycle progression:**
- Keep the Sticky Hub layout (Pete says "good, leaves more room for explanation")
- After steps 1-6 complete, cycle back to step 1 but bigger/brighter
- Each cycle through 1-6 makes cards progressively larger and more vivid
- Text updates to explain what's happening in each cycle
- **Pete says this "might be easiest to implement"**

**Approach B — 3D Cylinder of rotating cards (inspired by Concept 2):**
- Transform the Helix concept into a 3D cylinder where cards rotate around
- When cycle completes (6→1), cylinder ascends to a new level
- Creates a stacking/ascending spiral effect
- Mouse/finger drag to spin the cylinder independently of scroll

**Interaction Requirements:**
- User should be able to spin/rotate the flywheel with mouse drag or touch
- Spinning should be INDEPENDENT from scroll progression
- Scroll advances the steps; manual spin is for exploration

**Verify:**
- Steps 1-6 progress clearly through the flywheel
- After step 6, the cycle visually feeds back into step 1
- Each subsequent cycle shows steps as bigger/brighter (ascending effect)
- Mouse/touch drag spins the visual independently of scroll
- Explanatory text updates with each cycle
- Smooth performance on mobile (GPU-accelerated transforms only)

---

### Task 2: Update Phone Number on All Pages

**Files:** `src/app/pages/ContactPage.tsx` (+ any other files with phone number)
**Priority:** P0
**Effort:** Small
**Status:** ⬜ PENDING

**Pete's Request (verbatim):**
> "Anik please change the phone number on all pages to 609-215-8800"

**Current State:**
- ContactPage.tsx line 139: `href="tel:3194382874"` (319-438-2874)
- May exist in other files — search all `.tsx` files for old number

**Fix:**
- Replace all instances of `3194382874` / `319-438-2874` with `6092158800` / `609-215-8800`
- Update both `href="tel:..."` and any displayed text

**Verify:**
- Phone number reads `609-215-8800` everywhere on the site
- `tel:` links dial `6092158800`
- No references to old number remain

---

## Summary Checklist

- [ ] Task 1: Flywheel — Evolve Sticky Hub with ascending spiral / multi-cycle effect
- [ ] Task 2: Update phone number to 609-215-8800 on all pages

---

## Done When

- [ ] Flywheel shows multi-cycle ascending progression (bigger/brighter each cycle)
- [ ] Flywheel can be spun with mouse/finger independently of scroll
- [ ] Phone number is 609-215-8800 everywhere
- [ ] No references to old phone number (319-438-2874)
