import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { assets } from "./Imports";
import { RoundedArrowButton } from "./ui/RoundedArrowButton";

export function SayDoGapSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Phone Parallax Animation
  const phoneScale = useTransform(scrollYProgress, [0.2, 0.8], [0.9, 1.2]);
  const phoneY = useTransform(scrollYProgress, [0.1, 0.9], [30, -30]);

  return (
    <section
      ref={containerRef}
      className="relative w-full"
      style={{ padding: 'clamp(2.5rem, 4.5vw, 5.5rem) 0' }}
    >
      <div className="w-full min-h-screen flex flex-col items-center justify-center">
        <div className="relative px-4 sm:px-8 md:px-12 max-w-[1400px] mx-auto w-full flex flex-col justify-center">

          {/* Quote - Fluid Typography */}
          <div
            className="text-center shrink-0"
            style={{ marginBottom: 'clamp(2rem, 4vw, 5rem)' }}
          >
            <h2
              className="font-bold text-[#0b1220] font-['Bricolage_Grotesque'] leading-tight px-4"
              style={{ fontSize: 'clamp(2.25rem, 5vw, 3.75rem)' }}
            >
              "We value accountability" is<br />easy. Living it is hard.
            </h2>
          </div>

          {/* Main Content Grid - Switches to stacked at sm (640px) */}
          <div
            className="flex flex-col sm:flex-row justify-center items-center sm:items-start"
            style={{ gap: 'clamp(2rem, 4vw, 5rem)' }}
          >

            {/* Phone Animation - Fluid Sizing */}
            <div
              className="relative flex justify-center sm:justify-start items-end sm:order-last"
            >
              <motion.div
                style={{ scale: phoneScale, y: phoneY }}
                className="will-change-transform"
              >
                <div
                  className="relative bg-black rounded-[40px] shadow-2xl overflow-hidden border-8 border-black"
                  style={{
                    width: 'clamp(230px, 22vw, 280px)',
                    height: 'clamp(440px, 42vw, 540px)'
                  }}
                >
                  <img src={assets.sayDoGapPhone} className="w-full h-full object-cover" alt="Say Do Gap App" />
                  {/* Standardized Notch */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-black w-[80px] h-[24px] rounded-b-[12px] z-20" />
                </div>
              </motion.div>
            </div>

            {/* Left Content Wrapper (Text) - Fluid Width */}
            <div
              className="flex flex-col sm:order-first text-left"
              style={{ maxWidth: 'clamp(380px, 45vw, 580px)' }}
            >
              {/* Intro Text */}
              <div className="mb-4">
                <h2
                  className="font-bold text-[#0b1220] leading-snug font-['Bricolage_Grotesque']"
                  style={{ fontSize: 'clamp(0.875rem, 1.5vw, 1rem)' }}
                >
                  Values, leadership principles, and training don't fail because people don't care.
                  <br />
                  <span className="opacity-60 mt-2 block">
                    They fail because the hardest moments - feedback, conflict, missed deadlines - happen fast, and leaders revert to default habits, also known as the:
                  </span>
                </h2>
              </div>

              {/* Title - Fluid (synced with main quote) */}
              <h3
                className="font-bold text-[#0b1220] mb-4 font-['Bricolage_Grotesque'] leading-none"
                style={{ fontSize: 'clamp(2.25rem, 5vw, 3.75rem)' }}
              >
                "Say-Do Gap."
              </h3>

              {/* Paragraphs - Fluid */}
              <div
                className="space-y-4 text-[#3b4558] font-['Bricolage_Grotesque'] mb-auto"
                style={{ fontSize: 'clamp(0.75rem, 1.2vw, 1rem)' }}
              >
                <p className="font-bold">
                  Without psychological safety, your values don't show up when it matters.
                </p>
                <p>
                  You invest in culture work yet watch the day-to-day drift: missed commitments, avoidance, passive-aggressive messages, and "I'll try" promises that never become real agreements.
                </p>
                <p>
                  The result is predictable: <span className="font-bold">lower trust, lack of follow-through, and managers spending time repairing friction instead of driving outcomes.</span>
                </p>
                <p>
                  And when people don't feel safe, they don't speak up—so the <span className="font-bold">gap widens quietly.</span>
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
