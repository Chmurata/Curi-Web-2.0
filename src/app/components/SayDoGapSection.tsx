import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { assets } from "./Imports";
import { RoundedArrowButton } from "./ui/RoundedArrowButton";

export function SayDoGapSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"], // Adjusted offset for natural scroll parallax
  });

  // Animation timelines
  // 1. Title is statically visible at the top

  // 2. Content Entry - REMOVED (Static content)

  // 3. Phone Parallax - Preserved
  // Optimized: Reduced scale/movement and extended timing
  const phoneScale = useTransform(scrollYProgress, [0.2, 0.8], [0.97, 1.0]);
  const phoneY = useTransform(scrollYProgress, [0.1, 0.9], [30, -30]);

  return (
    <section ref={containerRef} className="relative w-full py-24 md:py-32 lg:py-40">
      <div className="w-full min-h-screen flex flex-col items-center justify-center">
        <div className="relative px-4 md:px-12 max-w-[1400px] mx-auto w-full flex flex-col justify-center">

          {/* Quote - Static */}
          <div
            className="mb-12 md:mb-16 lg:mb-20 text-center shrink-0"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#0b1220] font-['Bricolage_Grotesque'] leading-tight px-4">
              "We value accountability" is<br />easy. Living it is hard.
            </h2>
          </div>

          {/* Main Content Grid - Static Entry */}
          <div
            className="flex flex-col lg:flex-row justify-center items-center lg:items-start gap-12 lg:gap-20"
          >

            {/* Phone Animation - Parallax Preserved */}
            <div
              className="relative flex justify-center lg:justify-start items-end lg:order-last"
            >
              <motion.div
                style={{ scale: phoneScale, y: phoneY }}
                className="will-change-transform"
              >
                <div
                  className="relative w-[240px] h-[460px] md:w-[280px] md:h-[540px] bg-black rounded-[40px] shadow-2xl overflow-hidden border-8 border-black"
                >
                  <img src={assets.sayDoGapPhone} className="w-full h-full object-cover" alt="Say Do Gap App" />
                  {/* Standardized Notch */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-black w-[80px] h-[24px] rounded-b-[12px] z-20" />
                </div>
              </motion.div>
            </div>

            {/* Left Content Wrapper (Text) */}
            <div className="flex flex-col max-w-[580px] lg:order-first text-left">
              {/* Intro Text */}
              <div className="mb-4">
                <h2 className="text-lg md:text-base font-bold text-[#0b1220] leading-snug font-['Bricolage_Grotesque']">
                  Values, leadership principles, and training don't fail because people don't care.
                  <br />
                  <span className="opacity-60 mt-2 block">
                    They fail because the hardest moments - feedback, conflict, missed deadlines - happen fast, and leaders revert to default habits, also known as the:
                  </span>
                </h2>
              </div>

              {/* Title */}
              <h3
                className="text-[44px] md:text-[56px] font-bold text-[#0b1220] mb-4 font-['Bricolage_Grotesque'] leading-none"
              >
                "Say-Do Gap."
              </h3>

              {/* Paragraphs */}
              <div className="space-y-4 text-sm md:text-base text-[#3b4558] font-['Bricolage_Grotesque'] mb-auto">
                <p className="font-bold">
                  Without psychological safety, your values don’t show up when it matters.
                </p>
                <p>
                  You invest in culture work yet watch the day-to-day drift: missed commitments, avoidance, passive-aggressive messages, and “I’ll try” promises that never become real agreements.
                </p>
                <p>
                  The result is predictable: <span className="font-bold">lower trust, lack of follow-through, and managers spending time repairing friction instead of driving outcomes.</span>
                </p>
                <p>
                  And when people don’t feel safe, they don’t speak up—so the <span className="font-bold">gap widens quietly.</span>
                </p>

                <div className="pt-2">
                  <RoundedArrowButton>Learn More</RoundedArrowButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
