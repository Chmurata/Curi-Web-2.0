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
