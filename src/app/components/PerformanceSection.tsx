import { motion } from "motion/react";
import { RoundedArrowButton } from "./ui/RoundedArrowButton";
import imgImage from "../../assets/dc50ad3cb84ed9976d3eb68813f0c5566c0be249.png";

export function PerformanceSection() {
  return (
    <section className="relative w-full bg-gradient-to-b from-[#c7ddf3] to-[#e8f2f7] py-24 px-8 md:px-12 overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">

        {/* Main Heading */}
        <div className="text-center mb-16 md:mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#0b1220]/90 font-['Bricolage_Grotesque'] leading-tight tracking-tight"
          >
            Stop managing friction.
            <br />
            Start driving performance.
          </motion.h2>
        </div>

        <div className="flex flex-col lg:flex-row-reverse items-center justify-center gap-8 lg:gap-12">

          {/* Right Image (First on Mobile) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="shrink-0 relative"
          >
            <div className="relative w-[240px] h-[460px] md:w-[342px] md:h-[657px] bg-black rounded-[40px] shadow-[0px_4px_10px_0px_rgba(22,22,19,0.1)] overflow-hidden border-8 border-black">
              <div className="absolute inset-0 bg-white rounded-[24px] overflow-hidden">
                <img
                  src={imgImage}
                  alt="Curi App Interface"
                  className="w-full h-full object-cover scale-110"
                />
              </div>
            </div>
          </motion.div>

          {/* Left Content (Second on Mobile) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-xl shrink-0"
          >
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0b1220]/90 font-['Bricolage_Grotesque'] leading-tight mb-8">
              Free your managers<br />
              from playing referee<br />
              so they can focus<br />
              on strategy.
            </h3>

            <div className="space-y-4 text-[#3b4558] text-base font-['Bricolage_Grotesque'] mb-8">
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

            <RoundedArrowButton>Learn More</RoundedArrowButton>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
