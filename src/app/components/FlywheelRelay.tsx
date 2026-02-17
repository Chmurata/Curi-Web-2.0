import { useRef, useState, useEffect, useMemo, memo } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
  AnimatePresence,
} from "motion/react";
import { assets } from "./Imports";

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const STEPS = [
  "Employee 1 Receives Coaching",
  "Sends Invitation to Engage",
  "Employee 2 Receives Coaching",
  "Successful Facilitated Conversation",
  "Employees Insight: All Parties Receive Coaching",
  "Insight Builds Confidence to Engage in Challenging Conversations",
] as const;

/** Blue-to-teal gradient progression for the 6 steps */
const STEP_COLORS = [
  "#275E92",
  "#1D5486",
  "#2A688E",
  "#3BA099",
  "#1D9392",
  "#2EBAA6",
] as const;

/** Slightly brighter variant used for glows / accents */
const GLOW_COLORS = [
  "#3496DE",
  "#275E92",
  "#2A688E",
  "#3B9F9F",
  "#2EBAA6",
  "#1C6E60",
] as const;

// ---------------------------------------------------------------------------
// Ambient Background Orbs (parallax at different rate)
// ---------------------------------------------------------------------------

interface OrbProps {
  color: string;
  size: string;
  top: string;
  left: string;
  parallaxRate: number;
  scrollProgress: ReturnType<typeof useSpring>;
}

const AmbientOrb = memo(function AmbientOrb({
  color,
  size,
  top,
  left,
  parallaxRate,
  scrollProgress,
}: OrbProps) {
  const x = useTransform(scrollProgress, [0, 1], [0, parallaxRate]);

  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size,
        height: size,
        top,
        left,
        background: `radial-gradient(circle, ${color}20 0%, transparent 70%)`,
        filter: "blur(80px)",
        x,
        willChange: "transform",
      }}
      aria-hidden
    />
  );
});

// ---------------------------------------------------------------------------
// Step Card (Desktop — horizontal track)
// ---------------------------------------------------------------------------

interface StepCardProps {
  index: number;
  label: string;
  color: string;
  glowColor: string;
  isActive: boolean;
  isPast: boolean;
}

