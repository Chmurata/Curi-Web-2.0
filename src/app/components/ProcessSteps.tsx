import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import { RoundedArrowButton } from "./ui/RoundedArrowButton";

// Import images
import imgClient2 from "../../assets/f8019f5a1bbdebf9c98de1c6d7715bd965b46caa.png";
import imgClient1 from "../../assets/b05c61af5838643e01de25c22f7b60da38ed38c3.png";
import imgWomanAfro from "../../assets/9647ae1a36135cbd8ecdd8fb44bc1b36ca0dc953.png";
import imgManPhone from "../../assets/1b9795aeabce1b7e0d44c80dbbfdaa7162d954ca.png";
import imgWomanPhone from "../../assets/27b5a2ca39a0a2bd1529908b9c55dc5c4ca54a0a.png";
import imgTeam from "../../assets/bb121ffb25eaa7ef43ee2974e891a700ec78367c.png";

const STEPS = [
  {
    id: 1,
    title: ["Define your", "culture"],
    content: "Upload values, leadership principles, and \"what good looks like\" so guidance reflects your standards.",
    image: imgClient2,
    color: "#2b72ba"
  },
  {
    id: 2,
    title: ["Meet Curi in the", "workflow"],
    content: "Bring Curi's Interaction Intelligence and coaching into the channels where work actually happens (messages, 1:1 prep, difficult conversations).",
    image: imgManPhone,
    color: "#2b72ba"
  },
  {
    id: 3,
    title: ["Private \"whisper\"", "coaching"],
    content: "Before high-stakes moments, employees can roleplay scenarios with custom personas and get private coaching. It's a judgment-free zone to sharpen delivery and reduce anxiety.",
    image: imgWomanAfro,
    color: "#2b72ba"
  },
  {
    id: 4,
    title: ["Make conversations", "psychologically safe"],
    content: "Before you hit send—or as you prepare—Curi helps you choose language that keeps safety and accountability intact. Purpose driven conversations reduce defensiveness.",
    image: imgClient1,
    color: "#2b72ba"
  },
  {
    id: 5,
    title: ["Ratify clear", "agreements"],
    content: "Curi's Clarity Engine flags vague language (\"I'll try to do that\") and prompts employees for clarity. The result: Measureable steps both people can agree to.",
    image: imgWomanPhone,
    color: "#2b72ba"
  },
  {
    id: 6,
    title: ["Measure the", "Culture Shift"],
    content: "Track adoption and progress (engagement, follow-through patterns, conversation health indicators) to show impact over time.",
    image: imgTeam,
    color: "#2b72ba"
  }
];

// Layout type for 3-tier responsive system
type LayoutType = 'mobile' | 'tablet' | 'desktop';

// Fluid sizing styles - per layout tier
const fluidStyles = {
  // Mobile-specific styles — matched to SayDoGap/Performance/CultureBehavior scale
  mobile: {
    heading: { fontSize: 'clamp(1.75rem, 7vw, 2.25rem)' },
    stepTitle: { fontSize: 'clamp(1.25rem, 5vw, 1.5rem)' },
    stepContent: { fontSize: 'clamp(0.875rem, 3.8vw, 1rem)' },
    badge: {
      width: 'clamp(2rem, 8vw, 2.5rem)',
      height: 'clamp(2rem, 8vw, 2.5rem)',
      fontSize: 'clamp(0.875rem, 3.5vw, 1.1rem)',
    },
    gap: { gap: 'clamp(0.75rem, 3vw, 1.25rem)' },
    borderRadius: { borderRadius: 'clamp(16px, 4vw, 24px)' },
  },
  // Tablet styles
  tablet: {
    heading: { fontSize: 'clamp(2rem, 4.5vw, 2.75rem)' },
    stepTitle: { fontSize: 'clamp(1.5rem, 3.5vw, 2rem)' },
    stepContent: { fontSize: 'clamp(0.9rem, 2vw, 1.1rem)' },
    badge: {
      width: 'clamp(2.5rem, 5vw, 3rem)',
      height: 'clamp(2.5rem, 5vw, 3rem)',
      fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
    },
    gap: { gap: 'clamp(1.25rem, 3vw, 2rem)' },
    borderRadius: { borderRadius: 'clamp(20px, 4vw, 32px)' },
  },
  // Desktop styles — aligned with section heading scale clamp(2.25rem, 5vw, 3.75rem)
  desktop: {
    heading: { fontSize: 'clamp(2.25rem, 5vw, 3.75rem)' },
    stepTitle: { fontSize: 'clamp(1.5rem, 3vw, 2.5rem)' },
    stepContent: { fontSize: 'clamp(0.875rem, 1.2vw, 1.125rem)' },
    badge: {
      width: 'clamp(2.5rem, 3vw, 3.5rem)',
      height: 'clamp(2.5rem, 3vw, 3.5rem)',
      fontSize: 'clamp(1rem, 1.5vw, 1.5rem)',
    },
    gap: { gap: 'clamp(1.5rem, 3vw, 3rem)' },
    contentGap: { gap: 'clamp(0.75rem, 1.5vw, 1.5rem)' },
    borderRadius: { borderRadius: 'clamp(24px, 3vw, 40px)' },
  },
};

