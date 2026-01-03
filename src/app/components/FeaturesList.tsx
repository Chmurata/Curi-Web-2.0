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
  const cardDuration = 0.2; // Duration for each card to slide up

  const start = startOffset + (index * cardDuration);
  const end = start + cardDuration;

  const targetY = index * 12; // Final stacked position
  const initialY = 1000; // Start off-screen (bottom)

  const yMovement = useTransform(
    scrollYProgress,
    [start, end],
    [initialY, targetY]
  );

  // No opacity fade requested, just slide up. 
  // But we need to make sure it's not visible before 'start'.
  // We can clamp the yMovement? Or use opacity as a hard toggle if needed?
  // "Nothing will be already visible".
  // If Y is 1000, it's off screen (assuming container logic).

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

export function FeaturesList() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Title Animation (0 - 0.1)
  const titleY = useTransform(scrollYProgress, [0, 0.1], [50, 0]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  // CTA Animation (0.9 - 1.0)
  const ctaY = useTransform(scrollYProgress, [0.9, 1], [100, 0]);
  const ctaOpacity = useTransform(scrollYProgress, [0.9, 1], [0, 1]);

  return (
    // Increased height to accommodate the sequential timing
    <section ref={containerRef} className="relative bg-[#f8fafc]">
      <div className={`${isMobile ? 'h-[450vh]' : 'min-h-screen py-20'} w-full`}>

        <div className={`${isMobile ? 'sticky top-0 h-screen overflow-hidden' : 'relative h-full'} w-full flex flex-col items-center justify-start md:justify-center`}>

          <div className="w-full max-w-7xl mx-auto px-6 md:px-8 relative h-full flex flex-col">

            {/* Heading */}
            <motion.div
              style={isMobile ? { y: titleY, opacity: titleOpacity } : {}}
              className={`text-center ${isMobile ? 'mt-20 mb-6' : 'mb-16'}`}
            >
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#0b1220] font-['Bricolage_Grotesque'] leading-tight">
                How Curi creates endless<br className="hidden md:block" /> aligned conversations:
              </h2>
            </motion.div>

            {/* Content Area */}
            {isMobile ? (
              // Mobile: Card Stack
              <div className="relative w-full max-w-sm mx-auto flex-grow">
                <div className="relative w-full h-[400px]">
                  {features.slice(0, 4).map((feature, i) => (
                    <Card
                      key={feature.id}
                      feature={feature}
                      index={i}
                      total={4}
                      scrollYProgress={scrollYProgress}
                      isMobile={true}
                    />
                  ))}
                </div>
              </div>
            ) : (
              // Desktop: Grid
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {features.map((feature, i) => (
                  <Card
                    key={feature.id}
                    feature={feature}
                    index={i}
                    total={features.length}
                    scrollYProgress={scrollYProgress}
                    isMobile={false}
                  />
                ))}
              </div>
            )}

            {/* Button */}
            <motion.div
              style={isMobile ? { y: ctaY, opacity: ctaOpacity } : {}}
              className={`flex justify-center ${isMobile ? 'absolute bottom-20 inset-x-0' : 'mt-16'}`}
            >
              <RoundedArrowButton>Request Demo</RoundedArrowButton>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
