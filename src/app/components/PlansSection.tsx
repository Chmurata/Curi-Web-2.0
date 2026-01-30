import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { useTheme } from "next-themes";
import { MagicCard } from "./ui/magic-card";
import { RoundedArrowButton } from "./ui/RoundedArrowButton";
import svgPaths from "../../imports/svg-xuexrl26t6";

// --- Icons ---

function CheckIcon() {
  return (
    <div
      className="relative shrink-0"
      style={{
        width: 'clamp(1.25rem, 1.5vw, 1.5rem)',
        height: 'clamp(1.25rem, 1.5vw, 1.5rem)'
      }}
    >
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
    offset: ["start start", "end end"],
  });

  // Content Animation (Pure Scroll from Bottom)
  const cardsY = useTransform(scrollYProgress, [0, 0.5], ["110vh", "0vh"]);

  return (
    <section ref={containerRef} className="relative w-full h-[250vh]">
      <div className="sticky top-0 min-h-screen w-full flex flex-col items-center justify-center">
        <div className="w-full max-w-7xl px-6 md:px-8 flex flex-col items-center justify-center h-full">

          {/* Heading - Pins at top */}
          <div className="text-center mb-8 md:mb-12 lg:mb-16 shrink-0 relative z-20 pt-20 md:pt-0">
            <h2
              className="font-bold text-[#0b1220]/90 font-['Bricolage_Grotesque'] leading-tight"
              style={{ fontSize: 'clamp(2.25rem, 5vw, 3.75rem)' }}
            >
              Our Plans
            </h2>
          </div>

          {/* Cards Grid - Pure Scroll Up */}
          <motion.div
            style={{
              y: cardsY,
              gap: 'clamp(1rem, 2vw, 2rem)'
            }}
            className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 relative z-10"
          >
            {PLANS.map((plan) => (
              <div
                key={plan.id}
                className="h-full relative group hover:scale-[0.98] transition-transform duration-200 ease-out will-change-transform"
              >
                {/* Gradient border that appears on hover */}
                <div
                  className="absolute inset-[-4px] bg-gradient-to-r from-[#2b72ba] to-[#5a9fd4] opacity-0 group-hover:opacity-100 transition-opacity duration-200 will-change-opacity"
                  style={{ borderRadius: 'clamp(20px, 2.5vw, 36px)' }}
                />
                <div
                  className="relative bg-white flex flex-col items-center h-full shadow-[0_8px_32px_rgba(43,114,186,0.15)] group-hover:shadow-[0_12px_40px_rgba(43,114,186,0.25)] transition-shadow duration-200"
                  style={{
                    padding: 'clamp(1rem, 2vw, 2rem)',
                    borderRadius: 'clamp(16px, 2.5vw, 32px)',
                    gap: 'clamp(1rem, 2vw, 2rem)'
                  }}
                >
                  {/* Header */}
                  <div className="text-center space-y-2 md:space-y-4">
                    <h3
                      className="font-bold text-[#0b1220]/90 font-['Bricolage_Grotesque'] leading-none"
                      style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)' }}
                    >
                      {plan.title}
                    </h3>
                    <p
                      className="text-[#3b4558] font-['Bricolage_Grotesque'] leading-relaxed max-w-[300px] mx-auto"
                      style={{ fontSize: 'clamp(0.875rem, 1.25vw, 1.125rem)' }}
                    >
                      {plan.subtitle}
                    </p>
                  </div>

                  {/* Button */}
                  <RoundedArrowButton>
                    {plan.buttonText}
                  </RoundedArrowButton>

                  {/* Features List */}
                  <div className="w-full flex flex-col gap-2 md:gap-3 lg:gap-4 mt-2 md:mt-4">
                    {plan.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-2 md:gap-3 text-left">
                        <CheckIcon />
                        <span
                          className="text-[#3b4558] font-['Bricolage_Grotesque'] leading-tight"
                          style={{ fontSize: 'clamp(0.8125rem, 1.1vw, 0.9375rem)' }}
                        >
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section >
  );
}
