import { useRef, useState, useEffect, useMemo, memo, useCallback } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
} from "motion/react";

/* ─────────────────────────── DATA ─────────────────────────── */

const STEPS = [
  {
    id: 1,
    label: "Employee 1 Receives Coaching",
    color: "#275E92",
    gradient: "from-[#275E92] to-[#3496DE]",
  },
  {
    id: 2,
    label: "Sends Invitation to Engage",
    color: "#3BA099",
    gradient: "from-[#3BA099] to-[#2EBAA6]",
  },
  {
    id: 3,
    label: "Employee 2 Receives Coaching",
    color: "#1D5486",
    gradient: "from-[#1D5486] to-[#2A688E]",
  },
  {
    id: 4,
    label: "Successful Facilitated Conversation",
    color: "#1D9392",
    gradient: "from-[#1D9392] to-[#3B9F9F]",
  },
  {
    id: 5,
    label: "Employees Insight: All Parties Receive Coaching",
    color: "#1C5178",
    gradient: "from-[#1C5178] to-[#3496DE]",
  },
  {
    id: 6,
    label: "Insight Builds Confidence to Engage in Challenging Conversations",
    color: "#1C6E60",
    gradient: "from-[#1C6E60] to-[#2EBAA6]",
  },
] as const;

/* ─────────── DESKTOP ALIGNMENT PER CARD ─────────────────────── */

const ALIGN_RIGHT = [false, true, false, true, false, true];

/* ──────────────── SVG PATH GENERATION ──────────────────────── */

/**
 * Build the main flowing stream path for desktop.
 * Uses a viewBox of 1200 x 1000 (extra width for the return arc swing).
 *
 * Card centers in viewBox coords:
 *   Left-aligned cards: center at x ~= 175  (≈27% of 52% card width at left)
 *   Right-aligned cards: center at x ~= 825  (mirrored)
 *   Y positions evenly distributed: 80, 240, 400, 560, 720, 880
 */
const DESKTOP_VB_WIDTH = 1200;
const DESKTOP_VB_HEIGHT = 1000;

const DESKTOP_CARD_CENTERS = [
  { x: 175, y: 80 },
  { x: 825, y: 240 },
  { x: 175, y: 400 },
  { x: 825, y: 560 },
  { x: 175, y: 720 },
  { x: 825, y: 880 },
];

function buildDesktopStreamPath(): string {
  const pts = DESKTOP_CARD_CENTERS;
  let d = `M ${pts[0].x} ${pts[0].y}`;

  for (let i = 0; i < pts.length - 1; i++) {
    const curr = pts[i];
    const next = pts[i + 1];
    const midY = (curr.y + next.y) / 2;
    // S-curve: control points at (currX, midY) and (nextX, midY)
    d += ` C ${curr.x} ${midY}, ${next.x} ${midY}, ${next.x} ${next.y}`;
  }

  return d;
}

function buildDesktopReturnArc(): string {
  const last = DESKTOP_CARD_CENTERS[5];
  const first = DESKTOP_CARD_CENTERS[0];
  // Swing to the right outside the main card area
  const swingX = 1100;
  return (
    `M ${last.x} ${last.y}` +
    ` C ${swingX} ${last.y - 150}, ${swingX} ${first.y + 150}, ${first.x} ${first.y}`
  );
}

/* ──── Mobile: vertical line along the left edge ──── */

const MOBILE_VB_WIDTH = 120;
const MOBILE_VB_HEIGHT = 1000;

function buildMobileStreamPath(): string {
  return `M 30 40 L 30 960`;
}

function buildMobileReturnArc(): string {
  // Curve swings to the left edge, staying within the extended viewBox
  return `M 30 960 C -30 780, -30 220, 30 40`;
}

/* ─────────────── STEP CARD ──────────────────────────────────── */

