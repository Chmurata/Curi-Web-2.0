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
        Curi's <span className="font-bold">Clarity Engine</span> flags vague language ("I'll try to do that") and prompts employees for <span className="font-bold">clarity</span> ("I will deliver this by Friday").
        <br /><br />
        The result: Measureable steps both people can agree to, actively closing the <span className="font-bold">Say-Do Gap</span>.
      </>
    )
  },
  {
    id: 6,
    title: ["Measure the", "Culture Shift"],
    content: (
      <>
        Track adoption and progress (engagement, follow-through patterns, conversation health indicators) to show impact over time.
        <br /><br />
        Move beyond annual surveys with real-time, anonymized insights into where friction is occurring and watch your "Say-Do Ratio" improve over time.
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
        <div className="bg-[#f5faff] rounded-[20px] md:rounded-[32px] lg:rounded-[40px] p-4 md:p-6 lg:p-8 h-full shadow-[0px_4px_10px_0px_rgba(22,22,19,0.1)] flex flex-col gap-3 md:gap-4 lg:gap-6 relative transition-all hover:shadow-xl border border-white/50">
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
  const startOffset = -0.05;
  // With 6 cards, we have 0.8 / 6 per card = ~0.133
  const cardDuration = 0.15;

  const start = startOffset + (index * cardDuration);
  const end = start + cardDuration;

  const targetY = index * 12; // Final stacked position
  const initialY = 1000; // Start off-screen

  const yMovement = useTransform(
    scrollYProgress,
    [start, end],
    [initialY, targetY]
  );

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

// Desktop/Tablet card component - no animation, static display
const DesktopProcessCard = ({
  step
}: {
  step: typeof STEPS[0];
}) => {
  return (
    <div className="flex flex-col h-full">
      <div className="bg-[#f5faff] rounded-[20px] md:rounded-[32px] lg:rounded-[40px] p-4 md:p-6 lg:p-8 h-full shadow-[0px_4px_10px_0px_rgba(22,22,19,0.1)] flex flex-col gap-3 md:gap-4 lg:gap-6 relative transition-all hover:shadow-xl border border-white/50">
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
    </div>
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

  // CTA Animation (0.9 - 1.0)
  const ctaY = useTransform(scrollYProgress, [0.9, 1], [100, 0]);
  const ctaOpacity = useTransform(scrollYProgress, [0.9, 1], [0, 1]);

  return (
    <section ref={containerRef} className="relative w-full bg-gradient-to-b from-transparent via-[#f2f7fb] to-[#c7ddf3] mt-8 md:mt-14">
      {/* Desktop/Tablet: static layout, Mobile: scroll-triggered */}
      <div className={`${isMobile ? 'h-[500vh]' : 'min-h-screen py-16 md:py-20'} w-full`}>

        <div className={`${isMobile ? 'sticky top-0 h-screen overflow-hidden' : 'relative'} w-full flex flex-col items-center justify-start md:justify-center py-8 md:py-0 px-6 md:px-8`}>

          <div className="w-full max-w-7xl mx-auto flex flex-col justify-center relative h-full">

            {/* Mobile Title Wrapper */}
            {isMobile && (
              <motion.div
                style={{ y: titleY, opacity: titleOpacity }}
                className="w-full text-center mt-20 mb-6 block md:hidden"
              >
              </motion.div>
            )}

            {isMobile ? (
              <div className="relative w-full max-w-sm mx-auto flex-grow block md:hidden">
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
                  style={{ y: ctaY, opacity: ctaOpacity }}
                  className="flex justify-center absolute bottom-20 inset-x-0"
                >
                  <RoundedArrowButton>Request Demo</RoundedArrowButton>
                </motion.div>
              </div>
            ) : (
              <>
                {/* Desktop/Tablet Static Grid - no animation */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 w-full relative z-10 hidden md:grid">
                  {STEPS.map((step) => (
                    <DesktopProcessCard
                      key={step.id}
                      step={step}
                    />
                  ))}
                </div>

                {/* Desktop/Tablet CTA - no animation */}
                <div className="hidden md:flex justify-center w-full z-20 mt-8 md:mt-12">
                  <RoundedArrowButton>Request Demo</RoundedArrowButton>
                </div>
              </>
            )}

          </div>
        </div>
      </div>
    </section>
  );
}
