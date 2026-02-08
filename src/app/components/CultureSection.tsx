import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, useInView } from "motion/react";
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

  // Add spring for smoother animation
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // "Culture Realized" big text - rises up from below
  const bigTextY = useTransform(smoothProgress, isMobile ? [0, 0.7] : [0, 0.5], [isMobile ? 500 : 0, 0]);
  const bigTextOpacity = useTransform(smoothProgress, [0, 0.4], [0.3, 0.7]);
  const bigTextMobileOpacity = useTransform(smoothProgress, [0, 0.1], [0, 1]);

  // "Culture Realized" shrinks as content block appears
  const bigTextScale = useTransform(smoothProgress, isMobile ? [0.6, 0.9] : [0.4, 0.85], [1, 0.75]);

  // Content block (headline + cards + CTA) all come in together
  const contentY = useTransform(smoothProgress, isMobile ? [0.6, 0.9] : [0.4, 0.85], [600, 0]);

  // Word-by-word headline animation
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const headlineInView = useInView(headlineRef, { once: true, amount: 0.5 });

  // 4 speech bubbles — parallax depth layers, rise from bottom with scale + rotation
  // Bubble A: right, top — closest layer (fastest), salmon pink
  const bAY = useTransform(smoothProgress, isMobile ? [0.52, 0.66, 0.78, 0.92] : [0.28, 0.46, 0.66, 0.85], [550, 0, 0, -220]);
  const bAX = useTransform(smoothProgress, isMobile ? [0.52, 0.92] : [0.28, 0.85], [40, -60]);
  const bAOpacity = useTransform(smoothProgress, isMobile ? [0.52, 0.62, 0.82, 0.92] : [0.28, 0.40, 0.68, 0.85], [0, 0.5, 0.5, 0]);
  const bAScale = useTransform(smoothProgress, isMobile ? [0.52, 0.92] : [0.28, 0.85], [1, 0.5]);
  const bARotate = useTransform(smoothProgress, isMobile ? [0.52, 0.92] : [0.28, 0.85], [-6, 12]);

  // Bubble B: left, upper-mid — mid layer, lavender
  const bBY = useTransform(smoothProgress, isMobile ? [0.56, 0.70, 0.80, 0.94] : [0.32, 0.50, 0.68, 0.88], [600, 0, 0, -160]);
  const bBX = useTransform(smoothProgress, isMobile ? [0.56, 0.94] : [0.32, 0.88], [-30, 50]);
  const bBOpacity = useTransform(smoothProgress, isMobile ? [0.56, 0.66, 0.84, 0.94] : [0.32, 0.44, 0.70, 0.88], [0, 0.45, 0.45, 0]);
  const bBScale = useTransform(smoothProgress, isMobile ? [0.56, 0.94] : [0.32, 0.88], [1, 0.55]);
  const bBRotate = useTransform(smoothProgress, isMobile ? [0.56, 0.94] : [0.32, 0.88], [4, -8]);

  // Bubble C: right, lower-mid — far layer (slowest), teal
  const bCY = useTransform(smoothProgress, isMobile ? [0.60, 0.74, 0.84, 0.96] : [0.36, 0.54, 0.72, 0.90], [480, 0, 0, -100]);
  const bCX = useTransform(smoothProgress, isMobile ? [0.60, 0.96] : [0.36, 0.90], [25, -35]);
  const bCOpacity = useTransform(smoothProgress, isMobile ? [0.60, 0.70, 0.86, 0.96] : [0.36, 0.48, 0.74, 0.90], [0, 0.4, 0.4, 0]);
  const bCScale = useTransform(smoothProgress, isMobile ? [0.60, 0.96] : [0.36, 0.90], [1, 0.6]);
  const bCRotate = useTransform(smoothProgress, isMobile ? [0.60, 0.96] : [0.36, 0.90], [-3, 6]);

  // Bubble D: left, bottom — mid-close layer, amber
  const bDY = useTransform(smoothProgress, isMobile ? [0.58, 0.72, 0.82, 0.95] : [0.34, 0.52, 0.70, 0.88], [620, 0, 0, -180]);
  const bDX = useTransform(smoothProgress, isMobile ? [0.58, 0.95] : [0.34, 0.88], [-45, 40]);
  const bDOpacity = useTransform(smoothProgress, isMobile ? [0.58, 0.68, 0.84, 0.95] : [0.34, 0.46, 0.72, 0.88], [0, 0.5, 0.5, 0]);
  const bDScale = useTransform(smoothProgress, isMobile ? [0.58, 0.95] : [0.34, 0.88], [1, 0.5]);
  const bDRotate = useTransform(smoothProgress, isMobile ? [0.58, 0.95] : [0.34, 0.88], [5, -10]);

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
          <svg width="124" height="55" viewBox="0 0 200 80" fill="none">
            <path d="M24 0H176C189.25 0 200 10.75 200 24V48C200 61.25 189.25 72 176 72C172 72 172 74 176 80L160 72H24C10.75 72 0 61.25 0 48V24C0 10.75 10.75 0 24 0Z" fill="#F2ADA7" stroke="#E8938C" strokeWidth="1.5" />
          </svg>
        </motion.div>

        {/* Bubble B: left, upper-mid — lavender (activation avatars) */}
        <motion.div
          style={{ x: bBX, y: bBY, opacity: bBOpacity, scale: bBScale, rotate: bBRotate }}
          className="absolute left-[5%] top-[36%] z-[2] pointer-events-none hidden md:block"
        >
          <svg width="104" height="47" viewBox="0 0 200 80" fill="none">
            <path d="M24 0H176C189.25 0 200 10.75 200 24V48C200 61.25 189.25 72 176 72H40L24 80C28 74 28 72 24 72C10.75 72 0 61.25 0 48V24C0 10.75 10.75 0 24 0Z" fill="#C4B8DC" stroke="#B0A2CC" strokeWidth="1.5" />
          </svg>
        </motion.div>

        {/* Bubble C: right, lower-mid — teal (footer avatars) */}
        <motion.div
          style={{ x: bCX, y: bCY, opacity: bCOpacity, scale: bCScale, rotate: bCRotate }}
          className="absolute right-[10%] top-[58%] z-[2] pointer-events-none hidden md:block"
        >
          <svg width="91" height="42" viewBox="0 0 200 80" fill="none">
            <path d="M24 0H176C189.25 0 200 10.75 200 24V48C200 61.25 189.25 72 176 72C172 72 172 74 176 80L160 72H24C10.75 72 0 61.25 0 48V24C0 10.75 10.75 0 24 0Z" fill="#7CC5C0" stroke="#62B0AA" strokeWidth="1.5" />
          </svg>
        </motion.div>

        {/* Bubble D: left, bottom — warm amber (activation avatar) */}
        <motion.div
          style={{ x: bDX, y: bDY, opacity: bDOpacity, scale: bDScale, rotate: bDRotate }}
          className="absolute left-[3%] top-[74%] z-[2] pointer-events-none hidden md:block"
        >
          <svg width="111" height="49" viewBox="0 0 200 80" fill="none">
            <path d="M24 0H176C189.25 0 200 10.75 200 24V48C200 61.25 189.25 72 176 72H40L24 80C28 74 28 72 24 72C10.75 72 0 61.25 0 48V24C0 10.75 10.75 0 24 0Z" fill="#F0CFA0" stroke="#E0BC88" strokeWidth="1.5" />
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
                      delay: i * 0.06
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
