import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import svgPaths from "../../../imports/svg-pste5odx01";
import { cn } from "./utils";

interface RoundedArrowButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function RoundedArrowButton({ children, className, ...props }: RoundedArrowButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.button
      className={cn(
        "relative flex items-center justify-center p-0 bg-transparent border-none outline-none cursor-pointer group",
        className
      )}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      initial="rest"
      animate={isHovered ? "hover" : "rest"}
      whileTap="tap"
      {...(props as any)}
    >
      {/* 
        FLUID OPTIC CONTAINER 
        Responsive: Scaled down ~15% for mobile, ~10% for tablet
      */}

      {/* 1. THE TEXT CAPSULE (Main Body) - Responsive sizing */}
      <motion.div
        className="relative z-20 h-[44px] md:h-[50px] lg:h-[56px] bg-[#235e9a] rounded-full flex items-center overflow-hidden shadow-[0px_4px_20px_0px_rgba(35,94,154,0.3)]"
        variants={{
          rest: {
            width: "auto",
            paddingRight: "48px", // Scaled for mobile
            paddingLeft: "24px",
            x: 0
          },
          hover: {
            width: "auto",
            paddingRight: "24px",
            paddingLeft: "24px",
            x: -4
          },
          tap: { scale: 0.95 }
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 25,
          mass: 1
        }}
      >
        {/* Inner Glare/Shine */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.15)_0%,transparent_50%)] opacity-50" />

        <motion.span
          className="font-['Bricolage_Grotesque'] text-sm md:text-base lg:text-lg font-normal text-white tracking-wide shrink-0 whitespace-nowrap"
          layout
        >
          {children}
        </motion.span>
      </motion.div>

      {/* 2. THE DROPLET (Arrow Orb) - Responsive sizing */}
      <motion.div
        className="absolute z-10 w-[40px] h-[40px] md:w-[46px] md:h-[46px] lg:w-[52px] lg:h-[52px] rounded-full bg-[#235e9a] flex items-center justify-center border border-white/20 shadow-[0px_4px_20px_0px_rgba(35,94,154,0.3)]"
        style={{ right: 3 }}
        variants={{
          rest: {
            x: 0,
            rotate: 0,
            scale: 1,
            right: 3
          },
          hover: {
            x: 45,
            rotate: 90,
            scale: 1.1,
            right: 3
          },
          tap: { x: 40, scale: 0.9 }
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20,
          mass: 0.8
        }}
      >
        <motion.svg
          width="16"
          height="16"
          viewBox="0 0 18 18"
          fill="none"
          className="relative z-10 text-white md:w-[18px] md:h-[18px] lg:w-[20px] lg:h-[20px]"
          variants={{
            rest: { rotate: 0 },
            hover: { rotate: -90 }
          }}
          transition={{ duration: 0.4 }}
        >
          <path d={svgPaths.p10b2ff80} fill="currentColor" />
        </motion.svg>
      </motion.div>

      {/* 3. CONNECTION (The 'Surface Tension' Ghost) */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="absolute z-0 bg-[#235e9a] rounded-full"
            style={{
              top: "50%",
              translateY: "-50%",
              right: "24px"
            }}
            initial={{
              opacity: 1,
              width: "32px",
              height: "16px",
              x: 0,
              scaleX: 1
            }}
            animate={{
              opacity: 0,
              width: "50px",
              height: "4px",
              x: 14,
              scaleX: 0.5
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </AnimatePresence>

    </motion.button>
  );
}
