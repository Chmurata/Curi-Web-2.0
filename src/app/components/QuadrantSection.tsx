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
import zoomLogo from "../../assets/Logo's/Zoom Ai.svg";
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
const HUB_POS: Point = { x: 780, y: 190 };

// Logo render position - offset up from HUB_POS so logo sits above line endpoints
const LOGO_POS: Point = { x: 780, y: 140 };

const LOGO_DATA: LogoNode[] = [
  // Top Left (The Lonely Genius)
  { id: "copilot", label: "Microsoft Copilot", logoSrc: microsoftCopilotLogo, x: 200, y: 280, quadrant: "TL" },
  { id: "chatgpt", label: "ChatGPT", logoSrc: chatgptLogo, x: 250, y: 200, quadrant: "TL" },

  // Bottom Left (The Toolbox)
  { id: "writer", label: "Writer", logoSrc: writerLogo, x: 130, y: 580, quadrant: "BL" },
  { id: "grammarly", label: "Grammarly", logoSrc: grammarlyLogo, x: 270, y: 460, quadrant: "BL" },
  { id: "jasper", label: "Jasper", logoSrc: jasperLogo, x: 200, y: 680, quadrant: "BL" },
  { id: "otter", label: "Otter.ai", logoSrc: otterLogo, x: 350, y: 600, quadrant: "BL" },
  { id: "zoom", label: "ZOOM AI Companion", logoSrc: zoomLogo, x: 403, y: 705, quadrant: "BL" },

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
    // Top left lines go right then converge - Arching to avoid straightness
    cp1 = { x: start.x + 50, y: start.y - 80 };
    cp2 = { x: end.x - 100, y: end.y - 40 };
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
  size = "text-[12px]", // Default size
  color // Optional color override
}: {
  x: number;
  y: number;
  lines: string[];
  opacity: any;
  align?: "middle" | "start" | "end";
  size?: string;
  color?: any;
}) => (
  <motion.text
    x={x}
    y={y}
    textAnchor={align}
    style={{ opacity, fill: color || "#235e9a" }}
    className={`${size} uppercase tracking-widest font-extrabold font-['Bricolage_Grotesque'] drop-shadow-sm`}
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
  scale = 1,
  color,
  isHero = false,
  align = "middle",
}: {
  x: number;
  y: number;
  text: string;
  opacity: any;
  scale?: any;
  color?: any;
  isHero?: boolean;
  align?: "start" | "middle" | "end";
}) => (
  <motion.text
    x={x}
    y={y}
    style={{ opacity, scale, ...(color ? { fill: color } : {}) }}
    className={`font-bold tracking-wide font-['Bricolage_Grotesque'] ${isHero && !color ? "fill-[#235e9a] text-[20px]" : ""} ${!isHero && !color ? "fill-[#447294] text-[20px]" : "text-[20px]"
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
    // Make Grammarly even larger (another ~30% boost: 150 -> 195) -> reduced by 15% (166x83)
    logoWidth = 166;
    logoHeight = 83;
  } else if (node.id === "lattice") {
    // Lattice logo (reduced 20% from 300x150)
    logoWidth = 240;
    logoHeight = 120;
  } else if (node.id === "culture") {
    // Increase Culture Amp logo
    logoWidth = 150;
    logoHeight = 75;
  } else if (node.id === "zoom") {
    // Zoom AI logo
    logoWidth = 122;
    logoHeight = 55;
  } else if (node.id === "copilot" || node.id === "chatgpt") {
    // Increase Copilot and ChatGPT sizes by 15% (120x60 -> 138x69)
    logoWidth = 138;
    logoHeight = 69;
  } else if (node.id === "otter") {
    // Decrease Otter sizes by 10% (120x60 -> 108x54)
    logoWidth = 108;
    logoHeight = 54;
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

  // --- Animation Stages Mappings (Refined Timing) ---

  // 1. Container Box (0% - 10%)
  const boxOpacity = useTransform(scrollSmooth, [0.0, 0.10], [0, 1]);

  // 2. Left & Bottom Text -> Lines start together (Sync) (10% - 30%)
  const leftTextOpacity = useTransform(scrollSmooth, [0.10, 0.15], [0, 1]);
  const bottomTextOpacity = useTransform(scrollSmooth, [0.10, 0.15], [0, 1]);

  // Both axes grow simultaneously
  const axisHorizProgress = useTransform(scrollSmooth, [0.15, 0.30], [0, 1]); // Expand Right
  const axisVertProgress = useTransform(scrollSmooth, [0.15, 0.30], [0, 1]); // Expand Up

  // 3. Top & Right Texts + PULSE (30% - 35%) - Immediately after crossing
  const topTextOpacity = useTransform(scrollSmooth, [0.30, 0.35], [0, 1]);
  const rightTextOpacity = useTransform(scrollSmooth, [0.30, 0.35], [0, 1]);
  const arrowheadFade = useTransform(scrollSmooth, [0.30, 0.35], [0, 1]);

  // Pulse effect happens exactly here (30% - 40%) for Relational Context
  const pulseScale = useTransform(scrollSmooth, [0.30, 0.35, 0.40], [1, 1.1, 1]);
  const pulseColor = useTransform(scrollSmooth, [0.30, 0.40], ["#235e9a", "#57A98C"]);

  // 4. TL Logos -> Title (40% - 50%)
  const logoOpacityTL = useTransform(scrollSmooth, [0.40, 0.45], [0, 1]);
  const titleOpacityTL = useTransform(scrollSmooth, [0.45, 0.48], [0, 1]);

  // 5. BL Logos -> Title (50% - 60%)
  const logoOpacityBL = useTransform(scrollSmooth, [0.50, 0.55], [0, 1]);
  const titleOpacityBL = useTransform(scrollSmooth, [0.55, 0.58], [0, 1]);

  // 6. BR Logos -> Title (60% - 70%)
  const logoOpacityBR = useTransform(scrollSmooth, [0.60, 0.65], [0, 1]);
  const titleOpacityBR = useTransform(scrollSmooth, [0.65, 0.68], [0, 1]);

  // 7. Connection Lines (70% - 85%)
  const linesProgress = useTransform(scrollSmooth, [0.70, 0.85], [0, 1]);
  const linesOpacity = useTransform(scrollSmooth, [0.70, 0.75], [0, 1]);

  // 8. Final Hub (85% - 100%) - Title moved back to end
  const titleOpacityTR = useTransform(scrollSmooth, [0.85, 0.90], [0, 1]);
  const hubOpacity = useTransform(scrollSmooth, [0.85, 0.90], [0, 1]);
  const hubScale = useTransform(scrollSmooth, [0.85, 0.95], [0.8, 1]);

  // Late Pulse for Realtime Title (90% - 100%)
  const finalPulseScale = useTransform(scrollSmooth, [0.90, 0.95, 1.0], [1, 1.1, 1]);
  const finalPulseColor = useTransform(scrollSmooth, [0.90, 1.0], ["#235e9a", "#57A98C"]);

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

              {/* Mask to hide lines behind specific logos (Grammarly) */}
              <mask id="lines-mask">
                <rect x="0" y="0" width="100%" height="100%" fill="white" />
                {/* Grammarly Logo Mask Area (ellipse to cover the long shape) */}
                <ellipse cx="270" cy="460" rx="60" ry="25" fill="black" />
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
              style={{ opacity: boxOpacity }}
            />

            {/* --- STAGE E: Flow Lines (Background Layer) --- */}
            <g className="pointer-events-none" mask="url(#lines-mask)">
              {LOGO_DATA.map((node) => {
                // Adjust start point for Copilot and ChatGPT to start from the right edge
                // Width is 138, so offset is 138/2 = 69
                const startX = (node.id === "copilot" || node.id === "chatgpt") ? node.x + 69 : node.x;
                const pathD = generateConnectionPath({ x: startX, y: node.y }, HUB_POS, node.quadrant);
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
              {/* --- Stage 4: Axis Lines (One continuous draw each) --- */}

              {/* Vertical Axis - Bottom to Top */}
              <motion.line
                x1={CENTER_X} y1={AXIS_BOTTOM_Y} x2={CENTER_X} y2={AXIS_TOP_Y}
                stroke="#235e9a" strokeWidth="1" strokeLinecap="round"
                style={{
                  pathLength: axisVertProgress,
                  opacity: 0.6,
                }}
              />

              {/* Horizontal Axis - Left to Right */}
              <motion.line
                x1={AXIS_LEFT_X} y1={CENTER_Y} x2={AXIS_RIGHT_X} y2={CENTER_Y}
                stroke="#235e9a" strokeWidth="1" strokeLinecap="round"
                style={{
                  pathLength: axisHorizProgress,
                  opacity: 0.6,
                }}
              />

              {/* Central Target / Reticle */}
              <motion.g style={{ opacity: topTextOpacity }}>
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
              {/* Axis Labels */}
              {/* Axis Labels */}
              <g>
                {/* Vertical Labels - Pulse "Realtime" at end */}
                <motion.g style={{ scale: pulseScale, originX: "50%", originY: "50%" }}>
                  <MultiLineAxisCaption
                    x={CENTER_X}
                    y={-25}
                    lines={["REAL-TIME/", "ADAPTIVE"]}
                    opacity={topTextOpacity}
                    align="middle"
                    size="text-[16px]"
                    color={pulseColor}
                  />
                </motion.g>

                <MultiLineAxisCaption
                  x={CENTER_X}
                  y={820}
                  lines={["STATIC/", "ASYNCHRONOUS"]}
                  opacity={bottomTextOpacity}
                  align="middle"
                  size="text-[16px]"
                />

                {/* Horizontal Labels */}
                <MultiLineAxisCaption
                  x={-12}
                  y={CENTER_Y - 25}
                  lines={["Individual", "Context", "(Me)"]}
                  opacity={leftTextOpacity}
                  align="end"
                  size="text-[16px]"
                />

                <motion.g style={{ scale: pulseScale, originX: "50%", originY: "50%" }}>
                  <MultiLineAxisCaption
                    x={1012}
                    y={CENTER_Y - 25}
                    lines={["Relational", "Context", "(We)"]}
                    opacity={rightTextOpacity}
                    align="start"
                    size="text-[16px]"
                    color={pulseColor}
                  />
                </motion.g>
              </g>
            </g>

            {/* --- STAGE C: Quadrant Titles --- */}
            <QuadrantTitle x={50} y={25} text="The Lonely Genius" opacity={titleOpacityTL} align="start" />

            <motion.g style={{ originX: "100%", originY: "50%" }}>
              <QuadrantTitle
                x={950}
                y={25}
                text="Realtime Interaction Intelligence"
                opacity={titleOpacityTR}
                scale={finalPulseScale}
                color={finalPulseColor}
                isHero
                align="end"
              />
            </motion.g>

            <QuadrantTitle x={50} y={790} text="The Toolbox" opacity={titleOpacityBL} align="start" />
            <QuadrantTitle x={950} y={790} text="The Scoreboard" opacity={titleOpacityBR} align="end" />

            {/* --- STAGE D: Logos (Grouped) --- */}
            {LOGO_DATA.map((node, i) => {
              // Determine opacity based on quadrant group
              let targetOpacity = logoOpacityTL;
              if (node.quadrant === "BL") targetOpacity = logoOpacityBL;
              else if (node.quadrant === "BR") targetOpacity = logoOpacityBR;

              return (
                <motion.g
                  key={node.id}
                  style={{
                    opacity: targetOpacity,
                    // Remove blur or use a generic fade
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
              );
            })}

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
              <g transform="translate(-16.7, -18) scale(3.0)">
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


      </div>
    </div>
  );
}
