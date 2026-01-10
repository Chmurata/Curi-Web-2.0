import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionTemplate } from "motion/react";

import svgPaths from "../../imports/svg-7wpbdcq3r";

// Logo imports
import microsoftCopilotLogo from "../../assets/Logo's/microsoft-copilot-logo.svg";
import chatgptLogo from "../../assets/Logo's/chatgpt-seeklogo.svg";
import writerLogo from "../../assets/Logo's/writer text.svg";
import grammarlyLogo from "../../assets/Logo's/grammarly-seeklogo.svg";
import jasperLogo from "../../assets/Logo's/jasper-seeklogo.svg";
import otterLogo from "../../assets/Logo's/otter-ai-seeklogo.svg";
import zoomLogo from "../../assets/Logo's/Zoom Ai Companion.svg";
import latticeLogo from "../../assets/Logo's/lattice-seeklogo.svg";
import workdayLogo from "../../assets/Logo's/workday-logo.svg";
import cultureAmpLogo from "../../assets/Logo's/Culture Amp_Logo_0.svg";
import perceptyxLogo from "../../assets/Logo's/perceptryx_logos.svg";

// --- Types ---

interface Point {
  x: number;
  y: number;
}

interface LogoNode {
  id: string;
  label: string;
  logoSrc: string;
  x: number; // 0-1000 coordinate space
  y: number; // 0-800 coordinate space
  quadrant: "TL" | "TR" | "BL" | "BR";
}

// --- Constants & Data ---

const VIEWBOX_W = 1000;
const VIEWBOX_H = 800;
const CENTER_X = VIEWBOX_W / 2;
const CENTER_Y = VIEWBOX_H / 2;

// Axis endpoints - Extended to overlap border
const AXIS_TOP_Y = 20;
const AXIS_BOTTOM_Y = 780;
const AXIS_LEFT_X = 20;
const AXIS_RIGHT_X = 980;

// The glowing hub destination (Top Right) - where lines converge
const HUB_POS: Point = { x: 750, y: 250 };

// Logo render position - offset up from HUB_POS so logo sits above line endpoints
const LOGO_POS: Point = { x: 750, y: 220 };

const LOGO_DATA: LogoNode[] = [
  // Top Left (The Lonely Genius)
  { id: "copilot", label: "Microsoft Copilot", logoSrc: microsoftCopilotLogo, x: 220, y: 200, quadrant: "TL" },
  { id: "chatgpt", label: "ChatGPT", logoSrc: chatgptLogo, x: 380, y: 150, quadrant: "TL" },

  // Bottom Left (The Toolbox)
  { id: "writer", label: "Writer", logoSrc: writerLogo, x: 120, y: 550, quadrant: "BL" },
  { id: "grammarly", label: "Grammarly", logoSrc: grammarlyLogo, x: 240, y: 500, quadrant: "BL" },
  { id: "jasper", label: "Jasper", logoSrc: jasperLogo, x: 200, y: 650, quadrant: "BL" },
  { id: "otter", label: "Otter.ai", logoSrc: otterLogo, x: 350, y: 600, quadrant: "BL" },
  { id: "zoom", label: "ZOOM AI Companion", logoSrc: zoomLogo, x: 280, y: 720, quadrant: "BL" },

  // Bottom Right (The Scoreboard)
  { id: "lattice", label: "Lattice", logoSrc: latticeLogo, x: 590, y: 550, quadrant: "BR" },
  { id: "workday", label: "Workday", logoSrc: workdayLogo, x: 750, y: 635, quadrant: "BR" },
  { id: "culture", label: "Culture Amp", logoSrc: cultureAmpLogo, x: 870, y: 550, quadrant: "BR" },
  { id: "perceptyx", label: "Perceptyx", logoSrc: perceptyxLogo, x: 650, y: 720, quadrant: "BR" },
];

// --- Helper Functions ---

