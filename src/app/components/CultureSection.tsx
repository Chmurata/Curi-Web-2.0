import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { RoundedArrowButton } from "./ui/RoundedArrowButton";

export function CultureSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Add spring for smoother animation
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Animation Timeline - STAGGERED:
  // The "Culture Realized" text starts appearing from below while Hero phone is still visible
  // It scrolls up from the bottom of the viewport

  // Big text rises up from way below - starts very early
  // Big text rises up from way below - starts very early
  // Big text rises up - starts behind phone (z-index) and moves to top
  // Mobile: start lower (500) to ensure hidden. Desktop: 300.
  // Mobile speed: slower (range [0, 0.5]) vs Desktop [0, 0.3]
  const bigTextY = useTransform(smoothProgress, isMobile ? [0, 0.5] : [0, 0.3], [isMobile ? 500 : 0, 0]);

  // Mobile: Hide initially to prevent peek through. Desktop: 1 (always visible/managed by z-index)
  // Mobile: Hide initially to prevent peek through. Desktop: 1 (always visible/managed by z-index)
  // UPDATED: Animate opacity from 0.3 (30%) to 0.7 (70%) as it becomes sticky
  const bigTextOpacity = useTransform(smoothProgress, [0, 0.4], [0.3, 0.7]);
  const bigTextMobileOpacity = useTransform(smoothProgress, [0, 0.1], [0, 1]);

  // Content block starts appearing - SIMPLIFIED SCROLL UP
  // Headline Part 1: "Move values off the wall..."
  // Mobile: Start later (after 0.5) and go slower
  const h1Y = useTransform(smoothProgress, isMobile ? [0.52, 0.65] : [0.35, 0.45], [600, 0]);

  // Group Animation: "and into every conversation" + Body + Button
  // Uses timing matching the original h2Y to start after "Move values off the wall..."
  const groupY = useTransform(smoothProgress, isMobile ? [0.68, 0.8] : [0.48, 0.58], [600, 0]);

  return (
    <section
      ref={containerRef}
      className="relative h-[250vh] md:h-[280vh] w-full -mt-[250vh] md:-mt-[280vh]"
    >
      {/* Sticky container at bottom of viewport initially, then centers */}
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-visible pb-0">

        {/* Background Title - Culture Realized - starts from bottom, rises up */}
        <motion.div
          style={{ y: bigTextY, opacity: isMobile ? bigTextMobileOpacity : bigTextOpacity }}
          className="relative z-[1] pointer-events-none select-none text-center -mt-[15vh] mb-[4vh] md:mt-0 md:mb-0"
        >
          <h1
            className="font-bold leading-[0.85] tracking-tighter text-[#a8c5d8]"
            style={{
              fontFamily: '"Bricolage Grotesque", sans-serif',
              fontSize: 'clamp(6rem, 18vw, 15rem)'
            }}
          >
            Culture
            <br />
            Realized
          </h1>
        </motion.div>

        {/* Content Block - animated heading and paragraphs */}
        <div className="relative z-[60] max-w-4xl text-center px-6 flex flex-col items-center mt-2 md:mt-4">

          {/* Headline Part 1 - Unchanged */}
          <motion.h2
            style={{ y: h1Y, fontSize: 'clamp(2rem, 5vw, 3.75rem)' }}
            className="font-bold text-[#0b1220] font-['Bricolage_Grotesque'] leading-tight block"
          >
            Move values off the wall...
          </motion.h2>

          {/* Group: Headline Part 2 + Body + Button - All animate together */}
          <motion.div
            style={{ y: groupY }}
            className="flex flex-col items-center"
          >
            <h2
              className="font-bold text-[#0b1220] font-['Bricolage_Grotesque'] leading-tight block"
              style={{ fontSize: 'clamp(2rem, 5vw, 3.75rem)', marginBottom: 'clamp(0.75rem, 1.5vw, 1rem)' }}
            >
              and into every conversation.
            </h2>

            <div
              className="text-[#3b4558] leading-relaxed font-['Bricolage_Grotesque']"
              style={{ fontSize: 'clamp(1rem, 1.25vw, 1.125rem)' }}
            >
              <p style={{ marginBottom: 'clamp(0.75rem, 1vw, 1rem)' }}>
                Curi helps your leaders and teams <span className="font-bold">say the hard thing—safely</span>.
                It brings your values into daily communication, <span className="font-bold">raises accountability</span>,
                and turns vague "I'll try" into clear commitments.
              </p>

              <p className="font-bold">
                Then it does the part you can’t scale: <span className="font-normal">a coach in the moment that helps people rephrase, align, and follow through.</span>
              </p>
            </div>

            <div style={{ marginTop: 'clamp(1.5rem, 2vw, 2rem)' }}>
              <RoundedArrowButton>Book a Demo</RoundedArrowButton>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
