import { motion } from "motion/react";
import svgPaths from "../../imports/svg-7wpbdcq3r";

// Avatar positions around the logo (in a circular pattern)
const AVATAR_POSITIONS = [
    { id: "avatar1", x: 120, y: 40 },  // Top
    { id: "avatar2", x: 120, y: 160 }, // Bottom
];

const LOGO_CENTER = { x: 125, y: 100 };

// Generate curved path from logo to avatar
function generatePath(start: { x: number; y: number }, end: { x: number; y: number }): string {
    const dx = end.x - start.x;
    const dy = end.y - start.y;

    // Control points for smooth curve
    const cp1x = start.x + dx * 0.3;
    const cp1y = start.y;
    const cp2x = end.x - dx * 0.3;
    const cp2y = end.y;

    return `M ${start.x},${start.y} C ${cp1x},${cp1y} ${cp2x},${cp2y} ${end.x},${end.y}`;
}

export function AnimatedFooterGraphic() {
    return (
        <div className="relative w-[250px] h-[200px] flex items-center justify-center">
            <svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 250 200"
                preserveAspectRatio="xMidYMid meet"
            >
                <defs>
                    {/* Gradient for connection lines */}
                    <linearGradient id="footer-line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#235e9a" stopOpacity="0.3" />
                        <stop offset="50%" stopColor="#235e9a" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#57A98C" stopOpacity="1" />
                    </linearGradient>
                </defs>

                {/* Animated connection lines */}
                {AVATAR_POSITIONS.map((avatar) => {
                    const pathD = generatePath(LOGO_CENTER, avatar);

                    return (
                        <g key={avatar.id}>
                            {/* Background glow line */}
                            <motion.path
                                d={pathD}
                                fill="none"
                                stroke="url(#footer-line-gradient)"
                                strokeWidth="2"
                                opacity="0.3"
                                filter="blur(3px)"
                            />

                            {/* Main line */}
                            <motion.path
                                d={pathD}
                                fill="none"
                                stroke="url(#footer-line-gradient)"
                                strokeWidth="1.5"
                                strokeDasharray="4 4"
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{ pathLength: 1, opacity: 1 }}
                                transition={{
                                    pathLength: { duration: 2, ease: "easeInOut", repeat: Infinity, repeatDelay: 0.5 },
                                    opacity: { duration: 0.3 }
                                }}
                            />

                            {/* Animated particle */}
                            <motion.circle r="3" fill="#8EF4AE">
                                <animateMotion
                                    dur="2.5s"
                                    repeatCount="indefinite"
                                    path={pathD}
                                    calcMode="linear"
                                />
                            </motion.circle>
                        </g>
                    );
                })}

                {/* Avatar circles */}
                {AVATAR_POSITIONS.map((avatar) => (
                    <motion.g
                        key={`avatar-${avatar.id}`}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        {/* Avatar background circle */}
                        <circle
                            cx={avatar.x}
                            cy={avatar.y}
                            r="18"
                            fill="#e0f2fe"
                            stroke="#235e9a"
                            strokeWidth="2"
                        />
                        {/* Avatar icon (simple person silhouette) */}
                        <circle cx={avatar.x} cy={avatar.y - 3} r="5" fill="#235e9a" />
                        <path
                            d={`M ${avatar.x - 7} ${avatar.y + 10} Q ${avatar.x} ${avatar.y + 5} ${avatar.x + 7} ${avatar.y + 10}`}
                            fill="#235e9a"
                        />
                    </motion.g>
                ))}
            </svg>

            {/* Curi Logo in center */}
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative z-10 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg"
                style={{ border: "3px solid #235e9a" }}
            >
                <svg className="w-10 h-10" fill="none" preserveAspectRatio="xMidYMid meet" viewBox="0 0 33.4449 36">
                    <g id="Group 180">
                        <g id="Vector">
                            <path d={svgPaths.p21df4780} fill="#447294" />
                            <path d={svgPaths.p3ee85280} fill="#A9BD75" />
                            <path d={svgPaths.p303f02b0} fill="#8EF4AE" />
                            <path d={svgPaths.p3ea3eb00} fill="#447294" />
                        </g>
                    </g>
                </svg>
            </motion.div>
        </div>
    );
}
