import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import svgPaths from "../../imports/svg-og2k9rr02p";

// --- Icons ---

function IconWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative shrink-0 w-6 h-6 md:w-8 md:h-8">
      <svg className="block w-full h-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        {children}
      </svg>
    </div>
  );
}

function IconStar() {
  return (
    <IconWrapper>
      <g clipPath="url(#clip0_star)">
        <path d={svgPaths.p1d9b8100} fill="var(--fill-0, black)" />
        <path d={svgPaths.p2d5aea00} fill="var(--fill-0, black)" />
        <path d={svgPaths.p170cf680} fill="var(--fill-0, black)" />
      </g>
      <defs>
        <clipPath id="clip0_star">
          <rect fill="white" height="32" width="32" />
        </clipPath>
      </defs>
    </IconWrapper>
  );
}

function IconY() {
  return (
    <IconWrapper>
      <g clipPath="url(#clip0_y)">
        <path clipRule="evenodd" d={svgPaths.pac14080} fill="var(--fill-0, black)" fillRule="evenodd" />
      </g>
      <defs>
        <clipPath id="clip0_y">
          <rect fill="white" height="32" width="32" />
        </clipPath>
      </defs>
    </IconWrapper>
  );
}

// --- Component ---

const CARDS = [
  {
    id: 1,
    icon: <IconStar />,
    title: "The message your afraid to send",
    content: (
      <>
        Get coached to say it clearly—
        <span className="font-bold text-[#3b4558]">without triggering defensiveness.</span>
      </>
    ),
  },
  {
    id: 2,
    icon: <IconY />,
    title: "The conflict that keeps getting postponed",
    content: (
      <>
        Create a psychologically safe structure to address it{" "}
        <span className="font-bold text-[#3b4558]">now</span>, not later.
      </>
    ),
  },
  {
    id: 3,
    icon: <IconY />,
    title: "The commitment that usually slips",
    content: (
      <>
        Turn "I'll try" into a clear agreement with a date and next steps.
      </>
    ),
  },
];

export function CultureGrowthSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Content Animation (Pure Scroll from Bottom) - Matching PlansSection
  const cardsY = useTransform(scrollYProgress, [0, 0.5], ["110vh", "0vh"]);

  return (
    <section ref={containerRef} className="relative w-full h-[140vh]">
      <div className="sticky top-0 min-h-screen w-full flex flex-col items-center justify-center">
        <div className="w-full h-full flex flex-col items-center justify-center px-6 md:px-8">

          <div className="max-w-7xl mx-auto w-full flex flex-col items-center justify-center h-full">

            {/* Heading - Pins at top */}
            <div className="text-center mb-8 md:mb-12 lg:mb-16 shrink-0 relative z-20 pt-20 md:pt-0">
              <h2
                className="font-bold text-[#0b1220]/90 font-['Bricolage_Grotesque'] leading-[1.2]"
                style={{ fontSize: 'clamp(2.25rem, 5vw, 3.75rem)' }}
              >
                Moment by moment,
                <br />
                watch your culture grow.
              </h2>
            </div>

            {/* Content Area - Animated Grid */}
            <motion.div
              style={{
                y: cardsY,
                gap: 'clamp(1.5rem, 2vw, 2rem)'
              }}
              className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 relative z-10"
            >
              {CARDS.map((card) => (
                <div
                  key={card.id}
                  className="bg-white shadow-[0px_4px_10px_0px_rgba(22,22,19,0.1)] flex flex-col items-start hover:shadow-lg transition-shadow h-full"
                  style={{
                    padding: 'clamp(1.5rem, 2vw, 2rem)',
                    borderRadius: 'clamp(16px, 2.5vw, 32px)',
                    gap: 'clamp(1rem, 1.5vw, 1.5rem)'
                  }}
                >
                  <div
                    className="bg-[#8e58df]/10 rounded-full flex items-center justify-center shrink-0"
                    style={{
                      width: 'clamp(3rem, 4vw, 3.5rem)',
                      height: 'clamp(3rem, 4vw, 3.5rem)'
                    }}
                  >
                    <div className="w-1/2 h-1/2 flex items-center justify-center">
                      {card.icon}
                    </div>
                  </div>
                  <h3
                    className="font-medium text-[#0b1220]/90 font-['Bricolage_Grotesque'] leading-tight"
                    style={{ fontSize: 'clamp(1.25rem, 2vw, 1.75rem)' }}
                  >
                    {card.title}
                  </h3>
                  <div
                    className="text-[#3b4558] font-['Bricolage_Grotesque'] leading-relaxed"
                    style={{ fontSize: 'clamp(0.9375rem, 1.1vw, 1rem)' }}
                  >
                    {card.content}
                  </div>
                </div>
              ))}
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
