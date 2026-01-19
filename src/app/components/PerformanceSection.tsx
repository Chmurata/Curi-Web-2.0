import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { RoundedArrowButton } from "./ui/RoundedArrowButton";
import imgImage from "../../assets/dc50ad3cb84ed9976d3eb68813f0c5566c0be249.png";

export function PerformanceSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Content Animation (Pure Scroll from Bottom)
  const contentY = useTransform(scrollYProgress, [0, 0.5], ["110vh", "0vh"]);

  // Parallax Effect for Phone
  // Timing extended to 1.0 to eliminate "dead stop" before exit
  const phoneScale = useTransform(scrollYProgress, [0.2, 1.0], [0.97, 1.0]);
  const phoneY = useTransform(scrollYProgress, [0.2, 1.0], [15, -15]);

  return (
    <section ref={containerRef} className="relative h-[250vh] w-full mb-24 lg:mb-32 lg:mt-32">
      <div className="sticky top-0 min-h-screen w-full flex flex-col items-center justify-center">
        <div className="w-full max-w-7xl px-6 md:px-12 flex flex-col items-center justify-center h-full">

          {/* Main Heading - Static */}
          <div className="text-center mb-7 md:mb-11 shrink-0 relative z-20 pt-20 md:pt-24">
            <h2
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#0b1220]/90 font-['Bricolage_Grotesque'] leading-tight tracking-tight"
            >
              Stop managing friction.
              <br />
              Start driving performance.
            </h2>
          </div>

          {/* Content Group - Pure Scroll Up */}
          <motion.div
            style={{ y: contentY }}
            className="flex flex-col lg:flex-row-reverse items-center justify-center gap-8 lg:gap-12 w-full relative z-10"
          >

            {/* Right Image (First on Mobile) */}
            <div className="shrink-0 relative">
              <motion.div
                style={{ scale: phoneScale, y: phoneY }}
                className="will-change-transform"
              >
                <div
                  className="relative w-[216px] h-[414px] md:w-[252px] md:h-[486px] bg-black rounded-[40px] shadow-[0px_4px_10px_0px_rgba(22,22,19,0.1)] overflow-hidden border-8 border-black"
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
                </div>
              </motion.div>
            </div>

            {/* Left Content (Second on Mobile) */}
            <div className="max-w-xl shrink-0">
              <h3 className="text-3xl md:text-[40px] font-bold text-[#0b1220]/90 font-['Bricolage_Grotesque'] leading-tight mb-8">
                Free your managers from playing referee so they can focus on strategy.
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
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}

