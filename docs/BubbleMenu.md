# Bubble Menu Component Documentation

> **Version:** 1.0.0  
> **Last Updated:** 2026-01-16  
> **File Location:** `src/app/components/BubbleMenu.tsx`

## Overview

The `BubbleMenu` is an animated, floating navigation menu component designed for mobile-first and desktop-responsive navigation. It features a circular toggle button with a glassmorphism (frosted glass) aesthetic, smooth Framer Motion animations, and supports both light and dark theme variants.

---

## Features

| Feature | Description |
|---------|-------------|
| **Animated Toggle** | Icon transitions (Menu ↔ X) with rotation and scale animations |
| **Glassmorphism Design** | Frosted glass effect using `backdrop-blur` CSS |
| **Theme Variants** | Supports `'light'` and `'dark'` color schemes |
| **Staggered Menu Items** | Menu links animate in with a cascading delay |
| **Active Route Highlighting** | Current page is visually highlighted |
| **Hover Effects** | Subtle lift and shadow on menu item hover |

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'light' \| 'dark'` | `'light'` | Controls the color scheme of the menu |

---

## Visual Design

### Button Styles by Variant

| Variant | Background | Border | Text Color |
|---------|------------|--------|------------|
| `light` | `bg-white/10` | `border-white/20` | `#0b1220` |
| `dark` | `bg-[#14181C]` | `border-[#171D21]` | `white` |

### Menu Panel Styles by Variant

| Variant | Background | Border |
|---------|------------|--------|
| `light` | `bg-white/30` | `border-white/40` |
| `dark` | `bg-[#14181C]` | `border-[#171D21]` |

---

## Animation Specifications

### Toggle Button Icon Animation

```javascript
// Open state (X icon)
initial: { rotate: -90, opacity: 0, scale: 0.5 }
animate: { rotate: 0, opacity: 1, scale: 1 }
exit: { rotate: 90, opacity: 0, scale: 0.5 }

// Closed state (Menu icon)
initial: { rotate: 90, opacity: 0, scale: 0.5 }
animate: { rotate: 0, opacity: 1, scale: 1 }
exit: { rotate: -90, opacity: 0, scale: 0.5 }

// Transition
duration: 0.3
ease: [0.32, 0.72, 0, 1] // Custom cubic-bezier
```

### Menu Panel Animation

```javascript
initial: { opacity: 0, scale: 0.9, y: -10 }
animate: { opacity: 1, scale: 1, y: 0 }
exit: { opacity: 0, scale: 0.9, y: -10 }
transition: { duration: 0.3, ease: [0.32, 0.72, 0, 1] }
```

### Menu Item Stagger Animation

```javascript
initial: { opacity: 0, x: 10 }
animate: { opacity: 1, x: 0 }
transition: { 
  delay: 0.05 + (index * 0.05),  // Staggered delay
  duration: 0.25 
}
```

---

## Navigation Links

The menu includes the following navigation items (defined in `navLinks` array):

| Name | Route |
|------|-------|
| Home | `/` |
| About | `/about` |
| Our Solution | `/our-solution` |
| Contact | `/contact` |

---

## Dependencies

- `react` - State management (`useState`)
- `motion/react` - Animations (`motion`, `AnimatePresence`)
- `react-router-dom` - Routing (`Link`, `useLocation`)
- `lucide-react` - Icons (`Menu`, `X`)

---

## Usage Example

### Basic Usage (Light Theme)

```tsx
import { BubbleMenu } from './components/BubbleMenu';

function App() {
  return (
    <header>
      <BubbleMenu />
    </header>
  );
}
```

### Dark Theme Variant

```tsx
<BubbleMenu variant="dark" />
```

### Dynamic Theme Based on Scroll Position

This is how the `Header.tsx` component uses the BubbleMenu with dynamic variant switching:

