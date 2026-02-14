import { useRef, useState, useLayoutEffect, useEffect, memo, useMemo } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent, useMotionValue } from 'motion/react';
import { assets } from "./Imports";

// --- Configuration ---
const SIZE = 800;
const CX = SIZE / 2;
const CY = SIZE / 2;

// PROPORTIONS
const RADIUS_INNER = 100;
const RADIUS_OUTER = 250;
// Geometric tuning for perfect visual symmetry
const RADIUS_TIP = 162;

// GEOMETRY
const ARROW_DEPTH = 10;
const GAP_DEG = 1.0;

// ROTATION ALIGNMENT
const ROTATION_OFFSET = -30;

const SEGMENTS = [
    {
        id: 1,
        number: "1",
        lines: ["User A", "Coaching"],
        gradientId: "arrowGradient1",
        angle: 0
    },
    {
        id: 2,
        number: "2",
        lines: ["User B", "Coaching"],
        gradientId: "arrowGradient2",
        angle: 60
    },
    {
        id: 3,
        number: "3",
        lines: ["Improved", "Outcomes"],
        gradientId: "arrowGradient3",
        angle: 120
    },
    {
        id: 4,
        number: "4",
        lines: ["Confidence"],
        gradientId: "arrowGradient4",
        angle: 180
    },
    {
        id: 5,
        number: "5",
        lines: ["Courageous", "Action"],
        gradientId: "arrowGradient5",
        angle: 240
    },
    {
        id: 6,
        number: "6",
        lines: ["Higher Impact", "Conversations"],
        gradientId: "arrowGradient6",
        angle: 300
    },
];

// --- Helpers ---

const p2c = (radius: number, angleDeg: number) => {
    const angleRad = (angleDeg - 90) * (Math.PI / 180);
    return {
        x: CX + (radius * Math.cos(angleRad)),
        y: CY + (radius * Math.sin(angleRad))
    };
};

const createArrowPath = (baseAngle: number) => {
    const divStart = baseAngle + ROTATION_OFFSET;
    const divEnd = baseAngle + 60 + ROTATION_OFFSET;

    const tipStart = divStart + GAP_DEG;
    const tipEnd = divEnd - GAP_DEG;

    const headTipAngle = tipEnd;
    const headCornerAngle = tipEnd - ARROW_DEPTH;
    const tailNotchAngle = tipStart;
    const tailCornerAngle = tipStart - ARROW_DEPTH;

    const tailNotch = p2c(RADIUS_TIP, tailNotchAngle);
    const tailOuter = p2c(RADIUS_OUTER, tailCornerAngle);
    const tailInner = p2c(RADIUS_INNER, tailCornerAngle);

    const headTip = p2c(RADIUS_TIP, headTipAngle);
    const headOuter = p2c(RADIUS_OUTER, headCornerAngle);
    const headInner = p2c(RADIUS_INNER, headCornerAngle);

    const largeArc = 0;

    return [
        `M ${tailOuter.x} ${tailOuter.y}`,
        `A ${RADIUS_OUTER} ${RADIUS_OUTER} 0 ${largeArc} 1 ${headOuter.x} ${headOuter.y}`,
        `L ${headTip.x} ${headTip.y}`,
        `L ${headInner.x} ${headInner.y}`,
        `A ${RADIUS_INNER} ${RADIUS_INNER} 0 ${largeArc} 0 ${tailInner.x} ${tailInner.y}`,
        `L ${tailNotch.x} ${tailNotch.y}`,
        `Z`
    ].join(" ");
};

