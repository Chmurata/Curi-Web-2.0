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

export function InfiniteScroll() {
  return (
    <div className="w-full bg-[rgba(255,255,255,0)] py-16 px-6 lg:pt-32 -mt-[8vh] md:mt-0 relative z-[70]">
      <div className="max-w-7xl mx-auto px-6 overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]">
        <motion.div
          className="flex gap-16 w-max"
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
            <div key={idx} className="flex items-center gap-3 shrink-0">
              {item.icon ? (
                <img src={item.icon} alt="" className="w-8 h-8 object-contain" />
              ) : (
                <div className="w-8 h-8 rounded-full bg-blue-100/50" />
              )}
              <span className="text-lg font-bold text-[#3b4558] font-['Bricolage_Grotesque']">
                {item.text}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
