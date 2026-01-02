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

  return (
    <section ref={containerRef} className="relative w-full bg-gradient-to-r from-[#f2f7fb] to-[#c7ddf3]">
      {/* Container: Normal flow on mobile, scrollytelling on desktop */}
      <div className="min-h-screen md:h-[250vh] w-full">
        <div className="md:sticky md:top-0 min-h-screen md:h-screen w-full flex flex-col items-center justify-start md:justify-center py-8 md:py-0 px-6 md:px-8">
          <div className="max-w-7xl mx-auto relative z-10 w-full flex flex-col justify-center">

            {/* Heading - Scaled down on mobile */}
            <div className="text-center mb-6 md:mb-12 lg:mb-16">
              <motion.h2
                initial={{ opacity: 1, y: 0 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#0b1220]/90 font-['Bricolage_Grotesque'] leading-[1.2]"
              >
                Moment by moment,
                <br />
                watch your culture grow.
              </motion.h2>
            </div>

            {/* Cards Grid - Smaller cards on mobile */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 lg:gap-6">
              {CARDS.map((card, index) => {
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
                    key={card.id}
                    // Simple fade on mobile, no scroll-based animation
                    initial={{ opacity: 1, y: 0 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-[16px] md:rounded-[24px] lg:rounded-[32px] p-4 md:p-6 lg:p-8 shadow-[0px_4px_10px_0px_rgba(22,22,19,0.1)] flex flex-col items-start gap-3 md:gap-4 lg:gap-6 hover:shadow-lg transition-shadow"
                  >
                    {/* Icon Bubble - Smaller on mobile */}
                    <div className="bg-[#8e58df]/10 w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full flex items-center justify-center shrink-0">
                      <div className="w-5 h-5 md:w-6 md:h-6 lg:w-8 lg:h-8">
                        {card.icon}
                      </div>
                    </div>

                    {/* Title - Scaled down */}
                    <h3 className="text-lg md:text-xl lg:text-2xl xl:text-[28px] font-medium text-[#0b1220]/90 font-['Bricolage_Grotesque'] leading-tight">
                      {card.title}
                    </h3>

                    {/* Content - Smaller on mobile */}
                    <div className="text-[13px] md:text-[14px] lg:text-base text-[#3b4558] font-['Bricolage_Grotesque'] leading-relaxed">
                      {card.content}
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
