import { motion, AnimatePresence } from "motion/react";
import { Link, useLocation } from "react-router-dom";
import { X } from "lucide-react";

// Reuse the navigation structure
const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Solutions", href: "/our-solution" },
    { name: "Contact", href: "/contact" },
];

interface MobileNavProps {
    isOpen: boolean;
    onClose: () => void;
    onOpenWaitlist: () => void;
}

export function MobileNav({ isOpen, onClose, onOpenWaitlist }: MobileNavProps) {
    const location = useLocation();

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[1000]"
                    />

                    {/* Drawer Panel */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 30, stiffness: 300 }}
                        className="fixed inset-y-0 right-0 w-[80%] max-w-sm z-[1001] bg-white/30 backdrop-blur-xl border-l border-white/20 shadow-2xl flex flex-col pointer-events-auto"
                    >
                        {/* Header: Close Button */}
                        <div className="flex items-center justify-end p-6 border-b border-white/10">
                            <button
                                onClick={onClose}
                                className="p-2 rounded-full hover:bg-black/5 transition-colors text-slate-800 hover:text-black"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="flex-1 flex flex-col p-8 gap-8 overflow-y-auto">

                            {/* Navigation Links */}
                            <nav className="flex flex-col gap-6">
                                {navItems.map((item, index) => {
                                    const isActive = location.pathname === item.href;
                                    return (
                                        <Link
                                            key={item.name}
                                            to={item.href}
                                            onClick={onClose}
                                        >
                                            <motion.div
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: index * 0.1 }}
                                                className={`text-2xl font-light tracking-wide ${isActive ? 'text-[#235e9a] font-normal' : 'text-slate-800 hover:text-black'}`}
                                            >
                                                {item.name}
                                            </motion.div>
                                        </Link>
                                    );
                                })}
                            </nav>

                            {/* Separator */}
                            <div className="h-px bg-black/10 w-full" />

                            {/* CTA Button (Waitlist) */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                            >
                                <button
                                    onClick={() => {
                                        onClose();
                                        onOpenWaitlist();
                                    }}
                                    className="w-full py-4 rounded-xl bg-[#235e9a] text-white font-medium hover:bg-[#3b7ac2] transition-colors relative overflow-hidden group"
                                >
                                    <span className="relative z-10 flex items-center justify-center gap-2">
                                        Join Waitlist
                                        {/* Optional Arrow Icon */}
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-hover:translate-x-1 transition-transform">
                                            <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </span>
                                </button>
                            </motion.div>

                        </div>

                        {/* Footer / Branding - REMOVED */}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
