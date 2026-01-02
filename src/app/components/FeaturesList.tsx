import { useRef } from "react";
import { motion } from "motion/react";
import { RoundedArrowButton } from "./ui/RoundedArrowButton";

const features = [
  {
    id: 1,
    title: "The \"Whisper\" in the Room",
    text: "Curi's Interaction Intelligence™ runs quietly in the background, understanding context and offering real-time guidance."
  },
  {
    id: 2,
    title: "Instant Relatedness",
    text: "Curi ingests professional context to help employees build immediate human rapport, turning transactional exchanges into relational connections."
  },
  {
    id: 3,
    title: "A Safe Space to Practice",
    text: "Before high-stakes moments, employees can roleplay scenarios. It's a judgment-free zone to sharpen delivery and reduce anxiety."
  },
  {
    id: 4,
    title: "Guidance in the Flow of Work",
    text: "Curi spots misalignment and offers suggestions to rephrase for clarity, empathy, and cultural consistency."
  },
  {
    id: 5,
    title: "Driving Commitment",
    text: "Curi's Clarity Engine identifies vague language and prompts for clarity, actively closing the Say-Do Gap."
  },
  {
    id: 6,
    title: "Measure the Culture Shift",
    text: "Move beyond annual surveys. Get real-time insights into where friction is occurring and watch your \"Say-Do Ratio\" improve."
  }
];

export function FeaturesList() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section ref={containerRef} className="relative">
      {/* Container Height: Reduced on mobile */}
      <div className="min-h-screen md:h-[350vh] w-full">
        <div className="md:sticky md:top-0 min-h-screen md:h-screen w-full flex flex-col items-center justify-start md:justify-center py-8 md:py-0 px-6 md:px-8">
          <div className="w-full max-w-7xl mx-auto flex flex-col justify-center relative">

            {/* Heading - Scaled down on mobile */}
            <motion.h2
              initial={{ opacity: 1, y: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-6 md:mb-10 lg:mb-12 font-['Bricolage_Grotesque'] leading-tight text-[#0b1220] relative z-20"
            >
              How Curi creates endless<br />aligned conversations:
            </motion.h2>

            {/* Grid - 2 cols on mobile */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 lg:gap-8 relative z-10">
              {features.map((feature, i) => {
                return (
                  <motion.div
                    key={feature.id}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-10% 0px" }}
                    transition={{ duration: 0.6, delay: i * 0.1 }}
                    className="bg-white p-4 md:p-6 lg:p-8 rounded-[16px] md:rounded-[24px] lg:rounded-[32px] shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start gap-2 md:gap-3 lg:gap-4 mb-3 md:mb-4 lg:mb-6">
                      <div className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 bg-[#2b72ba] rounded-full flex items-center justify-center text-white text-base md:text-lg lg:text-xl font-bold shrink-0 shadow-lg shadow-blue-900/20">
                        {feature.id}
                      </div>
                      <h3 className="text-base md:text-lg lg:text-xl xl:text-2xl font-bold text-[#3b4558] font-['Bricolage_Grotesque'] leading-tight pt-1 md:pt-2">
                        {feature.title}
                      </h3>
                    </div>
                    <p className="text-[13px] md:text-[14px] lg:text-[15px] text-[#3b4558] leading-relaxed">
                      {feature.text}
                    </p>
                  </motion.div>
                );
              })}
            </div>

            {/* Request Demo Button */}
            <motion.div
              initial={{ opacity: 1, y: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex justify-center mt-6 md:mt-10 lg:mt-12 relative z-20"
            >
              <RoundedArrowButton>Request Demo</RoundedArrowButton>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
