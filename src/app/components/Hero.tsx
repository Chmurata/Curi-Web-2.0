import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { assets } from "./Imports";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth spring physics for butter-smooth scrolling
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Background images - scale down and fade out as user scrolls (smoother range)
  const bgScale = useTransform(smoothProgress, [0, 0.4], [1, 0.85]);
  const bgOpacity = useTransform(smoothProgress, [0.1, 0.5], [1, 0]);

  // Phone moves up smoothly with extended range
  const phoneY = useTransform(smoothProgress, [0, 0.5], ["0vh", "-50vh"]);

  // Initial animation for phone
  const phoneVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut" as const }
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative h-[150vh] md:h-[200vh] w-full"
    >
      {/* Sticky container - phone stays sticky showing bottom portion */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center pt-16 md:pt-0 overflow-visible z-[50]">

        {/* The 4 Images - Layered Behind Phone with individual animations */}
        {/* Moves WITH the phone now (using phoneY) */}
        <motion.div
          style={{ scale: bgScale, opacity: bgOpacity, y: phoneY }}
          className="absolute flex items-center justify-center w-full max-w-7xl z-[30]"
        >
          <div className="relative w-full h-[400px] md:h-[700px] flex items-center justify-center">
            {/* All 4 images in a horizontal row with layering */}
            <div className="absolute flex items-center justify-center gap-0">
              {/* Outer left image - furthest back */}
              <motion.img
                src={assets.heroImg1}
                className="w-40 h-40 md:w-52 md:h-52 lg:w-60 lg:h-60 rounded-2xl md:rounded-3xl shadow-xl object-cover relative z-0"
                style={{ marginRight: '-20px' }}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.7, ease: "easeOut" }}
              />

              {/* Inner left image - behind phone */}
              <motion.img
                src={assets.heroImg2}
                className="w-48 h-48 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-2xl md:rounded-3xl shadow-xl object-cover relative z-[5]"
                style={{ marginRight: '-30px' }}
                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.35, duration: 0.7, ease: "easeOut" }}
              />

              {/* Phone spacer */}
              <div className="w-[200px] md:w-[300px] lg:w-[360px] relative z-10" />

              {/* Inner right image - behind phone */}
              <motion.img
                src={assets.heroImg3}
                className="w-48 h-48 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-2xl md:rounded-3xl shadow-xl object-cover relative z-[5]"
                style={{ marginLeft: '-30px' }}
                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.45, duration: 0.7, ease: "easeOut" }}
              />

              {/* Outer right image - furthest back */}
              <motion.img
                src={assets.heroImg4}
                className="w-40 h-40 md:w-52 md:h-52 lg:w-60 lg:h-60 rounded-2xl md:rounded-3xl shadow-xl object-cover relative z-0"
                style={{ marginLeft: '-20px' }}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.55, duration: 0.7, ease: "easeOut" }}
              />
            </div>
          </div>
        </motion.div>

        {/* The Main Phone - Moves up on scroll, eventually only bottom 20% visible */}
        <motion.div
          variants={phoneVariants}
          initial="hidden"
          animate="visible"
          style={{ y: phoneY }}
          className="relative z-[50] w-[240px] h-[460px] md:w-[342px] md:h-[657px] bg-black rounded-[40px] shadow-2xl border-8 border-black overflow-hidden"
        >
          <img
            src={assets.heroPhoneBg}
            alt="App Interface"
            className="w-full h-full object-cover"
            style={{ objectPosition: 'center 30%' }}
          />
        </motion.div>

      </div>
    </section>
  );
}

