import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { assets } from "./Imports";
import { RoundedArrowButton } from "./ui/RoundedArrowButton";

export function SayDoGapSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Animation timelines
  // 1. Title is statically visible at the top (or fades in quickly if desired, but user said 'Title comes first and sticks')
  // We'll let the title be visible from the start.

  // 2. Content (Phone + Text) slides in after title
  // Starts well below viewport (110vh) and moves to rest position (0)
  const contentY = useTransform(scrollYProgress, [0, 0.5], ["110vh", "0vh"]);

  // 3. Phone Parallax - Preserved but mapped to the new scroll duration
  // Optimized: Reduced scale/movement and extended timing to exit
  const phoneScale = useTransform(scrollYProgress, [0.2, 1.0], [0.97, 1.0]);
  const phoneY = useTransform(scrollYProgress, [0.2, 1.0], [15, -15]);

  return (
    <section ref={containerRef} className="relative h-[250vh]">
      <div className="sticky top-0 min-h-screen flex flex-col items-center justify-center">
        <div className="relative py-8 px-4 md:pt-8 md:pb-16 md:px-12 max-w-[1400px] mx-auto w-full flex flex-col justify-center">

          {/* Quote - Sticks at top (part of the flex layout) */}
          <div
            className="mb-4 md:mb-8 lg:mb-10 text-center shrink-0 pt-16 md:pt-3"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#0b1220] font-['Bricolage_Grotesque'] leading-tight px-4">
              "We value accountability" is<br />easy. Living it is hard.
            </h2>
          </div>

          {/* Main Content Grid - Animates In */}
          <motion.div
            style={{ y: contentY }}
            className="flex flex-col lg:flex-row justify-center items-center lg:items-start gap-12 lg:gap-20"
          >

            {/* Phone Animation */}
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
          </motion.div>
        </div>
      </div>
    </section>
  );
}
