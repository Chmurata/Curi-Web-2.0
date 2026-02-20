import { useRef, useState, useEffect, useMemo, memo } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
} from "motion/react";
import { assets } from "./Imports";

// ─── Step Data ───────────────────────────────────────────────────────────────

const STEPS = [
  {
    id: 1,
    label: "Employee 1 Receives Coaching",
    side: "left" as const,
    color: "#275E92",
    bgGradient:
      "linear-gradient(135deg, rgba(39,94,146,0.12) 0%, rgba(52,150,222,0.08) 100%)",
    borderColor: "rgba(39,94,146,0.25)",
  },
  {
    id: 2,
    label: "Sends Invitation to Engage",
    side: "right" as const,
    color: "#3BA099",
    bgGradient:
      "linear-gradient(135deg, rgba(59,160,153,0.12) 0%, rgba(46,186,166,0.08) 100%)",
    borderColor: "rgba(59,160,153,0.25)",
  },
  {
    id: 3,
    label: "Employee 2 Receives Coaching",
    side: "left" as const,
    color: "#1D5486",
    bgGradient:
      "linear-gradient(135deg, rgba(29,84,134,0.12) 0%, rgba(42,104,142,0.08) 100%)",
    borderColor: "rgba(29,84,134,0.25)",
  },
  {
    id: 4,
    label: "Successful Facilitated Conversation",
    side: "right" as const,
    color: "#1D9392",
    bgGradient:
      "linear-gradient(135deg, rgba(29,147,146,0.12) 0%, rgba(59,159,159,0.08) 100%)",
    borderColor: "rgba(29,147,146,0.25)",
  },
  {
    id: 5,
    label: "Employees Insight: All Parties Receive Coaching",
    side: "left" as const,
    color: "#2A688E",
    bgGradient:
      "linear-gradient(135deg, rgba(42,104,142,0.12) 0%, rgba(28,81,120,0.08) 100%)",
    borderColor: "rgba(42,104,142,0.25)",
  },
  {
    id: 6,
    label: "Insight Builds Confidence to Engage in Challenging Conversations",
    side: "right" as const,
    color: "#2EBAA6",
    bgGradient:
      "linear-gradient(135deg, rgba(46,186,166,0.12) 0%, rgba(28,110,96,0.08) 100%)",
    borderColor: "rgba(46,186,166,0.25)",
  },
];

// ─── SVG Helix Path Generation ───────────────────────────────────────────────

// Generates a smooth sinusoidal SVG path using high-resolution sampling
// and cubic bezier curve fitting.
//
// The sine wave runs vertically: y increases downward, x oscillates.
// phase=0 for blue strand, phase=PI for teal strand (180deg offset).
// This creates two interweaving strands that cross at half-period intervals.

function generateHelixPath(
  centerX: number,
  amplitude: number,
  yStart: number,
  yEnd: number,
  periods: number,
  phase: number
): string {
  // Sample the sine wave at many points for smooth cubic bezier fitting
  const totalHeight = yEnd - yStart;
  const sampleCount = periods * 24; // 24 samples per period for smoothness

  const points: { x: number; y: number }[] = [];
  for (let i = 0; i <= sampleCount; i++) {
    const t = i / sampleCount;
    const y = yStart + t * totalHeight;
    const angle = phase + t * periods * 2 * Math.PI;
    const x = centerX + amplitude * Math.sin(angle);
    points.push({ x, y });
  }

  // Build path using cubic bezier curves fitted through sampled points.
  // For each group of 3 consecutive points, we produce one cubic bezier segment
  // using Catmull-Rom-style tangent estimation for C1 continuity.
  let d = `M ${points[0].x.toFixed(2)} ${points[0].y.toFixed(2)}`;

  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[Math.max(i - 1, 0)];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[Math.min(i + 2, points.length - 1)];

    // Catmull-Rom tangent vectors (scaled by 1/6 for cubic bezier conversion)
    const tension = 6;
    const cp1x = p1.x + (p2.x - p0.x) / tension;
    const cp1y = p1.y + (p2.y - p0.y) / tension;
    const cp2x = p2.x - (p3.x - p1.x) / tension;
    const cp2y = p2.y - (p3.y - p1.y) / tension;

    d += ` C ${cp1x.toFixed(2)} ${cp1y.toFixed(2)}, ${cp2x.toFixed(2)} ${cp2y.toFixed(2)}, ${p2.x.toFixed(2)} ${p2.y.toFixed(2)}`;
  }

  return d;
}

