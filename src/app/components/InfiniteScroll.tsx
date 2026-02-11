import { motion } from "motion/react";
import { assets } from "./Imports";

const items = [
  { icon: null, text: "Improved Say-Do Ratio" },
  { icon: assets.icon1, text: "Custom Role-Plays" },
  { icon: assets.icon2, text: "Anytime, Anywhere Practice" },
  { icon: assets.icon3, text: "Reduced Friction" },
  { icon: assets.icon4, text: "Alignment at Scale" },
  { icon: assets.icon5, text: "Manager Effectiveness" },
];

// Fluid sizing styles
const fluidStyles = {
  container: {
    padding: "clamp(0.5rem, 1vw, 0.8rem) clamp(0.5rem, 1.5vw, 0.75rem)",
    paddingTop: "clamp(0.5rem, 1.6vw, 1.6rem)",
  },
  itemGap: {
    gap: "clamp(2rem, 4vw, 4rem)",
  },
  iconSize: {
    width: "clamp(1.5rem, 2.5vw, 2rem)",
    height: "clamp(1.5rem, 2.5vw, 2rem)",
  },
  text: {
    fontSize: "clamp(0.875rem, 1.5vw, 1.125rem)",
  },
  innerGap: {
    gap: "clamp(0.5rem, 1vw, 0.75rem)",
  },
};

export function InfiniteScroll() {
  return (
    <div
      className="w-full bg-[rgba(255,255,255,0)] -mt-[4vh] md:mt-0 relative z-20"
      style={fluidStyles.container}
    >
      <div className="max-w-7xl mx-auto px-6 overflow-hidden [mask-image:linear-gradient(to_right,transparent,20%,white_80%,transparent)]">
        <motion.div
          className="flex w-max"
          style={fluidStyles.itemGap}
          animate={{ x: "-50%" }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {/*
            Seamless Loop Logic:
            1. Render TWO identical sets of items.
            2. Animate x from 0% to -50%.
            3. At -50%, the second set is exactly where the first set started.
            4. Reset instantly to 0% (which looks identical) and repeat.
          */}
          {[...items, ...items].map((item, idx) => (
            <div
              key={idx}
              className="flex items-center shrink-0"
              style={fluidStyles.innerGap}
            >
              {item.icon ? (
                <img
                  src={item.icon}
                  alt=""
                  className="object-contain"
                  style={fluidStyles.iconSize}
                />
              ) : (
                <div
                  className="rounded-full bg-blue-100/50"
                  style={fluidStyles.iconSize}
                />
              )}
              <span
                className="font-bold text-[#3b4558] font-['Bricolage_Grotesque'] whitespace-nowrap"
                style={fluidStyles.text}
              >
                {item.text}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
