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
      <div className="py-32 px-4 max-w-7xl mx-auto mb-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={itemVariants}
          className="text-center mb-24"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#0b1220] font-['Bricolage_Grotesque']">
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
          className="grid lg:grid-cols-2 gap-16 items-center"
        >
          {/* Left Phone */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative w-[320px] h-[640px] bg-black rounded-[32px] shadow-2xl border-8 border-black overflow-hidden">
              <img src={assets.oneConversationPhoneBg} className="w-full h-full object-cover" />
            </div>
          </motion.div>

          {/* Right Text */}
          <motion.div
            variants={itemVariants}
            className="space-y-8"
          >
            <h3 className="text-6xl font-bold text-[#0b1220] font-['Bricolage_Grotesque'] leading-tight">
              One (effective)<br />
              conversation<br />
              at a time.
            </h3>

            <div className="space-y-6 text-[#3b4558] text-lg">
              <p>
                Curi intervenes in the <span className="font-bold">moments</span> where culture usually breaks: hard feedback, conflict, and commitments.
              </p>
              <p>
                Real change happens when people feel safe enough to be honest. Curi creates a flywheel effect that drives this environment through a simple, powerful cycle:
              </p>
              <ul className="space-y-4">
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
