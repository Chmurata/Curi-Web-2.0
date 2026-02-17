import { useRef, useState, useEffect, useMemo, memo } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
} from "motion/react";
import { assets } from "./Imports";

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------

const STEPS = [
  {
    id: 1,
    label: "Employee 1 Receives Coaching",
    origin: "left" as const,
    color: "#275E92",
    scrollIn: 0.05,
    scrollOut: 0.22,
  },
  {
    id: 2,
    label: "Sends Invitation to Engage",
    origin: "bridge" as const,
    color: "#1D5486",
    scrollIn: 0.13,
    scrollOut: 0.3,
  },
  {
    id: 3,
    label: "Employee 2 Receives Coaching",
    origin: "right" as const,
    color: "#2EBAA6",
    scrollIn: 0.25,
    scrollOut: 0.42,
  },
  {
    id: 4,
    label: "Successful Facilitated Conversation",
    origin: "center" as const,
    color: "#3496DE",
    scrollIn: 0.4,
    scrollOut: 0.62,
  },
  {
    id: 5,
    label: "Employees Insight: All Parties Receive Coaching",
    origin: "wide" as const,
    color: "#1D9392",
    scrollIn: 0.6,
    scrollOut: 0.78,
  },
  {
    id: 6,
    label: "Insight Builds Confidence to Engage in Challenging Conversations",
    origin: "wide" as const,
    color: "#3BA099",
    scrollIn: 0.68,
    scrollOut: 0.88,
  },
] as const;

const RING_COUNT = 4;

const SPRING_CONFIG = { stiffness: 80, damping: 30, restDelta: 0.001 };

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

/** A single expanding concentric ring from an origin */
const RippleRing = memo(function RippleRing({
  cx,
  cy,
  radius,
  color,
  opacity,
  strokeWidth,
}: {
  cx: number;
  cy: number;
  radius: number;
  color: string;
  opacity: number;
  strokeWidth: number;
}) {
  return (
    <circle
      cx={cx}
      cy={cy}
      r={Math.max(0, radius)}
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      opacity={Math.max(0, opacity)}
    />
  );
});

/** Pulsing origin dot with label */
const OriginDot = memo(function OriginDot({
  x,
  y,
  color,
  visible,
  isMobile,
}: {
  x: string;
  y: string;
  color: string;
  visible: boolean;
  isMobile: boolean;
}) {
  return (
    <motion.div
      className="absolute flex flex-col items-center gap-2 pointer-events-none"
      style={{ left: x, top: y, transform: "translate(-50%, -50%)" }}
      animate={{
        opacity: visible ? 1 : 0,
        scale: visible ? 1 : 0.8,
      }}
      transition={{ duration: 0.5 }}
    >
      {/* Outer pulse ring */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: isMobile ? 48 : 64,
          height: isMobile ? 48 : 64,
          border: `2px solid ${color}`,
          opacity: 0.3,
        }}
        animate={{
          scale: [1, 1.6, 1],
          opacity: [0.3, 0, 0.3],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      {/* Dot */}
      <div
        className="rounded-full shadow-lg"
        style={{
          width: isMobile ? 14 : 18,
          height: isMobile ? 14 : 18,
          backgroundColor: color,
          boxShadow: `0 0 20px ${color}60`,
        }}
      />
    </motion.div>
  );
});

/** Glass-morphism step card */
const StepCard = memo(function StepCard({
  step,
  isActive,
  style,
}: {
  step: (typeof STEPS)[number];
  isActive: boolean;
  style?: React.CSSProperties;
}) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={style}
      animate={{
        opacity: isActive ? 1 : 0,
        scale: isActive ? 1 : 0.92,
        y: isActive ? 0 : 16,
      }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div
        className="flex items-start gap-3 md:gap-4 rounded-2xl px-4 py-3 md:px-5 md:py-4 backdrop-blur-md border border-white/20"
        style={{
          background: "rgba(255,255,255,0.75)",
          borderLeft: `4px solid ${step.color}`,
          boxShadow: isActive
            ? `0 8px 32px ${step.color}25, 0 2px 8px rgba(0,0,0,0.06)`
            : "0 2px 8px rgba(0,0,0,0.04)",
          maxWidth: "clamp(220px, 42vw, 340px)",
          willChange: isActive ? "transform, opacity" : "auto",
        }}
      >
        {/* Step Number */}
        <span
          className="flex-shrink-0 flex items-center justify-center rounded-xl font-bold font-['Bricolage_Grotesque'] text-white"
          style={{
            width: "clamp(32px, 5vw, 44px)",
            height: "clamp(32px, 5vw, 44px)",
            fontSize: "clamp(0.875rem, 2vw, 1.25rem)",
            background: `linear-gradient(135deg, ${step.color}, ${step.color}cc)`,
          }}
        >
          {step.id}
        </span>
        {/* Label */}
        <span
          className="font-medium text-[#0b1220] font-['Bricolage_Grotesque'] leading-snug"
          style={{ fontSize: "clamp(0.75rem, 1.8vw, 0.95rem)" }}
        >
          {step.label}
        </span>
      </div>
    </motion.div>
  );
});