export function ProcessSteps() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [layout, setLayout] = useState<LayoutType>('desktop');

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // All layouts now use scroll-driven steps
    const step = Math.floor(latest * STEPS.length);
    const boundedStep = Math.min(step, STEPS.length - 1);

    if (boundedStep !== activeStep) {
      setActiveStep(boundedStep);
    }
  });

  useEffect(() => {
    const checkScreen = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setLayout('mobile');
      } else if (width < 1024) {
        setLayout('tablet');
      } else {
        setLayout('desktop');
      }
    };
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  // Animation variants
  const transition = { duration: 0.5, ease: "easeInOut" } as const;
  const variants = {
    hidden: { opacity: 0, zIndex: 0 },
    visible: { opacity: 1, zIndex: 10 }
  };

  // Get scroll container height based on layout
  const getScrollHeight = () => {
    if (layout === 'mobile') return '105vh'; // Reduced to 30% of 350vh
    if (layout === 'tablet') return '120vh'; // Reduced to 30% of 400vh
    return '150vh'; // Reduced to 30% of 500vh (desktop)
  };

  return (
    <section
      ref={containerRef}
      className="relative z-[20] transition-all duration-300"
      style={{ height: getScrollHeight() }}
    >
      {/* ========== MOBILE LAYOUT (<640px) - Sticky Scroll ========== */}
      {layout === 'mobile' && (
        <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center">
          <div
            className="w-full max-w-sm mx-auto flex flex-col px-4"
            style={fluidStyles.mobile.gap}
          >
            {/* Header */}
            <div className="text-center">
              <h2
                className="font-bold text-[#0b1220] font-['Bricolage_Grotesque'] leading-tight"
                style={fluidStyles.mobile.heading}
              >
                How to get started with Curi:
              </h2>
            </div>

            {/* Stacked Image + Content */}
            <div className="flex flex-col items-center" style={fluidStyles.mobile.gap}>
              {/* Image Container - Scaled down for mobile */}
              <div
                className="relative w-full aspect-[4/3] overflow-hidden"
                style={{
                  ...fluidStyles.mobile.borderRadius,
                  maxWidth: 'clamp(200px, 70vw, 280px)',
                }}
              >
                {STEPS.map((step, index) => (
                  <motion.div
                    key={step.id}
                    className="absolute inset-0 w-full h-full overflow-hidden"
                    style={fluidStyles.mobile.borderRadius}
                    initial="hidden"
                    animate={activeStep === index ? "visible" : "hidden"}
                    variants={variants}
                    transition={transition}
                  >
                    <img
                      src={step.image}
                      alt={`Step ${step.id}`}
                      className="w-full h-full object-cover"
                      style={fluidStyles.mobile.borderRadius}
                    />
                  </motion.div>
                ))}
              </div>

              {/* Content Container */}
              <div className="w-full text-center flex flex-col items-center" style={{ gap: 'clamp(0.4rem, 2vw, 0.6rem)' }}>
                {/* Badge - FIXED position */}
                <div
                  className="bg-[#2b72ba] rounded-full flex items-center justify-center text-white font-bold shadow-md"
                  style={fluidStyles.mobile.badge}
                >
                  {STEPS[activeStep].id}
                </div>

                {/* Title - FIXED position */}
                <h3
                  className="font-bold text-[#3b4558] font-['Bricolage_Grotesque'] leading-tight"
                  style={fluidStyles.mobile.stepTitle}
                >
                  {STEPS[activeStep].title.join(" ")}
                </h3>

                {/* Description - animated */}
                <div
                  className="relative w-full"
                  style={{ minHeight: 'clamp(80px, 18vh, 120px)' }}
                >
                  {STEPS.map((step, index) => (
                    <motion.div
                      key={step.id}
                      className="absolute top-0 left-0 w-full"
                      initial="hidden"
                      animate={activeStep === index ? "visible" : "hidden"}
                      variants={variants}
                      transition={transition}
                    >
                      <p
                        className="text-[#6b768c] leading-relaxed font-['Bricolage_Grotesque'] px-2"
                        style={fluidStyles.mobile.stepContent}
                      >
                        {step.content}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <motion.div
                animate={{ opacity: activeStep === 5 ? 1 : 0, y: activeStep === 5 ? 0 : 15 }}
                transition={{ duration: 0.4 }}
                style={{ marginTop: 'clamp(0.25rem, 2vw, 0.5rem)' }}
              >
                <RoundedArrowButton>Request Demo</RoundedArrowButton>
              </motion.div>
            </div>
          </div>
        </div>
      )}

      {/* ========== TABLET LAYOUT (640-1024px) ========== */}
      {layout === 'tablet' && (
        <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center">
          <div
            className="w-full max-w-2xl mx-auto flex flex-col px-6"
            style={fluidStyles.tablet.gap}
          >
            {/* Header */}
            <div className="text-center">
              <h2
                className="font-bold text-[#0b1220] font-['Bricolage_Grotesque'] leading-tight"
                style={fluidStyles.tablet.heading}
              >
                How to get started with Curi:
              </h2>
            </div>

            {/* Stacked Image + Content */}
            <div className="flex flex-col items-center" style={fluidStyles.tablet.gap}>
              {/* Image Container */}
              <div
                className="relative w-full aspect-[4/3] overflow-hidden"
                style={{
                  ...fluidStyles.tablet.borderRadius,
                  maxWidth: 'clamp(280px, 50vw, 380px)',
                }}
              >
                {STEPS.map((step, index) => (
                  <motion.div
                    key={step.id}
                    className="absolute inset-0 w-full h-full overflow-hidden"
                    style={fluidStyles.tablet.borderRadius}
                    initial="hidden"
                    animate={activeStep === index ? "visible" : "hidden"}
                    variants={variants}
                    transition={transition}
                  >
                    <img
                      src={step.image}
                      alt={`Step ${step.id}`}
                      className="w-full h-full object-cover"
                      style={fluidStyles.tablet.borderRadius}
                    />
                  </motion.div>
                ))}
              </div>

              {/* Content Container */}
              <div className="w-full text-center flex flex-col items-center" style={{ gap: 'clamp(0.5rem, 1.5vw, 0.75rem)' }}>
                {/* Badge - FIXED position */}
                <div
                  className="bg-[#2b72ba] rounded-full flex items-center justify-center text-white font-bold shadow-md"
                  style={fluidStyles.tablet.badge}
                >
                  {STEPS[activeStep].id}
                </div>

                {/* Title - FIXED position */}
                <h3
                  className="font-bold text-[#3b4558] font-['Bricolage_Grotesque'] leading-tight"
                  style={fluidStyles.tablet.stepTitle}
                >
                  {STEPS[activeStep].title.join(" ")}
                </h3>

                {/* Description - animated */}
                <div
                  className="relative w-full"
                  style={{ minHeight: 'clamp(80px, 15vh, 150px)' }}
                >
                  {STEPS.map((step, index) => (
                    <motion.div
                      key={step.id}
                      className="absolute top-0 left-0 w-full"
                      initial="hidden"
                      animate={activeStep === index ? "visible" : "hidden"}
                      variants={variants}
                      transition={transition}
                    >
                      <p
                        className="text-[#6b768c] leading-relaxed font-['Bricolage_Grotesque'] max-w-lg mx-auto px-4"
                        style={fluidStyles.tablet.stepContent}
                      >
                        {step.content}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <motion.div
                animate={{ opacity: activeStep === 5 ? 1 : 0, y: activeStep === 5 ? 0 : 20 }}
                transition={{ duration: 0.5 }}
              >
                <RoundedArrowButton>Request Demo</RoundedArrowButton>
              </motion.div>
            </div>
          </div>
        </div>
      )}

      {/* ========== DESKTOP LAYOUT (1024px+) ========== */}
      {layout === 'desktop' && (
        <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center">
          <div
            className="w-full max-w-6xl mx-auto flex flex-col px-6"
            style={fluidStyles.desktop.gap}
          >
            {/* Header */}
            <div className="w-full text-center">
              <h2
                className="font-bold text-[#0b1220] font-['Bricolage_Grotesque'] leading-tight"
                style={fluidStyles.desktop.heading}
              >
                How to get started with Curi:
              </h2>
            </div>

            {/* Split Layout - More flexible ratio */}
            <div className="flex items-center justify-center" style={fluidStyles.desktop.gap}>
              {/* Left: Images */}
              <div
                className="flex justify-end shrink-0"
                style={{
                  width: 'clamp(280px, 38%, 420px)',
                  paddingRight: 'clamp(1rem, 2vw, 1.5rem)'
                }}
              >
                <div
                  className="relative w-full aspect-[4/5] overflow-hidden"
                  style={fluidStyles.desktop.borderRadius}
                >
                  {STEPS.map((step, index) => (
                    <motion.div
                      key={step.id}
                      className="absolute inset-0 w-full h-full overflow-hidden"
                      style={fluidStyles.desktop.borderRadius}
                      initial="hidden"
                      animate={activeStep === index ? "visible" : "hidden"}
                      variants={variants}
                      transition={transition}
                    >
                      <img
                        src={step.image}
                        alt={`Step ${step.id}`}
                        className="w-full h-full object-cover"
                        style={fluidStyles.desktop.borderRadius}
                      />
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Right: Content */}
              <div
                className="flex flex-col items-start justify-center"
                style={{
                  width: 'clamp(320px, 50%, 520px)',
                  paddingLeft: 'clamp(0.5rem, 2vw, 1rem)',
                  minHeight: 'clamp(320px, 45vh, 480px)'
                }}
              >
                <div className="w-full flex flex-col" style={fluidStyles.desktop.contentGap}>
                  {/* Badge - FIXED position, only number updates */}
                  <div
                    className="bg-[#2b72ba] rounded-full flex items-center justify-center text-white font-bold shrink-0 shadow-md"
                    style={fluidStyles.desktop.badge}
                  >
                    {STEPS[activeStep].id}
                  </div>

                  {/* Title - FIXED position, only text updates */}
                  <h3
                    className="font-bold text-[#3b4558] font-['Bricolage_Grotesque'] leading-tight"
                    style={fluidStyles.desktop.stepTitle}
                  >
                    {STEPS[activeStep].title.map((line, i) => (
                      <span key={i} className="block">{line}</span>
                    ))}
                  </h3>

                  {/* Description - animated in/out */}
                  <div
                    className="relative w-full"
                    style={{ minHeight: 'clamp(80px, 12vh, 140px)' }}
                  >
                    {STEPS.map((step, index) => (
                      <motion.div
                        key={step.id}
                        className="absolute top-0 left-0 w-full"
                        initial="hidden"
                        animate={activeStep === index ? "visible" : "hidden"}
                        variants={variants}
                        transition={transition}
                      >
                        <div
                          className="text-[#6b768c] leading-relaxed font-['Bricolage_Grotesque']"
                          style={fluidStyles.desktop.stepContent}
                        >
                          <span dangerouslySetInnerHTML={{
                            __html: step.content
                              .replace("sharpen delivery", "<span class='font-bold text-[#3b4558]'>sharpen delivery</span>")
                              .replace("reduce anxiety", "<span class='font-bold text-[#3b4558]'>reduce anxiety</span>")
                              .replace("Clarity Engine", "<span class='font-bold text-[#3b4558]'>Clarity Engine</span>")
                              .replace("clarity", "<span class='font-bold text-[#3b4558]'>clarity</span>")
                              .replace("Say-Do Gap", "<span class='font-bold text-[#3b4558]'>Say-Do Gap</span>")
                          }} />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div style={{ marginTop: 'clamp(1rem, 2vw, 1.5rem)' }}>
                  <motion.div
                    animate={{ opacity: activeStep === 5 ? 1 : 0, y: activeStep === 5 ? 0 : 20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <RoundedArrowButton>Request Demo</RoundedArrowButton>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
