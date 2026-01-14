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
  const bigTextY = useTransform(smoothProgress, isMobile ? [0, 0.5] : [0, 0.3], [isMobile ? 500 : 300, 0]);

  // Mobile: Hide initially to prevent peek through. Desktop: 1 (always visible/managed by z-index)
  const bigTextOpacity = useTransform(smoothProgress, [0, 0.1], [isMobile ? 0 : 1, 1]);

  // Content block starts appearing - SIMPLIFIED SCROLL UP
  // Headline Part 1: "Move values off the wall..."
  // Mobile: Start later (after 0.5) and go slower
  const h1Opacity = useTransform(smoothProgress, isMobile ? [0.52, 0.65] : [0.35, 0.45], [0, 1]);
  const h1Y = useTransform(smoothProgress, isMobile ? [0.52, 0.65] : [0.35, 0.45], [40, 0]);

  // Headline Part 2: "and into every conversation."
  const h2Opacity = useTransform(smoothProgress, isMobile ? [0.68, 0.8] : [0.48, 0.58], [0, 1]);
  const h2Y = useTransform(smoothProgress, isMobile ? [0.68, 0.8] : [0.48, 0.58], [40, 0]);

  // Body Paragraphs (Grouped)
  const bodyOpacity = useTransform(smoothProgress, isMobile ? [0.75, 0.9] : [0.55, 0.65], [0, 1]);
  const bodyY = useTransform(smoothProgress, isMobile ? [0.75, 0.9] : [0.55, 0.65], [40, 0]);

  // Button CTA
  const buttonOpacity = useTransform(smoothProgress, isMobile ? [0.85, 0.95] : [0.62, 0.72], [0, 1]);
  const buttonY = useTransform(smoothProgress, isMobile ? [0.85, 0.95] : [0.62, 0.72], [30, 0]);
  const buttonScale = useTransform(smoothProgress, isMobile ? [0.85, 0.95] : [0.62, 0.72], [0.95, 1]);

  return (
    <section
      ref={containerRef}
      className="relative h-[250vh] md:h-[280vh] w-full -mt-[250vh] md:-mt-[280vh]"
    >
      {/* Sticky container at bottom of viewport initially, then centers */}
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-visible pb-0">

        {/* Background Title - Culture Realized - starts from bottom, rises up */}
        <motion.div
          style={{ y: bigTextY, opacity: bigTextOpacity }}
          className="relative z-[40] pointer-events-none select-none text-center -mt-[15vh] mb-[4vh] md:mt-0 md:mb-0"
        >
          <h1
            className="text-[20vw] md:text-[180px] lg:text-[240px] font-bold leading-[0.85] tracking-tighter text-[#a8c5d8]/40"
            style={{
              fontFamily: '"Bricolage Grotesque", sans-serif',
            }}
          >
            Culture
            <br />
            Realized
          </h1>
        </motion.div>

        {/* Content Block - animated heading and paragraphs */}
        <div className="relative z-[60] max-w-4xl text-center px-6 flex flex-col items-center mt-2 md:mt-4">

          {/* Headline Part 1 */}
          <motion.h2
            style={{ opacity: h1Opacity, y: h1Y }}
            className="text-3xl md:text-5xl lg:text-6xl font-bold text-[#0b1220] font-['Bricolage_Grotesque'] leading-tight block"
          >
            Move values off the wall...
          </motion.h2>

          {/* Headline Part 2 */}
          <motion.h2
            style={{ opacity: h2Opacity, y: h2Y }}
            className="text-3xl md:text-5xl lg:text-6xl font-bold text-[#0b1220] mb-3 md:mb-4 font-['Bricolage_Grotesque'] leading-tight block"
          >
            and into every conversation.
          </motion.h2>

          <motion.div
            className="text-base md:text-lg text-[#3b4558] space-y-3 md:space-y-4 leading-relaxed font-['Bricolage_Grotesque']"
            style={{ opacity: bodyOpacity, y: bodyY }}
          >
            <p>
              Curi helps your leaders and teams <span className="font-bold">say the hard thing—safely</span>.
              It brings your values into daily communication, <span className="font-bold">raises accountability</span>,
              and turns vague "I'll try" into clear commitments.
            </p>

            <p className="font-bold">
              Then it does the part you can't scale: <span className="font-normal">a coach in the moment that helps people rephrase, align, and follow through.</span>
            </p>
          </motion.div>

          <motion.div
            style={{ opacity: buttonOpacity, y: buttonY, scale: buttonScale }}
            className="mt-6 md:mt-8"
          >
            <RoundedArrowButton>Book a Demo</RoundedArrowButton>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
