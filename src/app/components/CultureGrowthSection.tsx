import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import svgPaths from "../../imports/svg-og2k9rr02p";

// --- Icons ---

function IconWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative shrink-0 w-8 h-8">
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
    title: (
      <>
        The message your
        <br />
        afraid to send
      </>
    ),
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
    title: (
      <>
        The conflict that
        <br />
        keeps getting
        <br />
        postponed
      </>
    ),
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
    title: (
      <>
        The commitment that
        <br />
        usually slips
      </>
    ),
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
      {/* 
        Container Height: 
        Needs to be tall enough to allow scrolling through the animations.
        ~200vh ensures enough scroll distance for 3 items to animate in sequentially.
      */}
      <div className="h-[250vh] w-full">
        <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden px-4 md:px-8">
          <div className="max-w-7xl mx-auto relative z-10 w-full flex flex-col justify-center h-full">
            
            {/* Heading */}
            <div className="text-center mb-16 md:mb-24">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl md:text-5xl lg:text-[64px] font-bold text-[#0b1220]/90 font-['Bricolage_Grotesque'] leading-[1.2]"
              >
                Moment by moment,
                <br />
                watch your culture grow.
              </motion.h2>
            </div>
    
            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {CARDS.map((card, index) => {
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
                    key={card.id}
                    style={{ opacity, y, scale }}
                    className="bg-white rounded-[32px] p-10 shadow-[0px_4px_10px_0px_rgba(22,22,19,0.1)] flex flex-col items-start gap-6 hover:shadow-lg transition-shadow"
                  >
                    {/* Icon Bubble */}
                    <div className="bg-[#8e58df]/10 w-14 h-14 rounded-full flex items-center justify-center shrink-0">
                      <div className="w-8 h-8">
                        {card.icon}
                      </div>
                    </div>
    
                    {/* Title */}
                    <h3 className="text-[32px] font-medium text-[#0b1220]/90 font-['Bricolage_Grotesque'] leading-tight">
                      {card.title}
                    </h3>
    
                    {/* Content */}
                    <div className="text-base text-[#3b4558] font-['Bricolage_Grotesque'] leading-relaxed">
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