const StepCard = memo(function StepCard({
  index,
  label,
  color,
  glowColor,
  isActive,
  isPast,
}: StepCardProps) {
  return (
    <motion.div
      className="relative flex-shrink-0 flex flex-col justify-between overflow-hidden rounded-2xl md:rounded-3xl border"
      style={{
        width: "clamp(280px, 22vw, 400px)",
        height: "clamp(220px, 18vw, 320px)",
        borderColor: isActive ? glowColor : "rgba(255,255,255,0.15)",
        background: isActive
          ? "rgba(255,255,255,0.12)"
          : "rgba(255,255,255,0.06)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        boxShadow: isActive
          ? `0 0 40px ${glowColor}30, 0 8px 32px rgba(0,0,0,0.08)`
          : "0 4px 24px rgba(0,0,0,0.06)",
      }}
      animate={{
        scale: isActive ? 1.03 : 1,
        opacity: isPast ? 0.55 : 1,
      }}
      transition={{ type: "spring", stiffness: 260, damping: 28 }}
    >
      {/* Left accent gradient bar */}
      <div
        className="absolute left-0 top-0 h-full w-1.5 md:w-2"
        style={{
          background: `linear-gradient(to bottom, ${color}, ${glowColor})`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-between h-full p-5 md:p-7 pl-6 md:pl-8">
        {/* Step number — large, semi-transparent until active */}
        <span
          className="font-['Bricolage_Grotesque'] font-extrabold leading-none select-none"
          style={{
            fontSize: "clamp(3rem, 5vw, 5rem)",
            color,
            opacity: isActive ? 0.35 : 0.12,
            transition: "opacity 0.4s ease",
          }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* Label */}
        <p
          className="font-['Bricolage_Grotesque'] font-semibold leading-snug text-[#0b1220] max-w-[90%]"
          style={{ fontSize: "clamp(0.95rem, 1.3vw, 1.35rem)" }}
        >
          {label}
        </p>
      </div>

      {/* Subtle corner glow when active */}
      {isActive && (
        <div
          className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full pointer-events-none"
          style={{
            background: `radial-gradient(circle, ${glowColor}25 0%, transparent 70%)`,
            filter: "blur(30px)",
          }}
          aria-hidden
        />
      )}
    </motion.div>
  );
});

// ---------------------------------------------------------------------------
// Step Card (Mobile — vertical stack)
// ---------------------------------------------------------------------------

const MobileStepCard = memo(function MobileStepCard({
  index,
  label,
  color,
  glowColor,
}: {
  index: number;
  label: string;
  color: string;
  glowColor: string;
}) {
  return (
    <motion.div
      className="relative overflow-hidden rounded-2xl border"
      style={{
        borderColor: "rgba(255,255,255,0.18)",
        background: "rgba(255,255,255,0.08)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
      }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 24,
        delay: index * 0.08,
      }}
    >
      {/* Left accent bar */}
      <div
        className="absolute left-0 top-0 h-full w-1.5"
        style={{
          background: `linear-gradient(to bottom, ${color}, ${glowColor})`,
        }}
      />

      <div className="flex items-center gap-4 p-5 pl-6">
        {/* Number badge */}
        <div
          className="flex-shrink-0 w-11 h-11 rounded-full flex items-center justify-center font-['Bricolage_Grotesque'] font-bold text-white text-lg"
          style={{
            background: `linear-gradient(135deg, ${color}, ${glowColor})`,
          }}
        >
          {index + 1}
        </div>

        {/* Label */}
        <p
          className="font-['Bricolage_Grotesque'] font-semibold leading-snug text-[#0b1220]"
          style={{ fontSize: "clamp(0.9rem, 4vw, 1.1rem)" }}
        >
          {label}
        </p>
      </div>
    </motion.div>
  );
});

// ---------------------------------------------------------------------------
// Glowing Baton
// ---------------------------------------------------------------------------

interface BatonProps {
  scrollProgress: ReturnType<typeof useSpring>;
  activeIndex: number;
}

const GlowingBaton = memo(function GlowingBaton({
  scrollProgress,
  activeIndex,
}: BatonProps) {
  const color = GLOW_COLORS[activeIndex] ?? GLOW_COLORS[0];

  // Baton follows the scroll-driven horizontal progress
  // It sits slightly ahead of the current card center
  const batonX = useTransform(scrollProgress, [0, 1], ["8%", "88%"]);

  return (
    <motion.div
      className="absolute top-1/2 -translate-y-1/2 pointer-events-none z-30"
      style={{
        left: batonX,
        willChange: "transform",
      }}
    >
      {/* Comet trail */}
      <motion.div
        className="absolute top-1/2 -translate-y-1/2 -left-16"
        style={{
          width: "clamp(60px, 6vw, 100px)",
          height: "4px",
          background: `linear-gradient(to right, transparent, ${color}60)`,
          borderRadius: "999px",
          filter: "blur(3px)",
        }}
        aria-hidden
      />

      {/* Core orb */}
      <motion.div
        animate={{
          boxShadow: [
            `0 0 20px 8px ${color}40`,
            `0 0 35px 14px ${color}55`,
            `0 0 20px 8px ${color}40`,
          ],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          width: "clamp(16px, 1.4vw, 24px)",
          height: "clamp(16px, 1.4vw, 24px)",
          borderRadius: "50%",
          background: `radial-gradient(circle, white 20%, ${color} 70%, transparent 100%)`,
        }}
      />
    </motion.div>
  );
});

// ---------------------------------------------------------------------------
// Loop-Close indicator
// ---------------------------------------------------------------------------

const LoopClose = memo(function LoopClose({
  visible,
}: {
  visible: boolean;
}) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="flex-shrink-0 flex flex-col items-center justify-center gap-3 px-6"
          style={{ minWidth: "clamp(200px, 16vw, 280px)" }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 200, damping: 22 }}
        >
          {/* Curved arrow SVG */}
          <svg
            width="64"
            height="48"
            viewBox="0 0 64 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="opacity-50"
          >
            <path
              d="M4 24C4 13 13 4 28 4h8c15 0 20 9 20 20s-5 20-20 20H28"
              stroke="url(#loopGrad)"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M32 38l-6 6 6 6"
              stroke="url(#loopGrad)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            <defs>
              <linearGradient
                id="loopGrad"
                x1="4"
                y1="24"
                x2="56"
                y2="24"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#2EBAA6" />
                <stop offset="1" stopColor="#275E92" />
              </linearGradient>
            </defs>
          </svg>

        </motion.div>
      )}
    </AnimatePresence>
  );
});

