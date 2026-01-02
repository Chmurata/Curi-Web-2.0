import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import clsx from "clsx";
import { RoundedArrowButton } from "./ui/RoundedArrowButton";

// --- Data ---
const STEPS = [
  {
    id: 1,
    title: ["Define your", "culture"],
    content: [
      "Upload values, leadership principles, and \"what",
      "good looks like\" so guidance reflects your",
      "standards."
    ]
  },
  {
    id: 2,
    title: ["Meet Curi in the", "workflow"],
    content: [
      "Bring Curi's Interaction Intelligence and coaching",
      "into the channels where work actually happens",
      "(messages, 1:1 prep, difficult conversations)."
    ]
  },
  {
    id: 3,
    title: ["Private \"whisper\"", "coaching"],
    content: [
      "Before high-stakes moments, employees can",
      "roleplay scenarios with custom personas and get",
      "private coaching. It's a judgment-free zone to",
      { text: "sharpen delivery", bold: true },
      { text: " and ", bold: false },
      { text: "reduce anxiety", bold: true },
      { text: " before the", bold: false },
      "real conversation happens."
    ]
  },
  {
    id: 4,
    title: ["Make", "conversations", "psychologically", "safe"],
    content: [
      "Before you hit send—or as you prepare—Curi",
      "helps you choose language that keeps safety and",
      "accountability intact. Purpose driven",
      "conversations reduce defensiveness and keep",
      "momentum toward outcomes, not escalation."
    ]
  },
  {
    id: 5,
    title: ["Ratify clear", "agreements"],
    content: [
      { text: "Curi's ", bold: false },
      { text: "Clarity Engine", bold: true },
      { text: " flags vague language (\"I'll try", bold: false },
      { text: "to do that\") and prompts employees for ", bold: false },
      { text: "clarity", bold: true },
      { text: " (\"I", bold: false },
      "will deliver this by Friday\").",
      { text: "The result: Measureable steps both people can", bold: false, newLine: true },
      { text: "agree to, actively closing the ", bold: false },
      { text: "Say-Do Gap", bold: true }
    ]
  },
  {
    id: 6,
    title: ["Measure the", "Culture Shift"],
    content: [
      "Track adoption and progress (engagement, follow-",
      "through patterns, conversation health indicators)",
      "to show impact over time.",
      { text: "Move beyond annual surveys with real-time,", bold: false, newLine: true },
      "anonymized insights into where friction is",
      "occurring and watch your \"Say-Do Ratio\" improve",
      "over time."
    ]
  }
];

// --- Components ---

function Card({ step, index, progress }: { step: any; index: number; progress: any }) {
  const start = 0.05 + (index * 0.12);
  const end = start + 0.15;

  const y = useTransform(progress, [start, end], ["50vh", "0vh"]);
  const opacity = useTransform(progress, [start, start + 0.05], [0, 1]);
  const scale = useTransform(progress, [start, end], [0.8, 1]);

  return (
    <motion.div
      initial={{ opacity: 1, y: 0 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-[#f5faff] rounded-[20px] md:rounded-[32px] lg:rounded-[40px] shadow-[0px_4px_10px_0px_rgba(22,22,19,0.1)] p-4 md:p-6 lg:p-8 flex flex-col gap-3 md:gap-4 lg:gap-6 h-full border border-white/50"
    >
      {/* Header - Scaled down */}
      <div className="flex items-center gap-2 md:gap-3 lg:gap-4">
        <div className="shrink-0 w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full bg-[#2b72ba] flex items-center justify-center shadow-[0px_4px_10px_0px_rgba(22,22,19,0.1)]">
          <span className="text-white font-['Bricolage_Grotesque'] font-semibold text-base md:text-lg lg:text-xl">{step.id}</span>
        </div>
        <div className="flex flex-col">
          {step.title.map((line: string, i: number) => (
            <span key={i} className="text-[#3b4558] font-bold font-['Bricolage_Grotesque'] text-base md:text-lg lg:text-xl xl:text-2xl leading-tight">
              {line}
            </span>
          ))}
        </div>
      </div>

      {/* Content - Smaller on mobile */}
      <div className="text-[#3b4558] text-[13px] md:text-[14px] lg:text-base leading-relaxed font-['Bricolage_Grotesque']">
        {step.content.map((item: any, i: number) => {
          if (typeof item === 'string') {
            return <p key={i} className="mb-0">{item}</p>;
          }
          if (item.newLine) {
            return (
              <p key={i} className="mt-4 mb-0">
                {item.text}
              </p>
            );
          }
          return (
            <span key={i} className={item.bold ? "font-bold" : ""}>
              {item.newLine ? <br /> : null}
              {item.text}
            </span>
          );
        })}
      </div>
    </motion.div>
  );
}

export function ProcessSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Button Animation (appears at the end)
  const buttonOpacity = useTransform(scrollYProgress, [0.85, 0.95], [0, 1]);
  const buttonY = useTransform(scrollYProgress, [0.85, 0.95], [20, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen md:min-h-[300vh] bg-gradient-to-r from-[#f2f7fb] to-[#c7ddf3] mt-8 md:mt-14"
    >
      {/* Sticky only on desktop */}
      <div className="md:sticky md:top-0 min-h-screen md:h-screen w-full flex flex-col items-center justify-start md:justify-center py-8 md:py-0 px-4">

        {/* Grid Container */}
        <div className="w-full max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 h-full">
            {STEPS.map((step, index) => (
              <div key={step.id} className="h-full">
                <Card step={step} index={index} progress={scrollYProgress} />
              </div>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 md:mt-12 z-20"
        >
          <RoundedArrowButton>Request Demo</RoundedArrowButton>
        </motion.div>

      </div>
    </section>
  );
}
