import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { RoundedArrowButton } from "./ui/RoundedArrowButton";

const STEPS = [
  {
    id: 1,
    title: ["Define your", "culture"],
    content: (
      <>
        Upload values, leadership principles, and "what good looks like" so guidance reflects your standards.
      </>
    )
  },
  {
    id: 2,
    title: ["Meet Curi in the", "workflow"],
    content: (
      <>
        Bring Curi's Interaction Intelligence and coaching into the channels where work actually happens (messages, 1:1 prep, difficult conversations).
      </>
    )
  },
  {
    id: 3,
    title: ["Private \"whisper\"", "coaching"],
    content: (
      <>
        Before high-stakes moments, employees can roleplay scenarios with custom personas and get private coaching. It's a judgment-free zone to <span className="font-bold">sharpen delivery</span> and <span className="font-bold">reduce anxiety</span> before the real conversation happens.
      </>
    )
  },
  {
    id: 4,
    title: ["Make conversations", "psychologically safe"],
    content: (
      <>
        Before you hit send—or as you prepare—Curi helps you choose language that keeps safety and accountability intact. Purpose driven conversations reduce defensiveness and keep momentum toward outcomes, not escalation.
      </>
    )
  },
  {
    id: 5,
    title: ["Ratify clear", "agreements"],
    content: (
      <>
        Curi's <span className="font-bold">Clarity Engine</span> flags vague language ("I'll try to do that") and prompts employees for <span className="font-bold">clarity</span> ("I will deliver this by Friday"). The result: Measureable steps both people can agree to, actively closing the <span className="font-bold">Say-Do Gap</span>.
      </>
    )
  },
  {
    id: 6,
    title: ["Measure the", "Culture Shift"],
    content: (
      <>
        Track adoption and progress (engagement, follow-through patterns, conversation health indicators) to show impact over time. Move beyond annual surveys with real-time, anonymized insights into where friction is occurring and watch your "Say-Do Ratio" improve over time.
      </>
    )
  }
];

const ProcessCard = ({
  step,
  index,
  total,
  scrollYProgress,
  isMobile
}: {
  step: typeof STEPS[0];
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
        className="flex flex-col h-full"
      >
        <div className="bg-white rounded-[16px] md:rounded-[24px] lg:rounded-[32px] p-4 md:p-5 lg:p-6 h-full shadow-sm border border-slate-100 hover:shadow-md transition-shadow flex flex-col gap-3 md:gap-4 lg:gap-5">
          <div className="flex items-center gap-2 md:gap-3 lg:gap-4">
            <div className="shrink-0 w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 bg-[#2b72ba] rounded-full flex items-center justify-center text-white text-base md:text-lg lg:text-xl font-medium shadow-md">
              {step.id}
            </div>
            <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-[#3b4558] font-['Bricolage_Grotesque'] leading-tight">
              {step.title.map((line, i) => (
                <span key={i} className="block">{line}</span>
              ))}
            </h3>
          </div>
          <div className="text-[13px] md:text-[14px] lg:text-[15px] leading-relaxed text-[#3b4558] font-['Bricolage_Grotesque'] font-normal">
            {step.content}
          </div>
        </div>
      </motion.div>
    );
  }

  // Mobile Stack Animation Logic
  // Using 6 cards here ( STEPS.length is 6 )
  // TItle -> Card 0 -> ... -> Card 5 -> CTA
  // Total items = 1 (title) + 6 (cards) + 1 (cta) = 8 items roughly to sequence?
  // Let's condense. 

  // Logic from FeaturesList: 
  // Title (0-0.1), Cards (seq), CTA (0.9-1.0)

  // Adjusted for immediate start (no title delay needed)
  const startOffset = 0.05;
  // With 6 cards, we have 0.8 / 6 per card = ~0.133
  const cardDuration = 0.12;

  const start = startOffset + (index * cardDuration);
  const end = start + cardDuration;

  const targetY = index * 12; // Final stacked position
  const initialY = 1000; // Start off-screen

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
      className="w-full bg-white p-6 rounded-[24px] shadow-xl border border-slate-200 h-[380px] flex flex-col"
    >
      <div className="flex items-start gap-3 mb-4">
        <div className="w-10 h-10 bg-[#2b72ba] rounded-full flex items-center justify-center text-white text-lg font-bold shrink-0 shadow-lg shadow-blue-900/20">
          {step.id}
        </div>
        <h3 className="text-xl font-bold text-[#3b4558] font-['Bricolage_Grotesque'] leading-tight pt-1">
          {step.title.map((line, i) => (
            <span key={i} className="block">{line}</span>
          ))}
        </h3>
      </div>
      <div className="text-[15px] text-[#3b4558] leading-relaxed flex-grow font-['Bricolage_Grotesque']">
        {step.content}
      </div>
    </motion.div>
  );
};