// Generate a dashed return path that curves from the strand end back toward center
function generateReturnPath(
  centerX: number,
  amplitude: number,
  yEnd: number,
  loopHeight: number,
  phase: number,
  periods: number
): string {
  const endAngle = phase + periods * 2 * Math.PI;
  const endX = centerX + amplitude * Math.sin(endAngle);
  const curveDir = phase === 0 ? -1 : 1;
  const outwardX = endX + curveDir * amplitude * 0.5;

  const y1 = yEnd + loopHeight * 0.25;
  const y2 = yEnd + loopHeight * 0.4;
  const yFinal = yEnd + loopHeight * 0.12;

  return `M ${endX.toFixed(2)} ${yEnd} C ${endX.toFixed(2)} ${y1.toFixed(2)}, ${outwardX.toFixed(2)} ${y2.toFixed(2)}, ${centerX.toFixed(2)} ${yFinal.toFixed(2)}`;
}

// ─── Crossover Points ────────────────────────────────────────────────────────

// The two strands (sin and sin+PI) cross at every half-period.
// With 3 periods, there are 6 half-period crossovers — one per step.
function getCrossoverPoints(
  centerX: number,
  yStart: number,
  yEnd: number,
  count: number
): { x: number; y: number }[] {
  const totalHeight = yEnd - yStart;
  const points: { x: number; y: number }[] = [];

  for (let i = 0; i < count; i++) {
    // Evenly distributed along the vertical span, centered in each segment
    const t = (i + 0.5) / count;
    points.push({ x: centerX, y: yStart + t * totalHeight });
  }

  return points;
}

// ─── Depth Illusion: which strand is in front per segment ────────────────────

// Between crossover i and i+1, one strand is visually in front of the other.
// Blue (phase=0) has positive x when sin > 0, teal (phase=PI) is opposite.
// At segment 0 (top), blue starts with positive displacement (right side),
// so blue crosses over teal = blue is in front.
function getStrandFrontAtStep(stepIndex: number): "blue" | "teal" {
  return stepIndex % 2 === 0 ? "blue" : "teal";
}

// ─── Sub-Components ──────────────────────────────────────────────────────────

