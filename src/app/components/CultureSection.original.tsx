import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useInView } from "motion/react";
import { RoundedArrowButton } from "./ui/RoundedArrowButton";

const headlineWords = [
  "Move", "values", "off", "the", "wall", "-",
  "\n",
  "and", "into", "every", "conversation."
];

export function CultureSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // "Culture Realized" big text - rises up from below
  const bigTextY = useTransform(scrollYProgress, isMobile ? [0, 0.7] : [0, 0.5], [isMobile ? 500 : 0, 0]);
  const bigTextOpacity = useTransform(scrollYProgress, [0, 0.4], [0.3, 0.7]);
  const bigTextMobileOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  // "Culture Realized" shrinks as content block appears
  const bigTextScale = useTransform(scrollYProgress, isMobile ? [0.6, 0.9] : [0.4, 0.85], [1, 0.75]);

  // Content block (headline + cards + CTA) all come in together
  const contentY = useTransform(scrollYProgress, isMobile ? [0.6, 0.9] : [0.4, 0.85], [600, 0]);

  // Word-by-word headline animation
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const headlineInView = useInView(headlineRef, { once: true, amount: 0.5 });

  // 4 speech bubbles — parallax depth layers, rise from bottom with scale + rotation
  // Bubble A: right, top — closest layer (fastest), salmon pink
  const bAY = useTransform(scrollYProgress, isMobile ? [0.52, 0.66, 0.78, 0.92] : [0.28, 0.46, 0.66, 0.85], [550, 0, 0, -220]);
  const bAX = useTransform(scrollYProgress, isMobile ? [0.52, 0.92] : [0.28, 0.85], [40, -60]);
  const bAOpacity = useTransform(scrollYProgress, isMobile ? [0.52, 0.62, 0.82, 0.92] : [0.28, 0.40, 0.68, 0.85], [0, 0.2, 0.2, 0]);
  const bAScale = useTransform(scrollYProgress, isMobile ? [0.52, 0.92] : [0.28, 0.85], [1, 0.5]);
  const bARotate = useTransform(scrollYProgress, isMobile ? [0.52, 0.92] : [0.28, 0.85], [-6, 12]);

  // Bubble B: left, upper-mid — mid layer, lavender
  const bBY = useTransform(scrollYProgress, isMobile ? [0.56, 0.70, 0.80, 0.94] : [0.32, 0.50, 0.68, 0.88], [600, 0, 0, -160]);
  const bBX = useTransform(scrollYProgress, isMobile ? [0.56, 0.94] : [0.32, 0.88], [-30, 50]);
  const bBOpacity = useTransform(scrollYProgress, isMobile ? [0.56, 0.66, 0.84, 0.94] : [0.32, 0.44, 0.70, 0.88], [0, 0.18, 0.18, 0]);
  const bBScale = useTransform(scrollYProgress, isMobile ? [0.56, 0.94] : [0.32, 0.88], [1, 0.55]);
  const bBRotate = useTransform(scrollYProgress, isMobile ? [0.56, 0.94] : [0.32, 0.88], [4, -8]);

  // Bubble C: right, lower-mid — far layer (slowest), teal
  const bCY = useTransform(scrollYProgress, isMobile ? [0.60, 0.74, 0.84, 0.96] : [0.36, 0.54, 0.72, 0.90], [480, 0, 0, -100]);
  const bCX = useTransform(scrollYProgress, isMobile ? [0.60, 0.96] : [0.36, 0.90], [25, -35]);
  const bCOpacity = useTransform(scrollYProgress, isMobile ? [0.60, 0.70, 0.86, 0.96] : [0.36, 0.48, 0.74, 0.90], [0, 0.15, 0.15, 0]);
  const bCScale = useTransform(scrollYProgress, isMobile ? [0.60, 0.96] : [0.36, 0.90], [1, 0.6]);
  const bCRotate = useTransform(scrollYProgress, isMobile ? [0.60, 0.96] : [0.36, 0.90], [-3, 6]);

  // Bubble D: left, bottom — mid-close layer, amber
  const bDY = useTransform(scrollYProgress, isMobile ? [0.58, 0.72, 0.82, 0.95] : [0.34, 0.52, 0.70, 0.88], [620, 0, 0, -180]);
  const bDX = useTransform(scrollYProgress, isMobile ? [0.58, 0.95] : [0.34, 0.88], [-45, 40]);
  const bDOpacity = useTransform(scrollYProgress, isMobile ? [0.58, 0.68, 0.84, 0.95] : [0.34, 0.46, 0.72, 0.88], [0, 0.2, 0.2, 0]);
  const bDScale = useTransform(scrollYProgress, isMobile ? [0.58, 0.95] : [0.34, 0.88], [1, 0.5]);
  const bDRotate = useTransform(scrollYProgress, isMobile ? [0.58, 0.95] : [0.34, 0.88], [5, -10]);

  return (
    <section

      ref={containerRef}
      // Reduced height to remove deadzone (Option A)
      className="relative h-[150vh] w-full -mt-[250vh] md:-mt-[280vh] mb-[15vh] md:mb-[20vh]"
    >
      {/* Sticky container at bottom of viewport initially, then centers */}
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-visible pb-0">

        {/* 4 decorative speech bubbles — parallax rise with shrink + rotation */}
        {/* Bubble A: right, top — salmon pink (hero avatar 1) */}
        <motion.div
          style={{ x: bAX, y: bAY, opacity: bAOpacity, scale: bAScale, rotate: bARotate }}
          className="absolute right-[8%] top-[16%] z-[2] pointer-events-none hidden md:block"
        >
          <svg width="136" height="136" viewBox="0 0 50 50" fill="none">
            <g transform="translate(50,0) scale(-1,1)">
              <path d="M 25 4.0625 C 12.414063 4.0625 2.0625 12.925781 2.0625 24 C 2.0625 30.425781 5.625 36.09375 11 39.71875 C 10.992188 39.933594 11 40.265625 10.71875 41.3125 C 10.371094 42.605469 9.683594 44.4375 8.25 46.46875 L 7.21875 47.90625 L 9 47.9375 C 15.175781 47.964844 18.753906 43.90625 19.3125 43.25 C 21.136719 43.65625 23.035156 43.9375 25 43.9375 C 37.582031 43.9375 47.9375 35.074219 47.9375 24 C 47.9375 12.925781 37.582031 4.0625 25 4.0625 Z" fill="#F2ADA7" stroke="#E8938C" strokeWidth="0.8" />
            </g>
          </svg>
        </motion.div>

        {/* Bubble B: left, upper-mid — lavender (activation avatars) */}
        <motion.div
          style={{ x: bBX, y: bBY, opacity: bBOpacity, scale: bBScale, rotate: bBRotate }}
          className="absolute left-[5%] top-[36%] z-[2] pointer-events-none hidden md:block"
        >
          <svg width="114" height="114" viewBox="0 0 50 50" fill="none">
            <path d="M 25 4.0625 C 12.414063 4.0625 2.0625 12.925781 2.0625 24 C 2.0625 30.425781 5.625 36.09375 11 39.71875 C 10.992188 39.933594 11 40.265625 10.71875 41.3125 C 10.371094 42.605469 9.683594 44.4375 8.25 46.46875 L 7.21875 47.90625 L 9 47.9375 C 15.175781 47.964844 18.753906 43.90625 19.3125 43.25 C 21.136719 43.65625 23.035156 43.9375 25 43.9375 C 37.582031 43.9375 47.9375 35.074219 47.9375 24 C 47.9375 12.925781 37.582031 4.0625 25 4.0625 Z" fill="#C4B8DC" stroke="#B0A2CC" strokeWidth="0.8" />
          </svg>
        </motion.div>

        {/* Bubble C: right, lower-mid — teal (footer avatars) */}
        <motion.div
          style={{ x: bCX, y: bCY, opacity: bCOpacity, scale: bCScale, rotate: bCRotate }}
          className="absolute right-[10%] top-[58%] z-[2] pointer-events-none hidden md:block"
        >
          <svg width="100" height="100" viewBox="0 0 50 50" fill="none">
            <g transform="translate(50,0) scale(-1,1)">
              <path d="M 25 4.0625 C 12.414063 4.0625 2.0625 12.925781 2.0625 24 C 2.0625 30.425781 5.625 36.09375 11 39.71875 C 10.992188 39.933594 11 40.265625 10.71875 41.3125 C 10.371094 42.605469 9.683594 44.4375 8.25 46.46875 L 7.21875 47.90625 L 9 47.9375 C 15.175781 47.964844 18.753906 43.90625 19.3125 43.25 C 21.136719 43.65625 23.035156 43.9375 25 43.9375 C 37.582031 43.9375 47.9375 35.074219 47.9375 24 C 47.9375 12.925781 37.582031 4.0625 25 4.0625 Z" fill="#7CC5C0" stroke="#62B0AA" strokeWidth="0.8" />
            </g>
          </svg>
        </motion.div>

        {/* Bubble D: left, bottom — warm amber (activation avatar) */}
        <motion.div
          style={{ x: bDX, y: bDY, opacity: bDOpacity, scale: bDScale, rotate: bDRotate }}
          className="absolute left-[3%] top-[74%] z-[2] pointer-events-none hidden md:block"
        >
          <svg width="122" height="122" viewBox="0 0 50 50" fill="none">
            <path d="M 25 4.0625 C 12.414063 4.0625 2.0625 12.925781 2.0625 24 C 2.0625 30.425781 5.625 36.09375 11 39.71875 C 10.992188 39.933594 11 40.265625 10.71875 41.3125 C 10.371094 42.605469 9.683594 44.4375 8.25 46.46875 L 7.21875 47.90625 L 9 47.9375 C 15.175781 47.964844 18.753906 43.90625 19.3125 43.25 C 21.136719 43.65625 23.035156 43.9375 25 43.9375 C 37.582031 43.9375 47.9375 35.074219 47.9375 24 C 47.9375 12.925781 37.582031 4.0625 25 4.0625 Z" fill="#F0CFA0" stroke="#E0BC88" strokeWidth="0.8" />
          </svg>
        </motion.div>

        {/* Background Title - Culture Realized - shrinks as content appears */}
        <motion.div
          style={{ y: bigTextY, opacity: isMobile ? bigTextMobileOpacity : bigTextOpacity, scale: bigTextScale }}
          className="relative z-[1] pointer-events-none select-none text-center -mt-[15vh] mb-[1vh] md:mt-0 md:-mb-[2vh]"
        >
          <h1
            className="font-bold leading-[0.85] tracking-tighter text-[#a8c5d8]"
            style={{
              fontFamily: '"Bricolage Grotesque", sans-serif',
              fontSize: 'clamp(6rem, 18vw, 15rem)'
            }}
          >
            Culture
            <br />
            Realized
          </h1>
        </motion.div>

        {/* Content Block - all animates in together */}
        <motion.div
          style={{ y: contentY }}
          className="relative z-[60] max-w-4xl text-center px-6 flex flex-col items-center -mt-2 md:-mt-4"
        >

          {/* Combined Headline - word-by-word reveal */}
          <h2
            ref={headlineRef}
            className="font-bold text-[#0b1220] font-['Bricolage_Grotesque'] leading-tight flex flex-wrap justify-center"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.75rem)', marginBottom: 'clamp(1rem, 2vw, 1.5rem)', gap: '0 0.3em' }}
          >
            {headlineWords.map((word, i) =>
              word === "\n" ? (
                <span key={i} className="basis-full h-0" />
              ) : (
                <span key={i} className="inline-block overflow-hidden">
                  <motion.span
                    className="inline-block"
                    initial={{ y: "100%", opacity: 0 }}
                    animate={headlineInView ? { y: "0%", opacity: 1 } : { y: "100%", opacity: 0 }}
                    transition={{
                      duration: 0.5,
                      ease: [0.25, 0.1, 0.25, 1],
                      delay: i * 0.025
                    }}
                  >
                    {word}
                  </motion.span>
                </span>
              )
            )}
          </h2>

          {/* 3 Frosted Glass Cards */}
          <div
            className="flex flex-col gap-3 w-full font-['Bricolage_Grotesque'] text-[#3b4558] leading-relaxed"
            style={{ fontSize: 'clamp(1rem, 1.25vw, 1.125rem)' }}
          >
            <div className="rounded-2xl bg-white/40 backdrop-blur-sm border border-white/60 px-6 py-4 text-left">
              Curi helps your leaders and teams <span className="font-bold">say the hard thing—safely</span>.
            </div>

            <div className="rounded-2xl bg-white/40 backdrop-blur-sm border border-white/60 px-6 py-4 text-left">
              It brings your values into daily communication, <span className="font-bold">raises accountability</span>,
              and turns vague "I'll try" into clear commitments.
            </div>

            <div className="rounded-2xl bg-white/40 backdrop-blur-sm border border-white/60 px-6 py-4 text-left">
              <span className="font-bold">Then it does the part you can't scale:</span> a coach in the moment that helps people rephrase, align, and follow through.
            </div>
          </div>

          <div style={{ marginTop: 'clamp(1.5rem, 2vw, 2rem)' }}>
            <RoundedArrowButton>Book a Demo</RoundedArrowButton>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
