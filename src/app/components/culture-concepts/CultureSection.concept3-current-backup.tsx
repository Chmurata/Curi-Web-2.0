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

export function CultureSection() {
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
  const titleScale = useTransform(titleProgress, [0, 1], [2.5, 1]);
  const titleOpacity = useTransform(titleProgress, [0, 0.3, 1], [0.15, 0.4, 0.7]);

  // --- Word-by-word headline ---
  const headlineInView = useInView(headlineRef, { once: true, amount: 0.5 });

  // --- Deck scroll progress (drives card peel animations) ---
  const { scrollYProgress: deckProgress } = useScroll({
    target: deckRef,
    offset: ["start start", "end end"],
  });

  // Step indicator: which card is currently front
  const [currentStep, setCurrentStep] = useState(0);
  useEffect(() => {
    const unsub = deckProgress.on("change", (v) => {
      if (v < 0.42) setCurrentStep(0);
      else if (v < 0.84) setCurrentStep(1);
      else setCurrentStep(2);
    });
    return unsub;
  }, [deckProgress]);

  // === Card 1: Front initially, peels away 0.08–0.42 ===
  const c1Y = useTransform(deckProgress, [0, 0.08, 0.42], [0, 0, -1200]);
  const c1Rotate = useTransform(deckProgress, [0, 0.08, 0.42], [0, 0, -3]);
  const c1Opacity = useTransform(deckProgress, [0, 0.08, 0.34, 0.42], [1, 1, 0.5, 0]);
  const c1Scale = useTransform(deckProgress, [0, 1], [1, 1]);

  // === Card 2: Middle → promotes → peels away 0.50–0.84 ===
  const c2Scale = useTransform(deckProgress, [0, 0.08, 0.42, 0.50, 0.84], [0.95, 0.95, 1, 1, 1]);
  const c2Y = useTransform(deckProgress, [0, 0.08, 0.42, 0.50, 0.84], [12, 12, 0, 0, -1200]);
  const c2Opacity = useTransform(deckProgress, [0, 0.50, 0.76, 0.84], [1, 1, 0.5, 0]);
  const c2Rotate = useTransform(deckProgress, [0, 0.50, 0.84], [0, 0, -3]);

  // === Card 3: Back → middle → front ===
  const c3Scale = useTransform(deckProgress, [0, 0.08, 0.42, 0.50, 0.84], [0.90, 0.90, 0.95, 0.95, 1]);
  const c3Y = useTransform(deckProgress, [0, 0.08, 0.42, 0.50, 0.84], [24, 24, 12, 12, 0]);
  const c3Opacity = useTransform(deckProgress, [0, 1], [1, 1]);
  const c3Rotate = useTransform(deckProgress, [0, 1], [0, 0]);

  // CTA fade-in after final card settles
  const ctaOpacity = useTransform(deckProgress, [0.86, 0.94], [0, 1]);
  const ctaY = useTransform(deckProgress, [0.86, 0.94], [20, 0]);

  const cardTransforms = [
    { y: c1Y, rotate: c1Rotate, opacity: c1Opacity, scale: c1Scale },
    { y: c2Y, rotate: c2Rotate, opacity: c2Opacity, scale: c2Scale },
    { y: c3Y, rotate: c3Rotate, opacity: c3Opacity, scale: c3Scale },
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
      className="relative w-full -mt-[250vh] md:-mt-[280vh]"
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
          style={{ scale: titleScale, opacity: titleOpacity, fontFamily: '"Bricolage Grotesque", sans-serif', fontSize: 'clamp(5rem, 16vw, 13rem)' }}
        >
          Culture
          <br />
          Realized
        </motion.h1>
      </div>

      {/* --- Headline (word-by-word reveal) — rendered outside deck on mobile, inside sticky on desktop --- */}
      {isMobile && (
        <div className="relative z-[10] max-w-4xl mx-auto text-center px-6" style={{ marginBottom: 'clamp(1.5rem, 3vw, 2.5rem)' }}>
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
      )}

      {/* --- Cascade Stack: Scroll-Driven Card Deck (desktop) --- */}
      {!isMobile ? (
        <div
          ref={deckRef}
          className="relative z-[10] h-[280vh]"
        >
          <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">
            {/* --- Headline pinned inside sticky viewport (desktop) --- */}
            <div className="absolute top-[6vh] left-0 right-0 z-20 max-w-4xl mx-auto text-center px-6">
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
              className="relative w-full"
              style={{
                maxWidth: 'clamp(900px, 82vw, 1200px)',
                height: 'clamp(340px, 44vh, 480px)',
                perspective: '1200px',
              }}
            >
              {CARDS.map((card, i) => (
                <motion.div
                  key={card.id}
                  className="absolute inset-0 rounded-3xl bg-white border border-gray-200/60 overflow-hidden will-change-transform"
                  style={{
                    y: cardTransforms[i].y,
                    rotate: cardTransforms[i].rotate,
                    opacity: cardTransforms[i].opacity,
                    scale: cardTransforms[i].scale,
                    zIndex: 30 - i * 10,
                    boxShadow: '0 8px 40px -8px rgba(11,18,32,0.10), 0 2px 12px -4px rgba(11,18,32,0.05)',
                  }}
                >
                  <div className={`flex h-full ${i % 2 === 1 ? 'flex-row-reverse' : 'flex-row'}`}>
                    {/* Image side (55%) */}
                    <div className="w-[55%] relative overflow-hidden">
                      <img
                        src={card.image}
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </div>

                    {/* Text side (45%) */}
                    <div
                      className="w-[45%] flex items-center px-8 md:px-10 py-8 font-['Bricolage_Grotesque'] text-[#3b4558] leading-relaxed"
                      style={{ fontSize: 'clamp(1rem, 1.3vw, 1.2rem)' }}
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
      ) : (
        /* --- Mobile: Simple vertical card stack with fade-in --- */
        <div className="relative z-[10] max-w-lg mx-auto px-6 flex flex-col gap-6">
          {CARDS.map((card, i) => (
            <MobileCard key={card.id} card={card} index={i} />
          ))}
          <div style={{ paddingTop: 'clamp(0.5rem, 1vw, 0.75rem)' }}>
            <RoundedArrowButton>Book a Demo</RoundedArrowButton>
          </div>
        </div>
      )}

      {/* Bottom spacing */}
      <div className="h-4 md:h-6" />
    </section>
  );
}

/** Mobile card with inView fade-in */
function MobileCard({ card, index }: { card: typeof CARDS[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94], delay: index * 0.08 }}
      className="rounded-2xl bg-white border border-gray-200/60 overflow-hidden shadow-sm"
    >
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: '16/10' }}>
        <img src={card.image} alt="" className="w-full h-full object-cover" />
      </div>
      <div
        className="px-5 py-5 font-['Bricolage_Grotesque'] text-[#3b4558] leading-relaxed"
        style={{ fontSize: 'clamp(1rem, 1.2vw, 1.1rem)' }}
      >
        {card.body}
      </div>
    </motion.div>
  );
}
