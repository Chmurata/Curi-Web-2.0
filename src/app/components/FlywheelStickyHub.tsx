import { useRef, useState, useEffect, useMemo, memo, useCallback } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useMotionValueEvent,
  AnimatePresence,
} from "motion/react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Comment02Icon } from "@hugeicons/core-free-icons";
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

/** Brighter variant for glows / accents */
const GLOW_COLORS = [
  "#3496DE",
  "#275E92",
  "#2A688E",
  "#3B9F9F",
  "#2EBAA6",
  "#1C6E60",
] as const;

// ---------------------------------------------------------------------------
// Hex math — 6 nodes arranged as vertices of a regular hexagon
// Node 0 at top (12 o'clock), proceeding clockwise
// ---------------------------------------------------------------------------

/** Returns {x, y} for each of the 6 hexagonal vertices, centered at (cx, cy) */
function hexPositions(cx: number, cy: number, radius: number) {
  return Array.from({ length: 6 }, (_, i) => {
    // Start at -90deg (top) and go clockwise
    const angle = (-Math.PI / 2) + (i * (2 * Math.PI)) / 6;
    return {
      x: cx + radius * Math.cos(angle),
      y: cy + radius * Math.sin(angle),
    };
  });
}

/** SVG arc path between two points along a circle — curved inward toward center */
function arcPath(
  from: { x: number; y: number },
  to: { x: number; y: number },
  radius: number
): string {
  // Use a large-arc radius for a gentle curve
  const arcRadius = radius * 1.15;
  return `M ${from.x} ${from.y} A ${arcRadius} ${arcRadius} 0 0 1 ${to.x} ${to.y}`;
}

// ---------------------------------------------------------------------------
// HexNode — a single node in the diagram
// ---------------------------------------------------------------------------

interface HexNodeProps {
  x: number;
  y: number;
  index: number;
  state: "inactive" | "active" | "completed";
  color: string;
  glowColor: string;
  diagramSize: number;
  counterRotation?: number;
}

const HexNode = memo(function HexNode({
  x,
  y,
  index,
  state,
  color,
  glowColor,
  diagramSize,
  counterRotation = 0,
}: HexNodeProps) {
  const isActive = state === "active";
  const isCompleted = state === "completed";
  // Match previous circle diameters: baseR was 21/26, diameter = 42/52
  const baseSize = diagramSize < 300 ? 42 : 52;
  const size = isActive ? baseSize * 1.5 : isCompleted ? baseSize * 1.25 : baseSize;
  const opacity = state === "inactive" ? 0.4 : 1;
  const fontSize = isActive ? 18 : isCompleted ? 16 : 14;

  // Force-fill SVG paths so the chat bubble looks solid
  const iconRef = useCallback(
    (el: HTMLDivElement | null) => {
      if (!el) return;
      const paths = el.querySelectorAll("path");
      paths.forEach((p) => {
        p.setAttribute("fill", color);
      });
    },
    [color]
  );

  return (
    <div
      className="absolute pointer-events-none"
      style={{ left: x, top: y, transform: "translate(-50%, -50%)" }}
    >
      <motion.div
        animate={{ opacity, rotate: counterRotation }}
        transition={{
          opacity: { type: "spring", stiffness: 300, damping: 26 },
          rotate: { type: "spring", stiffness: 60, damping: 20 },
        }}
      >
        <motion.div
          className="relative flex items-center justify-center"
          animate={{
            width: size,
            height: size,
            scale: isActive ? 1.1 : 1,
          }}
          transition={{ type: "spring", stiffness: 260, damping: 24 }}
          style={{
            filter: isActive
              ? `drop-shadow(0 0 12px ${glowColor}80)`
              : "none",
          }}
        >
          {/* Chat bubble icon — filled with step color */}
          <div ref={iconRef} className="absolute inset-0">
            <HugeiconsIcon
              icon={Comment02Icon}
              size="100%"
              color={color}
            />
          </div>

          {/* Step number centered inside bubble */}
          <span
            className="relative z-10 select-none font-['Bricolage_Grotesque'] font-bold text-white leading-none"
            style={{ fontSize }}
          >
            {index + 1}
          </span>

          {/* Completed checkmark badge */}
          {isCompleted && (
            <motion.div
              className="absolute rounded-full"
              style={{
                backgroundColor: color,
                border: "1.5px solid white",
                width: 12,
                height: 12,
                top: -2,
                right: -2,
              }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            />
          )}
        </motion.div>
      </motion.div>
    </div>
  );
});

// ---------------------------------------------------------------------------
// HexArc — progressive SVG arc between two nodes
// ---------------------------------------------------------------------------

interface HexArcProps {
  from: { x: number; y: number };
  to: { x: number; y: number };
  radius: number;
  index: number;
  drawProgress: number; // 0..1 how drawn
  fromColor: string;
  toColor: string;
}

const HexArc = memo(function HexArc({
  from,
  to,
  radius,
  index,
  drawProgress,
  fromColor,
  toColor,
}: HexArcProps) {
  const d = arcPath(from, to, radius);
  const gradientId = `arcGrad-${index}`;

  return (
    <g>
      <defs>
        <linearGradient
          id={gradientId}
          x1={from.x}
          y1={from.y}
          x2={to.x}
          y2={to.y}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={fromColor} />
          <stop offset="1" stopColor={toColor} />
        </linearGradient>
      </defs>

      {/* Background arc (faint) */}
      <path
        d={d}
        fill="none"
        stroke="#0b122010"
        strokeWidth={2}
        strokeLinecap="round"
      />

      {/* Drawn arc */}
      <motion.path
        d={d}
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth={3}
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: drawProgress }}
        transition={{ type: "spring", stiffness: 60, damping: 20 }}
      />
    </g>
  );
});

