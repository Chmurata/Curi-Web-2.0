import { motion, Variants } from "motion/react";
import { assets } from "./Imports";
import { CoachingCycleLanding } from "./CoachingCycleLanding";
import { RoundedArrowButton } from "./ui/RoundedArrowButton";

export function FlywheelSection() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section className="bg-white">
      {/* Part 1: One Conversation */}
      <div className="py-16 md:py-24 lg:py-32 px-10 md:px-20 lg:px-32 max-w-7xl mx-auto mb-12 md:mb-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={itemVariants}
          className="text-center mb-12 md:mb-16 lg:mb-24"
        >
          {/* Heading - Scaled down for mobile */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#0b1220] font-['Bricolage_Grotesque'] leading-tight">
            How does culture become behavior?
            <br />
            <span className="text-[#3b4558]">(without more training)</span>
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center"
        >
          {/* Left Phone */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center lg:justify-end order-1 lg:order-1"
          >
            <div className="relative w-[240px] h-[460px] md:w-[342px] md:h-[657px] bg-black rounded-[40px] shadow-2xl border-8 border-black overflow-hidden">
              <img src={assets.oneConversationPhoneBg} className="w-full h-full object-cover" />
            </div>
          </motion.div>

          {/* Right Text - Properly spaced and sized for mobile */}
          <motion.div
            variants={itemVariants}
            className="space-y-4 md:space-y-6 lg:space-y-8 order-2 lg:order-2"
          >
            {/* Section title - Scaled for mobile */}
            <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#0b1220] font-['Bricolage_Grotesque'] leading-tight">
              One (effective)<br />
              conversation<br />
              at a time.
            </h3>

            {/* Body text - Properly sized for mobile */}
            <div className="space-y-3 md:space-y-4 lg:space-y-6 text-[#3b4558] text-sm md:text-base lg:text-lg font-['Bricolage_Grotesque']">
              <p>
                Curi intervenes in the <span className="font-bold">moments</span> where culture usually breaks: hard feedback, conflict, and commitments.
              </p>
              <p>
                Real change happens when people feel safe enough to be honest. Curi creates a flywheel effect that drives this environment through a simple, powerful cycle:
              </p>
              <ul className="space-y-2 md:space-y-3 lg:space-y-4 text-sm md:text-base">
                <li><span className="font-bold">1. Ignite Confidence:</span> People speak up sooner when they trust the conversation won't go off the rails.</li>
                <li><span className="font-bold">2. Create Safety:</span> Curi "whispers in your ear" before a message lands wrong.</li>
                <li><span className="font-bold">3. Drive Accountability:</span> Curi pushes vague promises into clear commitments.</li>
                <li><span className="font-bold">4. Realize Culture:</span> Interactions align with values in practice.</li>
              </ul>
            </div>

            <RoundedArrowButton>Learn More</RoundedArrowButton>
          </motion.div>
        </motion.div>
      </div>

      {/* Part 2: Flywheel Diagram Replacement */}
      <div className="w-full">
        {/* The Scroll-triggered Wheel Component */}
        <CoachingCycleLanding />
      </div>
    </section>
  );
}
