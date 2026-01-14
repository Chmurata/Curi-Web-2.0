import { cn } from "@/app/components/ui/utils";
import { motion } from "motion/react";
import React from "react";

interface InfiniteMarqueeProps {
    children: React.ReactNode;
    direction?: "left" | "right";
    speed?: number; // duration in seconds for one full loop
    className?: string;
    pauseOnHover?: boolean;
}

export const InfiniteMarquee = ({
    children,
    direction = "left",
    speed = 40,
    className,
    pauseOnHover = false,
}: InfiniteMarqueeProps) => {
    return (
        <div
            className={cn("overflow-hidden flex relative w-full h-full items-center", className)}
        >
            <motion.div
                className="flex shrink-0 items-center"
                initial={{ x: direction === "left" ? "0%" : "-50%" }}
                animate={{ x: direction === "left" ? "-50%" : "0%" }}
                transition={{
                    duration: speed,
                    repeat: Infinity,
                    ease: "linear",
                    repeatType: "loop",
                }}
                whileHover={pauseOnHover ? { animationPlayState: "paused" } : undefined}
            >
                <div className="flex shrink-0 items-center gap-8 md:gap-24 lg:gap-[212px] pr-8 md:pr-24 lg:pr-[212px]">
                    {children}
                </div>
                <div className="flex shrink-0 items-center gap-8 md:gap-24 lg:gap-[212px] pr-8 md:pr-24 lg:pr-[212px]">
                    {children}
                </div>
            </motion.div>
        </div>
    );
};