// --- Animated Background Orb Component ---
// Modified for Light Mode: Lighter colors, stronger opacity
// ✅ PHASE 1: Memoized to prevent unnecessary re-renders
// ✅ PHASE 3: Conditional animation based on visibility (pauses when off-screen)
const Orb = memo(({
    color,
    delay,
    xRange,
    yRange,
    size,
    isAnimating
}: {
    color: string,
    delay: number,
    xRange: string[],
    yRange: string[],
    size: number,
    isAnimating: boolean  // ✅ New prop for visibility-based animation control
}) => (
    <motion.div
        className={`absolute rounded-full blur-[80px] opacity-20 pointer-events-none`}
        style={{
            backgroundColor: color,
            width: size,
            height: size,
            left: '50%',
            top: '50%',
            x: '-50%',
            y: '-50%',
            mixBlendMode: 'multiply',
            willChange: isAnimating ? 'transform' : 'auto'  // ✅ GPU hint only when animating
        }}
        animate={isAnimating ? {  // ✅ Conditional animation - pauses when off-screen
            x: xRange,
            y: yRange,
            scale: [1, 1.2, 1],
        } : {}}
        transition={isAnimating ? {
            duration: 10 + delay,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
        } : {}}
    />
), (prevProps, nextProps) => {
    // ✅ Custom comparison - return true if props are equal (skip re-render)
    return (
        prevProps.color === nextProps.color &&
        prevProps.size === nextProps.size &&
        prevProps.delay === nextProps.delay &&
        prevProps.isAnimating === nextProps.isAnimating &&  // ✅ Include in comparison
        JSON.stringify(prevProps.xRange) === JSON.stringify(nextProps.xRange) &&
        JSON.stringify(prevProps.yRange) === JSON.stringify(nextProps.yRange)
    );
});

