import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { assets } from "./Imports";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const bgScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const bgOpacity = useTransform(scrollYProgress, [0.3, 0.8], [1, 0]);
  const bgY = useTransform(scrollYProgress, [0, 0.5], [0, 50]);

  // Initial animation for phone
  const phoneVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative h-[90vh] w-full"
    >
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">

        {/* The 4 Images - Layered Behind Phone */}
        <motion.div
          style={{ scale: bgScale, opacity: bgOpacity, y: bgY }}
          className="absolute flex items-center justify-center w-full max-w-7xl"
        >
          <div className="relative w-full h-[700px] flex items-center justify-center">
            {/* All 4 images in a horizontal row with layering */}
            <div className="absolute flex items-center justify-center gap-0">
              {/* Outer left image - furthest back */}
              <motion.img
                src={assets.heroImg1}
                className="w-60 h-60 rounded-3xl shadow-xl object-cover relative z-0"
                style={{ marginRight: '-30px' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.6 }}
              />

              {/* Inner left image - behind phone */}
              <motion.img
                src={assets.heroImg2}
                className="rounded-3xl shadow-xl object-cover relative z-[5]"
                style={{ marginRight: '-40px', width: '288px', height: '288px' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              />

              {/* Phone spacer - phone will be z-10 */}
              <div className="w-[360px] relative z-10" />

              {/* Inner right image - behind phone */}
              <motion.img
                src={assets.heroImg3}
                className="rounded-3xl shadow-xl object-cover relative z-[5]"
                style={{ marginLeft: '-40px', width: '288px', height: '288px' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              />

              {/* Outer right image - furthest back */}
              <motion.img
                src={assets.heroImg4}
                className="w-60 h-60 rounded-3xl shadow-xl object-cover relative z-0"
                style={{ marginLeft: '-30px' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              />
            </div>
          </div>
        </motion.div>

        {/* The Main Phone - Sticky & On Top */}
        <motion.div
          variants={phoneVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 w-[360px] h-[700px] bg-black rounded-[48px] shadow-2xl border-8 border-black overflow-hidden"
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