function generateConnectionPath(start: Point, end: Point, quadrant: string): string {
  const dx = end.x - start.x;
  const dy = end.y - start.y;

  // Control points logic for organic flow
  let cp1 = { x: start.x + dx * 0.5, y: start.y };
  let cp2 = { x: end.x - dx * 0.1, y: end.y + dy * 0.2 };

  if (quadrant === "BL") {
    // Bottom left lines go up then right
    cp1 = { x: start.x, y: start.y - 150 };
    cp2 = { x: end.x - 150, y: end.y + 80 };
  } else if (quadrant === "BR") {
    // Bottom right lines go up then left
    cp1 = { x: start.x, y: start.y - 150 };
    cp2 = { x: end.x + 50, y: end.y + 120 };
  } else if (quadrant === "TL") {
    // Top left lines go right then converge
    cp1 = { x: start.x + 100, y: start.y };
    cp2 = { x: end.x - 100, y: end.y };
  }

  return `M ${start.x},${start.y} C ${cp1.x},${cp1.y} ${cp2.x},${cp2.y} ${end.x},${end.y}`;
}

// --- Sub-Components ---

const AxisCaption = ({
  x,
  y,
  text,
  opacity,
  align = "middle",
}: {
  x: number;
  y: number;
  text: string;
  opacity: any;
  align?: "middle" | "start" | "end";
}) => (
  <motion.text
    x={x}
    y={y}
    textAnchor={align}
    style={{ opacity }}
    className="fill-[#235e9a] text-[12px] uppercase tracking-widest font-extrabold font-['Bricolage_Grotesque'] drop-shadow-sm"
  >
    {text}
  </motion.text>
);

const MultiLineAxisCaption = ({
  x,
  y,
  lines,
  opacity,
  align = "middle",
}: {
  x: number;
  y: number;
  lines: string[];
  opacity: any;
  align?: "middle" | "start" | "end";
}) => (
  <motion.text
    x={x}
    y={y}
    textAnchor={align}
    style={{ opacity }}
    className="fill-[#235e9a] text-[12px] uppercase tracking-widest font-extrabold font-['Bricolage_Grotesque'] drop-shadow-sm"
  >
    {lines.map((line, i) => (
      <tspan key={i} x={x} dy={i === 0 ? 0 : "1.2em"}>
        {line}
      </tspan>
    ))}
  </motion.text>
);

const QuadrantTitle = ({
  x,
  y,
  text,
  opacity,
  isHero = false,
  align = "middle",
}: {
  x: number;
  y: number;
  text: string;
  opacity: any;
  isHero?: boolean;
  align?: "start" | "middle" | "end";
}) => (
  <motion.text
    x={x}
    y={y}
    style={{ opacity }}
    className={`font-bold tracking-wide font-['Bricolage_Grotesque'] ${isHero ? "fill-[#235e9a] text-[20px]" : "fill-[#447294] text-[20px]"
      }`}
    textAnchor={align}
  >
    {text}
  </motion.text>
);

