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

// We now support 3 distinct cycles. The text explains the "ascending" value.
const STEPS_CYCLE_1 = [
  "Employee 1 Receives Coaching",
  "Sends Invitation to Engage",
  "Employee 2 Receives Coaching",
  "Successful Facilitated Conversation",
  "Employees Insight: All Parties Receive Coaching",
  "Insight Builds Confidence to Engage in Challenging Conversations",
] as const;

// After the first loop, we enter Cycle 2 (Steps 6-11)
const STEPS_CYCLE_2 = [
  "Confidence Accelerates Future Coaching",
  "Invitations Become More Natural",
  "Receptivity to Coaching Increases",
  "Conversations Are Resolved Faster",
  "A Culture of Feedback Begins to Form",
  "Relational Trust Deepens Across Teams",
] as const;

// After the second loop, we enter the final Cycle 3 (Steps 12-17)
const STEPS_CYCLE_3 = [
  "Coaching Becomes Organizational Reflex",
  "Proactive Invitations Become the Norm",
  "Continuous Multidirectional Coaching",
  "Frictionless High-Stakes Conversations",
  "Systemic Org-Wide Growth",
  "The Ultimate Culture Realized",
] as const;

const ALL_STEPS = [...STEPS_CYCLE_1, ...STEPS_CYCLE_2, ...STEPS_CYCLE_3];

/** Blue-to-teal gradient progression for the 6 base steps */
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
// ---------------------------------------------------------------------------

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

function arcPath(
  from: { x: number; y: number },
  to: { x: number; y: number },
  radius: number
): string {
  const arcRadius = radius * 1.15;
  return `M ${from.x} ${from.y} A ${arcRadius} ${arcRadius} 0 0 1 ${to.x} ${to.y}`;
}

// ---------------------------------------------------------------------------
// HexNode
// ---------------------------------------------------------------------------

