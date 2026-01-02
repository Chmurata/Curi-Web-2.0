import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'motion/react';
import {
  Users,
  MessageCircle,
  Target,
  Zap,
  TrendingUp,
  CheckCircle,
} from 'lucide-react';
import { assets } from './Imports';

// --- Configuration & Data ---
const TOTAL_STEPS = 6;
const CIRCLE_DIAMETER = 720; // 800 * 0.9
const RADIUS = 270; // 300 * 0.9
// Made cards square and slightly smaller to be perfect circles
const CARD_SIZE = 171; // 190 * 0.9

const STEPS = [
  { id: 1, title: "Discovery", subtitle: "User A Coaching", icon: Users, color: "from-blue-400 to-blue-600" },
  { id: 2, title: "Strategy", subtitle: "User B Coaching", icon: MessageCircle, color: "from-cyan-400 to-cyan-600" },
  { id: 3, title: "Feedback", subtitle: "Analysis Loop", icon: Target, color: "from-teal-400 to-teal-600" },
  { id: 4, title: "Planning", subtitle: "Action Plan", icon: Zap, color: "from-emerald-400 to-emerald-600" },
  { id: 5, title: "Execution", subtitle: "Implementation", icon: TrendingUp, color: "from-green-400 to-green-600" },
  { id: 6, title: "Review", subtitle: "Performance Metrics", icon: CheckCircle, color: "from-indigo-400 to-indigo-600" },
];

// --- Helper: Calculate Point on Circle ---
const getPointOnCircle = (angleInDegrees: number, radius: number) => {
  const angleInRadians = (angleInDegrees - 90) * (Math.PI / 180);
  return {
    x: radius * Math.cos(angleInRadians),
    y: radius * Math.sin(angleInRadians)
  };
};

// --- Helper: Describe SVG Arc (Clockwise) ---
const describeArc = (x: number, y: number, radius: number, startAngle: number, endAngle: number) => {
  const start = getPointOnCircle(startAngle, radius);
  const end = getPointOnCircle(endAngle, radius);

  // For clockwise drawing:
  // Sweep flag should be 1.
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

  return [
    "M", start.x + x, start.y + y,
    "A", radius, radius, 0, largeArcFlag, 1, end.x + x, end.y + y
  ].join(" ");
};