const LogoItem = ({
  node,
  opacity,
  onHover,
  onLeave,
  activeLogo
}: {
  node: LogoNode;
  opacity: any;
  onHover: (id: string) => void;
  onLeave: () => void;
  activeLogo: string | null;
}) => {
  const isActive = activeLogo === node.id;

  // Standardized larger size for all logos (USER REQUEST)
  let logoWidth = 120;
  let logoHeight = 60;

  // Specific overrides for logos that appear too small or invisible
  if (node.id === "grammarly") {
    // Make Grammarly even larger (another ~30% boost: 150 -> 195)
    logoWidth = 195;
    logoHeight = 98;
  } else if (node.id === "lattice") {
    // Lattice logo (reduced 20% from 300x150)
    logoWidth = 240;
    logoHeight = 120;
  } else if (node.id === "culture") {
    // Increase Culture Amp logo
    logoWidth = 150;
    logoHeight = 75;
  } else if (node.id === "zoom") {
    // Zoom SVG has huge internal whitespace/padding (content is only ~16% of height)
    // We need massive container dimensions to make the actual logo visible at a comparable size
    logoWidth = 350;
    logoHeight = 250;
  } else if (node.id === "writer") {
    // Writer needs to be smaller than others, but user asked to increase it back up by 30% (60 -> ~80)
    logoWidth = 80;
    logoHeight = 40;
  }

  // White logos that need to be inverted to black
  const needsInvert = node.id === "culture" || node.id === "perceptyx";

  return (
    <motion.g
      initial={{ opacity: 0, scale: 0.9 }}
      style={{ opacity }}
      onMouseEnter={() => onHover(node.id)}
      onMouseLeave={onLeave}
      className="cursor-pointer group"
    >
      {/* Hit area */}
      <circle cx={node.x} cy={node.y} r={50} fill="transparent" />

      {/* Logo Image - Replaced foreignObject with SVG image for iOS support */}
      <image
        href={node.logoSrc}
        x={node.x - logoWidth / 2}
        y={node.y - logoHeight / 2}
        width={logoWidth}
        height={logoHeight}
        preserveAspectRatio="xMidYMid meet"
        className="transition-all duration-300"
        style={{
          filter: isActive
            ? (needsInvert ? "invert(1) drop-shadow(0px 2px 6px rgba(35, 94, 154, 0.3))" : "drop-shadow(0px 2px 6px rgba(35, 94, 154, 0.3))")
            : (needsInvert ? "grayscale(1) opacity(0.6) invert(1)" : "grayscale(1) opacity(0.6)")
        }}
      />
    </motion.g>
  );
};

// --- Main Component ---

