# Session Log: February 7, 2026

## 1. Footer Avatar Update

**File:** `src/assets/New Footer Animation.svg`

**Change:** Replaced the embedded lower avatar image in the footer SVG.

**Details:**
- Original: Man with orange beanie, orange sweater, orange background (JPEG embedded)
- New: Man with grey beanie, white sweater, **teal background** (PNG embedded)
- Image source: Generated avatar copied to `src/assets/footer-avatar-man-teal.png`
- Updated the `<image id="image0_116_146">` element with new base64-encoded PNG

---

## 2. OneConversationSection Animation Update

**File:** `src/app/components/OneConversationSection.tsx`

**Changes:**
1. **Removed sticky scrolling** - Section now scrolls normally with the page
2. **Kept scroll-linked phone rotation** - Phone rotates from 135° to 90° based on scroll position
3. **Removed fade-in effect on phone** - Phone is visible immediately
4. **All text animates together** - Single motion wrapper for all text content, synced with phone rotation
5. **Removed broken blur/scale effects** - Only clean opacity and transform animations remain

**Animation Behavior:**
- Phone rotates as section scrolls through viewport
- Animation plays both directions (scroll down = rotate to landscape, scroll up = rotate back)
- No sticky positioning, content flows naturally with page

---

## 3. Quadrant Section Title Styling

**File:** `src/app/components/QuadrantSection.tsx`

**Changes:**
- Changed color of "The Lonely Genius", "The Toolbox", and "The Scoreboard" titles to **white** (matching the section header)
- Added subtle blue glow effect behind these titles: `drop-shadow(0 0 8px rgba(51, 94, 152, 0.5))`
- Updated `QuadrantTitle` component to support optional `glow` prop

---

## 4. Quadrant Animation Timing Adjustment

**File:** `src/app/components/QuadrantSection.tsx`

**Changes:**
- Increased animation scroll ranges for 2nd, 3rd, and 4th quadrants by ~40% total
- **BL (2nd quadrant):** 50%-64%
- **BR (3rd quadrant):** 64%-80%
- **TR/Hub (4th quadrant):** 92%-100%
- Connection lines adjusted to follow new timing (80%-92%)

---

## 5. Culture Growth Section Animation

**File:** `src/app/components/CultureGrowthSection.tsx`

**Changes:**
- Implemented **scroll-linked animation** matching the "Our Plans" section
- Section height set to `250vh` with `sticky top-0` container
- Cards slide up from bottom (`110vh` → `0vh`) based on scroll progress
- Cards grid animates as a single unit (matching Plans section behavior)
- Removed static layout and previous mobile/tablet logic to ensure consistent behavior

---

## 6. Performance Section Parallax Update

**File:** `src/app/components/PerformanceSection.tsx`

**Changes:**
- Increased phone parallax scale animation
- **Old:** Scale `0.97` → `1.0`
- **New:** Scale `0.9` → `1.2` (Adjusted from 1.3 based on feedback)
- Result is a dramatic zoom-in effect as the user scrolls past the section

---

## 7. Process Section "Pro Max" Redesign

**File:** `src/app/components/ProcessSteps.tsx`

**Changes:**
- Implemented **Figma-based redesign** for "How to get started" cards
- **Style:**
  - Background: `bg-[#f5faff]` (Soft Blue Tint)
  - Typography: Significantly larger and bolder (Title ~40px, Body ~20px)
  - Badges: 56px Curi Blue circles
  - Borders: Removed gray borders, now using rounded corners (up to `40px`) and subtle shadows
- **UX:** Improved readability with relaxed line height and cleaner hierarchy
- **Responsiveness:** Adjusted mobile card size and padding for the new bolder style

---

## 8. Process Section Split View Implementation

**File:** `src/app/components/ProcessSteps.tsx`

**Changes:**
- Implemented **Sticky Split Layout**:
- **Left Column:** Fixed 50% width container holding images. Images cross-fade based on the active step in view.
- **Right Column:** Scrollable list of steps with large vertical spacing to trigger image changes.
- **Mobile:** Falls back to a stacked layout where images appear inline above each step card.
- **Assets:** Mapped 6 existing project assets to the 6 process steps.

## 9. Process Section Layout Fix (Screen-Height)

**File:** `src/app/components/ProcessSteps.tsx`

**Changes:**
- **Full-Screen Steps:** Changed right-column steps to `min-h-screen` to prevent overlapping/crowding.
- **Perfect Centering:** Left column is now `h-screen sticky top-0 flex items-center`, ensuring images are always vertically centered.
- **Scroll Logic:** Adjusted `useInView` to trigger exactly when a step hits the center of the viewport.



## 10. Process Section Animation & Styling Polish

**File:** `src/app/components/ProcessSteps.tsx`

**Changes:**
- **Synchronized Animations:** Updated image and text animations to be 100% synced (Duration: 0.5s, Ease: `easeInOut`).
- **Simplified Transition:** Removed scale/translate effects—now uses a clean **Opacity Fade** only.
- **Floating Images:** Removed the white background container, border, and shadow from the image area for a "floating" aesthetic.
- **Consistent Rounding:** Applied `rounded-[40px]` to all images directly, ensuring uniform look across all steps.

## 11. Process & Parallax Refinements

**Files:**
- `src/app/components/ProcessSteps.tsx`
- `src/app/components/CultureBehaviorSection.tsx`
- `src/app/components/SayDoGapSection.tsx`

**Changes:**
- **Image Updates:**
  - Replaced Step 2 image with `1b9795...4ca.png`.
  - Replaced Step 3 & 5 images with `27b5a2...a0a.png`.
- **Parallax Sync:** Updated "Culture" and "Say-Do Gap" sections' phone parallax animation (`scale: [0.9, 1.2]`) to match the dramatic zoom effect of the Performance Section.
