import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import svgPaths from "../../imports/svg-og2k9rr02p";
import { SceneMessage } from "./culture-growth/SceneMessage";
import { SceneConflict } from "./culture-growth/SceneConflict";
import { SceneCommitment } from "./culture-growth/SceneCommitment";

// --- Icons ---

function IconWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative shrink-0 w-6 h-6 md:w-8 md:h-8">
      <svg className="block w-full h-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        {children}
      </svg>
    </div>
  );
}

function IconStar() {
  return (
    <IconWrapper>
      <g clipPath="url(#clip0_star)">
        <path d={svgPaths.p1d9b8100} fill="var(--fill-0, black)" />
        <path d={svgPaths.p2d5aea00} fill="var(--fill-0, black)" />
        <path d={svgPaths.p170cf680} fill="var(--fill-0, black)" />
      </g>
      <defs>
        <clipPath id="clip0_star">
          <rect fill="white" height="32" width="32" />
        </clipPath>
      </defs>
    </IconWrapper>
  );
}

function IconY() {
  return (
    <IconWrapper>
      <g clipPath="url(#clip0_y)">
        <path clipRule="evenodd" d={svgPaths.pac14080} fill="var(--fill-0, black)" fillRule="evenodd" />
      </g>
      <defs>
        <clipPath id="clip0_y">
          <rect fill="white" height="32" width="32" />
        </clipPath>
      </defs>
    </IconWrapper>
  );
}

// --- Cards Data (FROZEN — do not modify content or styles) ---

const CARDS = [
  {
    id: 1,
    icon: <IconStar />,
    title: "The message you're afraid to send",
    content: (
      <>
        Get coached to say it clearly—
        <span className="font-bold text-[#3b4558]">without triggering defensiveness.</span>
      </>
    ),
  },
  {
    id: 2,
    icon: <IconY />,
    title: "The conflict that keeps getting postponed",
    content: (
      <>
        Create a psychologically safe structure to address it{" "}
        <span className="font-bold text-[#3b4558]">now</span>, not later.
      </>
    ),
  },
  {
    id: 3,
    icon: <IconY />,
    title: "The commitment that usually slips",
    content: (
      <>
        Turn "I'll try" into a clear agreement with a date and next steps.
      </>
    ),
  },
];

const SCENES = [SceneMessage, SceneConflict, SceneCommitment];

// --- Card Component (FROZEN — identical to original) ---

function Card({ card }: { card: typeof CARDS[number] }) {
  return (
    <div
      className="bg-white flex flex-col items-start h-full"
      style={{
        padding: 'clamp(1.5rem, 3vw, 2.5rem)',
        borderRadius: 'clamp(16px, 2.5vw, 32px)',
        gap: 'clamp(1rem, 1.5vw, 1.5rem)'
      }}
    >
      <div
        className="bg-[#8e58df]/10 rounded-full flex items-center justify-center shrink-0"
        style={{
          width: 'clamp(3rem, 4vw, 3.5rem)',
          height: 'clamp(3rem, 4vw, 3.5rem)'
        }}
      >
        <div className="w-1/2 h-1/2 flex items-center justify-center">
          {card.icon}
        </div>
      </div>
      <h3
        className="font-medium text-[#0b1220]/90 font-['Bricolage_Grotesque'] leading-tight"
        style={{ fontSize: 'clamp(1.25rem, 2.5vw, 2rem)' }}
      >
        {card.title}
      </h3>
      <div
        className="text-[#3b4558] font-['Bricolage_Grotesque'] leading-relaxed"
        style={{ fontSize: 'clamp(0.9375rem, 1.3vw, 1.125rem)' }}
      >
        {card.content}
      </div>
    </div>
  );
}

// --- Scroll-Triggered Combo ---

function ScrollCombo({
  card,
  sceneIndex,
  scrollYProgress,
}: {
  card: typeof CARDS[number];
  sceneIndex: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const Scene = SCENES[sceneIndex];
  const count = CARDS.length;

  // Each combo occupies 1/count of the scroll progress
  const segStart = sceneIndex / count;
  const segEnd = (sceneIndex + 1) / count;

  // Fade in during first 15% of segment, hold, fade out during last 15%
  const enterEnd = segStart + (segEnd - segStart) * 0.15;
  const exitStart = segEnd - (segEnd - segStart) * 0.15;
  const isLast = sceneIndex === count - 1;

  const opacity = useTransform(scrollYProgress, [segStart, enterEnd, exitStart, segEnd], [0, 1, 1, isLast ? 1 : 0]);
  const y = useTransform(scrollYProgress, [segStart, enterEnd, exitStart, segEnd], [40, 0, 0, isLast ? 0 : -40]);

  return (
    <motion.div
      className="absolute inset-0 flex flex-col md:flex-row items-stretch px-6 md:px-12 lg:px-16"
      style={{ opacity, y, gap: 'clamp(1.5rem, 3vw, 2rem)' }}
    >
      {/* Card side — left */}
      <div className="w-full md:w-[45%] flex-shrink-0 flex items-center">
        <Card card={card} />
      </div>

      {/* Animation side — right */}
      <div className="w-full md:w-[55%] flex-shrink-0 self-stretch">
        <Scene />
      </div>
    </motion.div>
  );
}

// --- Section ---

export function CultureGrowthSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  return (
    <section ref={sectionRef} className="relative w-full" style={{ height: `${CARDS.length * 100}vh` }}>
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden py-12 md:py-16">

        {/* Heading */}
        <div className="text-center mb-3 md:mb-5 shrink-0 z-10">
          <h2
            className="font-bold text-[#0b1220]/90 font-['Bricolage_Grotesque'] leading-[1.2]"
            style={{ fontSize: 'clamp(2.25rem, 5vw, 3.75rem)' }}
          >
            Moment by moment,
            <br />
            watch your culture grow.
          </h2>
        </div>

        {/* Scroll-driven combos container */}
        <div className="relative w-full flex-1 min-h-0" style={{ maxHeight: '55vh' }}>
          {CARDS.map((card, i) => (
            <ScrollCombo
              key={card.id}
              card={card}
              sceneIndex={i}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>

      </div>
    </section>
  );
}

