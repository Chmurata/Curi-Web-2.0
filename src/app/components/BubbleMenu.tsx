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
