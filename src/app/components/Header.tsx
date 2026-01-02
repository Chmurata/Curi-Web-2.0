import { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import { assets } from "./Imports";
import { LoginModal } from "./LoginModal";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const scrolled = latest > 50;
    if (scrolled !== isScrolled) {
      setIsScrolled(scrolled);
    }
  });

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className={`relative transition-all duration-500 ease-out ${isScrolled
        ? "px-8 py-4"
        : "px-4 pt-6"
        }`}>

        {/* Flex container for logo and button */}
        <div className={`flex items-center transition-all duration-500 ease-out ${isScrolled
          ? "justify-between"
          : "justify-center gap-12"
          }`}>

          {/* Logo */}
          <a href="#" className="shrink-0 z-10">
            <img
              src={assets.logo}
              alt="Curi Logo"
              className="h-8 w-auto object-contain"
            />
          </a>

          {/* Navigation - Only visible when not scrolled, positioned between logo and button */}
          {!isScrolled && (
            <motion.nav
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="hidden md:flex items-center gap-8 text-[15px] font-medium text-[#3b4558]"
            >
              <a href="#" className="hover:text-[#235e9a] transition-colors">
                Home
              </a>
              <a href="#" className="hover:text-[#235e9a] transition-colors">
                About
              </a>
              <a href="#" className="hover:text-[#235e9a] transition-colors">
                Our Solution
              </a>
              <a href="#" className="hover:text-[#235e9a] transition-colors">
                Contact
              </a>
            </motion.nav>
          )}

          {/* CTA Button */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="relative group overflow-hidden rounded-full bg-[#235e9a] text-white h-[48px] w-[160px] flex items-center justify-center shrink-0 z-10"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#235e9a] via-[#3b7ac2] to-[#235e9a] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Marquee Text */}
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
      </div>

      {/* Login Modal */}
      <LoginModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </motion.header>
  );
}
