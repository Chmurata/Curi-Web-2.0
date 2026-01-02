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
    offset: ["start end", "end end"],
  });

  // --- Animation Values ---

  // 1. Phone Rotation & Scale (0% -> 40%)
  // Starts at 135deg (tilted), rotates to 90deg (landscape)
  // We use the dimensions of the portrait phone (240x456), so rotating it 90deg makes it landscape
  const phoneRotate = useTransform(scrollYProgress, [0.1, 0.4], [135, 90]);
  const phoneScale = useTransform(scrollYProgress, [0.1, 0.4], [0.8, 1]);
  const phoneOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  // 2. Text Reveals (40% -> 80%)
  const headingY = useTransform(scrollYProgress, [0.4, 0.55], [50, 0]);
  const headingOpacity = useTransform(scrollYProgress, [0.4, 0.55], [0, 1]);

  const subtextY = useTransform(scrollYProgress, [0.55, 0.65], [30, 0]);
  const subtextOpacity = useTransform(scrollYProgress, [0.55, 0.65], [0, 1]);

  const buttonY = useTransform(scrollYProgress, [0.65, 0.75], [30, 0]);
  const buttonOpacity = useTransform(scrollYProgress, [0.65, 0.75], [0, 1]);

  return (
    <section
      ref={containerRef}
      className="relative h-[250vh] bg-gradient-to-r from-[#f2f7fb] to-[#c7ddf3]"
    >
      <div className="sticky top-0 flex h-screen w-full flex-col items-center justify-center px-6 pb-20">

        {/* --- Phone Container --- */}
        <motion.div
          style={{
            rotate: phoneRotate,
            scale: phoneScale,
            opacity: phoneOpacity
          }}
          className="relative z-10 mb-3"
        >
          {/* Replicating BackgroundShadow structure from Figma Import exactly */}
          <div className="bg-black content-stretch flex flex-col h-[365px] md:h-[456px] items-start justify-center overflow-clip pl-[5.996px] pr-[6.004px] py-[8px] relative rounded-[32px] shadow-[0px_4px_10px_0px_rgba(22,22,19,0.1)] w-[192px] md:w-[240px]">
            {/* Screen Content */}
            <div className="h-[355px] md:h-[443.999px] relative rounded-[24px] shrink-0 w-full">
              <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[24px]">
                {/* Image with specific positioning from Figma */}
                <img
                  src={assets.oneConversationImg}
                  alt=""
                  className="absolute h-full left-[-28.79%] max-w-none top-0 w-[157.58%]"
                />
              </div>
            </div>
            {/* Notch */}
            <div className="absolute bg-black inset-[0_37.5%_95.39%_37.5%] rounded-bl-[10px] rounded-br-[10px]" />
          </div>
        </motion.div>


        {/* --- Text Content --- */}
        <div className="relative z-0 flex flex-col items-center text-center max-w-4xl space-y-5">

          {/* Main Heading */}
          <motion.div
            style={{ y: headingY, opacity: headingOpacity }}
            className="flex flex-col items-center justify-center font-['Bricolage_Grotesque'] font-bold text-4xl md:text-5xl lg:text-6xl leading-tight text-[#0b1220] tracking-tight"
          >
            <p>Culture shifts one</p>
            <p>conversation at a time.</p>
            <p className="mt-2 text-[#235e9a]">Let’s start yours.</p>
          </motion.div>

          {/* Subtext */}
          <motion.div
            style={{ y: subtextY, opacity: subtextOpacity }}
            className="flex flex-col items-center justify-center font-['Bricolage_Grotesque'] text-[18px] text-[#3b4558] leading-relaxed"
          >
            <p>One great conversation won’t fix culture — but thousands of</p>
            <p>practiced ones will. We help you build them.</p>
          </motion.div>

          {/* Button */}
          <motion.div
            style={{ y: buttonY, opacity: buttonOpacity }}
          >
            <RoundedArrowButton onClick={() => setIsModalOpen(true)}>Request Demo</RoundedArrowButton>
          </motion.div>

        </div>

      </div>

      {/* Demo Request Modal */}
      <DemoRequestModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
}
