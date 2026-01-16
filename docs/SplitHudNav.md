# Split-Interaction HUD Navigation Component

> **Version:** 2.0.0 (Polished)
> **Last Updated:** 2026-01-17
> **File Location:** `src/app/components/SplitHudNav.tsx`

## Overview

The `SplitHudNav` is a technical, agency-style navigation concept. It uses a floating "dock" aesthetic with precise corner accents and bracketing effects. It emphasizes clarity and structure over organic motion, designed to feel engineered and premium.

---

## Design Specifications

### 1. **Visual Style**
- **Container:** A floating pill/rectangle with rounded corners (`rounded-lg`).
- **Background:** Fixed **30% opacity** glass (`bg-black/30` or `bg-white/30`) with `backdrop-blur-sm`.
- **Typography:** Uppercase, medium weight, `tracking-[0.2em]`. Uses the site's default sans-serif font (removed monospace).
- **Colors:**
  - **Active State:** **Brand Blue** (`#235e9a`) for text and cursor.
  - **Inactive:** Neutral grays (`text-neutral-500`) for low visual noise.

### 2. **Layout**
- **Position:** `fixed top-6 left-1/2 -translate-x-1/2` (Centered top).
- **Spacing:** Cleaner layout with removed vertical dividers. Consistent `gap-6` between items.
- **Layers:** `z-[999]` ensures it stays above all content.

### 3. **Interaction & Animation**
- **Active Cursor:** A 1px underline (`#235e9a`) that smoothly slides (`layoutId="tech-underline"`) under the active link.
- **Hover Effect:** Technical "Brackets" `[ ]` slide in from the sides (`x: -4` / `x: 4`) around the hovered item.
- **Entrance:** The entire dock fades in and slides down (`y: -20` to `0`) on load.

---

## Full Source Code

Copy and paste this into `src/app/components/SplitHudNav.tsx` to restore this version.

```tsx
import { useState } from "react";
import { motion } from "motion/react";
import { Link, useLocation } from "react-router-dom";

const navItems = [
    { name: "HOME", href: "/" },
    { name: "ABOUT", href: "/about" },
    { name: "SOLUTIONS", href: "/our-solution" },
    { name: "CONTACT", href: "/contact" },
];

export function SplitHudNav({ variant = 'light' }: { variant?: 'light' | 'dark' }) {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const location = useLocation();
    const isDark = variant === 'dark';

    // Theme Colors
    const textColor = isDark ? "text-neutral-400" : "text-neutral-500";
    const activeColor = "text-[#235e9a]"; // Brand Color for Active/Hover
    const borderColor = isDark ? "border-white/10" : "border-black/5";
    
    return (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[999] pointer-events-auto">
            <motion.nav
                className={`
                    relative flex items-center px-6 py-3
                    border ${borderColor} rounded-lg
                    backdrop-blur-sm transition-colors duration-300
                    ${isDark ? 'bg-black/30 hover:bg-black/30' : 'bg-white/30 hover:bg-white/30'}
                    group
                `}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
            >

                <div className="flex items-center gap-6">
                    {navItems.map((item, index) => {
                        const isActive = location.pathname === item.href;
                        const isHovered = hoveredIndex === index;

                        return (
                            <div key={item.name} className="relative flex items-center">
                                
                                <Link
                                    to={item.href}
                                    onMouseEnter={() => setHoveredIndex(index)}
                                    onMouseLeave={() => setHoveredIndex(null)}
                                    // Removed font-mono, kept tracking-widest
                                    className={`
                                        relative text-[11px] font-medium tracking-[0.2em]
                                        transition-colors duration-200
                                        ${isActive ? activeColor : textColor}
                                        hover:${activeColor}
                                    `}
                                >
                                    {item.name}

                                    {/* Tech Underline - Slides in (Brand Color) */}
                                    {isActive && (
                                        <motion.div
                                            layoutId="tech-underline"
                                            className="absolute -bottom-1 left-0 right-0 h-[1px] bg-[#235e9a]"
                                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                        />
                                    )}

                                    {/* Hover Bracket Effect (Technical) */}
                                    {isHovered && !isActive && (
                                        <>
                                            <motion.span 
                                                initial={{ opacity: 0, x: 2 }} animate={{ opacity: 1, x: -4 }} 
                                                className={`absolute -left-2 top-0 bottom-0 flex items-center ${activeColor}`}
                                            >[</motion.span>
                                            <motion.span 
                                                initial={{ opacity: 0, x: -2 }} animate={{ opacity: 1, x: 4 }}
                                                className={`absolute -right-2 top-0 bottom-0 flex items-center ${activeColor}`}
                                            >]</motion.span>
                                        </>
                                    )}
                                </Link>
                            </div>
                        );
                    })}
                </div>
            </motion.nav>
        </div>
    );
}
```

## Integration

Use it in `Header.tsx` or any top-level layout component:

```tsx
import { SplitHudNav } from "./SplitHudNav";

// In your JSX:
<header className="fixed top-0 left-0 right-0 z-[999] pointer-events-none">
  {/* Pass variant if using theme detection */}
  <SplitHudNav variant={menuVariant} />
</header>
```
