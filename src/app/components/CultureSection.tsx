import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useInView } from "motion/react";
import { RoundedArrowButton } from "./ui/RoundedArrowButton";

// Card images — one per card
import imgCard1 from "../../assets/9647ae1a36135cbd8ecdd8fb44bc1b36ca0dc953.png";
import imgCard2 from "../../assets/1b9795aeabce1b7e0d44c80dbbfdaa7162d954ca.png";
import imgCard3 from "../../assets/bb121ffb25eaa7ef43ee2974e891a700ec78367c.png";

const headlineWords = [
  "Move", "values", "off", "the", "wall", "-",
  "\n",
  "and", "into", "every", "conversation."
];

export function CultureSection() {
  const CARDS = [
    {
      id: 1,
      body: <>Curi helps your leaders and teams <span className="font-bold">say the hard thing—safely</span>.</>,
      image: imgCard1,
    },
    {
      id: 2,
      body: <>It brings your values into daily communication, <span className="font-bold">raises accountability</span>, and turns vague "I'll try" into clear commitments.</>,
      image: imgCard2,
    },
    {
      id: 3,
      body: <><span className="font-bold">Then it does the part you can't scale:</span> a coach in the moment that helps people rephrase, align, and follow through.</>,
      image: imgCard3,
    },
  ];
  const sectionRef = useRef<HTMLDivElement>(null);
  const deckRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // --- Title shrink ---
  const { scrollYProgress: titleProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.8", "start 0.2"],
  });
  const titleScale = useTransform(titleProgress, [0, 1], isMobile ? [1, 1] : [2.5, 1]);
  const titleOpacity = useTransform(titleProgress, [0, 0.3, 1], isMobile ? [0.7, 0.7, 0.7] : [0.15, 0.4, 0.7]);

  // --- Word-by-word headline ---
  const headlineInView = useInView(headlineRef, { once: true, amount: 0.5 });

  // --- Deck scroll progress (drives card peel animations) ---
  const { scrollYProgress: deckProgress } = useScroll({
    target: deckRef,
    offset: ["start start", "end end"],
  });

  // === Card 1: Front initially, peels away to the right 0.08–0.42 ===
  const c1X = useTransform(deckProgress, [0, 0.08, 0.42], [0, 0, 1500]);
  const c1Rotate = useTransform(deckProgress, [0, 0.08, 0.42], [0, 0, 8]);
  const c1Opacity = useTransform(deckProgress, [0, 1], [1, 1]); // Always 100% opacity

  // === Card 2: Middle → promotes → peels away to the right 0.50–0.84 ===
  const c2X = useTransform(deckProgress, [0, 0.08, 0.42, 0.50, 0.84], [0, 0, 0, 0, 1500]);
  const c2Opacity = useTransform(deckProgress, [0, 1], [1, 1]); // Always 100% opacity
  const c2Rotate = useTransform(deckProgress, [0, 0.50, 0.84], [0, 0, 8]);

  // === Card 3: Back → middle → front ===
  const c3X = useTransform(deckProgress, [0, 1], [0, 0]);
  const c3Opacity = useTransform(deckProgress, [0, 1], [1, 1]); // Always 100% opacity
  const c3Rotate = useTransform(deckProgress, [0, 0.84], [0, 0]);

  // CTA fade-in after final card settles
  const ctaOpacity = useTransform(deckProgress, [0.86, 0.94], [0, 1]);
  const ctaY = useTransform(deckProgress, [0.86, 0.94], [20, 0]);

  const cardTransforms = [
    { x: c1X, rotate: c1Rotate, opacity: c1Opacity },
    { x: c2X, rotate: c2Rotate, opacity: c2Opacity },
    { x: c3X, rotate: c3Rotate, opacity: c3Opacity },
  ];

  // --- Speech bubbles parallax (preserved) ---
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end end"],
  });

  const bAY = useTransform(scrollYProgress, isMobile ? [0.52, 0.66, 0.78, 0.92] : [0.28, 0.46, 0.66, 0.85], [550, 0, 0, -220]);
  const bAX = useTransform(scrollYProgress, isMobile ? [0.52, 0.92] : [0.28, 0.85], [40, -60]);
  const bAOpacity = useTransform(scrollYProgress, isMobile ? [0.52, 0.62, 0.82, 0.92] : [0.28, 0.40, 0.68, 0.85], [0, 0.2, 0.2, 0]);
  const bAScale = useTransform(scrollYProgress, isMobile ? [0.52, 0.92] : [0.28, 0.85], [1, 0.5]);
  const bARotate = useTransform(scrollYProgress, isMobile ? [0.52, 0.92] : [0.28, 0.85], [-6, 12]);

  const bBY = useTransform(scrollYProgress, isMobile ? [0.56, 0.70, 0.80, 0.94] : [0.32, 0.50, 0.68, 0.88], [600, 0, 0, -160]);
  const bBX = useTransform(scrollYProgress, isMobile ? [0.56, 0.94] : [0.32, 0.88], [-30, 50]);
  const bBOpacity = useTransform(scrollYProgress, isMobile ? [0.56, 0.66, 0.84, 0.94] : [0.32, 0.44, 0.70, 0.88], [0, 0.18, 0.18, 0]);
  const bBScale = useTransform(scrollYProgress, isMobile ? [0.56, 0.94] : [0.32, 0.88], [1, 0.55]);
  const bBRotate = useTransform(scrollYProgress, isMobile ? [0.56, 0.94] : [0.32, 0.88], [4, -8]);

  const bCY = useTransform(scrollYProgress, isMobile ? [0.60, 0.74, 0.84, 0.96] : [0.36, 0.54, 0.72, 0.90], [480, 0, 0, -100]);
  const bCX = useTransform(scrollYProgress, isMobile ? [0.60, 0.96] : [0.36, 0.90], [25, -35]);
  const bCOpacity = useTransform(scrollYProgress, isMobile ? [0.60, 0.70, 0.86, 0.96] : [0.36, 0.48, 0.74, 0.90], [0, 0.15, 0.15, 0]);
  const bCScale = useTransform(scrollYProgress, isMobile ? [0.60, 0.96] : [0.36, 0.90], [1, 0.6]);
  const bCRotate = useTransform(scrollYProgress, isMobile ? [0.60, 0.96] : [0.36, 0.90], [-3, 6]);

  const bDY = useTransform(scrollYProgress, isMobile ? [0.58, 0.72, 0.82, 0.95] : [0.34, 0.52, 0.70, 0.88], [620, 0, 0, -180]);
  const bDX = useTransform(scrollYProgress, isMobile ? [0.58, 0.95] : [0.34, 0.88], [-45, 40]);
  const bDOpacity = useTransform(scrollYProgress, isMobile ? [0.58, 0.68, 0.84, 0.95] : [0.34, 0.46, 0.72, 0.88], [0, 0.2, 0.2, 0]);
  const bDScale = useTransform(scrollYProgress, isMobile ? [0.58, 0.95] : [0.34, 0.88], [1, 0.5]);
  const bDRotate = useTransform(scrollYProgress, isMobile ? [0.58, 0.95] : [0.34, 0.88], [5, -10]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full -mt-[180vh] md:-mt-[280vh] mb-[15vh] md:mb-[20vh]"
      style={{ paddingTop: isMobile ? 'clamp(50vh, 55vh, 60vh)' : undefined }}
    >
      {/* --- Speech Bubbles (desktop only) --- */}
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
      <motion.div
        style={{ x: bBX, y: bBY, opacity: bBOpacity, scale: bBScale, rotate: bBRotate }}
        className="absolute left-[5%] top-[36%] z-[2] pointer-events-none hidden md:block"
      >
        <svg width="114" height="114" viewBox="0 0 50 50" fill="none">
          <path d="M 25 4.0625 C 12.414063 4.0625 2.0625 12.925781 2.0625 24 C 2.0625 30.425781 5.625 36.09375 11 39.71875 C 10.992188 39.933594 11 40.265625 10.71875 41.3125 C 10.371094 42.605469 9.683594 44.4375 8.25 46.46875 L 7.21875 47.90625 L 9 47.9375 C 15.175781 47.964844 18.753906 43.90625 19.3125 43.25 C 21.136719 43.65625 23.035156 43.9375 25 43.9375 C 37.582031 43.9375 47.9375 35.074219 47.9375 24 C 47.9375 12.925781 37.582031 4.0625 25 4.0625 Z" fill="#C4B8DC" stroke="#B0A2CC" strokeWidth="0.8" />
        </svg>
      </motion.div>
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
      <motion.div
        style={{ x: bDX, y: bDY, opacity: bDOpacity, scale: bDScale, rotate: bDRotate }}
        className="absolute left-[3%] top-[74%] z-[2] pointer-events-none hidden md:block"
      >
        <svg width="122" height="122" viewBox="0 0 50 50" fill="none">
          <path d="M 25 4.0625 C 12.414063 4.0625 2.0625 12.925781 2.0625 24 C 2.0625 30.425781 5.625 36.09375 11 39.71875 C 10.992188 39.933594 11 40.265625 10.71875 41.3125 C 10.371094 42.605469 9.683594 44.4375 8.25 46.46875 L 7.21875 47.90625 L 9 47.9375 C 15.175781 47.964844 18.753906 43.90625 19.3125 43.25 C 21.136719 43.65625 23.035156 43.9375 25 43.9375 C 37.582031 43.9375 47.9375 35.074219 47.9375 24 C 47.9375 12.925781 37.582031 4.0625 25 4.0625 Z" fill="#F0CFA0" stroke="#E0BC88" strokeWidth="0.8" />
        </svg>
      </motion.div>

      {/* --- "Culture Realized" title --- */}
      <div className="relative z-[1] text-center px-6 overflow-visible">
        <motion.h1
          className="font-bold leading-[0.85] tracking-tighter text-[#a8c5d8] pointer-events-none select-none"
          style={{ scale: titleScale, opacity: titleOpacity, fontFamily: '"Bricolage Grotesque", sans-serif', fontSize: 'clamp(7rem, 22.4vw, 18.2rem)' }}
        >
          Culture
          <br />
          Realized
        </motion.h1>
      </div>

      {/* --- Cascade Stack: Scroll-Driven Card Deck (ALL screen sizes) --- */}
      <div
        ref={deckRef}
        className="relative z-[10] h-[280vh]"
      >
        <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">
          {/* Sticky Headline at Top */}
          <div className="absolute top-[6vh] md:top-[8vh] left-0 right-0 z-20 max-w-4xl mx-auto text-center px-6">
            <h2
              ref={headlineRef}
              className="font-bold text-[#0b1220] font-['Bricolage_Grotesque'] leading-tight flex flex-wrap justify-center"
              style={{ fontSize: 'clamp(2rem, 5vw, 3.75rem)', gap: '0 0.3em' }}
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
          </div>

          {/* Card deck container */}
          <div
            className="relative w-full px-4 md:px-0"
            style={{
              maxWidth: 'clamp(340px, 90vw, 1200px)',
              height: isMobile ? 'clamp(380px, 48vh, 450px)' : 'clamp(280px, 36vh, 420px)',
              perspective: '1200px',
              marginTop: isMobile ? 'clamp(140px, 18vh, 180px)' : undefined,
            }}
          >
            {CARDS.map((card, i) => (
              <motion.div
                key={card.id}
                className="absolute inset-0 rounded-2xl md:rounded-3xl bg-white/80 backdrop-blur-md border border-white/60 overflow-hidden will-change-transform"
                style={{
                  x: cardTransforms[i].x,
                  rotate: cardTransforms[i].rotate,
                  opacity: cardTransforms[i].opacity,
                  zIndex: 30 - i * 10,
                  boxShadow: '0 8px 40px -8px rgba(11,18,32,0.10), 0 2px 12px -4px rgba(11,18,32,0.05)',
                }}
              >
                <div className={`flex flex-col md:flex-row h-full ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                  {/* Image side - 30% */}
                  <div className="w-full md:w-[30%] relative overflow-hidden" style={{ minHeight: isMobile ? '180px' : 'auto' }}>
                    <img
                      src={card.image}
                      alt=""
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>

                  {/* Text side - 70% */}
                  <div
                    className="w-full md:w-[70%] flex items-center px-6 md:px-10 py-6 md:py-8 font-['Bricolage_Grotesque'] text-[#3b4558] leading-relaxed"
                    style={{ fontSize: 'clamp(1.1rem, 1.5vw, 1.4rem)' }}
                  >
                    <div>{card.body}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA — fades in after final card settles */}
          <motion.div
            className="absolute bottom-[8vh]"
            style={{ opacity: ctaOpacity, y: ctaY }}
          >
            <RoundedArrowButton>Book a Demo</RoundedArrowButton>
          </motion.div>
        </div>
      </div>

      {/* Bottom spacing */}
      <div className="h-8 md:h-12" />
    </section>
  );
}