/** The intersection glow — emotional peak */
const IntersectionGlow = memo(function IntersectionGlow({
  intensity,
  cx,
  cy,
  isMobile,
}: {
  intensity: number;
  cx: string;
  cy: string;
  isMobile: boolean;
}) {
  const size = isMobile ? 180 : 300;
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        left: cx,
        top: cy,
        width: size,
        height: size,
        transform: "translate(-50%, -50%)",
        background:
          "radial-gradient(circle, rgba(52,150,222,0.35) 0%, rgba(46,186,166,0.3) 40%, rgba(59,160,153,0.12) 70%, transparent 100%)",
        mixBlendMode: "screen",
        filter: "blur(30px)",
        willChange: intensity > 0 ? "opacity, transform" : "auto",
      }}
      animate={{
        opacity: intensity,
        scale: 0.8 + intensity * 0.5,
      }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    />
  );
});


// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------

export default function FlywheelRipple() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Responsive detection
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Scroll tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, SPRING_CONFIG);

  // Track progress in state for conditional rendering
  const [progress, setProgress] = useState(0);
  useMotionValueEvent(smoothProgress, "change", (v) => setProgress(v));

  // ---- Origin positions (responsive) ----
  const origins = useMemo(() => {
    if (isMobile) {
      return {
        left: { x: "35%", y: "22%", nx: 0.35, ny: 0.22 },
        right: { x: "65%", y: "40%", nx: 0.65, ny: 0.4 },
        center: { x: "50%", y: "31%", nx: 0.5, ny: 0.31 },
      };
    }
    return {
      left: { x: "28%", y: "32%", nx: 0.28, ny: 0.32 },
      right: { x: "72%", y: "32%", nx: 0.72, ny: 0.32 },
      center: { x: "50%", y: "32%", nx: 0.5, ny: 0.32 },
    };
  }, [isMobile]);

  // ---- Ripple ring data (computed per-frame via progress) ----
  const ringData = useMemo(() => {
    const maxRadius = isMobile ? 200 : 380;
    const leftRings: Array<{
      cx: number;
      cy: number;
      r: number;
      opacity: number;
    }> = [];
    const rightRings: Array<{
      cx: number;
      cy: number;
      r: number;
      opacity: number;
    }> = [];

    for (let i = 0; i < RING_COUNT; i++) {
      const stagger = i * 0.06;
      // Left origin rings (blue) — expand from 0.02 to 0.7
      const leftStart = 0.02 + stagger;
      const leftEnd = 0.7 + stagger * 0.5;
      const leftT = Math.max(0, Math.min(1, (progress - leftStart) / (leftEnd - leftStart)));
      const leftR = leftT * maxRadius;
      const leftOp = leftT > 0 ? Math.max(0, 0.5 - leftT * 0.55) : 0;
      leftRings.push({
        cx: origins.left.nx,
        cy: origins.left.ny,
        r: leftR,
        opacity: leftOp,
      });

      // Right origin rings (teal) — expand from 0.2 to 0.8
      const rightStart = 0.2 + stagger;
      const rightEnd = 0.8 + stagger * 0.5;
      const rightT = Math.max(0, Math.min(1, (progress - rightStart) / (rightEnd - rightStart)));
      const rightR = rightT * maxRadius;
      const rightOp = rightT > 0 ? Math.max(0, 0.5 - rightT * 0.55) : 0;
      rightRings.push({
        cx: origins.right.nx,
        cy: origins.right.ny,
        r: rightR,
        opacity: rightOp,
      });
    }

    // Restart pulse rings (after step 6, progress > 0.88)
    const restartT = Math.max(0, (progress - 0.88) / 0.1);
    const restartRings: Array<{
      cx: number;
      cy: number;
      r: number;
      opacity: number;
      color: string;
    }> = [];
    if (restartT > 0) {
      restartRings.push({
        cx: origins.left.nx,
        cy: origins.left.ny,
        r: restartT * maxRadius * 0.4,
        opacity: Math.max(0, 0.5 * (1 - restartT)),
        color: "#275E92",
      });
      restartRings.push({
        cx: origins.right.nx,
        cy: origins.right.ny,
        r: restartT * maxRadius * 0.4,
        opacity: Math.max(0, 0.5 * (1 - restartT)),
        color: "#2EBAA6",
      });
    }

    return { leftRings, rightRings, restartRings };
  }, [progress, isMobile, origins]);

  // ---- Step card positions (responsive) ----
  const cardPositions = useMemo(() => {
    if (isMobile) {
      return [
        { left: "5%", top: "35%" },    // Step 1 - near Employee 1
        { left: "30%", top: "30%" },    // Step 2 - bridge (center-ish)
        { left: "48%", top: "52%" },    // Step 3 - near Employee 2
        { left: "12%", top: "48%" },    // Step 4 - center overlap
        { left: "5%", top: "64%" },     // Step 5 - full width below
        { left: "5%", top: "78%" },     // Step 6 - full width below
      ];
    }
    return [
      { left: "6%", top: "48%" },      // Step 1 - near Employee 1
      { left: "32%", top: "42%" },      // Step 2 - bridging toward right
      { left: "58%", top: "48%" },      // Step 3 - near Employee 2
      { left: "30%", top: "56%" },      // Step 4 - center overlap
      { left: "8%", top: "68%" },       // Step 5 - full width below
      { left: "52%", top: "68%" },      // Step 6 - full width below
    ];
  }, [isMobile]);

  // ---- Active step tracking ----
  const activeSteps = useMemo(() => {
    return STEPS.map(
      (step) => progress >= step.scrollIn && progress <= step.scrollOut
    );
  }, [progress]);

  // ---- Intersection glow intensity ----
  const glowIntensity = useMemo(() => {
    // Glow intensifies between 0.35 and 0.65 (when ripples overlap)
    if (progress < 0.3) return 0;
    if (progress > 0.7) return Math.max(0, 1 - (progress - 0.7) / 0.15);
    if (progress < 0.4) return (progress - 0.3) / 0.1;
    return 1;
  }, [progress]);

  // ---- Title fade ----
  const titleOpacity = useTransform(smoothProgress, [0, 0.06], [1, 0]);
  const titleY = useTransform(smoothProgress, [0, 0.06], [0, -30]);

  // ---- Is scrolling (for willChange) ----
  const [isScrolling, setIsScrolling] = useState(false);
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const handleScroll = () => {
      setIsScrolling(true);
      clearTimeout(timeout);
      timeout = setTimeout(() => setIsScrolling(false), 150);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative h-[500vh]">
      <div
        className="sticky top-0 h-screen overflow-hidden"
        style={{
          background:
            "linear-gradient(180deg, #fafcff 0%, #f4f9ff 40%, #f0faf9 100%)",
        }}
      >
        {/* ---- Title ---- */}
        <motion.div
          className="absolute top-0 left-0 right-0 z-20 flex flex-col items-center pt-8 md:pt-14 px-4"
          style={{
            opacity: titleOpacity,
            y: titleY,
            willChange: isScrolling ? "transform, opacity" : "auto",
          }}
        >
          <img
            src={assets.logo}
            alt="Curi"
            className="h-7 md:h-9 mb-4 md:mb-6 opacity-60"
          />
          <h2
            className="font-bold text-[#0b1220] font-['Bricolage_Grotesque'] leading-tight text-center max-w-3xl"
            style={{ fontSize: "clamp(2.25rem, 5vw, 3.75rem)" }}
          >
            The Employee Interaction{" "}
            <span className="bg-gradient-to-r from-[#275E92] to-[#2EBAA6] bg-clip-text text-transparent">
              Confidence Flywheel
            </span>
          </h2>
        </motion.div>

        {/* ---- SVG Ripple Rings ---- */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ willChange: isScrolling ? "transform" : "auto" }}
          preserveAspectRatio="none"
          viewBox="0 0 1 1"
        >
          {/* Left origin rings (blue) */}
          {ringData.leftRings.map((ring, i) => (
            <RippleRing
              key={`l-${i}`}
              cx={ring.cx}
              cy={ring.cy}
              radius={ring.r / 1000}
              color="#275E92"
              opacity={ring.opacity}
              strokeWidth={0.0015}
            />
          ))}
          {/* Right origin rings (teal) */}
          {ringData.rightRings.map((ring, i) => (
            <RippleRing
              key={`r-${i}`}
              cx={ring.cx}
              cy={ring.cy}
              radius={ring.r / 1000}
              color="#2EBAA6"
              opacity={ring.opacity}
              strokeWidth={0.0015}
            />
          ))}
          {/* Restart pulse rings */}
          {ringData.restartRings.map((ring, i) => (
            <RippleRing
              key={`restart-${i}`}
              cx={ring.cx}
              cy={ring.cy}
              radius={ring.r / 1000}
              color={ring.color}
              opacity={ring.opacity}
              strokeWidth={0.002}
            />
          ))}
        </svg>

        {/* ---- Intersection Glow ---- */}
        <IntersectionGlow
          intensity={glowIntensity}
          cx={origins.center.x}
          cy={origins.center.y}
          isMobile={isMobile}
        />

        {/* ---- Origin Dots ---- */}
        <OriginDot
          x={origins.left.x}
          y={origins.left.y}
          color="#275E92"
          visible={progress > 0.01 && progress < 0.92}
          isMobile={isMobile}
        />
        <OriginDot
          x={origins.right.x}
          y={origins.right.y}
          color="#2EBAA6"
          visible={progress > 0.18 && progress < 0.92}
          isMobile={isMobile}
        />

        {/* ---- Step Cards ---- */}
        {STEPS.map((step, i) => (
          <StepCard
            key={step.id}
            step={step}
            isActive={activeSteps[i]}
            style={{
              left: cardPositions[i].left,
              top: cardPositions[i].top,
              zIndex: 10 + i,
            }}
          />
        ))}

        {/* ---- Step 4 Extra Glow (Emotional Peak) ---- */}
        {activeSteps[3] && (
          <motion.div
            className="absolute rounded-full pointer-events-none"
            style={{
              left: isMobile ? "12%" : "30%",
              top: isMobile ? "48%" : "56%",
              width: isMobile ? 200 : 360,
              height: isMobile ? 100 : 120,
              transform: "translate(0, -50%)",
              background:
                "radial-gradient(ellipse, rgba(52,150,222,0.1) 0%, rgba(46,186,166,0.08) 50%, transparent 100%)",
              filter: "blur(20px)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          />
        )}


        {/* ---- Scroll Progress Indicator ---- */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
          {STEPS.map((step, i) => (
            <div
              key={step.id}
              className="rounded-full transition-all duration-300"
              style={{
                width: activeSteps[i] ? 24 : 8,
                height: 8,
                backgroundColor: activeSteps[i] ? step.color : "#d1d5db",
                opacity: activeSteps[i] ? 1 : 0.4,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
