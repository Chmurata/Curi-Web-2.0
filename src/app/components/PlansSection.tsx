import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { useTheme } from "next-themes";
import { MagicCard } from "./ui/magic-card";
import { RoundedArrowButton } from "./ui/RoundedArrowButton";
import svgPaths from "../../imports/svg-xuexrl26t6";

// --- Icons ---

function CheckIcon() {
  return (
    <div className="relative shrink-0 w-5 h-5 md:w-6 md:h-6">
      <svg className="block w-full h-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <path d={svgPaths.p33191000} fill="#3B4558" />
      </svg>
    </div>
  );
}

// --- Data ---

const PLANS = [
  {
    id: "team",
    title: "Team",
    subtitle: "Story and stats of learning drop off",
    buttonText: "Download",
    features: [
      "Basic Task Automation",
      "Natural Language Interaction",
      "Daily Activity Summary"
    ]
  },
  {
    id: "business",
    title: "Business",
    subtitle: "Story and stats of AI being only 1-1",
    buttonText: "Learn more",
    features: [
      "Advanced Task Automation",
      "Enhanced Predictive Analytics",
      "Priority Customer Support",
      "Multi-Device Sync",
      "Custom AI Training"
    ]
  },
  {
    id: "enterprise",
    title: "Enterprise",
    subtitle: "Story and stats of learning drop off",
    buttonText: "Download",
    features: [
      "Basic Task Automation",
      "Natural Language Interaction",
      "Daily Activity Summary"
    ]
  }
];

export function PlansSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <section ref={containerRef} className="relative w-full bg-gradient-to-r from-[#f2f7fb] to-[#c7ddf3]">
      {/* 
        Container Height: 
        Reduced on mobile for less scrollytelling effect.
      */}
      <div className="min-h-screen md:h-[250vh] w-full">
        <div className="md:sticky md:top-0 min-h-screen md:h-screen w-full flex flex-col items-center justify-start md:justify-center py-12 md:py-0 px-6 md:px-8">
          <div className="max-w-7xl mx-auto relative z-10 w-full flex flex-col justify-center">

            {/* Heading - Scaled down on mobile */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-8 md:mb-16 lg:mb-20"
            >
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#0b1220]/90 font-['Bricolage_Grotesque'] leading-tight">
                Our Plans
              </h2>
            </motion.div>

            {/* Cards Grid - Stacked on mobile with smaller cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
              {PLANS.map((plan, index) => {
                // Calculate animation triggers based on index
                const start = index * 0.2;
                const end = start + 0.2;

                // eslint-disable-next-line react-hooks/rules-of-hooks
                const opacity = useTransform(scrollYProgress, [start, end], [0, 1]);
                // eslint-disable-next-line react-hooks/rules-of-hooks
                const y = useTransform(scrollYProgress, [start, end], [50, 0]);
                // eslint-disable-next-line react-hooks-rules-of-hooks
                const scale = useTransform(scrollYProgress, [start, end], [0.9, 1]);

                return (
                  <motion.div
                    key={plan.id}
                    // Remove scroll animations on mobile - just show cards
                    initial={{ opacity: 1, y: 0 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="h-full relative group"
                  >


                    <div className="relative bg-white rounded-[16px] md:rounded-[24px] p-4 md:p-6 lg:p-8 flex flex-col items-center gap-4 md:gap-6 lg:gap-8 h-full border border-slate-200 shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
                      {/* Header - Smaller on mobile */}
                      <div className="text-center space-y-2 md:space-y-4">
                        <h3 className="text-[28px] md:text-[36px] lg:text-[48px] font-bold text-[#0b1220]/90 font-['Bricolage_Grotesque'] leading-none">
                          {plan.title}
                        </h3>
                        <p className="text-[14px] md:text-[16px] lg:text-[18px] text-[#3b4558] font-['Bricolage_Grotesque'] leading-relaxed max-w-[300px] mx-auto">
                          {plan.subtitle}
                        </p>
                      </div>

                      {/* Button */}
                      <RoundedArrowButton>
                        {plan.buttonText}
                      </RoundedArrowButton>

                      {/* Features List - Smaller text on mobile */}
                      <div className="w-full flex flex-col gap-2 md:gap-3 lg:gap-4 mt-2 md:mt-4">
                        {plan.features.map((feature, i) => (
                          <div key={i} className="flex items-center gap-2 md:gap-3 text-left">
                            <CheckIcon />
                            <span className="text-[13px] md:text-[14px] lg:text-[15px] text-[#3b4558] font-['Bricolage_Grotesque'] leading-tight">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