interface HexNodeProps {
  x: number;
  y: number;
  index: number; // 0-5
  globalStep: number; // 0-18
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
  globalStep,
  state,
  color,
  glowColor,
  diagramSize,
  counterRotation = 0,
}: HexNodeProps) {
  const isActive = state === "active";
  const isCompleted = state === "completed";

  // Calculate Cycle Level (0 for steps 0-5, 1 for 6-11, 2 for 12-17)
  const cycleLevel = Math.min(Math.floor(globalStep / 6), 2);

  // Mathematical scaling for the "Ascending Flywheel" effect
  // Base size matches old logic. As Cycle increases, base size physically scales up.
  const sizeMultiplier = 1 + (cycleLevel * 0.15); // +15% per cycle

  const baseSize = (diagramSize < 300 ? 42 : 52) * sizeMultiplier;
  const size = isActive ? baseSize * 1.5 : isCompleted ? baseSize * 1.25 : baseSize;
  const opacity = state === "inactive" ? 0.4 : 1;
  const fontSize = (isActive ? 18 : isCompleted ? 16 : 14) * sizeMultiplier;

  // Glow becomes significantly more intense with each cycle level
  const activeGlowIntensity = cycleLevel === 0 ? "80" : cycleLevel === 1 ? "B3" : "FF"; // hex alpha
  const idleGlowIntensity = cycleLevel === 0 ? "00" : cycleLevel === 1 ? "40" : "80";

  const currentGlow = isActive
    ? `drop-shadow(0 0 ${12 + (cycleLevel * 8)}px ${glowColor}${activeGlowIntensity})`
    : isCompleted
      ? `drop-shadow(0 0 ${8 + (cycleLevel * 4)}px ${glowColor}${idleGlowIntensity})`
      : "none";

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
      className="absolute pointer-events-none transition-all duration-500"
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
          className="relative flex items-center justify-center transition-all duration-500 ease-out"
          animate={{
            width: size,
            height: size,
            scale: isActive ? 1.1 : 1,
            filter: currentGlow,
          }}
          transition={{ type: "spring", stiffness: 260, damping: 24 }}
        >
          {/* Chat bubble icon */}
          <div ref={iconRef} className="absolute inset-0">
            <HugeiconsIcon
              icon={Comment02Icon}
              size="100%"
              color={color}
            />
          </div>

          {/* Step letter / number mix depending on cycle. e.g. 1 -> 1A -> 1B */}
          <span
            className="relative z-10 select-none font-['Bricolage_Grotesque'] font-bold text-white leading-none transition-all duration-500"
            style={{ fontSize }}
          >
            {index + 1}{cycleLevel === 1 ? "A" : cycleLevel === 2 ? "B" : ""}
          </span>

          {/* Completed checkmark badge */}
          {isCompleted && (
            <motion.div
              className="absolute rounded-full transition-all duration-500"
              style={{
                backgroundColor: color,
                border: "1.5px solid white",
                width: 12 * sizeMultiplier,
                height: 12 * sizeMultiplier,
                top: -2 * sizeMultiplier,
                right: -2 * sizeMultiplier,
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
// HexArc
// ---------------------------------------------------------------------------

interface HexArcProps {
  from: { x: number; y: number };
  to: { x: number; y: number };
  radius: number;
  index: number;
  drawProgress: number;
  fromColor: string;
  toColor: string;
  cycleLevel: number;
}

const HexArc = memo(function HexArc({
  from,
  to,
  radius,
  index,
  drawProgress,
  fromColor,
  toColor,
  cycleLevel
}: HexArcProps) {
  const d = arcPath(from, to, radius);
  const gradientId = `arcGrad-${index}`;

  // Arcs get thicker and brighter as flyweel ascends
  const strokeWidth = 3 + (cycleLevel * 1.5);
  const glow = cycleLevel > 0
    ? `drop-shadow(0 0 ${4 * cycleLevel}px ${toColor}60)`
    : "none";

  return (
    <g style={{ filter: glow, transition: "filter 0.5s ease" }}>
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

      {/* Background arc */}
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
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: drawProgress }}
        transition={{ type: "spring", stiffness: 60, damping: 20 }}
      />
    </g>
  );
});

// ---------------------------------------------------------------------------
// HexDiagram 
// ---------------------------------------------------------------------------

const STEP_ROTATIONS = [90, 30, -30, -90, -150, -210];

interface HexDiagramProps {
  activeStep: number; // 0..17, or 18 = all complete
  diagramSize: number;
  rotation?: number;
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

  const allComplete = activeStep >= 18;
  const cycleLevel = Math.min(Math.floor(activeStep / 6), 2);
  const localActiveStep = activeStep % 6;

  const getNodeState = (i: number): "inactive" | "active" | "completed" => {
    if (allComplete) return "completed";

    if (i < localActiveStep) return "completed";
    if (i === localActiveStep) return "active";
    // Nodes ahead of us in the CURRENT cycle are inactive visually
    return "inactive";
  };

  const getArcProgress = (arcIndex: number): number => {
    if (allComplete) return 1;
    // An arc draws to completion when the NEXT step starts.
    if (arcIndex === 5) {
      if (localActiveStep === 5) return 0; // Wait for step 6 (next cycle 0) to draw 
      if (cycleLevel > 0 && localActiveStep >= 0) return 0; // Pete re-loops
      return 0;
    }
    if (localActiveStep > arcIndex + 1) return 1;
    if (localActiveStep === arcIndex + 1) return 1;

    return 0;
  };

  // Center logo size grows profoundly across the 3 cycles
  const exactProgress = Math.min(activeStep, 18);
  const logoScale = 0.9 + (exactProgress * 0.035);
  const logoSize = diagramSize * 0.21;
  const logoGlow = `drop-shadow(0 0 ${12 + (cycleLevel * 20)}px rgba(43,152,166,${0.25 + (cycleLevel * 0.15)}))`;

  return (
    <div
      className="relative"
      style={{ width: diagramSize, height: diagramSize }}
    >
      <svg
        width={diagramSize}
        height={diagramSize}
        viewBox={`0 0 ${diagramSize} ${diagramSize}`}
        className="overflow-visible"
      >
        {nodes.map((from, i) => {
          const to = nodes[(i + 1) % 6];
          let currentDrawProgress = getArcProgress(i);

          return (
            <HexArc
              key={`arc-${i}`}
              from={from}
              to={to}
              radius={hexRadius}
              index={i}
              drawProgress={currentDrawProgress}
              fromColor={STEP_COLORS[i]}
              toColor={STEP_COLORS[(i + 1) % 6]}
              cycleLevel={cycleLevel}
            />
          );
        })}
      </svg>

      {nodes.map((pos, i) => (
        <HexNode
          key={`node-${i}`}
          x={pos.x}
          y={pos.y}
          index={i}
          globalStep={activeStep}
          state={getNodeState(i)}
          color={STEP_COLORS[i]}
          glowColor={GLOW_COLORS[i]}
          diagramSize={diagramSize}
          counterRotation={-rotation}
        />
      ))}

      <motion.div
        className="absolute flex items-center justify-center transition-all duration-700 ease-out"
        style={{
          width: logoSize * 2,
          height: logoSize * 2,
          top: cy - logoSize,
          left: cx - logoSize,
          filter: logoGlow,
        }}
        animate={{ rotate: -rotation }}
        transition={{ type: "spring", stiffness: 60, damping: 20 }}
      >
        <motion.img
          src={assets.logo}
          alt="Curi"
          style={{ width: logoSize, height: "auto" }}
          className="select-none"
          animate={{ scale: logoScale }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
        />
      </motion.div>
    </div>
  );
});

// ---------------------------------------------------------------------------
// StepDescriptionPanel
// ---------------------------------------------------------------------------

interface StepPanelProps {
  activeStep: number; // 0..17 or 18 = complete
  direction?: 1 | -1;
}

const StepDescriptionPanel = memo(function StepDescriptionPanel({
  activeStep,
  direction = 1,
}: StepPanelProps) {
  // Clamp to 0..17 so step 18 reuses step 17's panel
  const displayStep = Math.min(activeStep, 17);
  const cycleLevel = Math.floor(displayStep / 6);
  // Color mapping uses the local step (0-5)
  const colorIndex = displayStep % 6;

  const enterY = direction === 1 ? 24 : -24;
  const exitY = direction === 1 ? -16 : 16;

  // Cycle text indicator (e.g. Cycle 2: Scaling the Culture)
  const cycleLabel =
    cycleLevel === 0 ? "CYCLE 1: THE SPARK" :
      cycleLevel === 1 ? "CYCLE 2: THE ACCELERATION" :
        "CYCLE 3: THE ULTIMATE CULTURE";

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
            transition: { duration: 0.15, ease: "easeOut", delay: 0.15 },
          }}
          exit={{
            opacity: 0,
            y: exitY,
            transition: { duration: 0.15, ease: "easeIn" },
          }}
        >

          {/* Cycle Indicator Badge */}
          <div className="flex items-center">
            <div
              className="px-3 py-1 rounded-full text-[11px] font-bold tracking-widest text-white uppercase"
              style={{
                background: `linear-gradient(135deg, ${STEP_COLORS[colorIndex]}, ${GLOW_COLORS[colorIndex]})`,
                boxShadow: `0 4px 12px ${GLOW_COLORS[colorIndex]}40`
              }}
            >
              {cycleLabel}
            </div>
          </div>

          {/* Step number — large gradient text */}
          <span
            className="font-['Bricolage_Grotesque'] font-normal leading-none select-none transition-all duration-300"
            style={{
              fontSize: "clamp(3.2rem, 5.6vw, 4.8rem)",
              background: `linear-gradient(135deg, ${STEP_COLORS[colorIndex]}, ${GLOW_COLORS[colorIndex]})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              textShadow: cycleLevel > 0 ? `0 0 ${10 * cycleLevel}px ${GLOW_COLORS[colorIndex]}60` : "none"
            }}
          >
            {/* Display like 01, 01A, 01B */}
            {String(colorIndex + 1).padStart(2, "0")}
            {cycleLevel === 1 ? "A" : cycleLevel === 2 ? "B" : ""}
          </span>

          {/* Step label */}
          <h3
            className="font-['Bricolage_Grotesque'] font-normal leading-snug max-w-md transition-colors duration-500"
            style={{
              fontSize: "clamp(1.5rem, 2.4vw, 2.1rem)",
              color: cycleLevel > 0 ? "#0b1220" : "#5a6578", // Darker text on higher cycles
              fontWeight: cycleLevel > 0 ? 500 : 400
            }}
          >
            {ALL_STEPS[displayStep]}
          </h3>

        </motion.div>
      </AnimatePresence>
    </div>
  );
});

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------

export default function FlywheelStickyHub() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0); // 0 to 18
  const [scrollDirection, setScrollDirection] = useState<1 | -1>(1);
  const prevStepRef = useRef(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const handler = (e: MediaQueryListEvent | MediaQueryList) =>
      setIsMobile(e.matches);
    handler(mq);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 28,
    restDelta: 0.0005,
  });

  // Map 0.00 to 1.00 scroll progress across 18 steps (3 cycles)
  useMotionValueEvent(smoothProgress, "change", (v) => {
    setIsAnimating(v > 0.02 && v < 0.98);

    let nextStep: number;
    if (v < 0.02) {
      nextStep = 0;
    } else if (v >= 0.98) {
      nextStep = 18; // all complete
    } else {
      // Map 0.02..0.98 to 0..17 (18 steps total)
      const normalized = (v - 0.02) / 0.96;
      nextStep = Math.min(Math.floor(normalized * 18), 17);
    }

    if (nextStep !== prevStepRef.current) {
      setScrollDirection(nextStep > prevStepRef.current ? 1 : -1);
      prevStepRef.current = nextStep;
    }
    setActiveStep(nextStep);
  });

  const diagramSize = useMemo(() => (isMobile ? 250 : 420), [isMobile]);

  // Instead of a modulo array lookup that snaps back to 90 from -210,
  // we calculate a strictly decreasing continuous angle.
  // Step 0 = 90
  // Step 1 = 30
  // Step 2 = -30
  // ...
  // Step 6 (Cycle 2, Step 0) = -270 (which is visually 90, but continuous in animation)
  const continuousIndex = activeStep >= 18 ? 17 : activeStep;
  const stepRotation = 90 - (continuousIndex * 60);

  // -------------------------------------------------------------------------
  // Desktop Layout Only logic since Mobile was abbreviated
  // -------------------------------------------------------------------------

  if (isMobile) {
    // Very basic mobile fallback for now, as Pete's focus was the Sticky Hub on Desktop 
    // We will map through all 18 steps in a stack.
    return (
      <section className="relative py-16 px-4 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <div
            className="absolute top-10 left-[-20%] w-[300px] h-[300px] rounded-full"
            style={{ background: "radial-gradient(circle, #275E9218 0%, transparent 70%)", filter: "blur(60px)" }}
          />
          <div
            className="absolute bottom-20 right-[-10%] w-[250px] h-[250px] rounded-full"
            style={{ background: "radial-gradient(circle, #2EBAA618 0%, transparent 70%)", filter: "blur(60px)" }}
          />
        </div>

        <div className="relative z-10 text-center mb-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, damping: 22 }}
          >
            <h2 className="font-bold text-[#0b1220] font-['Bricolage_Grotesque'] leading-tight" style={{ fontSize: "clamp(2.25rem, 5vw, 3.75rem)" }}>
              The Employee Interaction<br />Confidence Flywheel
            </h2>
          </motion.div>
        </div>

        <motion.div
          className="relative z-10 flex justify-center mb-10"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 180, damping: 22 }}
        >
          <HexDiagram activeStep={18} diagramSize={250} />
        </motion.div>

        <div className="relative z-10 flex flex-col gap-4 max-w-md mx-auto">
          {ALL_STEPS.map((label, i) => {
            const colorIdx = i % 6;
            const cycleLvl = Math.floor(i / 6);
            return (
              <div key={i} className="bg-white/80 backdrop-blur-md rounded-2xl p-5 border border-white/20 shadow-sm flex items-center gap-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white shrink-0"
                  style={{ background: `linear-gradient(135deg, ${STEP_COLORS[colorIdx]}, ${GLOW_COLORS[colorIdx]})` }}>
                  {colorIdx + 1}{cycleLvl === 1 ? "A" : cycleLvl === 2 ? "B" : ""}
                </div>
                <p className="font-semibold text-[#0b1220]">{label}</p>
              </div>
            );
          })}
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="relative h-[600vh]" /* Increased height for 3 full cycles */
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col">
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
          <div
            className="absolute rounded-full"
            style={{ width: 500, height: 500, top: "5%", left: "5%", background: "radial-gradient(circle, #275E9215 0%, transparent 70%)", filter: "blur(80px)" }}
          />
          <div
            className="absolute rounded-full"
            style={{ width: 400, height: 400, top: "50%", right: "5%", background: "radial-gradient(circle, #2EBAA615 0%, transparent 70%)", filter: "blur(80px)" }}
          />
          <div
            className="absolute rounded-full"
            style={{ width: 350, height: 350, bottom: "10%", left: "40%", background: "radial-gradient(circle, #3496DE10 0%, transparent 70%)", filter: "blur(80px)" }}
          />
        </div>

        <div className="relative z-10 text-center pt-12 pb-6 px-6 flex-shrink-0">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 180, damping: 22, delay: 0.1 }}
          >
            <h2 className="font-bold text-[#0b1220] font-['Bricolage_Grotesque'] leading-tight" style={{ fontSize: "clamp(2.25rem, 5vw, 3.75rem)" }}>
              The Employee Interaction<br />Confidence Flywheel
            </h2>
          </motion.div>
        </div>

        <div
          className="relative z-10 flex-1 grid grid-cols-2 gap-8 lg:gap-12 items-center px-8 lg:px-16 xl:px-24 pb-8"
          style={{ maxWidth: 1400, margin: "0 auto", width: "100%" }}
        >
          <div className="flex items-center justify-center">
            <motion.div
              style={{ willChange: isAnimating ? "transform" : "auto" }}
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

          <div className="flex items-center">
            <StepDescriptionPanel activeStep={activeStep} direction={scrollDirection} />
          </div>
        </div>
      </div>
    </section>
  );
}
