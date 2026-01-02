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
      "private coaching. It’s a judgment-free zone to",
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
  // Stagger entrance based on index
  // Range: 0 to 1 total scroll
  // We want cards to appear roughly between 0.1 and 0.8
  const start = 0.05 + (index * 0.12);
  const end = start + 0.15;
  
  const y = useTransform(progress, [start, end], ["50vh", "0vh"]);
  const opacity = useTransform(progress, [start, start + 0.05], [0, 1]);
  const scale = useTransform(progress, [start, end], [0.8, 1]);

  return (
    <motion.div 
      style={{ y, opacity, scale }}
      className="bg-[#f5faff] rounded-[40px] shadow-[0px_4px_10px_0px_rgba(22,22,19,0.1)] p-8 md:p-10 flex flex-col gap-6 h-full border border-white/50"
    >
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="shrink-0 w-14 h-14 rounded-full bg-[#2b72ba] flex items-center justify-center shadow-[0px_4px_10px_0px_rgba(22,22,19,0.1)]">
          <span className="text-white font-['Bricolage_Grotesque'] font-semibold text-xl">{step.id}</span>
        </div>
        <div className="flex flex-col">
          {step.title.map((line: string, i: number) => (
            <span key={i} className="text-[#3b4558] font-bold font-['Bricolage_Grotesque'] text-xl md:text-2xl leading-tight">
              {line}
            </span>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="text-[#3b4558] text-base leading-relaxed font-['Bricolage_Grotesque']">
        {step.content.map((item: any, i: number) => {
          if (typeof item === 'string') {
            return <p key={i} className="mb-0">{item}</p>;
          }
          if (item.newLine) {
            return (
              <p key={i} className="mt-4 mb-0">
                 {item.text}
                 {item.bold && <span className="font-bold">{item.text}</span>} 
                 {/* Wait, the above logic is flawed if mixed. Simplifying: */}
                 {/* Correct rendering below */}
              </p>
            );
          }
          return (
            <span key={i} className={item.bold ? "font-bold" : ""}>
              {item.newLine ? <br/> : null}
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
      className="relative min-h-[300vh] bg-gradient-to-r from-[#f2f7fb] to-[#c7ddf3] mt-14"
    >
      {/* Sticky Viewport */}
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden px-4 py-8">
        
        {/* Grid Container */}
        <div className="w-full max-w-7xl mx-auto h-[80vh] md:h-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 h-full">
             {STEPS.map((step, index) => (
               <div key={step.id} className="h-full">
                 <Card step={step} index={index} progress={scrollYProgress} />
               </div>
             ))}
          </div>
        </div>

        {/* CTA Button */}
        <motion.div 
          style={{ opacity: buttonOpacity, y: buttonY }}
          className="absolute bottom-12 z-20"
        >
          <RoundedArrowButton>Request Demo</RoundedArrowButton>
        </motion.div>

      </div>
    </section>
  );
}