// Desktop/Tablet card component - animated via scroll
const DesktopProcessCard = ({
  step,
  index,
  scrollYProgress
}: {
  step: typeof STEPS[0];
  index: number;
  scrollYProgress: any;
}) => {
  // Timing distribution for 6 cards
  // Optimized for 500vh height (spread to ~90%)
  const startOffset = 0.05;
  const duration = 0.14; // Increased from 0.1 to fill space
  const start = startOffset + (index * duration);
  const end = start + duration;

  // Each card slides from the bottom to its grid position
  const yMovement = useTransform(
    scrollYProgress,
    [start, end],
    [1000, 0],
    { clamp: true }
  );

  const opacityMovement = useTransform(
    scrollYProgress,
    [start, start + 0.02], // Quick fade-in
    [0, 1]
  );

  return (
    <motion.div
      style={{ y: yMovement, opacity: opacityMovement }}
      className="flex flex-col h-full"
    >
      <div
        className="bg-white h-full shadow-sm border border-slate-100 hover:shadow-md transition-shadow flex flex-col"
        style={{
          padding: 'clamp(1rem, 1.5vw, 1.5rem)',
          borderRadius: 'clamp(16px, 2.5vw, 32px)',
          gap: 'clamp(0.75rem, 1.2vw, 1.25rem)'
        }}
      >
        <div
          className="flex items-center"
          style={{ gap: 'clamp(0.5rem, 1vw, 1rem)' }}
        >
          <div
            className="shrink-0 bg-[#2b72ba] rounded-full flex items-center justify-center text-white font-medium shadow-md"
            style={{
              width: 'clamp(2.5rem, 3.5vw, 3.5rem)',
              height: 'clamp(2.5rem, 3.5vw, 3.5rem)',
              fontSize: 'clamp(1rem, 1.3vw, 1.25rem)'
            }}
          >
            {step.id}
          </div>
          <h3
            className="font-bold text-[#3b4558] font-['Bricolage_Grotesque'] leading-tight"
            style={{ fontSize: 'clamp(1.125rem, 2vw, 1.875rem)' }}
          >
            {step.title.map((line, i) => (
              <span key={i} className="block">{line}</span>
            ))}
          </h3>
        </div>
        <div
          className="leading-relaxed text-[#3b4558] font-['Bricolage_Grotesque'] font-normal"
          style={{ fontSize: 'clamp(0.8125rem, 1.1vw, 0.9375rem)' }}
        >
          {step.content}
        </div>
      </div>
    </motion.div>
  );
};

export function ProcessSteps() {
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
      setIsMobile(width < 576); // Keep grid layout until very small screens
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

  // CTA Animation (0.75 - 0.90) - Sync to end after last card (index 5 ends at ~0.89)
  const ctaY = useTransform(scrollYProgress, [0.75, 0.9], [1000, 0], { clamp: true });
  const ctaOpacity = useTransform(scrollYProgress, [0.75, 0.9], [0, 1]);

  // Mobile CTA Animation - Sync with last card (index 5: 0.05 + (5 * 0.12) = 0.65 + 0.12 = 0.77)
  const mobileCtaY = useTransform(scrollYProgress, [0.77, 0.87], [100, 0], { clamp: true });
  const mobileCtaOpacity = useTransform(scrollYProgress, [0.77, 0.87], [0, 1]);

  return (
    <section ref={containerRef} className="relative w-full z-[20]">
      {/* Desktop/Tablet: sequential layout, Mobile: scroll-triggered */}
      <div className={`${isMobile ? 'h-[500vh]' : 'h-[500vh]'} w-full`}>

        <div
          className="sticky top-0 h-screen overflow-hidden w-full flex flex-col items-center justify-center"
          style={{ padding: '0 clamp(1.5rem, 3vw, 3rem)' }}
        >

          {/* Section Headline - Static with fluid typography */}
          <div className="text-center mb-6 pt-20 z-20 w-full px-4">
            <h2
              className="font-bold text-[#0b1220] font-['Bricolage_Grotesque'] leading-tight"
              style={{ fontSize: 'clamp(2.25rem, 5vw, 3.75rem)' }}
            >
              How to get started with Curi:
            </h2>
          </div>

          {isMobile ? (
            <div className="relative w-full max-w-sm mx-auto">
              <div className="relative w-full h-[400px]">
                {STEPS.map((step, i) => (
                  <ProcessCard
                    key={step.id}
                    step={step}
                    index={i}
                    total={STEPS.length}
                    scrollYProgress={scrollYProgress}
                    isMobile={true}
                  />
                ))}
              </div>

              {/* CTA Button Mobile */}
              <motion.div
                style={{ y: mobileCtaY, opacity: mobileCtaOpacity }}
                className="flex justify-center mt-16"
              >
                <RoundedArrowButton>Request Demo</RoundedArrowButton>
              </motion.div>
            </div>
          ) : (
            <>
              <div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full relative z-10 max-w-7xl items-stretch"
                style={{ gap: 'clamp(1rem, 1.5vw, 1.5rem)' }}
              >
                {STEPS.map((step, i) => (
                  <DesktopProcessCard
                    key={step.id}
                    step={step}
                    index={i}
                    scrollYProgress={scrollYProgress}
                  />
                ))}
              </div>

              {/* Desktop/Tablet CTA - Flowing after grid */}
              <motion.div
                style={{ opacity: ctaOpacity, y: ctaY }}
                className="flex justify-center w-full z-20 mt-6 relative"
              >
                <RoundedArrowButton>Request Demo</RoundedArrowButton>
              </motion.div>
            </>
          )}

        </div>
      </div>
    </section>
  );
}