// ---------------------------------------------------------------------------
// HexDiagram — the full hexagonal node diagram with arcs + center logo
// ---------------------------------------------------------------------------

/** Rotation angles to align each node with the right side (3 o'clock) */
const STEP_ROTATIONS = [90, 30, -30, -90, -150, -210];

interface HexDiagramProps {
  activeStep: number; // 0..5, or 6 = all complete
  diagramSize: number;
  rotation?: number; // degree rotation applied by parent; used for counter-rotating text
}

const HexDiagram = memo(function HexDiagram({
  activeStep,
  diagramSize,
  rotation = 0,
}: HexDiagramProps) {
  const cx = diagramSize / 2;
  const cy = diagramSize / 2;
  const hexRadius = diagramSize * 0.36;

  const nodes = useMemo(
    () => hexPositions(cx, cy, hexRadius),
    [cx, cy, hexRadius]
  );

  const allComplete = activeStep >= 6;

  // Determine node states
  const getNodeState = (i: number): "inactive" | "active" | "completed" => {
    if (allComplete) return "completed";
    if (i < activeStep) return "completed";
    if (i === activeStep) return "active";
    return "inactive";
  };

  // Arc draw progress: arc i connects node i to node (i+1)%6
  // Arc i is fully drawn when step i+1 becomes active
  const getArcProgress = (arcIndex: number): number => {
    if (allComplete) return 1;
    // Arc 0 (node0->node1) draws as step 1 activates
    // Arc 1 (node1->node2) draws as step 2 activates
    // ...
    // Arc 5 (node5->node0) draws when all complete
    if (arcIndex === 5) return allComplete ? 1 : 0;
    if (activeStep > arcIndex + 1) return 1;
    if (activeStep === arcIndex + 1) return 1;
    return 0;
  };

  // Center logo size (50% larger)
  const logoSize = diagramSize * 0.21;

  return (
    <div
      className="relative"
      style={{ width: diagramSize, height: diagramSize }}
    >
      {/* SVG layer — arcs only */}
      <svg
        width={diagramSize}
        height={diagramSize}
        viewBox={`0 0 ${diagramSize} ${diagramSize}`}
        className="overflow-visible"
      >
        {/* Arcs (render below nodes) */}
        {nodes.map((from, i) => {
          const to = nodes[(i + 1) % 6];
          return (
            <HexArc
              key={`arc-${i}`}
              from={from}
              to={to}
              radius={hexRadius}
              index={i}
              drawProgress={getArcProgress(i)}
              fromColor={STEP_COLORS[i]}
              toColor={STEP_COLORS[(i + 1) % 6]}
            />
          );
        })}
      </svg>

      {/* HTML chat bubble nodes — overlaid on SVG */}
      {nodes.map((pos, i) => (
        <HexNode
          key={`node-${i}`}
          x={pos.x}
          y={pos.y}
          index={i}
          state={getNodeState(i)}
          color={STEP_COLORS[i]}
          glowColor={GLOW_COLORS[i]}
          diagramSize={diagramSize}
          counterRotation={-rotation}
        />
      ))}

      {/* Center logo — counter-rotates, grows 5% per step with squeeze-bounce */}
      <motion.div
        className="absolute flex items-center justify-center"
        style={{
          width: logoSize * 2,
          height: logoSize * 2,
          top: cy - logoSize,
          left: cx - logoSize,
          filter: "drop-shadow(0 0 12px rgba(43,152,166,0.25))",
        }}
        animate={{ rotate: -rotation }}
        transition={{ type: "spring", stiffness: 60, damping: 20 }}
      >
        <motion.img
          key={activeStep}
          src={assets.logo}
          alt="Curi"
          style={{ width: logoSize, height: "auto" }}
          className="select-none"
          initial={{ scale: 1 + Math.min(activeStep, 6) * 0.05 - 0.1 }}
          animate={{ scale: 1 + Math.min(activeStep, 6) * 0.05 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
        />
      </motion.div>
    </div>
  );
});

// ---------------------------------------------------------------------------
// StepDescriptionPanel — cross-fading text panel for the active step
// ---------------------------------------------------------------------------

interface StepPanelProps {
  activeStep: number; // 0..5 or 6 = complete
  direction?: 1 | -1; // 1 = scrolling down (text from top), -1 = scrolling up (text from bottom)
}

const StepDescriptionPanel = memo(function StepDescriptionPanel({
  activeStep,
  direction = 1,
}: StepPanelProps) {
  // Clamp to 0..5 so step 6 ("all complete") reuses step 5's panel without re-animating
  const displayStep = Math.min(activeStep, 5);

  // Scrolling down (direction 1): new text enters from top (y: -24 → 0), old exits downward (y: 0 → 16)
  // Scrolling up (direction -1): new text enters from bottom (y: 24 → 0), old exits upward (y: 0 → -16)
  const enterY = direction === 1 ? 24 : -24;
  const exitY = direction === 1 ? -16 : 16;

  return (
    <div className="relative flex flex-col justify-center min-h-[280px] md:min-h-[320px]">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={`step-${displayStep}`}
          className="flex flex-col gap-4"
          initial={{ opacity: 0, y: enterY }}
          animate={{
            opacity: 1,
            y: 0,
            transition: {
              duration: 0.15,
              ease: "easeOut",
              delay: 0.15,
            },
          }}
          exit={{
            opacity: 0,
            y: exitY,
            transition: {
              duration: 0.15,
              ease: "easeIn",
            },
          }}
        >
          {/* Step number — large gradient text */}
          <span
            className="font-['Bricolage_Grotesque'] font-normal leading-none select-none"
            style={{
              fontSize: "clamp(3.2rem, 5.6vw, 4.8rem)",
              background: `linear-gradient(135deg, ${STEP_COLORS[displayStep]}, ${GLOW_COLORS[displayStep]})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {String(displayStep + 1).padStart(2, "0")}
          </span>

          {/* Step label */}
          <h3
            className="font-['Bricolage_Grotesque'] font-normal text-[#5a6578] leading-snug max-w-md"
            style={{ fontSize: "clamp(1.5rem, 2.4vw, 2.1rem)" }}
          >
            {STEPS[displayStep]}
          </h3>

        </motion.div>
      </AnimatePresence>
    </div>
  );
});

// ---------------------------------------------------------------------------
// Mobile Step Card
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
// Main Component
// ---------------------------------------------------------------------------

export default function FlywheelStickyHub() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<1 | -1>(1); // 1 = down, -1 = up
  const prevStepRef = useRef(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Responsive check
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const handler = (e: MediaQueryListEvent | MediaQueryList) =>
      setIsMobile(e.matches);
    handler(mq);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Scroll progress for the entire tall container
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Smooth spring for scroll-linked transforms
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 28,
    restDelta: 0.0005,
  });

  // Map scroll progress to active step
  // 0.00 - 0.05: title settles, step 0
  // 0.05 - 0.80: steps 0-5 (each ~12.5% of range)
  // 0.80 - 1.00: all-complete state (20% — satisfying hold)
  useMotionValueEvent(smoothProgress, "change", (v) => {
    setIsAnimating(v > 0.02 && v < 0.98);

    let nextStep: number;
    if (v < 0.05) {
      nextStep = 0;
    } else if (v >= 0.80) {
      nextStep = 6; // all complete
    } else {
      // Map 0.05..0.80 to 0..5
      const normalized = (v - 0.05) / 0.75;
      nextStep = Math.min(Math.floor(normalized * 6), 5);
    }

    if (nextStep !== prevStepRef.current) {
      setScrollDirection(nextStep > prevStepRef.current ? 1 : -1);
      prevStepRef.current = nextStep;
    }
    setActiveStep(nextStep);
  });

  // Diagram size — responsive
  const diagramSize = useMemo(() => (isMobile ? 250 : 420), [isMobile]);

  // Step-based rotation: aligns active node with the right side (next to text panel)
  const stepRotation = activeStep >= 6 ? STEP_ROTATIONS[5] : STEP_ROTATIONS[activeStep];

  // -------------------------------------------------------------------------
  // Mobile Layout
  // -------------------------------------------------------------------------
  if (isMobile) {
    return (
      <section className="relative py-16 px-4 overflow-hidden">
        {/* Background orbs */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
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

        {/* Compact diagram */}
        <motion.div
          className="relative z-10 flex justify-center mb-10"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 180, damping: 22 }}
        >
          <HexDiagram activeStep={6} diagramSize={250} />
        </motion.div>

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
              stroke="url(#stickyHubLoopMobile)"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M32 38l-6 6 6 6"
              stroke="url(#stickyHubLoopMobile)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            <defs>
              <linearGradient
                id="stickyHubLoopMobile"
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

  // -------------------------------------------------------------------------
  // Desktop Layout: Sticky Hub with hexagonal diagram + scroll-through steps
  // -------------------------------------------------------------------------
  return (
    <section
      ref={sectionRef}
      className="relative h-[400vh]"
    >
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col">
        {/* Ambient background orbs */}
        <div
          className="absolute inset-0 pointer-events-none overflow-hidden"
          aria-hidden
        >
          <div
            className="absolute rounded-full"
            style={{
              width: 500,
              height: 500,
              top: "5%",
              left: "5%",
              background:
                "radial-gradient(circle, #275E9215 0%, transparent 70%)",
              filter: "blur(80px)",
            }}
          />
          <div
            className="absolute rounded-full"
            style={{
              width: 400,
              height: 400,
              top: "50%",
              right: "5%",
              background:
                "radial-gradient(circle, #2EBAA615 0%, transparent 70%)",
              filter: "blur(80px)",
            }}
          />
          <div
            className="absolute rounded-full"
            style={{
              width: 350,
              height: 350,
              bottom: "10%",
              left: "40%",
              background:
                "radial-gradient(circle, #3496DE10 0%, transparent 70%)",
              filter: "blur(80px)",
            }}
          />
        </div>

        {/* Title area — at top, before the two-column layout */}
        <div className="relative z-10 text-center pt-12 pb-6 px-6 flex-shrink-0">
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

        {/* Two-column layout: diagram left, step panel right */}
        <div
          className="relative z-10 flex-1 grid grid-cols-2 gap-8 lg:gap-12 items-center px-8 lg:px-16 xl:px-24 pb-8"
          style={{
            maxWidth: 1400,
            margin: "0 auto",
            width: "100%",
          }}
        >
          {/* LEFT: Hexagonal diagram — rotates to align active node with text */}
          <div className="flex items-center justify-center">
            <motion.div
              style={{
                willChange: isAnimating ? "transform" : "auto",
              }}
              animate={{ rotate: stepRotation }}
              transition={{ type: "spring", stiffness: 60, damping: 20 }}
            >
              <HexDiagram
                activeStep={activeStep}
                diagramSize={diagramSize}
                rotation={stepRotation}
              />
            </motion.div>
          </div>

          {/* RIGHT: Step description panels (cross-fade) */}
          <div className="flex items-center">
            <StepDescriptionPanel activeStep={activeStep} direction={scrollDirection} />
          </div>
        </div>
      </div>
    </section>
  );
}
