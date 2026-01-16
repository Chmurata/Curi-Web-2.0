import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { assets } from "./Imports";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Smooth spring physics for butter-smooth scrolling
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Background images - scale down slightly (smoother range), NO FADE OUT
  // Adjusted timing to [0, 0.15] because section is much taller now
  const bgScale = useTransform(smoothProgress, [0, 0.15], [1, 0.9]);
  // const bgOpacity = useTransform(smoothProgress, [0.1, 0.5], [1, 0]); // Removed fade out

  // Phone moves up smoothly - reaches final position showing bottom portion
  const phoneY = useTransform(smoothProgress, [0, 0.6], ["0vh", "-165vh"]);

  // Collapse Avatars INWARDS behind the phone
  // Left side moves RIGHT (+)
  // Mobile/Tablet/Desktop distinct values to prevent overshooting
  const moveRightOuter = useTransform(smoothProgress, [0, 0.25], ["0%", isMobile ? "60%" : isTablet ? "100%" : "150%"]);
  const moveRightInner = useTransform(smoothProgress, [0, 0.25], ["0%", isMobile ? "30%" : isTablet ? "50%" : "80%"]);

  // Right side moves LEFT (-)
  const moveLeftInner = useTransform(smoothProgress, [0, 0.25], ["0%", isMobile ? "-30%" : isTablet ? "-50%" : "-80%"]);
  const moveLeftOuter = useTransform(smoothProgress, [0, 0.25], ["0%", isMobile ? "-60%" : isTablet ? "-100%" : "-150%"]);

  // Shrink phone by 10% as it moves up to create more room
  const phoneScale = useTransform(smoothProgress, [0, 0.3], [1, 0.9]);

  // Initial animation for phone (removed scale to avoid conflict with scroll scale)
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
      className="relative h-[300vh] md:h-[360vh] w-full"
    >
      {/* Sticky container - phone stays sticky showing bottom portion */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center pt-16 md:pt-0 overflow-visible z-[50] pointer-events-none">

        {/* The 4 Images - Layered Behind Phone with individual animations */}
        {/* Moves WITH the phone now (using phoneY) */}
        <motion.div
          style={{ scale: bgScale, y: phoneY }}
          className="absolute flex items-center justify-center w-full max-w-7xl z-[30] will-change-transform"
        >
          <div className="relative w-full h-[400px] md:h-[700px] flex items-center justify-center">
            {/* All 4 images in a horizontal row with layering */}
            <div className="absolute flex items-center justify-center gap-0">
              {/* Outer left image - furthest back */}
              <motion.img
                src={assets.heroImg1}
                className="w-40 h-40 md:w-44 md:h-44 lg:w-60 lg:h-60 rounded-2xl md:rounded-3xl shadow-md object-cover relative z-0"
                style={{ marginRight: isTablet ? '-40px' : '-24px', x: moveRightOuter }}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.7, ease: "easeOut" }}
              />

              {/* Inner left image - behind phone */}
              <motion.img
                src={assets.heroImg2}
                className="w-48 h-48 md:w-56 md:h-56 lg:w-72 lg:h-72 rounded-2xl md:rounded-3xl shadow-md object-cover relative z-[5]"
                style={{ marginRight: isTablet ? '-30px' : '-24px', x: moveRightInner }}
                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.35, duration: 0.7, ease: "easeOut" }}
              />

              {/* Phone spacer */}
              <div className="w-[200px] md:w-[260px] lg:w-[360px] relative z-10" />

              {/* Inner right image - behind phone */}
              <motion.img
                src={assets.heroImg3}
                className="w-48 h-48 md:w-56 md:h-56 lg:w-72 lg:h-72 rounded-2xl md:rounded-3xl shadow-md object-cover relative z-[5]"
                style={{ marginLeft: isTablet ? '-30px' : '-24px', x: moveLeftInner }}
                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.45, duration: 0.7, ease: "easeOut" }}
              />

              {/* Outer right image - furthest back */}
              <motion.img
                src={assets.heroImg4}
                className="w-40 h-40 md:w-44 md:h-44 lg:w-60 lg:h-60 rounded-2xl md:rounded-3xl shadow-md object-cover relative z-0"
                style={{ marginLeft: isTablet ? '-40px' : '-24px', x: moveLeftOuter }}
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
          style={{ y: phoneY, scale: phoneScale }}
          className="relative z-[50] w-[216px] h-[414px] md:w-[260px] md:h-[500px] lg:w-[308px] lg:h-[591px] bg-black rounded-[36px] shadow-2xl border-8 border-black overflow-hidden will-change-transform"
        >
          <img
            src={assets.heroPhoneBg}
            alt="App Interface"
            className="w-full h-full object-cover"
            style={{ objectPosition: 'center 30%' }}
          />
          {/* Standardized Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-black w-[80px] h-[24px] rounded-b-[12px] z-20" />
        </motion.div>

      </div>
    </section>
  );
}

