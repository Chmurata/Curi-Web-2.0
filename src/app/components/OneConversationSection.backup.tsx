import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { assets } from "./Imports";
import { RoundedArrowButton } from "./ui/RoundedArrowButton";
import { DemoRequestModal } from "./DemoRequestModal";

export function OneConversationSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.85", "end 0.15"],
  });

  // Phone Rotation - animates as section scrolls through viewport
  // No fade-in, starts visible at rotated position
  const phoneRotate = useTransform(scrollYProgress, [0.15, 0.55], [135, 90]);
  const phoneScale = useTransform(scrollYProgress, [0.15, 0.55], [0.85, 1]);

  // Text animation - slides up together with phone rotation
  const textY = useTransform(scrollYProgress, [0.15, 0.55], [50, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[60vh] pt-8 md:pt-16 mb-16 md:mb-32 px-6"
    >
      <div className="flex flex-col items-center justify-center">

        {/* --- Phone Container with scroll-linked rotation --- */}
        <motion.div
          style={{
            rotate: phoneRotate,
            scale: phoneScale,
          }}
          className="relative z-10 mb-4"
        >
          <div className="bg-black content-stretch flex flex-col h-[365px] md:h-[456px] items-start justify-center overflow-clip pl-[5.996px] pr-[6.004px] py-[8px] relative rounded-[32px] shadow-[0px_4px_10px_0px_rgba(22,22,19,0.1)] w-[192px] md:w-[240px]">
            <div className="h-[355px] md:h-[443.999px] relative rounded-[24px] shrink-0 w-full">
              <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[24px]">
                <img
                  src={assets.oneConversationImg}
                  alt=""
                  className="absolute h-full left-[-28.79%] max-w-none top-0 w-[157.58%]"
                />
              </div>
            </div>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-black w-[80px] h-[24px] rounded-b-[12px] z-20" />
          </div>
        </motion.div>

        {/* --- All Text Content - Animates together with phone --- */}
        <motion.div
          style={{ y: textY }}
          className="flex flex-col items-center justify-center space-y-2 -mt-8 md:-mt-12"
        >
          {/* Main Heading */}
          <div
            className="flex flex-col items-center justify-center font-['Bricolage_Grotesque'] font-bold leading-tight text-[#0b1220] tracking-tight text-center"
            style={{ fontSize: 'clamp(2.25rem, 5vw, 3.75rem)' }}
          >
            <p>Culture shifts one</p>
            <p>conversation at a time.</p>
            <p className="mt-2 text-[#235e9a]">Let's start yours.</p>
          </div>

          {/* Subtext + Button */}
          <div className="flex flex-col items-center space-y-5 mt-4">
            <div
              className="flex flex-col items-center justify-center font-['Bricolage_Grotesque'] text-[#3b4558] leading-relaxed text-center"
              style={{ fontSize: 'clamp(1rem, 1.5vw, 1.125rem)' }}
            >
              <p>One great conversation won't fix culture — but thousands of</p>
              <p>practiced ones will. We help you build them.</p>
            </div>
            <RoundedArrowButton onClick={() => setIsModalOpen(true)}>Request Demo</RoundedArrowButton>
          </div>
        </motion.div>

      </div>

      {/* Demo Request Modal */}
      <DemoRequestModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
}
