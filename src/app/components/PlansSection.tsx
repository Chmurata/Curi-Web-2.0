import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { useTheme } from "next-themes";
import { MagicCard } from "./ui/magic-card";
import { RoundedArrowButton } from "./ui/RoundedArrowButton";
import svgPaths from "../../imports/svg-xuexrl26t6";

// --- Icons ---

function CheckIcon() {
  return (
    <div className="relative shrink-0 w-6 h-6">
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
        Needs to be tall enough to allow scrolling through the animations.
        ~250vh ensures enough scroll distance for 3 cards to animate in sequentially.
      */}
      <div className="h-[250vh] w-full">
        <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden px-4 md:px-8">
          <div className="max-w-7xl mx-auto relative z-10 w-full flex flex-col justify-center h-full">

            {/* Heading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16 md:mb-20"
            >
              <h2 className="text-[48px] md:text-[64px] lg:text-[83px] font-bold text-[#0b1220]/90 font-['Bricolage_Grotesque'] leading-tight">
                Our Plans
              </h2>
            </motion.div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
              {PLANS.map((plan, index) => {
                // Calculate animation triggers based on index
                // Range: 0 to 0.8
                const start = index * 0.2;
                const end = start + 0.2;

                // eslint-disable-next-line react-hooks/rules-of-hooks
                const opacity = useTransform(scrollYProgress, [start, end], [0, 1]);
                // eslint-disable-next-line react-hooks/rules-of-hooks
                const y = useTransform(scrollYProgress, [start, end], [50, 0]);
                // eslint-disable-next-line react-hooks/rules-of-hooks
                const scale = useTransform(scrollYProgress, [start, end], [0.9, 1]);

                return (
                  <motion.div
                    key={plan.id}
                    style={{ opacity, y, scale }}
                    className="h-full relative group"
                  >
                    {/* Gradient border wrapper */}
                    <div className="absolute inset-0 rounded-[24px] bg-gradient-to-br from-[#235e9a] to-[#57A98C] opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-[2px]">
                      <div className="w-full h-full bg-white rounded-[23px]" />
                    </div>

                    {/* Gradient shadow glow */}
                    <div className="absolute inset-0 rounded-[24px] bg-gradient-to-br from-[#235e9a]/20 to-[#57A98C]/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />

                    <div className="relative bg-white rounded-[24px] p-8 flex flex-col items-center gap-8 h-full min-h-[600px] border border-slate-200 shadow-md transition-all duration-300 group-hover:shadow-2xl group-hover:-translate-y-1 group-hover:bg-gradient-to-br group-hover:from-white group-hover:to-blue-50/30 group-hover:border-transparent">
                      {/* Header */}
                      <div className="text-center space-y-4">
                        <h3 className="text-[48px] font-bold text-[#0b1220]/90 font-['Bricolage_Grotesque'] leading-none">
                          {plan.title}
                        </h3>
                        <p className="text-[18px] text-[#3b4558] font-['Bricolage_Grotesque'] leading-relaxed max-w-[300px] mx-auto">
                          {plan.subtitle}
                        </p>
                      </div>

                      {/* Button */}
                      <RoundedArrowButton>
                        {plan.buttonText}
                      </RoundedArrowButton>

                      {/* Features List */}
                      <div className="w-full flex flex-col gap-4 mt-4">
                        {plan.features.map((feature, i) => (
                          <div key={i} className="flex items-center gap-3 text-left">
                            <CheckIcon />
                            <span className="text-[15px] text-[#3b4558] font-['Bricolage_Grotesque'] leading-tight">
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