const StepCard = memo(function StepCard({
  step,
  isVisible,
  isMobile,
}: {
  step: (typeof STEPS)[number];
  isVisible: boolean;
  isMobile: boolean;
}) {
  const isLeft = step.side === "left";

  return (
    <motion.div
      className="absolute"
      style={{
        ...(isMobile
          ? { left: "50%", transform: "translateX(-50%)" }
          : isLeft
          ? { right: "55%" }
          : { left: "55%" }),
        willChange: isVisible ? "transform, opacity" : "auto",
      }}
    >
      <motion.div
        initial={false}
        animate={{
          opacity: isVisible ? 1 : 0,
          x: isVisible ? 0 : isMobile ? 0 : isLeft ? -30 : 30,
          y: isVisible ? 0 : 15,
        }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="rounded-full border flex flex-col items-center justify-center text-center"
        style={{
          background: `linear-gradient(135deg, ${step.color}18, ${step.color}10), linear-gradient(white, white)`,
          borderColor: step.borderColor,
          width: isMobile ? "clamp(120px, 34vw, 160px)" : "clamp(120px, 14vw, 160px)",
          height: isMobile ? "clamp(120px, 34vw, 160px)" : "clamp(120px, 14vw, 160px)",
          padding: "clamp(0.5rem, 1.5vw, 1rem)",
          position: "relative",
          zIndex: 10,
        }}
      >
        {/* Step number badge */}
        <div
          className="flex items-center justify-center rounded-full font-bold text-white mb-1.5 font-['Bricolage_Grotesque']"
          style={{
            background: `linear-gradient(135deg, ${step.color}, ${step.color}dd)`,
            width: "clamp(1.75rem, 3vw, 2.25rem)",
            height: "clamp(1.75rem, 3vw, 2.25rem)",
            fontSize: "clamp(0.75rem, 1.2vw, 1rem)",
          }}
        >
          {step.id}
        </div>

        {/* Step label */}
        <p
          className="font-medium text-[#0b1220] font-['Bricolage_Grotesque'] leading-tight"
          style={{ fontSize: "clamp(0.6rem, 1vw, 0.75rem)" }}
        >
          {step.label}
        </p>
      </motion.div>
    </motion.div>
  );
});

const TravelingDot = memo(function TravelingDot({
  color,
  pathId,
  isActive,
}: {
  color: string;
  pathId: string;
  isActive: boolean;
}) {
  if (!isActive) return null;

  return (
    <motion.circle
      r="5"
      fill={color}
      filter="url(#helixDotGlow)"
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 1, 0] }}
      transition={{
        duration: 3,
        repeat: Infinity,
        repeatDelay: 1,
        ease: "easeInOut",
      }}
    >
      <animateMotion dur="3s" repeatCount="indefinite" begin="0s">
        <mpath href={`#${pathId}`} />
      </animateMotion>
    </motion.circle>
  );
});

// ─── Main Component ──────────────────────────────────────────────────────────

