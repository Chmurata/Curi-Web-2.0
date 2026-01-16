# Glass Thread Navigation Component

> **Version:** 2.0.0 (Polished)
> **Last Updated:** 2026-01-17
> **File Location:** `src/app/components/GlassThreadNav.tsx`

## Overview

The `GlassThreadNav` is a minimalist, architectural navigation concept. It visualizes the navigation flow as a thin "thread" connecting key sections (nodes), inspired by timeline or process diagrams. It is designed to be extremely lightweight and unobtrusive while providing rich interaction feedback.

---

## Design Specifications

### 1. **Visual Style**
- **Structure:** A faint, horizontal gradient line (`1px` height) connecting navigation nodes.
- **Nodes (Dots):** solid circles (`w-3 h-3`) that sit *on top* of the line (using Z-layering).
- **Colors:**
  - **Active Node & Text:** **Brand Blue** (`#235e9a`).
  - **Inactive Line:** Transparent-to-White/Black gradient.
  - **Inactive Node:** **Slate** tones (`bg-slate-200` / `bg-slate-600`) with subtle borders to blend with themes.

### 2. **Layout & Positioning**
- **Vertical Align:** `top-[48px]` (Perfectly aligned with the center of the Logo and Header CTA).
- **Width:** `w-[240px]` (Compact spacing between nodes).
- **Z-Index:** **999** (Ensures visibility over sticky scroll content).

### 3. **Interaction & Animation**
- **Hover/Active:**
  - **Dot:** Springs up to **1.3x** scale (`stiffness: 300, damping: 20`).
  - **Label:** Springs in from below (`y: 14`) with a slight scale effect.
- **Labels:** Uppercase, tracking-wide text that only appears on hover/active.

### 4. **Layering Logic**
- To prevent the "line" from appearing on top of the dots, the component uses explicit Z-index layers:
  - **Layer 0:** Gradient Line (`z-0`).
  - **Layer 10:** Node Dots (`z-10`) with solid backgrounds to visually occlude the line behind them.

---

## Full Source Code

Copy and paste this into `src/app/components/GlassThreadNav.tsx` to restore this version.

```tsx
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link, useLocation } from "react-router-dom";

const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Solutions", href: "/our-solution" },
    { name: "Contact", href: "/contact" },
];

export function GlassThreadNav({ variant = 'light' }: { variant?: 'light' | 'dark' }) {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const location = useLocation();
    const isDark = variant === 'dark';

    // Colors
    const lineColor = isDark ? "from-transparent via-white/40 to-transparent" : "from-transparent via-black/20 to-transparent";
    const textColor = isDark ? "text-white" : "text-black";

    return (
        <div className="fixed top-[48px] left-1/2 -translate-x-1/2 z-[999] pointer-events-auto flex flex-col items-center">

            {/* Container for Thread + Nodes (Tighter width: w-[240px]) */}
            <div className="relative w-[240px] flex justify-between items-center">

                {/* The Thread Line (Layered Behind: z-0) */}
                <div 
                    className={`absolute top-1/2 left-0 w-full h-[1px] -translate-y-1/2 bg-gradient-to-r ${lineColor} z-0`} 
                />

                {/* Navigation Nodes (Layered Above: z-10) */}
                {navItems.map((item, index) => {
                    const isActive = location.pathname === item.href;
                    const isHovered = hoveredIndex === index;

                    // Node styling - Larger, Slate tones for inactive
                    const nodeColor = isActive 
                        ? "bg-[#235e9a]" // Active Brand Color
                        : (isDark ? 'bg-slate-600 border border-white/20' : 'bg-slate-200 border border-black/10');

                    return (
                        <div
                            key={item.name}
                            className="relative group flex flex-col items-center z-10"
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        >
                            {/* Hit Area for easier hovering */}
                            <Link to={item.href} className="absolute -inset-4 z-20 cursor-pointer" />

                            {/* The Node (Larger w-3 h-3) */}
                            <motion.div
                                className={`w-3 h-3 rounded-full ${nodeColor}`}
                                animate={{
                                    scale: isActive || isHovered ? 1.3 : 1, 
                                    opacity: 1 
                                }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            />

                            {/* Label (Floating below) */}
                            <AnimatePresence>
                                {(isHovered || isActive) && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, y: 14, scale: 1 }}
                                        exit={{ opacity: 0, y: 0, scale: 0.9 }}
                                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                        className={`absolute top-full whitespace-nowrap text-xs font-medium tracking-wide uppercase ${isActive ? 'text-[#235e9a]' : textColor}`}
                                    >
                                        {item.name}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
```

## Integration

Use it in `Header.tsx` or any top-level layout component:

```tsx
import { GlassThreadNav } from "./GlassThreadNav";

// In your JSX:
<header className="fixed top-0 left-0 right-0 z-[999] pointer-events-none">
  {/* Pass variant if using theme detection */}
  <GlassThreadNav variant={menuVariant} />
</header>
```
