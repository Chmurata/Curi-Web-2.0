import { useRef } from "react";
import { motion } from "motion/react";
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

export function ProcessSteps() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-gradient-to-b from-transparent via-[#f2f7fb] to-[#c7ddf3] mt-8 md:mt-14"
    >
      {/* Container Height: Reduced on mobile */}
      <div className="min-h-screen md:h-[350vh] w-full">

        {/* Sticky only on desktop */}
        <div className="md:sticky md:top-0 min-h-screen md:h-screen w-full flex flex-col items-center justify-start md:justify-center py-8 md:py-0 px-6 md:px-8">

          <div className="w-full max-w-7xl mx-auto flex flex-col justify-center relative">

            {/* Grid Layout - 2 cols on mobile, 3 on desktop */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 w-full relative z-10">
              {STEPS.map((step, index) => {
                return (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-10% 0px" }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="flex flex-col h-full"
                  >
                    <div className="bg-[#f5faff] rounded-[20px] md:rounded-[32px] lg:rounded-[40px] p-4 md:p-6 lg:p-8 h-full shadow-[0px_4px_10px_0px_rgba(22,22,19,0.1)] flex flex-col gap-3 md:gap-4 lg:gap-6 relative transition-all hover:shadow-xl border border-white/50">

                      {/* Header: Number & Title - Scaled down */}
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

                      {/* Content - Smaller text on mobile */}
                      <div className="text-[13px] md:text-[14px] lg:text-[15px] leading-relaxed text-[#3b4558] font-['Bricolage_Grotesque'] font-normal">
                        {step.content}
                      </div>

                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Request Demo Button */}
            <motion.div
              initial={{ opacity: 1, y: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex justify-center mt-8 md:mt-12 w-full z-20"
            >
              <RoundedArrowButton>Request Demo</RoundedArrowButton>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