const StepCard = memo(function StepCard({
  step,
  alignRight,
}: {
  step: (typeof STEPS)[number];
  alignRight: boolean;
}) {
  const fromDirection = alignRight ? 80 : -80;

  return (
    <motion.div
      initial={{ opacity: 0, x: fromDirection, scale: 0.92 }}
      whileInView={{ opacity: 1, x: 0, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        type: "spring",
        stiffness: 90,
        damping: 18,
        mass: 0.8,
      }}
      className={`
        relative w-[88%] md:w-[52%]
        ${alignRight ? "ml-auto" : "mr-auto"}
      `}
    >
      <div
        className={`
          relative overflow-hidden rounded-2xl bg-white
          shadow-[0_4px_24px_rgba(0,0,0,0.06)]
          border border-gray-100/80
          flex items-start gap-4
        `}
        style={{ padding: "clamp(1.1rem, 2.5vw, 1.5rem)" }}
      >
        {/* Gradient accent bar */}
        <div
          className={`
            absolute top-0 bottom-0 w-1 md:w-1.5
            bg-gradient-to-b ${step.gradient}
            ${alignRight ? "right-0 rounded-r-2xl" : "left-0 rounded-l-2xl"}
          `}
        />

        {/* Step number */}
        <span
          className="shrink-0 font-bold font-['Bricolage_Grotesque'] leading-none select-none"
          style={{
            fontSize: "clamp(2rem, 4vw, 3rem)",
            color: step.color,
            opacity: 0.18,
          }}
        >
          {step.id}
        </span>

        {/* Label */}
        <p
          className="font-semibold text-[#0b1220] font-['Bricolage_Grotesque'] leading-snug pt-1"
          style={{ fontSize: "clamp(0.95rem, 2vw, 1.15rem)" }}
        >
          {step.label}
        </p>
      </div>
    </motion.div>
  );
});

/* ─────────────── FLOWING STREAM SVG ────────────────────────── */

const FlowingStream = memo(function FlowingStream({
  isMobile,
  scrollProgress,
  onReturnComplete,
  mainPathRef,
  returnPathRef,
}: {
  isMobile: boolean;
  scrollProgress: ReturnType<typeof useSpring>;
  onReturnComplete: () => void;
  mainPathRef: React.RefObject<SVGPathElement | null>;
  returnPathRef: React.RefObject<SVGPathElement | null>;
}) {
  const returnCompletedRef = useRef(false);

  // Main stream draws from 0 → 1 as user scrolls through the section
  const mainPathLength = useTransform(scrollProgress, [0.05, 0.7], [0, 1]);
  const mainOpacity = useTransform(scrollProgress, [0.03, 0.08], [0, 1]);

  // Return arc draws after the main stream is done
  const returnPathLength = useTransform(scrollProgress, [0.72, 0.92], [0, 1]);
  const returnOpacity = useTransform(scrollProgress, [0.70, 0.75], [0, 1]);

  // Trigger orbit + "cycle continues" once return arc is fully drawn
  useMotionValueEvent(scrollProgress, "change", (v) => {
    if (v >= 0.9 && !returnCompletedRef.current) {
      returnCompletedRef.current = true;
      onReturnComplete();
    }
  });

  const mainPath = useMemo(
    () => (isMobile ? buildMobileStreamPath() : buildDesktopStreamPath()),
    [isMobile]
  );
  const returnArc = useMemo(
    () => (isMobile ? buildMobileReturnArc() : buildDesktopReturnArc()),
    [isMobile]
  );

  const vbWidth = isMobile ? MOBILE_VB_WIDTH : DESKTOP_VB_WIDTH;
  const vbHeight = isMobile ? MOBILE_VB_HEIGHT : DESKTOP_VB_HEIGHT;

  return (
    <svg
      viewBox={`0 0 ${vbWidth} ${vbHeight}`}
      fill="none"
      preserveAspectRatio="none"
      overflow="visible"
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    >
      <defs>
        {/* Main stream gradient — vertical blue-to-teal */}
        <linearGradient id="cascadeStreamGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#275E92" />
          <stop offset="50%" stopColor="#3496DE" />
          <stop offset="100%" stopColor="#2EBAA6" />
        </linearGradient>

        {/* Soft glow filter for premium feel */}
        <filter
          id="cascadeStreamGlow"
          x="-20%"
          y="-10%"
          width="140%"
          height="120%"
        >
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Return arc gradient — teal back to blue */}
        <linearGradient id="cascadeReturnGrad" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#1C6E60" />
          <stop offset="50%" stopColor="#3BA099" />
          <stop offset="100%" stopColor="#275E92" />
        </linearGradient>
      </defs>

      {/* Glow layer — wider, blurred stroke behind the main stream */}
      <motion.path
        d={mainPath}
        stroke="url(#cascadeStreamGrad)"
        strokeWidth={isMobile ? 8 : 6}
        strokeLinecap="round"
        fill="none"
        filter="url(#cascadeStreamGlow)"
        style={{
          pathLength: mainPathLength,
          opacity: mainOpacity,
        }}
      />

      {/* Main stream — crisp stroke */}
      <motion.path
        ref={mainPathRef}
        d={mainPath}
        stroke="url(#cascadeStreamGrad)"
        strokeWidth={isMobile ? 4 : 3}
        strokeLinecap="round"
        fill="none"
        style={{
          pathLength: mainPathLength,
          opacity: mainOpacity,
        }}
      />

      {/* Return arc — dashed, with glow */}
      <motion.path
        ref={returnPathRef}
        d={returnArc}
        stroke="url(#cascadeReturnGrad)"
        strokeWidth={isMobile ? 3 : 2.5}
        strokeLinecap="round"
        strokeDasharray="14 10"
        fill="none"
        filter="url(#cascadeStreamGlow)"
        style={{
          pathLength: returnPathLength,
          opacity: returnOpacity,
        }}
      />
    </svg>
  );
});

