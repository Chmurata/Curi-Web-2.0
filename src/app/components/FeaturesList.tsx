import { useRef, useState, useEffect } from "react";
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

const Card = ({
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
        transition={{ duration: 0.6, delay: index * 0.1 }}
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
  const initialY = 1000; // Start off-screen (bottom)

  const yMovement = useTransform(
    scrollYProgress,
    [start, end],
    [initialY, targetY]
  );

  const opacityMovement = useTransform(
    scrollYProgress,
    [start, start + cardDuration * 0.6],
    [0, 1]
  );

  return (
    <motion.div
      style={{
        y: yMovement,
        opacity: opacityMovement,
        zIndex: index + 10,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
      }}
      className={`w-full ${feature.color === 'bg-[#F2F7FB]' ? 'bg-[#F2F7FB]' : 'bg-white'} p-6 rounded-[24px] shadow-xl border border-slate-200 h-[380px] flex flex-col`}
    >
      <div className="flex items-start gap-3 mb-4">
        <div className="w-10 h-10 bg-[#2b72ba] rounded-full flex items-center justify-center text-white text-lg font-bold shrink-0 shadow-lg shadow-blue-900/20">
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
};

// Desktop/Tablet card component - now animated via scroll
const DesktopFeatureCard = ({
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
    [1000, 0],
    { clamp: true }
  );

  const opacityMovement = useTransform(
    scrollYProgress,
    [start, start + 0.02], // Quick fade-in as it starts moving
    [0, 1]
  );

  return (
    <motion.div
      style={{ y: yMovement, opacity: opacityMovement }}
      className="bg-white p-4 md:p-5 lg:p-6 rounded-[16px] md:rounded-[24px] lg:rounded-[32px] shadow-sm border border-slate-100 hover:shadow-md transition-shadow h-full flex flex-col"
    >
      <div className="flex items-start gap-2 md:gap-3 lg:gap-4 mb-3 md:mb-4 lg:mb-5 shrink-0">
        <div className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 bg-[#2b72ba] rounded-full flex items-center justify-center text-white text-base md:text-lg lg:text-xl font-bold shrink-0 shadow-lg shadow-blue-900/20">
          {feature.id}
        </div>
        <h3 className="text-base md:text-lg lg:text-xl xl:text-2xl font-bold text-[#3b4558] font-['Bricolage_Grotesque'] leading-tight pt-1 md:pt-2">
          {feature.title}
        </h3>
      </div>
      <p className="text-[13px] md:text-[14px] lg:text-[15px] text-[#3b4558] leading-relaxed flex-grow">
        {feature.text}
      </p>
    </motion.div>
  );
};

export function FeaturesList() {
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
    <section ref={containerRef} className="relative z-[20] pt-24 md:pt-32">
      {/* Desktop/Tablet: sequential layout, Mobile: scroll-triggered */}
      <div className={`${isMobile ? 'h-[450vh]' : 'h-[500vh]'} w-full`}>

        <div className="sticky top-0 h-screen overflow-hidden w-full">

          <div className="w-full max-w-7xl mx-auto px-6 md:px-8 relative h-full flex flex-col justify-center">

            {/* Heading */}
            {isMobile ? (
              <div className="text-center mt-20 mb-6">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#0b1220] font-['Bricolage_Grotesque'] leading-tight">
                  How Curi creates endless<br className="hidden md:block" /> aligned conversations:
                </h2>
              </div>
            ) : (
              <div className="text-center mb-4 md:mb-6">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#0b1220] font-['Bricolage_Grotesque'] leading-tight">
                  How Curi creates endless<br className="hidden md:block" /> aligned conversations:
                </h2>
              </div>
            )}

            {/* Content Area */}
            {isMobile ? (
              // Mobile: Card Stack with scroll animation
              <div className="relative w-full max-w-sm mx-auto flex-grow">
                <div className="relative w-full h-[400px]">
                  {features.map((feature, i) => (
                    <Card
                      key={feature.id}
                      feature={feature}
                      index={i}
                      total={features.length}
                      scrollYProgress={scrollYProgress}
                      isMobile={true}
                    />
                  ))}
                </div>
              </div>
            ) : (
              // Desktop & Tablet: Grid with scroll sequential animation
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 overflow-visible items-stretch">
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

            {/* Button */}
            {isMobile ? (
              <motion.div
                style={{ y: mobileCtaY, opacity: mobileCtaOpacity }}
                className="flex justify-center absolute bottom-20 inset-x-0"
              >
                <RoundedArrowButton>Request Demo</RoundedArrowButton>
              </motion.div>
            ) : (
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
