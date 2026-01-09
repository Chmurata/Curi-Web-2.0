import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
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
const Orb = ({ color, delay, xRange, yRange, size }: { color: string, delay: number, xRange: string[], yRange: string[], size: number }) => (
    <motion.div
        className={`absolute rounded-full blur-[80px] opacity-20 pointer-events-none`} // Lower opacity for cleaner light look
        style={{
            backgroundColor: color,
            width: size,
            height: size,
            left: '50%',
            top: '50%',
            x: '-50%',
            y: '-50%',
            mixBlendMode: 'multiply' // Blend nicely on white
        }}
        animate={{
            x: xRange,
            y: yRange,
            scale: [1, 1.2, 1],
        }}
        transition={{
            duration: 10 + delay,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
        }}
    />
);

export default function CircularCycleDiagram() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const logoOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

    const segmentMotionValues = SEGMENTS.map((seg, i) => {
        const start = 0.1 + (i * 0.14);
        const end = start + 0.1;

        // Calculate slide direction (from center outwards)
        // We want to start slightly INWARDS and slide OUT to final position
        const angleRad = (seg.angle - 90) * (Math.PI / 180);
        const slideDistance = 40;
        const startX = -slideDistance * Math.cos(angleRad);
        const startY = -slideDistance * Math.sin(angleRad);

        // eslint-disable-next-line react-hooks/rules-of-hooks
        return {
            opacity: useTransform(scrollYProgress, [start, end], [0, 1]),
            x: useTransform(scrollYProgress, [start, end], [startX, 0]),
            y: useTransform(scrollYProgress, [start, end], [startY, 0]),
            scale: useTransform(scrollYProgress, [start, end], [0.8, 1]),
        };
    });

    return (
        // Outer scroll container (Track) - INCREASED HEIGHT to 400vh for longer sticky duration
        <div ref={containerRef} className="relative h-[400vh] w-full"> {/* Transparent Background */}

            {/* Sticky viewport wrapper */}
            <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">

                {/* Sticky Title - Scroll-linked dissolve */}
                <div className="absolute top-12 md:top-20 z-20 text-center w-full px-4">
                    <motion.h2
                        style={{
                            opacity: useTransform(scrollYProgress, [0, 0.1], [0, 1]),
                            y: useTransform(scrollYProgress, [0, 0.1], [40, 0])
                        }}
                        className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#0b1220] font-['Bricolage_Grotesque'] leading-tight"
                    >
                        The Curi Confidence Flywheel
                    </motion.h2>
                </div>

                {/* --- 1. Ambient Background (The "Light" behind the glass) --- */}
                <div className="absolute inset-0 overflow-hidden">
                    {/* Using Curi brand colors for orbs */}
                    <Orb color="#dbeafe" size={500} xRange={['-60%', '-20%']} yRange={['-60%', '-30%']} delay={0} /> {/* Blue 100 */}
                    <Orb color="#cffafe" size={400} xRange={['10%', '50%']} yRange={['10%', '40%']} delay={2} /> {/* Cyan 100 */}
                    <Orb color="#d1fae5" size={300} xRange={['-30%', '10%']} yRange={['20%', '60%']} delay={5} /> {/* Emerald 100 */}
                </div>

                <div className="relative w-[800px] h-[800px] scale-75 md:scale-90 lg:scale-100 transition-transform duration-500 z-10 translate-y-12 md:translate-y-16"> {/* Pushed down slightly to make room for title */}

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
                        <g filter="url(#softShadow)">
                            {SEGMENTS.map((seg, i) => {
                                const pathData = createArrowPath(seg.angle);
                                const mv = segmentMotionValues[i];

                                return (
                                    <motion.g
                                        key={seg.id}
                                        style={{
                                            opacity: mv.opacity,
                                            x: mv.x,
                                            y: mv.y,
                                            scale: mv.scale,
                                            transformOrigin: `${CX}px ${CY}px` // Scale from center of flywheel
                                        }}
                                    >
                                        {/* A. Base Glass Layer (Gradient Fill) */}
                                        <path
                                            d={pathData}
                                            fill={`url(#${seg.gradientId})`}
                                            stroke="white"
                                            strokeWidth="2"
                                            strokeOpacity="0.5"
                                            style={{ backdropFilter: 'blur(10px)' }}
                                        />

                                        {/* B. Reflection Overlay (Top-Left Shine) */}
                                        <path
                                            d={pathData}
                                            fill="url(#glassShine)"
                                            className="pointer-events-none"
                                            style={{ mixBlendMode: 'soft-light' }} // Soft light works better on light
                                        />

                                        {/* C. Highlight Stroke (Bright Edge) */}
                                        <path
                                            d={pathData}
                                            fill="none"
                                            stroke="white"
                                            strokeWidth="1"
                                            strokeOpacity="0.9"
                                            className="pointer-events-none"
                                        />
                                    </motion.g>
                                );
                            })}
                        </g>

                        {/* --- LAYER 2: TEXT --- */}
                        {SEGMENTS.map((seg, i) => {
                            const centerAngle = seg.angle;
                            const pos = p2c(175, centerAngle);
                            const mv = segmentMotionValues[i];

                            return (
                                // Wrapper group handles the base positioning
                                <g
                                    key={`text-${seg.id}`}
                                    transform={`translate(${pos.x}, ${pos.y})`}
                                >
                                    {/* Inner group handles the animation relative to base position */}
                                    <motion.g
                                        style={{
                                            opacity: mv.opacity,
                                            x: mv.x,
                                            y: mv.y,
                                            scale: mv.scale
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
                                                className="fill-white font-semibold text-[13px] tracking-wide select-none opacity-95"
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

                        {/* --- LAYER 3: CENTER LOGO (Replaced with DOM Element for Glow Effect) --- */}
                        {/* Empty placeholder to keep layer order if needed, or just remove. Removing the SVG group. */}

                    </svg>

                    {/* --- Center Logo (DOM Element Overlay) --- */}
                    <motion.div
                        style={{ opacity: logoOpacity }}
                        className="absolute inset-0 flex items-center justify-center pointer-events-none"
                    >
                        <motion.div
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="w-[160px] h-[160px] bg-white rounded-full shadow-[0_0_60px_rgba(59,130,246,0.3)] flex items-center justify-center relative z-20 border border-blue-50 overflow-hidden"
                        >
                            <div className="flex flex-col items-center justify-center text-center p-4 w-full h-full">
                                <img src={assets.logo} alt="Curi Logo" className="w-24 h-24 object-contain" />
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
