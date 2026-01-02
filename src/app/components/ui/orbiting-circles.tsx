import { motion } from "motion/react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import React from "react";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface OrbitingCirclesProps {
  className?: string;
  children?: React.ReactNode;
  reverse?: boolean;
  duration?: number;
  radius?: number;
  path?: boolean;
  iconSize?: number;
  speed?: number;
}

export function OrbitingCircles({
  className,
  children,
  reverse,
  duration = 20,
  radius = 50,
  path = true,
  iconSize = 30,
  speed = 1,
}: OrbitingCirclesProps) {
  const calculatedDuration = duration / speed;
  
  // Distribute children
  const childrenArray = React.Children.toArray(children);
  const count = childrenArray.length;

  return (
    <>
      {path && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          className="pointer-events-none absolute inset-0 size-full"
        >
          <circle
            className="stroke-black/10 stroke-1 dark:stroke-white/10"
            cx="50%"
            cy="50%"
            r={radius}
            fill="none"
            strokeDasharray="4 4"
          />
        </svg>
      )}

      <div className={cn("absolute inset-0 size-full", className)}>
        {childrenArray.map((child, index) => {
           const angle = (360 / count) * index;
           return (
            <motion.div
              key={index}
              className="absolute flex items-center justify-center top-1/2 left-1/2"
              initial={{ rotate: angle }}
              animate={{
                rotate: reverse ? [angle, angle - 360] : [angle, angle + 360],
              }}
              transition={{
                duration: calculatedDuration,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                 width: iconSize,
                 height: iconSize,
                 marginLeft: -iconSize/2,
                 marginTop: -iconSize/2,
              }}
            >
              <div 
                 style={{ 
                    transform: `translateX(${radius}px)`,
                    width: iconSize,
                    height: iconSize
                 }}
              >
                 <motion.div
                   className="size-full flex items-center justify-center"
                   initial={{ rotate: -angle }}
                   animate={{
                      rotate: reverse ? [-angle, -angle + 360] : [-angle, -angle - 360]
                   }}
                   transition={{
                      duration: calculatedDuration,
                      repeat: Infinity,
                      ease: "linear",
                   }}
                 >
                    {child}
                 </motion.div>
              </div>
            </motion.div>
           );
        })}
      </div>
    </>
  );
}
