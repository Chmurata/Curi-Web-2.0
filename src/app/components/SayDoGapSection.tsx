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

  // Reduced animation range for smoother scrolling
  const phoneScale = useTransform(scrollYProgress, [0.3, 0.7], [0.95, 1.05]);
  const phoneY = useTransform(scrollYProgress, [0.3, 0.7], [30, -30]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section ref={containerRef} className="relative py-20 px-8 md:px-12 max-w-[1400px] mx-auto">
      {/* Quote - Static */}
      <div
        className="mb-12 md:mb-32 text-center"
      >
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#0b1220] font-['Bricolage_Grotesque'] leading-tight">
          "We value accountability" is<br />easy. Living it is hard.
        </h2>
      </div>

      {/* Main Content Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="flex flex-col lg:flex-row justify-center items-center lg:items-start gap-12 lg:gap-20"
      >

        {/* Phone Animation - Mobile: 2nd (After Title), Desktop: 2nd (Right Side) */}
        {/* We use 'order-first' or specific placement logic if needed, 
            but the user wants it 'just after this section title'. 
            The Title is likely the "We value accountability..." block above. 
            So we want: Title (Above) -> Phone -> Text Block.
            
            Current DOM order: Title (Above) -> Flex Container [Text Block, Phone].
            On Mobile Flex-Col: Text Block -> Phone.
            WE WANT: Phone -> Text Block.
        */}

        {/* Right Phone Animation (Swapped to be first in DOM for mobile column order, or using order-2 etc)
            Actually simplest is to put Phone first in the Flex Container, allowing it to be top on mobile.
            Then on Desktop (flex-row), if we want Text-Left / Phone-Right, we can use flex-row-reverse 
            OR just swap order with classes.
            
            Let's try: Phone First in DOM.
            Mobile: Phone (Top) -> Text (Bottom).
            Desktop: Phone (Left) -> Text (Right)? No, Original was Text Left.
            So Desktop: order-last for Phone, order-first for Text.
        */}

        {/* Phone Animation */}
        <motion.div
          variants={itemVariants}
          className="relative flex justify-center lg:justify-start items-end lg:order-last"
        >
          <motion.div
            style={{ scale: phoneScale, y: phoneY, willChange: 'transform' }}
            className="will-change-transform"
          >
            <div
              className="relative w-[240px] h-[460px] md:w-[342px] md:h-[657px] bg-black rounded-[40px] shadow-2xl overflow-hidden border-8 border-black"
            >
              <img src={assets.sayDoGapPhone} className="w-full h-full object-cover" alt="Say Do Gap App" />
            </div>
          </motion.div>
        </motion.div>

        {/* Left Content Wrapper (Text) */}
        <div className="flex flex-col max-w-[580px] lg:order-first">
          {/* Intro Text */}
          <motion.div variants={itemVariants} className="mb-8">
            <h2 className="text-lg md:text-xl font-bold text-[#0b1220] leading-snug font-['Bricolage_Grotesque']">
              Values, leadership principles, and training don't fail because people don't care.
              <br />
              <span className="opacity-60 mt-3 block">
                They fail because the hardest moments - feedback, conflict, missed deadlines - happen fast, and leaders revert to default habits, also known as the:
              </span>
            </h2>
          </motion.div>

          {/* Title */}
          <motion.h3
            variants={itemVariants}
            className="text-[44px] md:text-[56px] font-bold text-[#0b1220] mb-8 font-['Bricolage_Grotesque'] leading-none"
          >
            "Say-Do Gap."
          </motion.h3>

          {/* Paragraphs */}
          <motion.div variants={itemVariants} className="space-y-6 text-sm md:text-base text-[#3b4558] font-['Bricolage_Grotesque'] mb-auto">
            <p className="font-bold">
              Without psychological safety, your values don’t show up when it matters.
            </p>
            <p>
              You invest in culture work yet watch the day-to-day drift: missed commitments, avoidance, passive-aggressive messages, and “I’ll try” promises that never become real agreements.
            </p>
            <p>
              The result is predictable: <span className="font-bold">lower trust, lack of follow-through, and managers spending time repairing friction instead of driving outcomes.</span>
            </p>
            <p>
              And when people don’t feel safe, they don’t speak up—so the <span className="font-bold">gap widens quietly.</span>
            </p>

            <div className="pt-6">
              <RoundedArrowButton>Learn More</RoundedArrowButton>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