/* ──────── ORBITING DOT (SCALED TO CONTAINER) ──────────────── */

/**
 * The SVG path coordinates live in viewBox space.
 * getPointAtLength returns values in that coordinate system.
 * We scale them to the actual rendered container dimensions.
 */
const OrbitingDot = memo(function OrbitingDot({
  mainPathRef,
  returnPathRef,
  containerRef,
  isActive,
  isMobile,
}: {
  mainPathRef: React.RefObject<SVGPathElement | null>;
  returnPathRef: React.RefObject<SVGPathElement | null>;
  containerRef: React.RefObject<HTMLDivElement | null>;
  isActive: boolean;
  isMobile: boolean;
}) {
  const dotRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const progressRef = useRef(0);
  const lastTimeRef = useRef(0);

  const LOOP_DURATION = 7000; // ms for full orbit
  const vbW = isMobile ? MOBILE_VB_WIDTH : DESKTOP_VB_WIDTH;
  const vbH = isMobile ? MOBILE_VB_HEIGHT : DESKTOP_VB_HEIGHT;

  const tick = useCallback(
    (timestamp: number) => {
      const mainPath = mainPathRef.current;
      const returnPath = returnPathRef.current;
      const dot = dotRef.current;
      const container = containerRef.current;

      if (!mainPath || !returnPath || !dot || !container) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      // Delta time for frame-rate-independent animation
      if (lastTimeRef.current === 0) lastTimeRef.current = timestamp;
      const dt = timestamp - lastTimeRef.current;
      lastTimeRef.current = timestamp;

      const mainLen = mainPath.getTotalLength();
      const returnLen = returnPath.getTotalLength();
      const totalLen = mainLen + returnLen;

      // Advance progress
      const speed = totalLen / LOOP_DURATION; // units per ms
      progressRef.current = (progressRef.current + speed * dt) % totalLen;

      // Get point on the correct sub-path
      let point: DOMPoint;
      if (progressRef.current <= mainLen) {
        point = mainPath.getPointAtLength(progressRef.current);
      } else {
        point = returnPath.getPointAtLength(progressRef.current - mainLen);
      }

      // Map viewBox coords → actual container pixel coords
      const rect = container.getBoundingClientRect();
      const px = (point.x / vbW) * rect.width;
      const py = (point.y / vbH) * rect.height;

      dot.style.transform = `translate3d(${px}px, ${py}px, 0) translate(-50%, -50%)`;

      rafRef.current = requestAnimationFrame(tick);
    },
    [mainPathRef, returnPathRef, containerRef, vbW, vbH]
  );

  useEffect(() => {
    if (isActive) {
      lastTimeRef.current = 0;
      rafRef.current = requestAnimationFrame(tick);
    }
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isActive, tick]);

  if (!isActive) return null;

  return (
    <div
      ref={dotRef}
      className="absolute top-0 left-0 pointer-events-none"
      style={{
        width: "clamp(10px, 1.4vw, 16px)",
        height: "clamp(10px, 1.4vw, 16px)",
        borderRadius: "50%",
        background: "linear-gradient(135deg, #3496DE, #2EBAA6)",
        boxShadow:
          "0 0 10px 3px rgba(52, 150, 222, 0.45), 0 0 22px 8px rgba(46, 186, 166, 0.2)",
        willChange: "transform",
        zIndex: 10,
      }}
    />
  );
});

