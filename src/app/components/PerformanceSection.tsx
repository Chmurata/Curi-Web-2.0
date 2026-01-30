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

  // Parallax Effect for Phone (Standardized across sections)
  const phoneScale = useTransform(scrollYProgress, [0.2, 0.8], [0.97, 1.0]);
  const phoneY = useTransform(scrollYProgress, [0.1, 0.9], [30, -30]);

  return (
    <section
      ref={containerRef}
      className="relative w-full"
      style={{ padding: 'clamp(4rem, 8vw, 10rem) 0' }}
    >
      <div className="w-full flex flex-col items-center justify-center">
        <div className="w-full max-w-7xl px-4 sm:px-8 md:px-12 flex flex-col items-center justify-center h-full">

          {/* Main Heading - Fluid Typography */}
          <div
            className="text-center shrink-0 relative z-20"
            style={{ marginBottom: 'clamp(3rem, 5vw, 5rem)' }}
          >
            <h2
              className="font-bold text-[#0b1220]/90 font-['Bricolage_Grotesque'] leading-tight tracking-tight"
              style={{ fontSize: 'clamp(2.25rem, 5vw, 3.75rem)' }}
            >
              Stop managing friction.
              <br />
              Start driving performance.
            </h2>
          </div>

          {/* Content Group - Fluid Layout */}
          <div
            className="flex flex-col sm:flex-row-reverse items-center justify-center w-full relative z-10"
            style={{ gap: 'clamp(2rem, 4vw, 4rem)' }}
          >

            {/* Right Image (First on Mobile) */}
            <div className="shrink-0 relative">
              <motion.div
                style={{ scale: phoneScale, y: phoneY }}
                className="will-change-transform"
              >
                <div
                  className="relative bg-black rounded-[40px] shadow-[0px_4px_10px_0px_rgba(22,22,19,0.1)] overflow-hidden border-8 border-black"
                  style={{
                    width: 'clamp(230px, 22vw, 280px)',
                    height: 'clamp(440px, 42vw, 540px)'
                  }}
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
            <div
              className="shrink-0 text-left sm:text-left"
              style={{ maxWidth: 'clamp(300px, 45vw, 500px)' }}
            >
              <h3
                className="font-bold text-[#0b1220]/90 font-['Bricolage_Grotesque'] leading-tight mb-4 sm:mb-6"
                style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)' }}
              >
                Free your managers from playing referee so they can focus on strategy.
              </h3>

              <div
                className="space-y-3 sm:space-y-4 text-[#3b4558] font-['Bricolage_Grotesque'] mb-6 sm:mb-8"
                style={{ fontSize: 'clamp(0.875rem, 1.2vw, 1rem)' }}
              >
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

              <div className="pt-2">
                <RoundedArrowButton>Learn More</RoundedArrowButton>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

