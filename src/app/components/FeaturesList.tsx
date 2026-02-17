import { useRef, useState, useEffect, memo } from "react";
import { motion, useScroll, useTransform, MotionValue } from "motion/react";
import { RoundedArrowButton } from "./ui/RoundedArrowButton";

const features = [
  {
    id: 1,
    title: "The \"Whisper\" in the Room",
    text: "Curi's Interaction Intelligence™ runs quietly in the background, understanding context and offering real-time guidance.",
    color: "bg-white",
    borderColor: "border-slate-200"
  },
  {
    id: 2,
    title: "Instant Relatedness",
    text: "Curi ingests professional context to help employees build immediate human rapport, turning transactional exchanges into relational connections.",
    color: "bg-white",
    borderColor: "border-slate-200"
  },
  {
    id: 3,
    title: "A Safe Space to Practice",
    text: "Before high-stakes moments, employees can roleplay scenarios. It's a judgment-free zone to sharpen delivery and reduce anxiety.",
    color: "bg-white",
    borderColor: "border-slate-200"
  },
  {
    id: 4,
    title: "Guidance in the Flow of Work",
    text: "Curi spots misalignment and offers suggestions to rephrase for clarity, empathy, and cultural consistency.",
    color: "bg-white",
    borderColor: "border-slate-200"
  },
  {
    id: 5,
    title: "Driving Commitment",
    text: "Curi's Clarity Engine identifies vague language and prompts for clarity, actively closing the Say-Do Gap.",
    color: "bg-white",
    borderColor: "border-slate-200"
  },
  {
    id: 6,
    title: "Measure the Culture Shift",
    text: "Move beyond annual surveys. Get real-time insights into where friction is occurring and watch your \"Say-Do Ratio\" improve.",
    color: "bg-white",
    borderColor: "border-slate-200"
  }
];

const Card = memo(({
  feature,
  index,
  total,
  scrollYProgress,
  isMobile
}: {
  feature: typeof features[0];
  index: number;
  total: number;
  scrollYProgress: any;
  isMobile: boolean;
}) => {
  if (!isMobile) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 0.6, delay: 0 }}
        className="bg-white p-4 md:p-6 lg:p-8 rounded-[16px] md:rounded-[24px] lg:rounded-[32px] shadow-sm border border-slate-100 hover:shadow-md transition-shadow h-full"
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
  }

  // Mobile Stack Animation Logic
  // Sequence: Title (0-0.1) -> Card 0 (0.1-0.3) -> Card 1 (0.3-0.5) -> Card 2 (0.5-0.7) -> Card 3 (0.7-0.9) -> CTA (0.9-1.0)

  const startOffset = 0.1; // Space for Title
  const cardDuration = 0.12; // Duration for each card to slide up (0.12 * 6 = 0.72)

  const start = startOffset + (index * cardDuration);
  const end = start + cardDuration;

  const targetY = index * 12; // Final stacked position
  const initialY = 400; // Start off-screen (bottom) - Reduced from 1000 for better performance

  const yMovement = useTransform(
    scrollYProgress,
    [start, end],
    [initialY, targetY],
    { clamp: true } // Prevents over-animation
  );

  const opacityMovement = useTransform(
    scrollYProgress,
    [start, start + cardDuration * 0.6],
    [0, 1],
    { clamp: true } // Prevents opacity extrapolation
  );

  const scaleMovement = useTransform(
    scrollYProgress,
    [start, end],
    [1, 0.96], // Subtle 4% shrink for depth
    { clamp: true }
  );

  return (
    <motion.div
      style={{
        y: yMovement,
        opacity: opacityMovement,
        scale: scaleMovement,
        willChange: 'transform, opacity', // GPU acceleration hint
        zIndex: index + 10,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
      }}
      className={`w-full ${feature.color === 'bg-[#F2F7FB]' ? 'bg-[#F2F7FB]' : 'bg-white'} p-6 rounded-[24px] border border-slate-200 min-h-[380px] flex flex-col`}
    >
      <div className="flex items-start gap-3 mb-4">
        <div className="w-10 h-10 bg-[#2b72ba] rounded-full flex items-center justify-center text-white text-lg font-bold shrink-0">
          {feature.id}
        </div>
        <h3 className="text-xl font-bold text-[#3b4558] font-['Bricolage_Grotesque'] leading-tight pt-1">
          {feature.title}
        </h3>
      </div>
      <p className="text-[15px] text-[#3b4558] leading-relaxed flex-grow">
        {feature.text}
      </p>

    </motion.div>
  );
}, (prevProps, nextProps) => {
  // Only re-render if props actually change
  return (
    prevProps.index === nextProps.index &&
    prevProps.isMobile === nextProps.isMobile &&
    prevProps.scrollYProgress === nextProps.scrollYProgress
  );
});

