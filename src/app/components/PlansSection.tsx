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
    offset: ["start end", "end start"],
  });

  // Headline scroll-linked dissolve animation
  const headingOpacity = useTransform(scrollYProgress, [0.1, 0.25], [0, 1]);
  const headingY = useTransform(scrollYProgress, [0.1, 0.25], [40, 0]);

  return (
    <section ref={containerRef} className="relative w-full">
      {/* Static layout - no scroll animations */}
      <div className="min-h-screen py-16 md:py-20 w-full">
        <div className="min-h-screen w-full flex flex-col items-center justify-start lg:justify-center px-6 md:px-8">
          <div className="max-w-7xl mx-auto relative z-10 w-full flex flex-col justify-center">

            {/* Heading - Scroll-linked dissolve */}
            <motion.div
              style={{ opacity: headingOpacity, y: headingY }}
              className="text-center mb-8 md:mb-16 lg:mb-20"
            >
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#0b1220]/90 font-['Bricolage_Grotesque'] leading-tight">
                Our Plans
              </h2>
            </motion.div>

            {/* Cards Grid - Static, no animation */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
              {PLANS.map((plan) => (
                <div
                  key={plan.id}
                  className="h-full relative group hover:scale-[0.98] transition-transform duration-200 ease-out will-change-transform"
                >
                  {/* Gradient border that appears on hover */}
                  <div className="absolute inset-[-4px] rounded-[20px] md:rounded-[28px] lg:rounded-[36px] bg-gradient-to-r from-[#2b72ba] to-[#5a9fd4] opacity-0 group-hover:opacity-100 transition-opacity duration-200 will-change-opacity" />
                  <div className="relative bg-white rounded-[16px] md:rounded-[24px] lg:rounded-[32px] p-4 md:p-6 lg:p-8 flex flex-col items-center gap-4 md:gap-6 lg:gap-8 h-full shadow-[0_8px_32px_rgba(43,114,186,0.15)] group-hover:shadow-[0_12px_40px_rgba(43,114,186,0.25)] transition-shadow duration-200">
                    {/* Header */}
                    <div className="text-center space-y-2 md:space-y-4">
                      <h3 className="text-[28px] md:text-[36px] lg:text-[44px] font-bold text-[#0b1220]/90 font-['Bricolage_Grotesque'] leading-none">
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

                    {/* Features List */}
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
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