export function CoachingCycleLanding() {
  const [activeStep, setActiveStep] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  // Responsive scaling
  const [scale, setScale] = useState(1);

  // Handle Resize
  useEffect(() => {
    const handleResize = () => {
      const minDim = Math.min(window.innerWidth, window.innerHeight);
      const newScale = minDim < 900 ? (minDim / 900) * 0.85 : 1;
      setScale(newScale);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle Scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // Map 0-1 to steps
    // We want the steps to progress as we scroll down
    const rawStep = Math.floor(latest * TOTAL_STEPS) + 1;
    const step = Math.min(Math.max(rawStep, 1), TOTAL_STEPS);
    setActiveStep(step);
  });

  // Target rotation for the main wheel
  const targetRotation = -((Math.min(activeStep, TOTAL_STEPS) - 1) * 60);

  return (
    <div
      ref={containerRef}
      className="relative min-h-[400vh] bg-gradient-to-b from-white via-blue-50 to-white font-['Bricolage_Grotesque'] text-slate-800"
      style={{ position: 'relative' }}
    >

      {/* Sticky Viewport Container */}
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden pointer-events-none">

        {/* Title pinned to top of sticky container */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="absolute top-8 left-0 right-0 text-center text-4xl md:text-5xl font-bold text-[#0b1220] z-40 px-4"
        >
          The Curi Confidence Flywheel
        </motion.h2>

        {/* Scalable Wrapper */}
        <div
          style={{
            transform: `scale(${scale})`,
            width: CIRCLE_DIAMETER,
            height: CIRCLE_DIAMETER
          }}
          className="relative transition-transform duration-300 ease-out will-change-transform"
        >

          {/* --- Center Element (Logo) --- */}
          <div className="absolute inset-0 flex items-center justify-center z-30">
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="w-[200px] h-[200px] bg-white rounded-full shadow-[0_0_60px_rgba(59,130,246,0.15)] flex items-center justify-center relative z-20 border border-blue-50 overflow-hidden"
            >
              <div className="flex flex-col items-center justify-center text-center p-4 w-full h-full">
                <img src={assets.logo} alt="Curi Logo" className="w-24 h-24 object-contain" />
              </div>
            </motion.div>
          </div>

          {/* --- The Rotating Wheel --- */}
          <motion.div
            className="absolute inset-0"
            animate={{ rotate: targetRotation }}
            transition={{
              type: "spring",
              stiffness: 50,
              damping: 20,
              mass: 1
            }}
            style={{ transformOrigin: "center center" }}
          >

            {/* LAYER 1: ARROWS (Z-INDEX 0) */}
            <div className="absolute inset-0 z-0">
              <svg className="absolute inset-0 w-full h-full overflow-visible">
                <defs>
                  <linearGradient id="arrow-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#06b6d4" />
                  </linearGradient>
                </defs>

                {STEPS.map((step, index) => {
                  if (index === STEPS.length - 1) return null;

                  const angle = index * 60;
                  const nextStepId = step.id + 1;
                  const showArrow = activeStep >= nextStepId;

                  return (
                    <g key={`arrow-${step.id}`}>
                      {showArrow && (
                        <>
                          <motion.path
                            // Gap is 60deg. Card (171px at 270R) covers ~36deg (+/- 18).
                            // Start arc at 23, end at 37 to be inside gap.
                            d={describeArc(360, 360, RADIUS, angle + 23, angle + 37)}
                            fill="none"
                            stroke="url(#arrow-gradient)"
                            strokeWidth="4"
                            strokeLinecap="round"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 1 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            style={{ filter: 'drop-shadow(0px 4px 6px rgba(0,0,0,0.05))' }}
                          />

                          {/* Arrowhead */}
                          <motion.g
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.4, duration: 0.2 }}
                          >
                            {(() => {
                              // Arrow placed exactly at the end of the arc
                              // NO extra -90 here. getPointOnCircle handles the "from North" conversion.
                              const arrowPos = getPointOnCircle(angle + 37, RADIUS);

                              // Tangent Rotation:
                              // Visual angle is angle + 37 (from North).
                              // In SVG space (0=East), this is (angle + 37 - 90).
                              // Tangent vector is Visual + 90 = angle + 37.
                              // So rotating a Right-pointing arrow by (angle + 37) aligns it with tangent.
                              const arrowRot = angle + 37;

                              return (
                                <g transform={`translate(${arrowPos.x + 360}, ${arrowPos.y + 360}) rotate(${arrowRot})`}>
                                  {/* Sleeker Arrowhead Primitive (Right-pointing) */}
                                  <path
                                    d="M0,0 L-12,-6 L-10,0 L-12,6 Z"
                                    fill="#06b6d4"
                                  />
                                </g>
                              );
                            })()}
                          </motion.g>
                        </>
                      )}
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* LAYER 2: CIRCULAR CARDS (Z-INDEX 20) */}
            <div className="absolute inset-0 z-20">
              {STEPS.map((step, index) => {
                const angle = index * 60;
                const isActive = activeStep === step.id;
                const isRevealed = activeStep >= step.id;

                const pos = getPointOnCircle(angle - 90, RADIUS);

                return (
                  <motion.div
                    key={`card-${step.id}`}
                    className={`absolute rounded-full p-6 flex flex-col items-center justify-center text-center backface-hidden border border-blue-50
                      ${isRevealed ? 'bg-white' : 'bg-slate-50'}
                    `}
                    style={{
                      width: CARD_SIZE,
                      height: CARD_SIZE,
                      left: 360 - (CARD_SIZE / 2),
                      top: 360 - (CARD_SIZE / 2),
                      x: pos.x,
                      y: pos.y,
                      // Removed static 'rotate: angle' so it defaults to upright
                    }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    // COUNTER-ROTATION LOGIC FIXED
                    // rotate: -targetRotation cancels out the parent's targetRotation exactly.
                    // This keeps the card visually upright relative to the screen at all times.
                    animate={{
                      opacity: isRevealed ? 1 : 0,
                      scale: isActive ? 1.1 : 1,
                      rotate: -targetRotation,
                      // Glow effect applied to all cards, enhanced when active
                      boxShadow: isActive
                        ? "0 0 60px rgba(59,130,246,0.4)"
                        : "0 0 40px rgba(59,130,246,0.15)",
                      zIndex: isActive ? 50 : 20
                    }}
                    transition={{
                      duration: 0.5,
                      // Synchronization: By matching the stiffness/damping exactly to the parent
                      // wheel's spring, the counter-rotation cancels out perfectly.
                      rotate: { type: "spring", stiffness: 50, damping: 20, mass: 1 }
                    }}
                  >
                    {/* Inner content is static relative to the Card container */}
                    <div className="w-full h-full flex flex-col items-center justify-center">
                      <div className={`text-4xl font-black bg-gradient-to-br ${step.color} bg-clip-text text-transparent mb-1`}>
                        {step.id}
                      </div>
                      <h3 className="text-slate-800 font-bold text-sm leading-tight px-2">{step.title}</h3>
                      <p className="text-[10px] text-slate-500 font-medium mt-1 uppercase tracking-wide opacity-80">{step.subtitle}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

          </motion.div>
        </div>
      </div></div>
  );
}
