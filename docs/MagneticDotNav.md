# Magnetic Dot Navigation Component

> **Version:** 2.0.0 (Polished)
> **Last Updated:** 2026-01-17
> **File Location:** `src/app/components/MagneticDotNav.tsx`

## Overview

The `MagneticDotNav` is an ultra-minimalist navigation concept. By default, it appears as a small row of dots. When the user interacts (hovers), the container expands into labeled pill buttons relative to the content. It prioritizes maximizing viewport space when idle.

---

## Design Specifications

### 1. **Visual Style**
- **Idle State:** A small cluster of dots (`p-2 rounded-full`). Active page is a larger blue dot (`bg-[#235e9a]`). Inactive pages are small transparent dots.
- **Active (Hovered):** Expands into a full pill menu.
- **Colors:**
  - **Active:** Brand Blue (`#235e9a`) background with White text.
  - **Inactive:** Glassy backgrounds (`bg-white/10` or `bg-black/5`) with theme-aware text.

### 2. **Animation (Smooth)**
- Uses **Cubic Bezier Easing** (`[0.25, 0.1, 0.25, 1.0]`) for premium smoothness.
- **No Jumps:** The text is always rendered but hidden via `width` and `opacity` masking, ensuring no layout thrashing during expansion.

### 3. **Layout**
- **Position:** `fixed top-8 left-1/2 -translate-x-1/2`.
- **Z-Index:** **999**.

---

## Full Source Code

Copy and paste this into `src/app/components/MagneticDotNav.tsx` to restore this version.

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

export function MagneticDotNav({ variant = 'light' }: { variant?: 'light' | 'dark' }) {
    const [isHovered, setIsHovered] = useState(false);
    const location = useLocation();
    const isDark = variant === 'dark';

    return (
        <div 
            className="fixed top-8 left-1/2 -translate-x-1/2 z-[999] pointer-events-auto"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <motion.nav
                className="flex items-center gap-2 p-2 rounded-full"
                // Removed gap animation to isolate smoothness
            >
                {navItems.map((item) => {
                    const isActive = location.pathname === item.href;

                    // Base colors
                    // Active: Brand Blue
                    // Inactive: Neutral Dot
                    const textColor = isActive 
                        ? "text-white" 
                        : (isDark ? "text-white" : "text-black");

                    return (
                        <Link key={item.name} to={item.href} className="relative group block">
                            <motion.div
                                className={`relative flex items-center justify-center overflow-hidden rounded-full ${isActive ? 'bg-[#235e9a]' : (isDark ? 'bg-white/10 hover:bg-white/20' : 'bg-black/5 hover:bg-black/10')} backdrop-blur-md transition-colors`}
                                initial={false}
                                animate={{
                                    width: isHovered ? "auto" : (isActive ? 12 : 8),
                                    height: isHovered ? 36 : (isActive ? 12 : 8),
                                    opacity: 1
                                }}
                                transition={{
                                    duration: 0.4,
                                    ease: [0.25, 0.1, 0.25, 1.0], // smooth cubic-bezier
                                }}
                            >
                                {/* Text Content - Always rendered, hidden by parent width/overflow */}
                                <motion.div
                                    className={`whitespace-nowrap px-4 text-sm font-medium ${textColor}`}
                                    animate={{
                                        opacity: isHovered ? 1 : 0,
                                        transform: isHovered ? "translateX(0px)" : "translateX(10px)"
                                    }}
                                    transition={{ duration: 0.3, delay: isHovered ? 0.1 : 0 }} // Delay fade in slightly
                                >
                                    {item.name}
                                </motion.div>
                            </motion.div>
                        </Link>
                    );
                })}
            </motion.nav>
        </div>
    );
}
```

## Integration

Use it in `Header.tsx`:

```tsx
import { MagneticDotNav } from "./MagneticDotNav";

// In your JSX:
<MagneticDotNav variant={menuVariant} />
```
