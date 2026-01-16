import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Link, useLocation } from "react-router-dom";
import { Menu } from "lucide-react";

const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Solutions", href: "/our-solution" },
    { name: "Contact", href: "/contact" },
];

export function NanoCapsuleNav({ variant = 'light' }: { variant?: 'light' | 'dark' }) {
    const [isHovered, setIsHovered] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    // Scroll detection
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Theme Config
    const isDark = variant === 'dark';

    // Transparent Background (opacity reduced ~70% from /50 to /15)
    const borderColor = isDark ? "border-white/10" : "border-black/5";
    const bgColor = isDark ? "bg-[#14181C]/15" : "bg-white/15";

    return (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[999] pointer-events-auto">
            <motion.nav
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
                className={`
                    relative flex items-center justify-center 
                    backdrop-blur-xl border
                    overflow-hidden
                    ${bgColor} ${borderColor}
                    rounded-full
                `}
                initial={{ width: "auto", height: "48px" }}
                animate={{
                    width: scrolled && !isHovered ? "48px" : "auto",
                    height: "48px",
                    padding: scrolled && !isHovered ? "0" : "0 2px",
                    gap: scrolled && !isHovered ? "0" : "2px"
                }}
                transition={{
                    duration: 0.2,
                    ease: "easeOut"
                }}
            >
                {/* Collapsed State (Hamburger Menu) */}
                <div
                    className={`absolute inset-0 flex items-center justify-center transition-opacity duration-200 ${scrolled && !isHovered ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                >
                    <Menu size={20} className={isDark ? 'text-white' : 'text-neutral-900'} />
                </div>

                {/* Expanded Menu State */}
                <div
                    className={`flex items-center h-full px-1 transition-opacity duration-200 ${!scrolled || isHovered ? 'opacity-100' : 'opacity-0'}`}
                >
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.href;

                        // Text Colors
                        let textColor = isDark ? "text-neutral-400 hover:text-white" : "text-neutral-500 hover:text-black";
                        if (isActive) textColor = "text-[#235e9a]"; // Brand color

                        return (
                            <Link
                                key={item.name}
                                to={item.href}
                                className={`relative flex items-center justify-center px-3 py-2 text-sm font-medium transition-colors ${!scrolled || isHovered ? 'pointer-events-auto' : 'pointer-events-none'}`}
                            >
                                <span className={`relative z-10 ${textColor}`}>
                                    {item.name}
                                </span>

                                {/* Active Pill Background */}
                                {isActive && (
                                    <motion.div
                                        layoutId="active-pill"
                                        className={`absolute inset-0 rounded-full border ${isDark ? 'bg-white/10 border-white/10' : 'bg-black/5 border-black/5'}`}
                                        transition={{ duration: 0.2 }}
                                    />
                                )}
                            </Link>
                        );
                    })}
                </div>
            </motion.nav>
        </div>
    );
}