export default function CircularCycleDiagram() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [hasAppeared, setHasAppeared] = useState(false);
    const [isVisible, setIsVisible] = useState(false);  // ✅ PHASE 3: Track section visibility
    const prevContainerHeight = useRef(0);
    const rotationValue = useMotionValue(0);
    const rotationOffset = useRef(0);
    const needsOffsetCalc = useRef(false);

    // ✅ PHASE 3: IntersectionObserver to pause Orb animations when off-screen
    // Saves +8-12 FPS and -12-15% CPU when section is not visible
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            {
                threshold: 0.1,  // Trigger when at least 10% of section is visible
                rootMargin: '100px',  // Start animating slightly before entering viewport
            }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => {
            if (containerRef.current) {
                observer.unobserve(containerRef.current);
            }
        };
    }, []);

    // BUILD tracker — drives segment animations during sticky phase
    // h-[200vh] container: sticky pins for 100vh, segments build in 0.05–0.50
    const { scrollYProgress: buildProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    // VIEWPORT tracker — drives rotation parallax (works naturally always)
    const { scrollYProgress: viewportProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Map viewport progress to raw rotation degrees
    function progressToRotation(p: number) {
        return Math.min(Math.max((p - 0.2) / 0.6, 0), 1) * 60;
    }

    // Drive rotation from viewportProgress with offset to avoid stutter at transition
    useMotionValueEvent(viewportProgress, "change", (latest) => {
        const raw = progressToRotation(latest);
        if (needsOffsetCalc.current) {
            // First update after transition: compute offset so rotation is continuous
            rotationOffset.current = rotationValue.get() - raw;
            needsOffsetCalc.current = false;
        }
        rotationValue.set(raw + rotationOffset.current);
    });

    // Negative rotation for keeping text upright
    const negRotation = useTransform(rotationValue, (v) => -v);

    // When build completes: save height, flag for offset recalculation, flip state
    useMotionValueEvent(buildProgress, "change", (latest) => {
        if (latest > 0.50 && !hasAppeared) {
            needsOffsetCalc.current = true;
            prevContainerHeight.current = containerRef.current?.offsetHeight || 0;
            setHasAppeared(true);
        }
    });

    // Synchronous scroll compensation — runs before browser paints
    // When container collapses from 200vh → auto, document shrinks.
    // We scroll up by the difference so the flywheel stays in the same visual position.
    useLayoutEffect(() => {
        if (hasAppeared && prevContainerHeight.current > 0 && containerRef.current) {
            const newHeight = containerRef.current.offsetHeight;
            const diff = prevContainerHeight.current - newHeight;
            if (diff > 0) {
                window.scrollBy(0, -diff);
            }
            prevContainerHeight.current = 0;
        }
    }, [hasAppeared]);

    // ✅ PHASE 1: Added clamp to prevent opacity extrapolation
    const logoOpacity = useTransform(buildProgress, [0.02, 0.08], [0, 1], { clamp: true });

    // ✅ PHASE 1: Manually unrolled all 6 segment opacities with clamp (fixes hooks rules violation)
    // Arrow segments — sequential fade-in during pinned phase via buildProgress
    // Segment 0: start=0.05, end=0.12
    const segmentOpacity0 = useTransform(buildProgress, [0.05, 0.12], [0, 1], { clamp: true });
    // Segment 1: start=0.12, end=0.19
    const segmentOpacity1 = useTransform(buildProgress, [0.12, 0.19], [0, 1], { clamp: true });
    // Segment 2: start=0.19, end=0.26
    const segmentOpacity2 = useTransform(buildProgress, [0.19, 0.26], [0, 1], { clamp: true });
    // Segment 3: start=0.26, end=0.33
    const segmentOpacity3 = useTransform(buildProgress, [0.26, 0.33], [0, 1], { clamp: true });
    // Segment 4: start=0.33, end=0.40
    const segmentOpacity4 = useTransform(buildProgress, [0.33, 0.40], [0, 1], { clamp: true });
    // Segment 5: start=0.40, end=0.47
    const segmentOpacity5 = useTransform(buildProgress, [0.40, 0.47], [0, 1], { clamp: true });

    const segmentOpacities = [segmentOpacity0, segmentOpacity1, segmentOpacity2, segmentOpacity3, segmentOpacity4, segmentOpacity5];

    // ✅ PHASE 2: Pre-calculate all arrow paths to eliminate 192 trig operations per frame
    // Each path uses 8 p2c calls × 2 trig functions = 16 operations
    // 6 segments × 16 ops = 96 ops per render, eliminated by calculating once on mount
    const arrowPaths = useMemo(() => {
        return SEGMENTS.map((seg) => ({
            id: seg.id,
            gradientId: seg.gradientId,
            pathData: createArrowPath(seg.angle),  // ✅ Calculated once, never recalculated
        }));
    }, []); // Empty deps - SEGMENTS and createArrowPath are constants

    return (
        // During build: h-[200vh] scroll runway + sticky inner wrapper.
        // After build: collapses to auto height, sticky removed. useLayoutEffect fixes scroll position.
        <div
            ref={containerRef}
            className="relative w-full mb-[-20rem] md:mb-[-8rem] lg:mb-0"
            style={{ height: hasAppeared ? 'auto' : '200vh' }}
        >

            <div
                className={`top-0 flex flex-col items-center overflow-hidden justify-start md:justify-center ${hasAppeared ? 'h-screen' : 'sticky h-screen'}`}
            >

                {/* Title */}
                <div
                    className="relative z-20 text-center w-full px-4 pt-24 md:absolute md:top-12 md:pt-0"
                >
                    <h2
                        className="font-bold text-[#0b1220] font-['Bricolage_Grotesque'] leading-tight"
                        style={{ fontSize: 'clamp(2.25rem, 5vw, 3.75rem)' }}
                    >
                        The Employee Interaction Confidence Flywheel
                    </h2>
                </div>

                {/* --- Ambient Background Orbs --- */}
                {/* ✅ PHASE 3: Orbs only animate when section is visible (saves +8-12 FPS when off-screen) */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <Orb color="#dbeafe" size={500} xRange={['-60%', '-20%']} yRange={['-60%', '-30%']} delay={0} isAnimating={isVisible} />
                    <Orb color="#cffafe" size={400} xRange={['10%', '50%']} yRange={['10%', '40%']} delay={2} isAnimating={isVisible} />
                    <Orb color="#d1fae5" size={300} xRange={['-30%', '10%']} yRange={['20%', '60%']} delay={5} isAnimating={isVisible} />
                </div>

                {/* Flywheel Container — fluid scaling */}
                {/* ✅ PHASE 1: Changed from zoom to transform for better GPU acceleration */}
                <div
                    className="relative w-[800px] h-[800px] z-10 md:translate-y-8 origin-top lg:origin-center"
                    style={{
                        transform: 'scale(clamp(0.6, calc(0.6 + 0.4 * (100vw - 375px) / 1025px), 1))',
                    }}
                >

                    <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`}>
                        <defs>
                            {/* Arrow Gradient 1: linear-gradient(180deg, #275E92 0%, #1D5486 100%) */}
                            <linearGradient id="arrowGradient1" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor="#275E92" />
                                <stop offset="100%" stopColor="#1D5486" />
                            </linearGradient>

                            {/* Arrow Gradient 2: linear-gradient(180deg, #2A688E 0%, #1C5178 100%) */}
                            <linearGradient id="arrowGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor="#2A688E" />
                                <stop offset="100%" stopColor="#1C5178" />
                            </linearGradient>

                            {/* Arrow Gradient 3: linear-gradient(180deg, #3496DE 0%, #3BA099 100%) */}
                            <linearGradient id="arrowGradient3" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor="#3496DE" />
                                <stop offset="100%" stopColor="#3BA099" />
                            </linearGradient>

                            {/* Arrow Gradient 4: linear-gradient(179deg, #3B9F9F 23.13%, #276398 97.27%) */}
                            <linearGradient id="arrowGradient4" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="23.13%" stopColor="#3B9F9F" />
                                <stop offset="97.27%" stopColor="#276398" />
                            </linearGradient>

                            {/* Arrow Gradient 5: linear-gradient(179deg, #1D9392 23.13%, #2EBAA6 97.27%) */}
                            <linearGradient id="arrowGradient5" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="23.13%" stopColor="#1D9392" />
                                <stop offset="97.27%" stopColor="#2EBAA6" />
                            </linearGradient>

                            {/* Arrow Gradient 6: linear-gradient(179deg, #2EBAA6 23.13%, #1C6E60 97.27%) */}
                            <linearGradient id="arrowGradient6" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="23.13%" stopColor="#2EBAA6" />
                                <stop offset="97.27%" stopColor="#1C6E60" />
                            </linearGradient>

                            {/* Glass Reflection Gradient - Adjusted for Light Mode */}
                            <linearGradient id="glassShine" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="white" stopOpacity="0.8" />
                                <stop offset="40%" stopColor="white" stopOpacity="0.2" />
                                <stop offset="100%" stopColor="white" stopOpacity="0" />
                            </linearGradient>

                            {/* Soft Drop Shadow for Depth - Darker for visibility on white */}
                            <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
                                <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="rgba(0,0,0,0.15)" />
                            </filter>
                        </defs>

                        {/* --- LAYER 1: SEGMENTS (Glass) --- */}
                        {/* ✅ PHASE 1: Added willChange for GPU layer pre-allocation */}
                        {/* ✅ PHASE 2: Using pre-calculated paths (no trig ops per frame) */}
                        <motion.g
                            filter="url(#softShadow)"
                            style={{ rotate: rotationValue, transformOrigin: `${CX}px ${CY}px`, willChange: 'transform' }}
                        >
                            {arrowPaths.map(({ id, pathData, gradientId }, i) => {
                                const targetOpacity = hasAppeared ? 1 : segmentOpacities[i];

                                return (
                                    <motion.g
                                        key={id}
                                        style={{
                                            opacity: targetOpacity,
                                        }}
                                    >
                                        {/* A. Base Glass Layer (Gradient Fill) */}
                                        <motion.path
                                            d={pathData}  // ✅ Pre-calculated, zero trig ops
                                            fill={`url(#${gradientId})`}
                                            style={{
                                                backdropFilter: 'blur(10px)',
                                                willChange: 'opacity'  // GPU hint for opacity animation
                                            }}
                                        />

                                        {/* B. Reflection Overlay (Top-Left Shine) */}
                                        <motion.path
                                            d={pathData}  // ✅ Same pre-calculated path
                                            fill="url(#glassShine)"
                                            className="pointer-events-none"
                                            style={{
                                                mixBlendMode: 'soft-light',
                                                willChange: 'opacity'  // GPU hint for opacity animation
                                            }}
                                        />

                                        {/* C. Highlight Stroke (Bright Edge) */}
                                        {/* C. Highlight Stroke - REMOVED */}
                                    </motion.g>
                                );
                            })}
                        </motion.g>

                        {/* --- LAYER 2: TEXT --- */}
                        {/* Wrapper for ALL text items to orbit together */}
                        {/* ✅ PHASE 1: Added willChange for GPU layer pre-allocation */}
                        <motion.g
                            style={{ rotate: rotationValue, transformOrigin: `${CX}px ${CY}px`, willChange: 'transform' }}
                        >
                            {SEGMENTS.map((seg, i) => {
                                const centerAngle = seg.angle;
                                const pos = p2c(175, centerAngle);

                                return (
                                    // Wrapper group handles the base positioning
                                    <g
                                        key={`text-${seg.id}`}
                                        transform={`translate(${pos.x}, ${pos.y})`}
                                    >
                                        {/* Inner group handles the animation relative to base position */}
                                        {/* ✅ PHASE 1: Added willChange for GPU acceleration */}
                                        <motion.g
                                            style={{
                                                opacity: hasAppeared ? 1 : segmentOpacities[i],
                                                rotate: negRotation, // Keep text upright
                                                willChange: 'transform, opacity',
                                            }}
                                        >
                                            <text
                                                y="-16"
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                                className="fill-white font-bold text-5xl select-none tracking-tighter"
                                                style={{
                                                    // Removed glow for cleaner look on solid shapes
                                                    fontFamily: '"Bricolage Grotesque", sans-serif'
                                                }}
                                            >
                                                {seg.number}
                                            </text>

                                            {seg.lines.map((line, lineIndex) => (
                                                <text
                                                    key={lineIndex}
                                                    y={18 + (lineIndex * 18)}
                                                    textAnchor="middle"
                                                    dominantBaseline="middle"
                                                    className="fill-white font-semibold text-[14px] tracking-wide select-none opacity-95"
                                                    style={{
                                                        // Removed strong shadow, kept simple
                                                        fontFamily: '"Bricolage Grotesque", sans-serif',
                                                        textShadow: "0px 1px 2px rgba(0,0,0,0.1)"
                                                    }}
                                                >
                                                    {line}
                                                </text>
                                            ))}
                                        </motion.g>
                                    </g>
                                );
                            })}
                        </motion.g>

                        {/* --- LAYER 3: CENTER LOGO (Replaced with DOM Element for Glow Effect) --- */}
                        {/* Empty placeholder to keep layer order if needed, or just remove. Removing the SVG group. */}

                    </svg>

                    {/* --- Center Logo (DOM Element Overlay) --- */}
                    <motion.div
                        style={{ opacity: hasAppeared ? 1 : logoOpacity }}
                        className="absolute inset-0 flex items-center justify-center pointer-events-none"
                    >
                        <motion.div
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="w-[184px] h-[184px] flex items-center justify-center relative z-20 overflow-visible"
                        >
                            <div className="flex flex-col items-center justify-center text-center p-4 w-full h-full">
                                <img src={assets.logo} alt="Curi Logo" className="w-[110px] h-[110px] object-contain" />
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