```tsx
import { useState, useEffect } from "react";
import { BubbleMenu } from "./BubbleMenu";

export function Header() {
  const [menuVariant, setMenuVariant] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const handleScroll = () => {
      const darkSection = document.getElementById('dark-section-id');
      if (darkSection) {
        const rect = darkSection.getBoundingClientRect();
        // Switch to dark variant when overlapping the dark section
        if (rect.top <= 100 && rect.bottom >= 100) {
          setMenuVariant('dark');
        } else {
          setMenuVariant('light');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header>
      <BubbleMenu variant={menuVariant} />
    </header>
  );
}
```

---

## Styling Reference

### Key CSS Classes

| Element | Classes |
|---------|---------|
| Container | `relative z-50` |
| Toggle Button | `w-12 h-12 rounded-full backdrop-blur-md border shadow-lg` |
| Menu Panel | `w-64 p-2 rounded-3xl backdrop-blur-2xl border shadow-2xl` |
| Menu Items | `px-5 py-3 rounded-2xl text-lg font-medium` |

### Typography

- **Font Family:** `'Bricolage_Grotesque'`
- **Font Size:** `text-lg` (18px)
- **Font Weight:** `font-medium` (500)

### Colors

| Purpose | Light Variant | Dark Variant |
|---------|---------------|--------------|
| Text (default) | `#0b1220` | `white` |
| Text (active/hover) | `#235e9a` | `#235e9a` |
| Active Item Background | `white` | `white` |
| Hover Item Background | `white` | `#171D21` |

---

## Full Source Code (Backup)

```tsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Our Solution", href: "/our-solution" },
    { name: "Contact", href: "/contact" },
];

export function BubbleMenu({ variant = 'light' }: { variant?: 'light' | 'dark' }) {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    // Determine styles based on variant
    const buttonBg = variant === 'dark' ? 'bg-[#14181C] border-[#171D21] text-white' : 'bg-white/10 border-white/20 text-[#0b1220]';
    const menuBg = variant === 'dark' ? 'bg-[#14181C] border-[#171D21]' : 'bg-white/30 border-white/40';

    return (
        <div className="relative z-50">
            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`relative z-50 w-12 h-12 rounded-full backdrop-blur-md border shadow-lg flex items-center justify-center hover:scale-105 transition-all duration-300 ${buttonBg}`}
            >
                <AnimatePresence mode="wait">
                    {isOpen ? (
                        <motion.div
                            key="close"
                            initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                            animate={{ rotate: 0, opacity: 1, scale: 1 }}
                            exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                            transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
                        >
                            <X size={24} />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="menu"
                            initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
                            animate={{ rotate: 0, opacity: 1, scale: 1 }}
                            exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
                            transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
                        >
                            <Menu size={24} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </button>

            {/* Menu Items */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: -10 }}
                        transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
                        className={`absolute top-16 right-0 w-64 p-2 rounded-3xl backdrop-blur-2xl border shadow-2xl flex flex-col gap-1 origin-top-right overflow-hidden ${menuBg}`}
                    >
                        {navLinks.map((link, idx) => (
                            <motion.div
                                key={link.name}
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.05 + idx * 0.05, duration: 0.25 }}
                            >
                                <Link
                                    to={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className={`block px-5 py-3 rounded-2xl text-lg font-medium font-['Bricolage_Grotesque'] transition-all duration-200 ${location.pathname === link.href
                                        ? 'bg-white shadow-md text-[#235e9a]'
                                        : `${variant === 'dark' ? 'text-white hover:bg-[#171D21]' : 'text-[#0b1220] hover:bg-white'} hover:shadow-lg hover:-translate-y-0.5 hover:text-[#235e9a]`
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
```

---

## Design Alternatives History

This section will store different design variations as they are explored:

### Version 1.0.0 (Current - 2026-01-16)
- **Design:** Glassmorphism with frosted glass effect
- **Animation:** Rotation + scale for icon toggle, scale + fade for menu panel
- **Features:** Light/Dark variants, staggered menu items, active route highlighting

---

## Notes for Future Iterations

- Consider adding keyboard navigation (Escape to close, Arrow keys to navigate)
- Consider adding click-outside-to-close functionality
- Mobile touch gestures (swipe to close) could be added
- Different animation presets could be explored (slide, flip, morphing)