// Last Card with CTA combined - Mobile only
const LastCardWithCTA = memo(({
  feature,
  index,
  scrollYProgress
}: {
  feature: typeof features[0];
  index: number;
  scrollYProgress: any;
}) => {
  const startOffset = 0.1;
  const cardDuration = 0.12;
  const start = startOffset + (index * cardDuration);
  const end = start + cardDuration;
  const targetY = index * 12;
  const initialY = 400;

  const yMovement = useTransform(
    scrollYProgress,
    [start, end],
    [initialY, targetY],
    { clamp: true }
  );

  const opacityMovement = useTransform(
    scrollYProgress,
    [start, start + cardDuration * 0.6],
    [0, 1],
    { clamp: true }
  );

  const scaleMovement = useTransform(
    scrollYProgress,
    [start, end],
    [1, 0.96], // Subtle 4% shrink for depth
    { clamp: true }
  );

  return (
    <motion.div
      style={{
        y: yMovement,
        opacity: opacityMovement,
        scale: scaleMovement,
        willChange: 'transform, opacity',
        zIndex: index + 10,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
      }}
      className="w-full flex flex-col"
    >
      {/* Card 5 */}
      <div className="bg-white p-6 rounded-[24px] border border-slate-200 min-h-[380px] flex flex-col">
        <div className="flex items-start gap-3 mb-4">
          <div className="w-10 h-10 bg-[#2b72ba] rounded-full flex items-center justify-center text-white text-lg font-bold shrink-0">
            {feature.id}
          </div>
          <h3 className="text-xl font-bold text-[#3b4558] font-['Bricolage_Grotesque'] leading-tight pt-1">
            {feature.title}
          </h3>
        </div>
        <p className="text-[15px] text-[#3b4558] leading-relaxed flex-grow">
          {feature.text}
        </p>
      </div>

      {/* Spacing between card and CTA */}
      <div className="h-6" />

      {/* CTA Button - moves with Card 5 */}
      <div className="flex justify-center">
        <RoundedArrowButton>Request Demo</RoundedArrowButton>
      </div>
    </motion.div>
  );
}, (prevProps, nextProps) => {
  return (
    prevProps.index === nextProps.index &&
    prevProps.scrollYProgress === nextProps.scrollYProgress
  );
});

// Desktop/Tablet card component - now animated via scroll
const DesktopFeatureCard = memo(({
  feature,
  index,
  scrollYProgress
}: {
  feature: typeof features[0];
  index: number;
  scrollYProgress: any;
}) => {
  // Timing distribution for 6 cards (after Title 0.0-0.1)
  const startOffset = 0.15;
  const duration = 0.125; // Increased from 0.1 to fill 500vh space (end ~0.9)
  const start = startOffset + (index * duration);
  const end = start + duration;

  // Each card slides from the deep bottom to its grid position
  const yMovement = useTransform(
    scrollYProgress,
    [start, end],
    [600, 0], // Reduced from 1000 for better performance
    { clamp: true }
  );

  const opacityMovement = useTransform(
    scrollYProgress,
    [start, start + 0.02], // Quick fade-in as it starts moving
    [0, 1],
    { clamp: true }
  );

  return (
    <motion.div
      className="bg-white border border-slate-100 h-full flex flex-col"
      style={{
        y: yMovement,
        opacity: opacityMovement,
        willChange: 'transform, opacity', // GPU acceleration hint
        padding: 'clamp(1rem, 1.5vw, 1.5rem)',
        borderRadius: 'clamp(16px, 2.5vw, 32px)'
      }}
    >
      <div
        className="flex items-start shrink-0"
        style={{
          gap: 'clamp(0.5rem, 1vw, 1rem)',
          marginBottom: 'clamp(0.75rem, 1.2vw, 1.25rem)'
        }}
      >
        <div
          className="shrink-0 bg-[#2b72ba] rounded-full flex items-center justify-center text-white font-bold"
          style={{
            width: 'clamp(2.5rem, 3.5vw, 3.5rem)',
            height: 'clamp(2.5rem, 3.5vw, 3.5rem)',
            fontSize: 'clamp(1rem, 1.3vw, 1.25rem)'
          }}
        >
          {feature.id}
        </div>
        <h3
          className="font-bold text-[#3b4558] font-['Bricolage_Grotesque'] leading-tight"
          style={{
            fontSize: 'clamp(1rem, 1.8vw, 1.5rem)',
            paddingTop: 'clamp(0.25rem, 0.5vw, 0.5rem)'
          }}
        >
          {feature.title}
        </h3>
      </div>
      <p
        className="text-[#3b4558] leading-relaxed flex-grow"
        style={{ fontSize: 'clamp(0.8125rem, 1.1vw, 0.9375rem)' }}
      >
        {feature.text}
      </p>
    </motion.div>
  );
}, (prevProps, nextProps) => {
  // Only re-render if props actually change
  return (
    prevProps.index === nextProps.index &&
    prevProps.scrollYProgress === nextProps.scrollYProgress
  );
});

