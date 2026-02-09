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
    offset: ["start end", "end start"],
  });

  // Phone Rotation - animates as section scrolls through viewport
  // No fade-in, starts visible at rotated position
  const phoneRotate = useTransform(scrollYProgress, [0, 0.5], [135, 90]);
  const phoneScale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);

  // Text animation - slides up together with phone rotation
  const textY = useTransform(scrollYProgress, [0, 0.5], [80, 0]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.4], [0, 1]);

  return (
    <section
      ref={containerRef}
      className="relative pt-16 md:pt-32 mb-16 md:mb-32 px-6"
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
          style={{ y: textY, opacity: textOpacity }}
          className="flex flex-col items-center justify-center space-y-2"
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
