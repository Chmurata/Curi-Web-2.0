import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
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
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <section ref={containerRef} className="relative">
      {/* 
        Container Height: 
        Needs to be tall enough to allow scrolling through the animations.
        6 steps * ~40vh each + buffer = ~350vh
      */}
      <div className="h-[350vh] w-full">
        <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden px-4 md:px-8">
          <div className="w-full max-w-7xl mx-auto h-full flex flex-col justify-center relative">

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-6xl font-bold text-center mb-12 font-['Bricolage_Grotesque'] leading-tight text-[#0b1220] relative z-20"
            >
              How Curi creates endless<br />aligned conversations:
            </motion.h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
              {features.map((feature, i) => {
                // Calculate animation triggers based on index
                // Range: 0 to 0.8 to ensure they are all visible before the end
                const start = i * 0.12;
                const end = start + 0.15;

                // eslint-disable-next-line react-hooks/rules-of-hooks
                const opacity = useTransform(scrollYProgress, [start, end], [0, 1]);
                // eslint-disable-next-line react-hooks/rules-of-hooks
                const y = useTransform(scrollYProgress, [start, end], [50, 0]);
                // eslint-disable-next-line react-hooks/rules-of-hooks
                const scale = useTransform(scrollYProgress, [start, end], [0.9, 1]);

                return (
                  <motion.div
                    key={feature.id}
                    style={{ opacity, y, scale }}
                    className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start gap-4 mb-6">
                      <div className="w-14 h-14 bg-[#2b72ba] rounded-full flex items-center justify-center text-white text-xl font-bold shrink-0 shadow-lg shadow-blue-900/20">
                        {feature.id}
                      </div>
                      <h3 className="text-2xl font-bold text-[#3b4558] font-['Bricolage_Grotesque'] leading-tight pt-2">
                        {feature.title}
                      </h3>
                    </div>
                    <p className="text-[#3b4558] leading-relaxed">
                      {feature.text}
                    </p>
                  </motion.div>
                );
              })}
            </div>

            {/* Request Demo Button */}
            <motion.div
              style={{
                opacity: useTransform(scrollYProgress, [0.85, 0.95], [0, 1]),
                y: useTransform(scrollYProgress, [0.85, 0.95], [20, 0])
              }}
              className="flex justify-center mt-12 relative z-20"
            >
              <RoundedArrowButton>Request Demo</RoundedArrowButton>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
