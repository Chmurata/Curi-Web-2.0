import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import { assets } from "./Imports";
import { LoginModal } from "./LoginModal";
import { RoundedArrowButton } from "./ui/RoundedArrowButton";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const location = useLocation();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const scrolled = latest > 50;
    if (scrolled !== isScrolled) {
      setIsScrolled(scrolled);
    }
  });

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Our Solution", href: "/our-solution" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 pointer-events-none"
      >
        <div className={`relative transition-all duration-500 ease-out pointer-events-auto w-full max-w-full ${isScrolled
          ? "px-6 py-4 md:px-8"
          : "px-4 pt-6"
          }`}>

          {/* Flex container for logo and button */}
          <div className={`flex items-center transition-all duration-500 ease-out ${isScrolled
            ? "justify-between"
            : "justify-between md:justify-center md:gap-12"
            }`}>

            {/* Logo */}
            <Link
              to="/"
              className="shrink-0 z-50"
              onClick={(e) => {
                if (location.pathname === '/') {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
            >
              <img
                src={assets.logo}
                alt="Curi Logo"
                className="h-10 w-auto object-contain cursor-pointer"
              />
            </Link>

            {/* Desktop Navigation */}
            {!isScrolled && (
              <motion.nav
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="hidden md:flex items-center gap-8 text-[15px] font-medium text-[#3b4558]"
              >
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.href}
                    className={`hover:text-[#235e9a] transition-colors ${location.pathname === link.href ? 'text-[#235e9a]' : ''}`}
                  >
                    {link.name}
                  </Link>
                ))}
              </motion.nav>
            )}

            {/* Desktop CTA Button */}
            <div className="hidden md:block z-50">
              <button
                onClick={() => setIsModalOpen(true)}
                className="relative group overflow-hidden rounded-full bg-[#235e9a] text-white h-[48px] w-[160px] flex items-center justify-center shrink-0"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#235e9a] via-[#3b7ac2] to-[#235e9a] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div
                  className="absolute inset-0 flex items-center overflow-hidden"
                  style={{ maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)" }}
                >
                  <motion.div
                    className="flex gap-4 whitespace-nowrap px-4 font-normal font-['Bricolage_Grotesque']"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{
                      repeat: Infinity,
                      ease: "linear",
                      duration: 5,
                    }}
                  >
                    <span>Join Waitlist –</span>
                    <span>Join Waitlist –</span>
                    <span>Join Waitlist –</span>
                    <span>Join Waitlist –</span>
                  </motion.div>
                </div>
              </button>
            </div>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsMenuOpen(true)}
              className="md:hidden h-[40px] w-[40px] bg-white rounded-full flex items-center justify-center text-[#235e9a] z-50 shadow-md"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>

        {/* Login Modal */}
        <LoginModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: "0%" }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
            className="fixed inset-0 bg-white z-[60] flex flex-col pt-6 px-4 pb-12 overflow-y-auto"
          >
            {/* Header in Overlay */}
            <div className="flex items-center justify-between mb-20 pointer-events-auto">
              <img
                src={assets.logo}
                alt="Curi Logo"
                className="h-10 w-auto object-contain"
              />
              <button
                onClick={() => setIsMenuOpen(false)}
                className="h-[40px] w-[40px] bg-white rounded-full flex items-center justify-center text-[#235e9a] shadow-md border border-slate-100"
              >
                <X size={24} />
              </button>
            </div>

            {/* Menu Links */}
            <div className="flex-1 flex flex-col items-center justify-center gap-8 mb-12 pointer-events-auto">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: 0.1 + (i * 0.05), duration: 0.4, ease: "easeOut" }}
                >
                  <Link
                    to={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`text-[32px] font-['Bricolage_Grotesque'] font-medium hover:text-[#235e9a] transition-colors ${location.pathname === link.href ? 'text-[#235e9a]' : 'text-[#0b1220]'}`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Footer Icon */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              className="flex flex-col items-center gap-6 pointer-events-auto"
            >
              <a href="https://www.linkedin.com/company/curiai/" target="_blank" rel="noopener noreferrer" className="text-[#235e9a] hover:opacity-80 transition-opacity">
                <div className="w-10 h-10 bg-[#235e9a] rounded-[4px] flex items-center justify-center text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect x="2" y="9" width="4" height="12" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </div>
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
