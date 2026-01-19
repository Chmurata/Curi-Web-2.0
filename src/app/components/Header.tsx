import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "motion/react";
import { assets } from "./Imports";
import { LoginModal } from "./LoginModal";
import { BubbleMenu } from "./BubbleMenu"; // New Bubble Menu
import { NanoCapsuleNav } from "./NanoCapsuleNav";

export function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();
  const [menuVariant, setMenuVariant] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    // Detect if we are over the dark Quadrant section
    const handleScroll = () => {
      const quadrantSection = document.getElementById('quadrant-section');
      if (quadrantSection) {
        const rect = quadrantSection.getBoundingClientRect();
        // Check if the top right area (where the menu is) overlaps with the section
        // We consider the top 100px of the viewport
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
    <>
      <header className="fixed top-0 left-0 right-0 z-[999] pointer-events-none">

        {/* Logo - Top Left */}
        <div className="absolute top-6 left-6 md:left-12 pointer-events-auto">
          <Link
            to="/"
            onClick={(e) => {
              if (location.pathname === '/') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="block lg:p-0 lg:w-auto lg:h-auto w-12 h-12 flex items-center justify-center lg:bg-transparent lg:border-0 lg:backdrop-blur-0 lg:shadow-none bg-white/10 border border-white/20 backdrop-blur-md shadow-lg rounded-full hover:scale-105 transition-all duration-300"
          >
            <img
              src={assets.logo}
              alt="Curi Logo"
              className="lg:h-12 h-10 w-auto object-contain lg:hover:opacity-80 transition-opacity"
            />
          </Link>
        </div>

        {/* Right Side: CTA + Mobile Menu Trigger */}
        <div className="absolute top-6 right-6 md:right-12 pointer-events-auto flex items-center gap-4">

          {/* Desktop CTA Button - Hidden on Mobile */}
          <div className="hidden lg:block">
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

          {/* Mobile/Tablet Bubble Menu - Visible below lg */}
          <div className="block lg:hidden">
            <BubbleMenu variant={menuVariant} onOpenWaitlist={() => setIsModalOpen(true)} />
          </div>

        </div>

        {/* New Centered Nano Capsule Navigation - Hidden on Mobile */}
        <div className="hidden lg:block">
          <NanoCapsuleNav variant={menuVariant} />
        </div>

      </header>

      {/* Login Modal (Waitlist) */}
      <LoginModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
