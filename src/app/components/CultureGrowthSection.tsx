import { useRef, useState, useEffect } from "react";
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

const CultureCard = ({
  card,
  index,
  total,
  scrollYProgress,
  isMobile
}: {
  card: typeof CARDS[0];
  index: number;
  total: number;
  scrollYProgress: any;
  isMobile: boolean;
}) => {
  if (!isMobile) {
    const start = index * 0.2;
    const end = start + 0.2;
    // Desktop animation logic (kept similar to original idea but simplified inline) or we can use the original motion props
    // The original code used a loop with scrollYProgress. 
    // We can just utilize whileInView for simplicity to match other desktop sections if preferred, 
    // OR keep the scroll sync if that was a desired desktop feature.
    // The user said "remove existing animations then proceed with new animation". 
    // I'll stick to a clean whileInView for desktop to be consistent with FeaturesList/ProcessSteps desktop grid.

    return (
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        className="bg-white rounded-[16px] md:rounded-[24px] lg:rounded-[32px] p-4 md:p-6 lg:p-8 shadow-[0px_4px_10px_0px_rgba(22,22,19,0.1)] flex flex-col items-start gap-3 md:gap-4 lg:gap-6 hover:shadow-lg transition-shadow h-full"
      >
        <div className="bg-[#8e58df]/10 w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full flex items-center justify-center shrink-0">
          <div className="w-5 h-5 md:w-6 md:h-6 lg:w-8 lg:h-8">
            {card.icon}
          </div>
        </div>
        <h3 className="text-lg md:text-xl lg:text-2xl xl:text-[28px] font-medium text-[#0b1220]/90 font-['Bricolage_Grotesque'] leading-tight">
          {card.title}
        </h3>
        <div className="text-[13px] md:text-[14px] lg:text-base text-[#3b4558] font-['Bricolage_Grotesque'] leading-relaxed">
          {card.content}
        </div>
      </motion.div>
    );
  }

  // Mobile Stack Animation Logic
  // Header (0-0.1) -> Card 0 -> Card 1 -> Card 2
  // We have 3 cards.
  // ~0.8 scroll space for cards. ~0.25 per card.

  // Immediate start like ProcessSteps
  const startOffset = -0.05;
  const cardDuration = 0.25;

  const start = startOffset + (index * cardDuration);
  const end = start + cardDuration;

  const targetY = index * 12;
  const initialY = 800;

  const yMovement = useTransform(
    scrollYProgress,
    [start, end],
    [initialY, targetY]
  );

  // No opacity fade, just slide.

  return (
    <motion.div
      style={{
        y: yMovement,
        zIndex: index + 10,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
      }}
      className="w-full bg-white p-6 rounded-[24px] shadow-xl border border-slate-200 h-[320px] flex flex-col items-start gap-4"
    >
      <div className="bg-[#8e58df]/10 w-10 h-10 rounded-full flex items-center justify-center shrink-0">
        <div className="w-5 h-5">
          {card.icon}
        </div>
      </div>
      <h3 className="text-xl font-medium text-[#0b1220]/90 font-['Bricolage_Grotesque'] leading-tight">
        {card.title}
      </h3>
      <div className="text-[15px] text-[#3b4558] font-['Bricolage_Grotesque'] leading-relaxed">
        {card.content}
      </div>
    </motion.div>
  );
};

// Desktop/Tablet card component - no animation, static display
const DesktopCultureCard = ({
  card
}: {
  card: typeof CARDS[0];
}) => {
  return (
    <div
      className="bg-white rounded-[16px] md:rounded-[24px] lg:rounded-[32px] p-4 md:p-6 lg:p-8 shadow-[0px_4px_10px_0px_rgba(22,22,19,0.1)] flex flex-col items-start gap-3 md:gap-4 lg:gap-6 hover:shadow-lg transition-shadow h-full"
    >
      <div className="bg-[#8e58df]/10 w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full flex items-center justify-center shrink-0">
        <div className="w-5 h-5 md:w-6 md:h-6 lg:w-8 lg:h-8">
          {card.icon}
        </div>
      </div>
      <h3 className="text-lg md:text-xl lg:text-2xl xl:text-[28px] font-medium text-[#0b1220]/90 font-['Bricolage_Grotesque'] leading-tight">
        {card.title}
      </h3>
      <div className="text-[13px] md:text-[14px] lg:text-base text-[#3b4558] font-['Bricolage_Grotesque'] leading-relaxed">
        {card.content}
      </div>
    </div>
  );
};

export function CultureGrowthSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      // Extend tablet range to include iPad Pro and small laptops
      setIsTablet(width >= 768 && width < 1280);
    };
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  // Header Animation (0 - 0.1)
  const headerY = useTransform(scrollYProgress, [0, 0.1], [50, 0]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <section ref={containerRef} className="relative w-full bg-gradient-to-r from-[#f2f7fb] to-[#c7ddf3]">
      {/* Desktop/Tablet: static layout, Mobile: scroll-triggered */}
      <div className={`${isMobile ? 'h-[200vh]' : 'min-h-screen py-16 md:py-20'} w-full`}>
        <div className={`${isMobile ? 'sticky top-0 h-screen overflow-hidden' : 'relative'} w-full flex flex-col items-center justify-start md:justify-center py-8 md:py-0 px-6 md:px-8`}>
          <div className="max-w-7xl mx-auto relative z-10 w-full flex flex-col justify-center h-full">

            {/* Heading */}
            {isMobile ? (
              <motion.div
                style={{ y: headerY, opacity: headerOpacity }}
                className="text-center mt-20 mb-8"
              >
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#0b1220]/90 font-['Bricolage_Grotesque'] leading-[1.2]">
                  Moment by moment,
                  <br />
                  watch your culture grow.
                </h2>
              </motion.div>
            ) : (
              <div className="text-center mb-6 md:mb-12 lg:mb-16">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#0b1220]/90 font-['Bricolage_Grotesque'] leading-[1.2]">
                  Moment by moment,
                  <br />
                  watch your culture grow.
                </h2>
              </div>
            )}

            {/* Content Area */}
            {isMobile ? (
              // Mobile Stack with scroll animation
              <div className="relative w-full max-w-sm mx-auto flex-grow block md:hidden">
                <div className="relative w-full h-[350px]">
                  {CARDS.map((card, index) => (
                    <CultureCard
                      key={card.id}
                      card={card}
                      index={index}
                      total={CARDS.length}
                      scrollYProgress={scrollYProgress}
                      isMobile={true}
                    />
                  ))}
                </div>
              </div>
            ) : (
              // Desktop/Tablet Grid - no animation
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 lg:gap-6 hidden md:grid">
                {CARDS.map((card) => (
                  <DesktopCultureCard
                    key={card.id}
                    card={card}
                  />
                ))}
              </div>
            )}

          </div>
        </div>
      </div>
    </section>
  );
}