/* ─────────────── MAIN COMPONENT ────────────────────────────── */

export default function FlywheelCascade() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mainPathRef = useRef<SVGPathElement>(null);
  const returnPathRef = useRef<SVGPathElement>(null);

  const [isMobile, setIsMobile] = useState(false);
  const [orbitActive, setOrbitActive] = useState(false);

  // Responsive breakpoint detection
  useEffect(() => {
    const mql = window.matchMedia("(max-width: 767px)");
    const onChange = () => setIsMobile(mql.matches);
    onChange();
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  // Scroll-driven progress for the stream path
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 28,
    restDelta: 0.001,
  });

  const handleReturnComplete = useCallback(() => {
    setOrbitActive(true);
  }, []);

  return (
    <section
      className="relative w-full"
      style={{
        paddingTop: "clamp(3rem, 6vw, 5rem)",
        paddingBottom: "clamp(3rem, 6vw, 5rem)",
        background:
          "linear-gradient(180deg, #fafbfd 0%, #ffffff 40%, #f8fafb 100%)",
      }}
    >
      {/* ── Title ── */}
      <div className="text-center px-4 mb-12 md:mb-16">
        <h2
          className="font-bold text-[#0b1220] font-['Bricolage_Grotesque'] leading-tight"
          style={{ fontSize: "clamp(2.25rem, 5vw, 3.75rem)" }}
        >
          The Employee Interaction
          <br />
          <span
            style={{
              background: "linear-gradient(90deg, #275E92, #2EBAA6)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Confidence Flywheel
          </span>
        </h2>
      </div>

      {/* ── Cards + Stream Container ── */}
      <div
        ref={containerRef}
        className="relative max-w-4xl mx-auto"
        style={{
          paddingLeft: "clamp(1rem, 3vw, 2rem)",
          paddingRight: "clamp(1rem, 3vw, 2rem)",
        }}
      >
        {/* SVG stream — positioned behind cards via absolute + z-index */}
        <FlowingStream
          isMobile={isMobile}
          scrollProgress={smoothProgress}
          onReturnComplete={handleReturnComplete}
          mainPathRef={mainPathRef}
          returnPathRef={returnPathRef}
        />

        {/* Orbiting dot — reads SVG path coords and maps to container pixels */}
        <OrbitingDot
          mainPathRef={mainPathRef}
          returnPathRef={returnPathRef}
          containerRef={containerRef}
          isActive={orbitActive}
          isMobile={isMobile}
        />

        {/* Step cards — staircase layout */}
        <div
          className="relative flex flex-col"
          style={{
            gap: isMobile
              ? "clamp(1.25rem, 3.5vw, 1.75rem)"
              : "clamp(1.75rem, 2.5vw, 2.25rem)",
            zIndex: 2,
          }}
        >
          {STEPS.map((step, i) => (
            <StepCard
              key={step.id}
              step={step}
              alignRight={isMobile ? false : ALIGN_RIGHT[i]}
            />
          ))}
        </div>
      </div>

    </section>
  );
}
