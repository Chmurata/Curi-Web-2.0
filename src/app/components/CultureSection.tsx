import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { RoundedArrowButton } from "./ui/RoundedArrowButton";

export function CultureSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

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
  const bigTextY = useTransform(smoothProgress, [0, 0.4], [400, 0]);
  const bigTextOpacity = useTransform(smoothProgress, [0, 0.25], [0, 1]);

  // Content block starts appearing AFTER big text is fully visible
  const headingOpacity = useTransform(smoothProgress, [0.4, 0.55], [0, 1]);
  const headingY = useTransform(smoothProgress, [0.4, 0.55], [80, 0]);
  const headingBlur = useTransform(smoothProgress, [0.4, 0.55], [10, 0]);

  // Body Paragraph 1
  const p1Opacity = useTransform(smoothProgress, [0.5, 0.65], [0, 1]);
  const p1Y = useTransform(smoothProgress, [0.5, 0.65], [60, 0]);
  const p1Blur = useTransform(smoothProgress, [0.5, 0.65], [10, 0]);

  // Body Paragraph 2
  const p2Opacity = useTransform(smoothProgress, [0.6, 0.75], [0, 1]);
  const p2Y = useTransform(smoothProgress, [0.6, 0.75], [60, 0]);
  const p2Blur = useTransform(smoothProgress, [0.6, 0.75], [10, 0]);

  // Button CTA
  const buttonOpacity = useTransform(smoothProgress, [0.7, 0.85], [0, 1]);
  const buttonY = useTransform(smoothProgress, [0.7, 0.85], [40, 0]);
  const buttonScale = useTransform(smoothProgress, [0.7, 0.85], [0.9, 1]);

  return (
    <section
      ref={containerRef}
      className="relative h-[250vh] md:h-[280vh] w-full -mt-[100vh] md:-mt-[120vh]"
    >
      {/* Sticky container at bottom of viewport initially, then centers */}
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-end md:justify-center overflow-visible pb-[5vh] md:pb-0">

        {/* Background Title - Culture Realized - starts from bottom, rises up */}
        <motion.div
          style={{ y: bigTextY, opacity: bigTextOpacity }}
          className="relative z-[40] pointer-events-none select-none text-center"
        >
          <h1
            className="text-[16vw] md:text-[180px] lg:text-[240px] font-bold leading-[0.85] tracking-tighter text-[#a8c5d8]/40"
            style={{
              fontFamily: '"Bricolage Grotesque", sans-serif',
            }}
          >
            Culture
            <br />
            Realized
          </h1>
        </motion.div>

        {/* Content Block - appears AFTER Culture Realized text */}
        <div className="relative z-[60] max-w-3xl text-center px-6 flex flex-col items-center mt-4 md:mt-8">

          <motion.h2
            style={{ opacity: headingOpacity, y: headingY, filter: useTransform(headingBlur, (v) => `blur(${v}px)`) }}
            className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#0b1220] mb-4 md:mb-6 font-['Bricolage_Grotesque']"
          >
            Move values off the wall -<br />
            and into every conversation.
          </motion.h2>

          <div className="text-base md:text-lg text-[#3b4558] space-y-4 md:space-y-6 leading-relaxed font-['Bricolage_Grotesque']">
            <motion.p
              style={{ opacity: p1Opacity, y: p1Y, filter: useTransform(p1Blur, (v) => `blur(${v}px)`) }}
            >
              Curi helps your leaders and teams <span className="font-bold">say the hard thing—safely</span>.
              It brings your values into daily communication, <span className="font-bold">raises accountability</span>,
              and turns vague "I'll try" into clear commitments.
            </motion.p>

            <motion.p
              className="font-bold"
              style={{ opacity: p2Opacity, y: p2Y, filter: useTransform(p2Blur, (v) => `blur(${v}px)`) }}
            >
              Then it does the part you can't scale: <span className="font-normal">a coach in the moment that helps people rephrase, align, and follow through.</span>
            </motion.p>
          </div>

          <motion.div
            style={{ opacity: buttonOpacity, y: buttonY, scale: buttonScale }}
            className="mt-8 md:mt-12"
          >
            <RoundedArrowButton>Book a Demo</RoundedArrowButton>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
