import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";

interface PreloaderProps {
    onComplete?: () => void;
}

export function Preloader({ onComplete }: PreloaderProps) {
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        // Total animation duration: ~3 seconds
        const timer = setTimeout(() => {
            setIsComplete(true);
            setTimeout(() => {
                onComplete?.();
            }, 600); // Wait for exit animation
        }, 3000);

        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <AnimatePresence>
            {!isComplete && (
                <motion.div
                    className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
                    style={{
                        background: "linear-gradient(90deg, #F2F7FB 0%, #C7DDF3 100%)"
                    }}
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, filter: "blur(10px)" }}
                    transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
                >
                    {/* Animated Curi Logo */}
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{
                            scale: 1,
                            opacity: 1,
                            y: [-10, 10, -10],
                            rotate: [-3, 3, -3]
                        }}
                        transition={{
                            scale: { duration: 0.6, ease: "easeOut" },
                            opacity: { duration: 0.6, ease: "easeOut" },
                            y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 },
                            rotate: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }
                        }}
                        className="relative"
                    >
                        <svg
                            width="120"
                            height="120"
                            viewBox="0 0 44 44"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            style={{ overflow: 'visible' }}
                            className="drop-shadow-none"
                        >
                            <defs>
                                {/* Glow filter */}
                                <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                                    <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                                    <feMerge>
                                        <feMergeNode in="coloredBlur" />
                                        <feMergeNode in="SourceGraphic" />
                                    </feMerge>
                                </filter>
                            </defs>

                            {/* Dot 1 - Blue */}
                            <motion.path
                                d="M27.9307 22.9261C28.4424 22.9261 28.8572 22.5115 28.8572 22.0001C28.8572 21.4886 28.4424 21.074 27.9307 21.074C27.419 21.074 27.0042 21.4886 27.0042 22.0001C27.0042 22.5115 27.419 22.9261 27.9307 22.9261Z"
                                fill="#447294"
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.3, duration: 0.4, ease: "backOut" }}
                                filter="url(#glow)"
                            />

                            {/* Dot 2 - Green */}
                            <motion.path
                                d="M22.8513 22.9261C23.363 22.9261 23.7779 22.5115 23.7779 22.0001C23.7779 21.4886 23.363 21.074 22.8513 21.074C22.3396 21.074 21.9248 21.4886 21.9248 22.0001C21.9248 22.5115 22.3396 22.9261 22.8513 22.9261Z"
                                fill="#A9BD75"
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.5, duration: 0.4, ease: "backOut" }}
                                filter="url(#glow)"
                            />

                            {/* Dot 3 - Light Green */}
                            <motion.path
                                d="M17.7732 22.9261C18.2849 22.9261 18.6997 22.5115 18.6997 22.0001C18.6997 21.4886 18.2849 21.074 17.7732 21.074C17.2614 21.074 16.8466 21.4886 16.8466 22.0001C16.8466 22.5115 17.2614 22.9261 17.7732 22.9261Z"
                                fill="#8EF4AE"
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.7, duration: 0.4, ease: "backOut" }}
                                filter="url(#glow)"
                            />

                            {/* Main C Shape - Draw in with path animation */}
                            <motion.path
                                d="M33.7875 25.8604C32.2673 25.8604 30.9234 26.5583 30.1046 27.6271L30.0948 27.6197C28.4179 29.7793 25.7974 31.1702 22.8526 31.1702C21.8379 31.1702 20.8624 31.0055 19.9505 30.7005C18.7045 32.3061 15.4378 32.1231 15.4378 32.1231C15.871 31.629 16.9714 29.7927 16.9787 29.0399C14.9665 27.3586 13.6875 24.8294 13.6875 22.0012C13.6875 16.9378 17.7902 12.8322 22.8513 12.8322C25.6983 12.8322 28.2417 14.1316 29.9234 16.168C29.9246 16.1692 29.9259 16.1704 29.9259 16.1716C30.0581 16.3327 30.1854 16.4974 30.3065 16.667C31.1352 17.5967 32.386 18.1884 33.7875 18.1884C36.2819 18.1884 38.3039 16.3107 38.3039 13.995C38.3039 13.1629 38.0714 12.3674 37.6197 11.7159C34.3689 7.05145 28.9663 4 22.8513 4C12.9139 4 4.85901 12.0587 4.85901 22C4.85901 31.9413 12.9139 40 22.8513 40C28.9516 40 34.3444 36.962 37.5965 32.3159L37.5904 32.3122C38.0408 31.6595 38.3015 30.8847 38.3015 30.0526C38.3015 27.7369 36.2795 25.8591 33.785 25.8591L33.7875 25.8604Z"
                                fill="#235e9a"
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{ pathLength: 1, opacity: 1 }}
                                transition={{ delay: 0.9, duration: 1.5, ease: "easeInOut" }}
                                stroke="#235e9a"
                                strokeWidth="0.5"
                                filter="url(#glow)"
                            />

                        </svg>
                    </motion.div>

                    {/* LIQUID PROGRESS BAR */}
                    <motion.div
                        className="mt-8 w-32 h-1.5 bg-blue-100/50 rounded-full overflow-hidden relative backdrop-blur-sm"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                    >
                        {/* Liquid Fill */}
                        <motion.div
                            className="h-full relative rounded-full"
                            style={{
                                background: "linear-gradient(90deg, #22d3ee 0%, #3b82f6 50%, #22d3ee 100%)",
                                backgroundSize: "200% 100%",
                                boxShadow: "0 0 10px rgba(34, 211, 238, 0.6)"
                            }}
                            initial={{ width: "0%" }}
                            animate={{
                                width: "100%",
                                backgroundPosition: ["100% 0%", "-100% 0%"]
                            }}
                            transition={{
                                width: { duration: 2.5, ease: "easeInOut", delay: 0.8 },
                                backgroundPosition: { duration: 2, repeat: Infinity, ease: "linear" }
                            }}
                        >
                            {/* Shimmer Overlay */}
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                                animate={{ x: ["-100%", "100%"] }}
                                transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                            />
                        </motion.div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
