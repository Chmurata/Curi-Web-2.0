import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { RoundedArrowButton } from "./ui/RoundedArrowButton";

export function CultureSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Animation Timeline:
  // Finish earlier (by 0.55) to allow reading time

  // Heading: Appears first (0.05 - 0.25)
  const headingOpacity = useTransform(scrollYProgress, [0.05, 0.25], [0, 1]);
  const headingY = useTransform(scrollYProgress, [0.05, 0.25], [100, 0]);
  const headingBlur = useTransform(scrollYProgress, [0.05, 0.25], [10, 0]);

  // Body: Appears second (0.15 - 0.40)
  const bodyOpacity = useTransform(scrollYProgress, [0.15, 0.40], [0, 1]);
  const bodyY = useTransform(scrollYProgress, [0.15, 0.40], [100, 0]);

  // Button: Appears last (0.30 - 0.55)
  const buttonOpacity = useTransform(scrollYProgress, [0.30, 0.55], [0, 1]);
  const buttonScale = useTransform(scrollYProgress, [0.30, 0.55], [0.8, 1]);

  return (
    <section ref={containerRef} className="relative h-[200vh] w-full">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Background Title - Stays fixed in the center of the sticky view */}
        <div className="absolute inset-0 flex items-start justify-center pt-32 md:pt-0 md:items-center z-0 pointer-events-none select-none">
          <h1
            className="text-[22vw] md:text-[200px] lg:text-[280px] font-bold leading-[0.85] text-center tracking-tighter text-[#a8c5d8]/40"
            style={{
              fontFamily: '"Bricolage Grotesque", sans-serif'
            }}
          >
            Culture
            <br />
            Realized
          </h1>
        </div>

        {/* Content Block - Elements animate individually for organic feel */}
        <div className="relative z-10 max-w-3xl text-center px-4 flex flex-col items-center pt-[20vh]">

          <motion.h2
            style={{ opacity: headingOpacity, y: headingY, filter: useTransform(headingBlur, (v) => `blur(${v}px)`) }}
            className="text-3xl md:text-4xl font-bold text-[#0b1220] mb-6 font-['Bricolage_Grotesque']"
          >
            Move values off the wall -<br />
            and into every conversation.
          </motion.h2>

          <motion.div
            style={{ opacity: bodyOpacity, y: bodyY }}
            className="text-lg text-[#3b4558] space-y-6 leading-relaxed font-['Bricolage_Grotesque']"
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
            style={{ opacity: buttonOpacity, scale: buttonScale }}
            className="mt-12"
          >
            <RoundedArrowButton>Book a Demo</RoundedArrowButton>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