export function QuadrantSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeLogo, setActiveLogo] = useState<string | null>(null);

  // Scroll Progress (0 to 1)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth out the scroll value
  const scrollSmooth = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // --- Animation Stages Mappings ---

  // Stage B: Axes (15% - 35%)
  const axisProgress = useTransform(scrollSmooth, [0.15, 0.35], [0, 1]);
  const axisOpacity = useTransform(scrollSmooth, [0.15, 0.20], [0, 1]);
  const arrowOpacity = useTransform(scrollSmooth, [0.30, 0.35], [0, 1]);

  // Arrowhead fade in - Starts AFTER axes are drawn (0.35+)
  const arrowheadFade = useTransform(scrollSmooth, [0.35, 0.38], [0, 1]);

  // Stage C: Quadrant Titles (Fade in when axes reach endpoints - 35% = axis complete)
  const title1Op = useTransform(scrollSmooth, [0.35, 0.40], [0, 0.5]); // TL
  const title2Op = useTransform(scrollSmooth, [0.35, 0.40], [0, 0.5]); // TR
  const title3Op = useTransform(scrollSmooth, [0.35, 0.40], [0, 0.5]); // BL
  const title4Op = useTransform(scrollSmooth, [0.35, 0.40], [0, 0.5]); // BR

  // Stage D: Logos (45% - 65%)
  const logosOpacity = useTransform(scrollSmooth, [0.45, 0.65], [0, 1]);
  const logosBlur = useTransform(scrollSmooth, [0.45, 0.65], [10, 0]);

  // Stage E: Flow Lines (65% - 90%)
  const linesProgress = useTransform(scrollSmooth, [0.65, 0.9], [0, 1]);
  const linesOpacity = useTransform(scrollSmooth, [0.65, 0.75], [0, 1]);

  // Stage F: Hub Activation (90% - 100%)
  const hubScale = useTransform(scrollSmooth, [0.9, 1], [0.8, 1]);
  const hubOpacity = useTransform(scrollSmooth, [0.9, 0.95], [0, 1]);
  const hubGlowOpacity = useTransform(scrollSmooth, [0.95, 1], [0, 0.8]);

  return (
    <div ref={containerRef} className="relative h-[300vh] mb-48">
      <div className="sticky top-0 flex flex-col h-screen w-full overflow-hidden">

        {/* Header Title - Static */}
        <div className="w-full text-center z-20 px-4 pt-24 md:pt-12 pb-4 shrink-0">
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#0b1220] font-['Bricolage_Grotesque']"
          >
            The only platform{" "}
            <span className="md:block">built for "We".</span>
          </h2>
        </div>

        {/* Chart Container - Flex 1 to fill remaining space */}
        <div className="relative flex-1 w-full min-h-0 flex items-start md:items-center justify-center md:pt-0">

          {/* Background Radial for Hub */}
          <div className="absolute top-[25%] right-[30%] w-[300px] h-[300px] bg-[#235e9a]/5 rounded-full blur-[100px]" />

          {/* Main SVG Graphic */}
          <svg
            className="relative z-10 h-full w-full max-w-[1200px] p-4 md:p-10 overflow-visible"
            viewBox={`0 0 ${VIEWBOX_W} ${VIEWBOX_H}`}
            preserveAspectRatio="xMidYMin meet"
          >
            <defs>
              <filter id="simple-blur" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="6" />
              </filter>

              <filter id="strong-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>

              <radialGradient id="radial-hub">
                <stop offset="0%" stopColor="#235e9a" stopOpacity="0.4" />
                <stop offset="70%" stopColor="#235e9a" stopOpacity="0" />
              </radialGradient>

              {/* Premium Gradient for Connecting Lines (Blue -> Greenish Teal) */}
              <linearGradient id="connection-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#2F5FA4" stopOpacity="0.2" /> {/* Darker Blue */}
                <stop offset="50%" stopColor="#235e9a" stopOpacity="0.8" /> {/* Main Blue */}
                <stop offset="100%" stopColor="#57A98C" stopOpacity="1" /> {/* Teal from Plans */}
              </linearGradient>

              {/* Sophisticated Border Gradient - Reduced opacity by 20% */}
              <linearGradient id="border-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#235e9a" stopOpacity="0.32" />
                <stop offset="50%" stopColor="#447294" stopOpacity="0.48" />
                <stop offset="100%" stopColor="#235e9a" stopOpacity="0.32" />
              </linearGradient>

              {/* Glow filter for border */}
              <filter id="border-glow" x="-10%" y="-10%" width="120%" height="120%">
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>

              {/* Mask to create smooth gaps where axis lines cross the border */}
              <mask id="axis-breaks">
                <rect x="0" y="0" width="100%" height="100%" fill="white" />
                <circle cx={CENTER_X} cy={40} r="6" fill="black" />
                <circle cx={CENTER_X} cy={VIEWBOX_H - 40} r="6" fill="black" />
                <circle cx={40} cy={CENTER_Y} r="6" fill="black" />
                <circle cx={VIEWBOX_W - 40} cy={CENTER_Y} r="6" fill="black" />
              </mask>
            </defs>

            {/* --- CONTAINER BORDER --- */}
            <motion.rect
              x="40"
              y="40"
              width={VIEWBOX_W - 80}
              height={VIEWBOX_H - 80}
              rx="24"
              ry="24"
              fill="none"
              stroke="url(#connection-gradient)"
              strokeWidth="1"
              filter="url(#border-glow)"
              mask="url(#axis-breaks)"
              style={{ opacity: useTransform(scrollSmooth, [0.40, 0.45], [0, 1]) }}
            />

            {/* --- STAGE E: Flow Lines (Background Layer) --- */}
            <g className="pointer-events-none">
              {LOGO_DATA.map((node) => {
                const pathD = generateConnectionPath({ x: node.x, y: node.y }, HUB_POS, node.quadrant);
                const isHovered = activeLogo === node.id;

                return (
                  <g key={node.id}>
                    {/* Glowing Background Line (Always visible but subtle) */}
                    <motion.path
                      d={pathD}
                      fill="none"
                      stroke="url(#connection-gradient)"
                      strokeWidth="3"
                      style={{ pathLength: linesProgress, opacity: 0.3 }}
                      filter="url(#simple-blur)"
                    />

                    {/* Main Line with Gradient */}
                    <motion.path
                      d={pathD}
                      fill="none"
                      stroke="url(#connection-gradient)"
                      strokeWidth={isHovered ? 2.5 : 1.5}
                      style={{
                        pathLength: linesProgress,
                        opacity: linesOpacity,
                      }}
                      transition={{ duration: 0.3 }}
                    />

                    {/* Data Packet */}
                    {isHovered && (
                      <motion.circle r="4" fill="#8EF4AE">
                        <animateMotion
                          dur="1.5s"
                          repeatCount="indefinite"
                          path={pathD}
                          calcMode="linear"
                        />
                        {/* Glow for the packet */}
                        <circle r="6" fill="#8EF4AE" opacity="0.5" filter="url(#simple-blur)" />
                      </motion.circle>
                    )}
                  </g>
                );
              })}
            </g>

            {/* --- STAGE B: Axes (Expanding from Center) --- */}
            <g>
              {/* Vertical Axis - TOP half (expands upward from center) */}
              <motion.line
                x1={CENTER_X} y1={CENTER_Y} x2={CENTER_X} y2={AXIS_TOP_Y}
                stroke="#235e9a" strokeWidth="1" strokeLinecap="round"
                style={{
                  pathLength: axisProgress,
                  opacity: 0.6,
                }}
              />

              {/* Vertical Axis - BOTTOM half (expands downward from center) */}
              <motion.line
                x1={CENTER_X} y1={CENTER_Y} x2={CENTER_X} y2={AXIS_BOTTOM_Y}
                stroke="#235e9a" strokeWidth="1" strokeLinecap="round"
                style={{
                  pathLength: axisProgress,
                  opacity: 0.6,
                }}
              />

              {/* Horizontal Axis - LEFT half (expands leftward from center) */}
              <motion.line
                x1={CENTER_X} y1={CENTER_Y} x2={AXIS_LEFT_X} y2={CENTER_Y}
                stroke="#235e9a" strokeWidth="1" strokeLinecap="round"
                style={{
                  pathLength: axisProgress,
                  opacity: 0.6,
                }}
              />

              {/* Horizontal Axis - RIGHT half (expands rightward from center) */}
              <motion.line
                x1={CENTER_X} y1={CENTER_Y} x2={AXIS_RIGHT_X} y2={CENTER_Y}
                stroke="#235e9a" strokeWidth="1" strokeLinecap="round"
                style={{
                  pathLength: axisProgress,
                  opacity: 0.6,
                }}
              />

              {/* Central Target / Reticle */}
              <motion.g style={{ opacity: axisOpacity }}>
                <circle cx={CENTER_X} cy={CENTER_Y} r="24" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="4 4" fill="none" opacity="0.25" />
                <circle cx={CENTER_X} cy={CENTER_Y} r="4" fill="#cbd5e1" opacity="0.4" />
              </motion.g>

              {/* Arrowheads (Replaced with Sleek Chevrons) */}
              <g>
                {/* Top Arrow (Chevron Up) */}
                <motion.path
                  d={`M ${CENTER_X - 6} ${AXIS_TOP_Y + 8} L ${CENTER_X} ${AXIS_TOP_Y} L ${CENTER_X + 6} ${AXIS_TOP_Y + 8}`}
                  fill="none"
                  stroke="#235e9a"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ opacity: arrowheadFade }}
                />

                {/* Bottom Arrow (Chevron Down) */}
                <motion.path
                  d={`M ${CENTER_X - 6} ${AXIS_BOTTOM_Y - 8} L ${CENTER_X} ${AXIS_BOTTOM_Y} L ${CENTER_X + 6} ${AXIS_BOTTOM_Y - 8}`}
                  fill="none"
                  stroke="#235e9a"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ opacity: arrowheadFade }}
                />

                {/* Left Arrow (Chevron Left) */}
                <motion.path
                  d={`M ${AXIS_LEFT_X + 8} ${CENTER_Y - 6} L ${AXIS_LEFT_X} ${CENTER_Y} L ${AXIS_LEFT_X + 8} ${CENTER_Y + 6}`}
                  fill="none"
                  stroke="#235e9a"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ opacity: arrowheadFade }}
                />

                {/* Right Arrow (Chevron Right) */}
                <motion.path
                  d={`M ${AXIS_RIGHT_X - 8} ${CENTER_Y - 6} L ${AXIS_RIGHT_X} ${CENTER_Y} L ${AXIS_RIGHT_X - 8} ${CENTER_Y + 6}`}
                  fill="none"
                  stroke="#235e9a"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ opacity: arrowheadFade }}
                />
              </g>

              {/* Axis Labels */}
              <g style={{ opacity: arrowOpacity as any }}>
                {/* Vertical Labels - Far outside border */}
                <AxisCaption x={CENTER_X} y={15} text="Real-Time / Adaptive" opacity={axisOpacity} />
                <AxisCaption x={CENTER_X} y={795} text="Static / Asynchronous" opacity={axisOpacity} />

                {/* Horizontal Labels - Outside the quadrant border, centered with axis */}
                <MultiLineAxisCaption
                  x={20}
                  y={CENTER_Y - 25}
                  lines={["Individual", "Context", "(Me)"]}
                  opacity={axisOpacity}
                  align="end"
                />

                <MultiLineAxisCaption
                  x={VIEWBOX_W - 20}
                  y={CENTER_Y - 25}
                  lines={["Relational", "Context", "(We)"]}
                  opacity={axisOpacity}
                  align="start"
                />
              </g>
            </g>

            {/* --- STAGE C: Quadrant Titles (Outside Border) --- */}
            <QuadrantTitle x={50} y={25} text="The Lonely Genius" opacity={title1Op} align="start" />
            <QuadrantTitle x={950} y={25} text="Realtime Interaction Intelligence" opacity={title2Op} isHero align="end" />
            <QuadrantTitle x={50} y={790} text="The Toolbox" opacity={title3Op} align="start" />
            <QuadrantTitle x={950} y={790} text="The Scoreboard" opacity={title4Op} align="end" />

            {/* --- STAGE D: Logos --- */}
            {LOGO_DATA.map((node, i) => (
              <motion.g
                key={node.id}
                style={{
                  opacity: logosOpacity,
                  filter: useMotionTemplate`blur(${logosBlur}px)`
                }}
              >
                <LogoItem
                  node={node}
                  opacity={1}
                  onHover={setActiveLogo}
                  onLeave={() => setActiveLogo(null)}
                  activeLogo={activeLogo}
                />
              </motion.g>
            ))}

            {/* --- STAGE F: Hub (Top Right) --- */}
            <motion.g
              style={{
                x: LOGO_POS.x,
                y: LOGO_POS.y,
                opacity: hubOpacity,
                scale: hubScale,
              }}
            >
              {/* Outer Bloom - REMOVED */}

              {/* Curi Logo - Replaced foreignObject with native SVG elements */}
              <g transform="translate(-16.7, -18) scale(1.7)">
                <svg width="33.4" height="36" viewBox="0 0 33.4449 36">
                  <g id="Group 180">
                    <g id="Vector">
                      <path d={svgPaths.p21df4780} fill="#447294" />
                      <path d={svgPaths.p3ee85280} fill="#A9BD75" />
                      <path d={svgPaths.p303f02b0} fill="#8EF4AE" />
                      <path d={svgPaths.p3ea3eb00} fill="#447294" />
                    </g>
                  </g>
                </svg>
              </g>

            </motion.g>

          </svg>
        </div>



        {/* Scroll Prompt */}
        <motion.div
          style={{ opacity: useTransform(scrollYProgress, [0, 0.05], [1, 0]) }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-400 text-xs tracking-widest uppercase animate-bounce"
        >
          Scroll to Initialize
        </motion.div>

      </div>
    </div>
  );
}
