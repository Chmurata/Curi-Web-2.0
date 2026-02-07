import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import { RoundedArrowButton } from "./ui/RoundedArrowButton";

// Import images
import imgClient2 from "../../assets/f8019f5a1bbdebf9c98de1c6d7715bd965b46caa.png";
import imgClient1 from "../../assets/b05c61af5838643e01de25c22f7b60da38ed38c3.png";
import imgWomanAfro from "../../assets/27b5a2ca39a0a2bd1529908b9c55dc5c4ca54a0a.png"; // Updated for Step 3 & 5
import imgManPhone from "../../assets/1b9795aeabce1b7e0d44c80dbbfdaa7162d954ca.png"; // Updated for Step 2
import imgWomanPhone from "../../assets/27b5a2ca39a0a2bd1529908b9c55dc5c4ca54a0a.png"; // Updated for Step 5 (same as Step 3)
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

export function ProcessSteps() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // Map scroll progress (0-1) to step index (0-5)
    // We want the changes to happen a bit earlier/smoother, but linear mapping is safest for sync
    const step = Math.floor(latest * STEPS.length);
    const boundedStep = Math.min(step, STEPS.length - 1);

    // Only update if changed to avoid re-renders
    if (boundedStep !== activeStep) {
      setActiveStep(boundedStep);
    }
  });

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, [activeStep]);

  // Shared animation configuration for perfect synchronization
  // Simplified transition: Just opacity fade, no scale or movement
  const transition = { duration: 0.5, ease: "easeInOut" } as const;
  const variants = {
    hidden: { opacity: 0, zIndex: 0 },
    visible: { opacity: 1, zIndex: 10 }
  };

  return (
    <section
      ref={containerRef}
      className="relative z-[20] transition-all duration-300"
      style={{ height: isMobile ? 'auto' : '500vh' }}
    >
      <div className={isMobile ? "py-16 px-4" : "sticky top-0 h-screen overflow-hidden flex flex-col justify-center"}>

        {/* Desktop Layout - Centered Container for Title + Content */}
        {!isMobile && (
          <div className="w-full max-w-[1100px] mx-auto px-8 flex flex-col gap-12">

            {/* Header - Centered */}
            <div className="w-full text-center">
              <h2 className="font-bold text-[#0b1220] font-['Bricolage_Grotesque'] text-4xl md:text-6xl leading-tight">
                How to get started with Curi:
              </h2>
            </div>

            {/* Split Layout */}
            <div className="flex items-start justify-between gap-12">

              {/* Left: Images - Scaled Down */}
              <div className="w-1/2 flex justify-end pr-8">
                {/* Visual container removed (bg, shadow, border) as requested */}
                <div className="relative w-full max-w-[450px] aspect-[4/5] rounded-[40px] overflow-hidden">
                  {STEPS.map((step, index) => (
                    <motion.div
                      key={step.id}
                      className="absolute inset-0 w-full h-full rounded-[40px] overflow-hidden"
                      initial="hidden"
                      animate={activeStep === index ? "visible" : "hidden"}
                      variants={variants}
                      transition={transition}
                    >
                      <img
                        src={step.image}
                        alt={`Step ${step.id}`}
                        className="w-full h-full object-cover rounded-[40px]"
                      />
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Right: Content - Aligned with Grid */}
              <div className="w-1/2 flex flex-col items-start pl-4 min-h-[550px] justify-center">
                <div className="relative w-full h-[400px]">
                  {STEPS.map((step, index) => (
                    <motion.div
                      key={step.id}
                      className="absolute inset-0 w-full h-full flex flex-col justify-center items-start gap-6 p-0"
                      initial="hidden"
                      animate={activeStep === index ? "visible" : "hidden"}
                      variants={variants}
                      transition={transition}
                    >
                      {/* Number Badge */}
                      <div className="w-14 h-14 bg-[#2b72ba] rounded-full flex items-center justify-center text-white text-2xl font-bold shrink-0 shadow-md">
                        {step.id}
                      </div>

                      {/* Title */}
                      <h3 className="text-4xl font-bold text-[#3b4558] font-['Bricolage_Grotesque'] leading-tight">
                        {step.title.map((line, i) => (
                          <span key={i} className="block">{line}</span>
                        ))}
                      </h3>

                      {/* Content */}
                      <div className="text-xl text-[#6b768c] leading-relaxed font-['Bricolage_Grotesque']">
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

                {/* Desktop CTA - Aligned Left with content */}
                <div className="mt-8">
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
        )}

        {/* Mobile Layout (Stacked) */}
        {isMobile && (
          <div className="flex flex-col gap-16 max-w-md mx-auto">
            <div className="text-center mb-8">
              <h2 className="font-bold text-[#0b1220] font-['Bricolage_Grotesque'] text-4xl leading-tight">
                How to get started with Curi:
              </h2>
            </div>
            {STEPS.map((step) => (
              <div key={step.id} className="flex flex-col gap-6">
                <div className="w-full aspect-square rounded-[32px] overflow-hidden shadow-lg border border-slate-100/50">
                  <img
                    src={step.image}
                    alt={`Step ${step.id}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="bg-[#f5faff] rounded-[32px] p-8 flex flex-col gap-5 shadow-sm">
                  <div className="w-12 h-12 bg-[#2b72ba] rounded-full flex items-center justify-center text-white text-xl font-bold shrink-0 shadow-sm">
                    {step.id}
                  </div>
                  <h3 className="text-3xl font-bold text-[#3b4558] font-['Bricolage_Grotesque'] leading-tight">
                    {step.title.join(" ")}
                  </h3>
                  <p className="text-lg text-[#6b768c] leading-relaxed font-['Bricolage_Grotesque']">
                    {step.content}
                  </p>
                </div>
              </div>
            ))}
            <div className="flex justify-center mt-8 mb-12">
              <RoundedArrowButton>Request Demo</RoundedArrowButton>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
