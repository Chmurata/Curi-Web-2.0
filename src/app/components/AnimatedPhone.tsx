import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import clsx from "clsx";

interface AnimatedPhoneProps {
    src: string;
    className?: string;
    priority?: boolean;
}

export function AnimatedPhone({ src, className, priority = false }: AnimatedPhoneProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    // Parallax & Scale Animation (matching SayDoGapSection/CultureBehaviorSection)
    const phoneScale = useTransform(scrollYProgress, [0.3, 0.7], [0.95, 1.05]);
    const phoneY = useTransform(scrollYProgress, [0.3, 0.7], [30, -30]);

    return (
        <div ref={containerRef} className={clsx("relative flex justify-center", className)}>
            <motion.div
                style={{ scale: phoneScale, y: phoneY }}
                className="relative w-[240px] h-[460px] md:w-[342px] md:h-[657px] bg-black rounded-[40px] shadow-2xl border-8 border-black overflow-hidden will-change-transform transform-gpu"
            >
                <img
                    src={src}
                    className="w-full h-full object-cover"
                    alt="App Interface"
                    loading={priority ? "eager" : "lazy"}
                />
                {/* Standardized Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-black w-[80px] h-[24px] rounded-b-[12px] z-20" />
            </motion.div>
        </div>
    );
}