// ---------------------------------------------------------------------------
// Desktop Track Progress Dots
// ---------------------------------------------------------------------------

const ProgressDots = memo(function ProgressDots({
  activeIndex,
}: {
  activeIndex: number;
}) {
  return (
    <div className="hidden md:flex items-center gap-2 justify-center mt-6">
      {STEPS.map((_, i) => (
        <motion.div
          key={i}
          className="rounded-full"
          animate={{
            width: i === activeIndex ? 24 : 8,
            backgroundColor:
              i === activeIndex ? STEP_COLORS[i] : "#0b122020",
          }}
          style={{ height: 8 }}
          transition={{ type: "spring", stiffness: 300, damping: 26 }}
        />
      ))}
    </div>
  );
});

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------

export default function FlywheelRelay() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showLoop, setShowLoop] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Responsive check
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const handler = (e: MediaQueryListEvent | MediaQueryList) =>
      setIsMobile(e.matches);
    handler(mq);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Scroll progress for the entire 500vh container
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Smooth spring for all scroll-linked transforms
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 28,
    restDelta: 0.0005,
  });

  // Derive the active step index from scroll progress
  useMotionValueEvent(smoothProgress, "change", (v) => {
    // Map 0-0.85 to steps 0-5, leave 0.85-1.0 for the loop-close
    const stepProgress = Math.min(v / 0.85, 1);
    const idx = Math.min(Math.floor(stepProgress * 6), 5);
    setActiveIndex(idx);
    setShowLoop(v > 0.88);
  });

  // Horizontal track translation (desktop only)
  // Moves from 0 to -(totalTrackWidth - viewport) as scrollYProgress 0 -> 0.88
  const trackX = useTransform(smoothProgress, [0.04, 0.88], ["2%", "-72%"]);

  // Ambient orbs data
  const orbs = useMemo(
    () => [
      {
        color: "#275E92",
        size: "500px",
        top: "5%",
        left: "10%",
        parallaxRate: -120,
      },
      {
        color: "#2EBAA6",
        size: "400px",
        top: "55%",
        left: "60%",
        parallaxRate: 80,
      },
      {
        color: "#3496DE",
        size: "350px",
        top: "30%",
        left: "85%",
        parallaxRate: -60,
      },
    ],
    []
  );

  // -----------------------------------------------------------------------
  // Mobile Layout: vertical stack with staggered whileInView
  // -----------------------------------------------------------------------
  if (isMobile) {
    return (
      <section className="relative py-16 px-4 overflow-hidden bg-gradient-to-b from-[#f2f7fb] to-white">
        {/* Background orbs (simplified for mobile) */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden
        >
          <div
            className="absolute top-10 left-[-20%] w-[300px] h-[300px] rounded-full"
            style={{
              background:
                "radial-gradient(circle, #275E9218 0%, transparent 70%)",
              filter: "blur(60px)",
            }}
          />
          <div
            className="absolute bottom-20 right-[-10%] w-[250px] h-[250px] rounded-full"
            style={{
              background:
                "radial-gradient(circle, #2EBAA618 0%, transparent 70%)",
              filter: "blur(60px)",
            }}
          />
        </div>

        {/* Title */}
        <div className="relative z-10 text-center mb-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, damping: 22 }}
          >

            <h2
              className="font-bold text-[#0b1220] font-['Bricolage_Grotesque'] leading-tight"
              style={{ fontSize: "clamp(2.25rem, 5vw, 3.75rem)" }}
            >
              The Employee Interaction
              <br />
              Confidence Flywheel
            </h2>
          </motion.div>
        </div>

        {/* Cards stack */}
        <div className="relative z-10 flex flex-col gap-4 max-w-md mx-auto">
          {STEPS.map((label, i) => (
            <MobileStepCard
              key={i}
              index={i}
              label={label}
              color={STEP_COLORS[i]}
              glowColor={GLOW_COLORS[i]}
            />
          ))}
        </div>

        {/* Loop close for mobile */}
        <motion.div
          className="relative z-10 flex flex-col items-center mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <svg
            width="48"
            height="36"
            viewBox="0 0 64 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="opacity-40"
          >
            <path
              d="M4 24C4 13 13 4 28 4h8c15 0 20 9 20 20s-5 20-20 20H28"
              stroke="url(#loopGradMobile)"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M32 38l-6 6 6 6"
              stroke="url(#loopGradMobile)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            <defs>
              <linearGradient
                id="loopGradMobile"
                x1="4"
                y1="24"
                x2="56"
                y2="24"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#2EBAA6" />
                <stop offset="1" stopColor="#275E92" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>
      </section>
    );
  }

  // -----------------------------------------------------------------------
  // Desktop Layout: Scroll-hijacked horizontal cinema
  // -----------------------------------------------------------------------
  return (
    <section
      ref={sectionRef}
      className="relative h-[500vh] bg-gradient-to-b from-[#f2f7fb] via-[#f8fbfe] to-white"
    >
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center">
        {/* Ambient background orbs */}
        <div
          className="absolute inset-0 pointer-events-none overflow-hidden"
          aria-hidden
        >
          {orbs.map((orb, i) => (
            <AmbientOrb
              key={i}
              {...orb}
              scrollProgress={smoothProgress}
            />
          ))}
        </div>

        {/* Title area */}
        <div className="relative z-10 text-center mb-8 md:mb-10 px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              type: "spring",
              stiffness: 180,
              damping: 22,
              delay: 0.1,
            }}
          >

            <h2
              className="font-bold text-[#0b1220] font-['Bricolage_Grotesque'] leading-tight"
              style={{ fontSize: "clamp(2.25rem, 5vw, 3.75rem)" }}
            >
              The Employee Interaction
              <br />
              Confidence Flywheel
            </h2>
          </motion.div>
        </div>

        {/* Horizontal track container */}
        <div className="relative z-10 w-full flex-1 flex items-center min-h-0 overflow-hidden">
          {/* Glowing Baton */}
          <GlowingBaton
            scrollProgress={smoothProgress}
            activeIndex={activeIndex}
          />

          {/* The sliding track */}
          <motion.div
            className="flex items-center gap-6 lg:gap-8 pl-[8vw] pr-[12vw]"
            style={{
              x: trackX,
              willChange: "transform",
            }}
          >
            {STEPS.map((label, i) => (
              <StepCard
                key={i}
                index={i}
                label={label}
                color={STEP_COLORS[i]}
                glowColor={GLOW_COLORS[i]}
                isActive={i === activeIndex}
                isPast={i < activeIndex}
              />
            ))}

            {/* Loop close element */}
            <LoopClose visible={showLoop} />
          </motion.div>
        </div>

        {/* Progress dots */}
        <div className="relative z-10 pb-8">
          <ProgressDots activeIndex={activeIndex} />
        </div>
      </div>
    </section>
  );
}