export function FeaturesList() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    let resizeTimer: NodeJS.Timeout;

    const checkScreen = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        const width = window.innerWidth;
        setIsMobile(width < 640);
        // Extend tablet range to include iPad Pro and small laptops
        setIsTablet(width >= 768 && width < 1280);
      }, 150); // 150ms debounce - reduces updates from 100+/sec to ~6/sec
    };

    checkScreen(); // Initial check
    window.addEventListener("resize", checkScreen);
    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", checkScreen);
    };
  }, []); // Empty deps - effect runs once on mount

  // Title Animation (0 - 0.1)
  const titleY = useTransform(scrollYProgress, [0, 0.1], [50, 0]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  // CTA Animation (0.78 - 0.9) - Sync to end after last card (index 5 ends at 0.9)
  const ctaY = useTransform(scrollYProgress, [0.78, 0.9], [1000, 0], { clamp: true });
  const ctaOpacity = useTransform(scrollYProgress, [0.78, 0.9], [0, 1]);

  // Mobile CTA Animation - Sync with last card (index 5: 0.1 + (5 * 0.12) = 0.7 + 0.12 = 0.82)
  // Animate after last card is done
  const mobileCtaY = useTransform(scrollYProgress, [0.82, 0.92], [100, 0], { clamp: true });
  const mobileCtaOpacity = useTransform(scrollYProgress, [0.82, 0.92], [0, 1]);

  return (
    <section ref={containerRef} className="relative z-[20] pt-20 md:pt-24">
      {/* Desktop/Tablet: sequential layout, Mobile: scroll-triggered */}
      <div className={`${isMobile ? 'h-[180vh]' : 'h-[280vh]'} w-full`}>

        <div className="sticky top-0 h-screen overflow-hidden w-full">

          <div className="w-full max-w-7xl mx-auto px-6 md:px-8 relative h-full flex flex-col justify-center">

            {/* Heading - Fluid Typography */}
            {isMobile ? (
              <div className="text-center mt-20 mb-6">
                <h2
                  className="font-bold text-[#0b1220] font-['Bricolage_Grotesque'] leading-tight"
                  style={{ fontSize: 'clamp(2.25rem, 5vw, 3.75rem)' }}
                >
                  How Curi creates endless<br className="hidden md:block" /> aligned conversations:
                </h2>
              </div>
            ) : (
              <div className="text-center mb-6">
                <h2
                  className="font-bold text-[#0b1220] font-['Bricolage_Grotesque'] leading-tight"
                  style={{ fontSize: 'clamp(2.25rem, 5vw, 3.75rem)' }}
                >
                  How Curi creates endless<br className="hidden md:block" /> aligned conversations:
                </h2>
              </div>
            )}

            {/* Content Area */}
            {isMobile ? (
              // Mobile: Card Stack with scroll animation
              <div className="relative w-full max-w-sm mx-auto flex-grow">
                <div className="relative w-full h-[400px]">
                  {features.map((feature, i) => {
                    // Special handling for last card (index 5) - combine with CTA button
                    if (i === 5) {
                      return (
                        <LastCardWithCTA
                          key={feature.id}
                          feature={feature}
                          index={i}
                          scrollYProgress={scrollYProgress}
                        />
                      );
                    }

                    // Regular cards (0-4)
                    return (
                      <Card
                        key={feature.id}
                        feature={feature}
                        index={i}
                        total={features.length}
                        scrollYProgress={scrollYProgress}
                        isMobile={true}
                      />
                    );
                  })}
                </div>
              </div>
            ) : (
              // Desktop & Tablet: Grid with scroll sequential animation - Fluid gap
              <div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 overflow-visible items-stretch"
                style={{ gap: 'clamp(1rem, 2vw, 2rem)' }}
              >
                {features.map((feature, i) => (
                  <DesktopFeatureCard
                    key={feature.id}
                    feature={feature}
                    index={i}
                    scrollYProgress={scrollYProgress}
                  />
                ))}
              </div>
            )}

            {/* Button - Desktop only (Mobile CTA is now combined with Card 5) */}
            {!isMobile && (
              <motion.div
                style={{ y: ctaY, opacity: ctaOpacity }}
                className="flex justify-center mt-6"
              >
                <RoundedArrowButton>Request Demo</RoundedArrowButton>
              </motion.div>
            )}

          </div>
        </div>
      </div>
    </section>
  );
}
