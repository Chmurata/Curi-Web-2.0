import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "motion/react";
import { assets } from "./Imports";
import { LoginModal } from "./LoginModal";
// import { LoginModal } from "./LoginModal";
// import { BubbleMenu } from "./BubbleMenu";
import { NanoCapsuleNav } from "./NanoCapsuleNav";
// import { GlassThreadNav } from "./GlassThreadNav";
// import { SplitHudNav } from "./SplitHudNav";
// import { MagneticDotNav } from "./MagneticDotNav";

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
            className="block"
          >
            <img
              src={assets.logo}
              alt="Curi Logo"
              className="h-12 w-auto object-contain hover:opacity-80 transition-opacity"
            />
          </Link>
        </div>

        {/* Right Side: CTA + Bubble Menu */}
        <div className="absolute top-6 right-6 md:right-12 pointer-events-auto flex items-center gap-4">

          {/* Desktop CTA Button */}
          <div className="hidden md:block">
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

          {/* <BubbleMenu variant={menuVariant} /> */}
        </div>

        {/* New Centered Nano Capsule Navigation */}
        <NanoCapsuleNav variant={menuVariant} />
        {/* <GlassThreadNav variant={menuVariant} /> */}
        {/* <SplitHudNav variant={menuVariant} /> */}
        {/* <MagneticDotNav variant={menuVariant} /> */}

      </header>

      {/* Login Modal (Waitlist) */}
      <LoginModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