export default function FlywheelHelix() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Responsive detection
  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 768);
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Scroll tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 30,
    restDelta: 0.001,
  });

  // Discrete progress value for conditional rendering
  const [progress, setProgress] = useState(0);
  useMotionValueEvent(smoothProgress, "change", (v) => {
    setProgress(v);
  });

  // Dynamic willChange management
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useMotionValueEvent(scrollYProgress, "change", () => {
    setIsScrolling(true);
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    scrollTimeoutRef.current = setTimeout(() => setIsScrolling(false), 150);
  });

  // ─── SVG Configuration ─────────────────────────────────────────────────

  const svgConfig = useMemo(() => {
    const svgWidth = 600;
    const svgHeight = 900;
    const centerX = svgWidth / 2;
    const amplitude = isMobile ? 80 : 140;
    const yStart = 60;
    const yEnd = 820;
    const periods = 3; // 3 full sine periods = 6 half-period crossovers

    const blueStrandPath = generateHelixPath(
      centerX, amplitude, yStart, yEnd, periods, 0
    );
    const tealStrandPath = generateHelixPath(
      centerX, amplitude, yStart, yEnd, periods, Math.PI
    );

    const blueReturnPath = generateReturnPath(
      centerX, amplitude, yEnd, 60, 0, periods
    );
    const tealReturnPath = generateReturnPath(
      centerX, amplitude, yEnd, 60, Math.PI, periods
    );

    const crossoverPoints = getCrossoverPoints(centerX, yStart, yEnd, 6);

    return {
      svgWidth,
      svgHeight,
      centerX,
      amplitude,
      yStart,
      yEnd,
      blueStrandPath,
      tealStrandPath,
      blueReturnPath,
      tealReturnPath,
      crossoverPoints,
    };
  }, [isMobile]);

  // ─── Scroll-Derived Animation Values ───────────────────────────────────

  // Strand drawing progress: strands progressively draw from top to bottom
  const strandDrawProgress = useTransform(smoothProgress, [0.05, 0.85], [0, 1]);

  // Card visibility thresholds — each card appears at a progressive scroll position
  const cardThresholds = useMemo(
    () => STEPS.map((_, i) => 0.08 + (i * 0.78) / 6),
    []
  );

  // Which step cards are currently visible
  const visibleCards = useMemo(() => {
    return STEPS.map((_, i) => progress >= cardThresholds[i]);
  }, [progress, cardThresholds]);

  // Cycle animation appears after all 6 steps are revealed
  const showCycleAnimation = progress >= 0.9;

  // Title fades in at the very start of scroll
  const titleOpacity = useTransform(smoothProgress, [0, 0.06], [0, 1]);

  // ─── Render ────────────────────────────────────────────────────────────

  return (
    <div ref={containerRef} className="relative h-[500vh]">
      <div
        className="sticky top-0 h-screen overflow-hidden flex flex-col items-center"
        style={{ willChange: isScrolling ? "transform" : "auto" }}
      >
        {/* Subtle radial background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 50% 40%, rgba(39,94,146,0.04) 0%, transparent 70%)",
          }}
        />

        {/* Section Title */}
        <motion.div
          className="relative z-30 text-center w-full"
          style={{
            opacity: titleOpacity,
            paddingTop: "clamp(1.5rem, 4vh, 3rem)",
            paddingBottom: "clamp(0.5rem, 1.5vh, 1rem)",
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

        {/* ─── Main Helix Visualization Area ─── */}
        <div className="relative flex-1 w-full max-w-5xl mx-auto">
          {/* SVG Layer — flat sibling, rendered first = painted behind */}
          <svg
            viewBox={`0 0 ${svgConfig.svgWidth} ${svgConfig.svgHeight}`}
            className="absolute inset-0 w-full h-full pointer-events-none"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              {/* Vertical gradient for blue strand */}
              <linearGradient id="helixBlueGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#275E92" />
                <stop offset="50%" stopColor="#1D5486" />
                <stop offset="100%" stopColor="#3496DE" />
              </linearGradient>

              {/* Vertical gradient for teal strand */}
              <linearGradient id="helixTealGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3BA099" />
                <stop offset="50%" stopColor="#1D9392" />
                <stop offset="100%" stopColor="#2EBAA6" />
              </linearGradient>

              {/* Glow filter for traveling dots */}
              <filter id="helixDotGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              {/* Clip paths: divide the helix area into 6 vertical segments
                  so we can render each strand at different opacities per segment,
                  creating the 3D crossover depth illusion. */}
              {Array.from({ length: 6 }).map((_, i) => {
                const segHeight = (svgConfig.yEnd - svgConfig.yStart) / 6;
                const segY = svgConfig.yStart + i * segHeight;
                return (
                  <clipPath key={`helixSeg-${i}`} id={`helixSegment-${i}`}>
                    <rect
                      x="0"
                      y={segY}
                      width={svgConfig.svgWidth}
                      height={segHeight}
                    />
                  </clipPath>
                );
              })}
            </defs>

            {/* ─── Depth-Illusion Strand Segments ─── */}
            {/* For each of 6 vertical segments, we clip both strands
                and render the "back" strand first (low opacity) then the
                "front" strand on top (full opacity + glow). This creates
                the illusion that one strand weaves in front of the other. */}
            {Array.from({ length: 6 }).map((_, segIdx) => {
              const frontStrand = getStrandFrontAtStep(segIdx);
              const blueOp = frontStrand === "blue" ? 1.0 : 0.35;
              const tealOp = frontStrand === "teal" ? 1.0 : 0.35;

              // Render back strand first, then front strand on top
              const backPath =
                frontStrand === "blue"
                  ? svgConfig.tealStrandPath
                  : svgConfig.blueStrandPath;
              const frontPath =
                frontStrand === "blue"
                  ? svgConfig.blueStrandPath
                  : svgConfig.tealStrandPath;
              const backGrad =
                frontStrand === "blue"
                  ? "url(#helixTealGrad)"
                  : "url(#helixBlueGrad)";
              const frontGrad =
                frontStrand === "blue"
                  ? "url(#helixBlueGrad)"
                  : "url(#helixTealGrad)";
              const backOp = frontStrand === "blue" ? tealOp : blueOp;
              const frontOp = frontStrand === "blue" ? blueOp : tealOp;

              return (
                <g
                  key={`helix-depth-${segIdx}`}
                  clipPath={`url(#helixSegment-${segIdx})`}
                >
                  {/* Back strand — reduced opacity, no glow */}
                  <motion.path
                    d={backPath}
                    fill="none"
                    stroke={backGrad}
                    strokeWidth={isMobile ? 3 : 4}
                    strokeLinecap="round"
                    style={{
                      pathLength: strandDrawProgress,
                      opacity: backOp,
                    }}
                  />
                  {/* Front strand — full opacity with subtle glow */}
                  <motion.path
                    d={frontPath}
                    fill="none"
                    stroke={frontGrad}
                    strokeWidth={isMobile ? 3 : 4}
                    strokeLinecap="round"
                    style={{
                      pathLength: strandDrawProgress,
                      opacity: frontOp,
                    }}
                  />
                </g>
              );
            })}

            {/* ─── Crossover Indicator Dots ─── */}
            {svgConfig.crossoverPoints.map((point, i) => (
              <motion.circle
                key={`helix-cross-${i}`}
                cx={point.x}
                cy={point.y}
                r={isMobile ? 4 : 5}
                fill={STEPS[i].color}
                initial={false}
                animate={{
                  opacity: visibleCards[i] ? 0.8 : 0,
                  scale: visibleCards[i] ? 1 : 0.5,
                }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
            ))}

            {/* ─── Return Loop Strands (cycle continues) ─── */}
            <motion.path
              d={svgConfig.blueReturnPath}
              fill="none"
              stroke="url(#helixBlueGrad)"
              strokeWidth={isMobile ? 2 : 3}
              strokeLinecap="round"
              strokeDasharray="6 4"
              initial={false}
              animate={{ opacity: showCycleAnimation ? 0.5 : 0 }}
              transition={{ duration: 0.8 }}
            />
            <motion.path
              d={svgConfig.tealReturnPath}
              fill="none"
              stroke="url(#helixTealGrad)"
              strokeWidth={isMobile ? 2 : 3}
              strokeLinecap="round"
              strokeDasharray="6 4"
              initial={false}
              animate={{ opacity: showCycleAnimation ? 0.5 : 0 }}
              transition={{ duration: 0.8 }}
            />

            {/* Hidden paths for traveling dot animateMotion references */}
            <path
              id="helixBlueAnimPath"
              d={svgConfig.blueStrandPath}
              fill="none"
              stroke="none"
            />
            <path
              id="helixTealAnimPath"
              d={svgConfig.tealStrandPath}
              fill="none"
              stroke="none"
            />

            {/* Traveling dots that move along the strands after cycle completes */}
            {showCycleAnimation && (
              <>
                <TravelingDot
                  color="#3496DE"
                  pathId="helixBlueAnimPath"
                  isActive={showCycleAnimation}
                />
                <TravelingDot
                  color="#2EBAA6"
                  pathId="helixTealAnimPath"
                  isActive={showCycleAnimation}
                />
              </>
            )}
          </svg>

          {/* ─── Step Cards — flat siblings after SVG, each with own z-index ─── */}
          {STEPS.map((step, i) => {
            const crossover = svgConfig.crossoverPoints[i];
            const topPercent = (crossover.y / svgConfig.svgHeight) * 100;

            return (
              <div
                key={step.id}
                className="absolute"
                style={{
                  top: `${topPercent}%`,
                  left: 0,
                  right: 0,
                  transform: "translateY(-50%)",
                  zIndex: 10,
                  pointerEvents: visibleCards[i] ? "auto" : "none",
                }}
              >
                <StepCard
                  step={step}
                  isVisible={visibleCards[i]}
                  isMobile={isMobile}
                />
              </div>
            );
          })}

        </div>

      </div>
    </div>
  );
}
