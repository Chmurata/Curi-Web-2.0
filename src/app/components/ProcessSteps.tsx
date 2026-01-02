import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { RoundedArrowButton } from "./ui/RoundedArrowButton";

const STEPS = [
  {
    id: 1,
    title: ["Define your", "culture"],
    content: (
      <>
        Upload values, leadership principles, and “what good looks like” so guidance reflects your standards.
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
        Before high-stakes moments, employees can roleplay scenarios with custom personas and get private coaching. It’s a judgment-free zone to <span className="font-bold">sharpen delivery</span> and <span className="font-bold">reduce anxiety</span> before the real conversation happens.
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

export function ProcessSteps() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-gradient-to-b from-transparent via-[#f2f7fb] to-[#c7ddf3] mt-14" // 56px spacing, gradient fade from transparent
    >
      {/* 
        Container Height: 
        Needs to be tall enough to allow scrolling through the animations.
        6 steps * ~40vh each + 100vh buffer = ~350vh
      */}
      <div className="h-[350vh] w-full">

        {/* Sticky Viewport */}
        <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden px-4 md:px-8">

          <div className="w-full max-w-7xl mx-auto h-full flex flex-col justify-center relative">

            {/* Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full relative z-10">
              {STEPS.map((step, index) => {
                // Calculate animation triggers based on index
                // We want them to appear one by one.
                // Range: 0 to 0.8
                const start = index * 0.12;
                const end = start + 0.15;

                // eslint-disable-next-line react-hooks/rules-of-hooks
                const opacity = useTransform(scrollYProgress, [start, end], [0, 1]);
                // eslint-disable-next-line react-hooks/rules-of-hooks
                const y = useTransform(scrollYProgress, [start, end], [50, 0]);
                // eslint-disable-next-line react-hooks/rules-of-hooks
                const scale = useTransform(scrollYProgress, [start, end], [0.9, 1]);

                return (
                  <motion.div
                    key={step.id}
                    style={{ opacity, y, scale }}
                    className="flex flex-col h-full min-h-[340px]"
                  >
                    <div className="bg-[#f5faff] rounded-[40px] p-8 h-full shadow-[0px_4px_10px_0px_rgba(22,22,19,0.1)] flex flex-col gap-6 relative overflow-hidden transition-all hover:shadow-xl border border-white/50">

                      {/* Header: Number & Title */}
                      <div className="flex items-center gap-4">
                        <div className="shrink-0 w-14 h-14 bg-[#2b72ba] rounded-full flex items-center justify-center text-white text-xl font-medium shadow-md">
                          {step.id}
                        </div>
                        <h3 className="text-2xl font-bold text-[#3b4558] font-['Bricolage_Grotesque'] leading-tight">
                          {step.title.map((line, i) => (
                            <span key={i} className="block">{line}</span>
                          ))}
                        </h3>
                      </div>

                      {/* Content */}
                      <div className="text-[15px] leading-relaxed text-[#3b4558] font-['Bricolage_Grotesque'] font-normal">
                        {step.content}
                      </div>

                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Request Demo Button - Appears at the end */}
            {/* eslint-disable-next-line react-hooks/rules-of-hooks */}
            <motion.div
              style={{ opacity: useTransform(scrollYProgress, [0.85, 0.95], [0, 1]), y: useTransform(scrollYProgress, [0.85, 0.95], [20, 0]) }}
              className="flex justify-center mt-12 w-full z-20"
            >
              <RoundedArrowButton>Request Demo</RoundedArrowButton>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
