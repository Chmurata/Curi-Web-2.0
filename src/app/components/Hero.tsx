import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { assets } from "./Imports";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Use scrollYProgress directly (no spring) for snappy, performant scrolling
  // Background images - scale down slightly
  const bgScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.9]);

  // Phone moves up smoothly - reaches final position showing bottom portion
  const phoneY = useTransform(scrollYProgress, [0, 0.7], ["0vh", "-165vh"]);

  // Collapse Avatars INWARDS behind the phone
  const moveRightOuter = useTransform(scrollYProgress, [0, 0.25], ["0%", "100%"]);
  const moveRightInner = useTransform(scrollYProgress, [0, 0.25], ["0%", "50%"]);
  const moveLeftInner = useTransform(scrollYProgress, [0, 0.25], ["0%", "-50%"]);
  const moveLeftOuter = useTransform(scrollYProgress, [0, 0.25], ["0%", "-100%"]);

  // Shrink phone by 10% as it moves up
  const phoneScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.9]);

  // Initial animation for phone
  const phoneVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" as const }
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative h-[200vh] md:h-[360vh] w-full"
    >
      {/* Sticky container */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center pt-16 md:pt-0 overflow-visible z-[50] pointer-events-none"
        style={{
          willChange: 'transform',
          contain: 'layout style paint',
        }}
      >

        {/* The 4 Images - Layered Behind Phone */}
        <motion.div
          style={{
            scale: bgScale,
            y: phoneY,
            willChange: 'transform',
            backfaceVisibility: 'hidden',
            perspective: 1000,
          }}
          className="absolute flex items-center justify-center w-full max-w-7xl z-[30]"
        >
          {/* Fluid height container */}
          <div
            className="relative w-full flex items-center justify-center"
            style={{ height: 'clamp(400px, 55vw, 700px)' }}
          >
            {/* All 4 images in a horizontal row */}
            <div className="absolute flex items-center justify-center gap-0">
              {/* Outer left image */}
              <motion.img
                src={assets.heroImg1}
                className="rounded-2xl md:rounded-3xl shadow-md object-cover relative z-0"
                style={{
                  width: 'clamp(180px, 18vw, 240px)',
                  height: 'clamp(180px, 18vw, 240px)',
                  marginRight: 'clamp(-40px, -3vw, -20px)',
                  x: moveRightOuter,
                  willChange: 'transform',
                  backfaceVisibility: 'hidden',
                }}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.7, ease: "easeOut" }}
                loading="eager"
                decoding="async"
              />

              {/* Inner left image */}
              <motion.img
                src={assets.heroImg2}
                className="rounded-2xl md:rounded-3xl shadow-md object-cover relative z-[5]"
                style={{
                  width: 'clamp(220px, 23vw, 290px)',
                  height: 'clamp(220px, 23vw, 290px)',
                  marginRight: 'clamp(-35px, -2.5vw, -20px)',
                  x: moveRightInner,
                  willChange: 'transform',
                  backfaceVisibility: 'hidden',
                }}
                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.35, duration: 0.7, ease: "easeOut" }}
                loading="eager"
                decoding="async"
              />

              {/* Phone spacer */}
              <div
                className="relative z-10"
                style={{ width: 'clamp(240px, 28vw, 360px)' }}
              />

              {/* Inner right image */}
              <motion.img
                src={assets.heroImg3}
                className="rounded-2xl md:rounded-3xl shadow-md object-cover relative z-[5]"
                style={{
                  width: 'clamp(220px, 23vw, 290px)',
                  height: 'clamp(220px, 23vw, 290px)',
                  marginLeft: 'clamp(-35px, -2.5vw, -20px)',
                  x: moveLeftInner,
                  willChange: 'transform',
                  backfaceVisibility: 'hidden',
                }}
                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.45, duration: 0.7, ease: "easeOut" }}
                loading="eager"
                decoding="async"
              />

              {/* Outer right image */}
              <motion.img
                src={assets.heroImg4}
                className="rounded-2xl md:rounded-3xl shadow-md object-cover relative z-0"
                style={{
                  width: 'clamp(180px, 18vw, 240px)',
                  height: 'clamp(180px, 18vw, 240px)',
                  marginLeft: 'clamp(-40px, -3vw, -20px)',
                  x: moveLeftOuter,
                  willChange: 'transform',
                  backfaceVisibility: 'hidden',
                }}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.55, duration: 0.7, ease: "easeOut" }}
                loading="eager"
                decoding="async"
              />
            </div>
          </div>
        </motion.div>

        {/* The Main Phone */}
        <motion.div
          variants={phoneVariants}
          initial="hidden"
          animate="visible"
          style={{
            y: phoneY,
            scale: phoneScale,
            willChange: 'transform',
            backfaceVisibility: 'hidden',
          }}
          className="relative z-[50] bg-black rounded-[36px] shadow-2xl border-8 border-black overflow-hidden"
        >
          <div
            style={{
              width: 'clamp(260px, 28vw, 340px)',
              height: 'clamp(497px, 54vw, 650px)'
            }}
          >
            <img
              src={assets.heroPhoneBg}
              alt="App Interface"
              className="w-full h-full object-cover"
              style={{ objectPosition: 'center 30%' }}
              loading="eager"
              decoding="async"
            />
          </div>
          {/* Standardized Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-black w-[80px] h-[24px] rounded-b-[12px] z-20" />
        </motion.div>

      </div>
    </section>
  );
}
