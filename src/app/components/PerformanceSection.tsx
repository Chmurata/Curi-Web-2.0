import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { RoundedArrowButton } from "./ui/RoundedArrowButton";
import imgImage from "../../assets/dc50ad3cb84ed9976d3eb68813f0c5566c0be249.png";

export function PerformanceSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Parallax Animation (Phone) - matching CultureBehaviorSection
  const phoneScale = useTransform(scrollYProgress, [0.3, 0.7], [0.95, 1.05]);
  const phoneY = useTransform(scrollYProgress, [0.3, 0.7], [30, -30]);

  // Content Animation (Text + Phone container) - matching CultureBehaviorSection
  const contentOpacity = useTransform(scrollYProgress, [0.2, 0.35], [0, 1]);
  const contentY = useTransform(scrollYProgress, [0.2, 0.35], [40, 0]);

  return (
    <section ref={containerRef} className="relative w-full py-16 px-6 md:py-24 md:px-12 overflow-hidden z-30">
      <div className="max-w-7xl mx-auto relative z-10">

        {/* Main Heading - Static */}
        <div className="text-center mb-16 md:mb-24">
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#0b1220]/90 font-['Bricolage_Grotesque'] leading-tight tracking-tight"
          >
            Stop managing friction.
            <br />
            Start driving performance.
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row-reverse items-center justify-center gap-8 lg:gap-12">

          {/* Right Image (First on Mobile) - WITH PARALLAX */}
          <motion.div
            style={{ y: contentY }}
            className="shrink-0 relative will-change-transform"
          >
            <motion.div
              style={{ scale: phoneScale, y: phoneY }}
              className="relative w-[240px] h-[460px] md:w-[342px] md:h-[657px] bg-black rounded-[40px] shadow-[0px_4px_10px_0px_rgba(22,22,19,0.1)] overflow-hidden border-8 border-black transform-gpu will-change-transform"
            >
              <div className="absolute inset-0 bg-white rounded-[24px] overflow-hidden">
                <img
                  src={imgImage}
                  alt="Curi App Interface"
                  className="w-full h-full object-cover scale-110"
                />
              </div>
              {/* Standardized Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-black w-[80px] h-[24px] rounded-b-[12px] z-20" />
            </motion.div>
          </motion.div>

          {/* Left Content (Second on Mobile) - Animated */}
          <motion.div
            style={{ opacity: contentOpacity, y: contentY }}
            className="max-w-xl shrink-0 will-change-transform"
          >
            <h3 className="text-3xl md:text-4xl lg:text-[44px] font-bold text-[#0b1220]/90 font-['Bricolage_Grotesque'] leading-tight mb-8">
              Free your managers<br />
              from playing referee<br />
              so they can focus<br />
              on strategy.
            </h3>

            <div className="space-y-4 text-[#3b4558] text-base font-['Bricolage_Grotesque'] mb-8">
              <p className="font-bold">
                Managers are burned out from the cost of friction.
              </p>
              <p>
                Curi offloads the heavy lifting of culture enforcement, conflict resolution
                and team alignment.
              </p>
              <p>
                By giving every employee a private, automated "Thinking Partner," teams
                self-correct in real-time—freeing your managers to focus on strategy,
                not mediation.
              </p>
            </div>

            <RoundedArrowButton>Learn More</RoundedArrowButton>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

