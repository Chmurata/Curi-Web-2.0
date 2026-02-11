import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "motion/react";
import { RoundedArrowButton } from "./ui/RoundedArrowButton";

// Single persistent image for annotations
import imgCard1 from "../../assets/9647ae1a36135cbd8ecdd8fb44bc1b36ca0dc953.png";

const headlineWords = [
  "Move", "values", "off", "the", "wall", "-",
  "\n",
  "and", "into", "every", "conversation."
];

const CARDS = [
  {
    id: 1,
    body: <>Curi helps your leaders and teams <span className="font-bold">say the hard thing—safely</span>.</>,
  },
  {
    id: 2,
    body: <>It brings your values into daily communication, <span className="font-bold">raises accountability</span>, and turns vague "I'll try" into clear commitments.</>,
  },
  {
    id: 3,
    body: <><span className="font-bold">Then it does the part you can't scale:</span> a coach in the moment that helps people rephrase, align, and follow through.</>,
  },
];

interface Annotation {
  label: string;
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
}

const ANNOTATION_SETS: Annotation[][] = [
  // Card 1: "Say the hard thing—safely"
  [
    { label: "Safe Space", top: "-10px", left: "6%" },
    { label: "Hard Conversations", top: "42%", right: "-14px" },
    { label: "Leader-Ready", bottom: "10%", left: "6%" },
  ],
  // Card 2: "Raises accountability"
  [
    { label: "Clear Commitments", top: "-10px", right: "6%" },
    { label: "Daily Practice", top: "30%", left: "-10px" },
    { label: "Accountability", bottom: "-10px", left: "38%" },
  ],
  // Card 3: "Coach in the moment"
  [
    { label: "Real-Time Coaching", top: "-14px", left: "28%" },
    { label: "Rephrase & Align", top: "56%", right: "-10px" },
    { label: "Follow Through", bottom: "-10px", right: "8%" },
    { label: "Scales for You", top: "36%", left: "-10px" },
  ],
];

const MOBILE_LABELS = [
  ["Safe Space", "Hard Conversations"],
  ["Accountability", "Clear Commitments"],
  ["Real-Time Coaching", "Scales for You"],
];

function AnnotationChip({ annotation, index }: { annotation: Annotation; index: number }) {
  const { label, ...pos } = annotation;
  return (
    <motion.div
      className="absolute z-10"
      style={pos}
      initial={{ opacity: 0, scale: 0.85, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: -4 }}
      transition={{
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: index * 0.08,
        exit: { duration: 0.25, ease: [0.55, 0.085, 0.68, 0.53] },
      }}
    >
      <span className="inline-block whitespace-nowrap rounded-full bg-white border border-[#2b72ba]/15 px-3.5 py-1.5 text-[13px] font-medium text-[#0b1220] shadow-[0_2px_12px_-2px_rgba(11,18,32,0.08)] font-['Bricolage_Grotesque']">
        {label}
      </span>
    </motion.div>
  );
}

export function CultureSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardAreaRef = useRef<HTMLDivElement>(null);
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

  // --- Card progress: drives rail fill + active card + annotations ---
  const { scrollYProgress: cardProgress } = useScroll({
    target: cardAreaRef,
    offset: ["start center", "end center"],
  });

  const [activeCard, setActiveCard] = useState(0);

  useEffect(() => {
    const unsubscribe = cardProgress.on("change", (v) => {
      if (v < 0.33) setActiveCard(0);
      else if (v < 0.66) setActiveCard(1);
      else setActiveCard(2);
    });
    return unsubscribe;
  }, [cardProgress]);

  // Rail fill driven by scroll
  const railScaleY = useTransform(cardProgress, [0, 1], [0, 1]);
  // Mobile horizontal rail
  const railScaleX = useTransform(cardProgress, [0, 1], [0, 1]);

  // --- Speech bubbles parallax (preserved from original) ---
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
      className="relative w-full -mt-[250vh] md:-mt-[280vh] mb-[15vh] md:mb-[20vh]"
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

      {/* --- "Culture Realized" — shrinks as user scrolls --- */}
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

      {/* --- Headline (word-by-word reveal) --- */}
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

      {/* --- Narrative Rail: Two-Column Layout --- */}
      <div
        ref={cardAreaRef}
        className="relative z-[10] max-w-7xl mx-auto px-6 md:px-10"
      >
        {/* Mobile: Static image at top */}
        {isMobile && (
          <div className="relative rounded-2xl bg-[#f5f7fa] p-3 shadow-sm mb-6">
            <div className="relative w-full rounded-xl overflow-hidden" style={{ aspectRatio: '4/3' }}>
              <img src={imgCard1} alt="" className="w-full h-full object-cover" />
            </div>
          </div>
        )}

        {/* Mobile: Horizontal progress rail */}
        {isMobile && (
          <div className="sticky top-0 z-20 w-full mb-6">
            <div className="relative h-[3px] bg-[#e2e8f0] rounded-full">
              <motion.div
                className="absolute inset-y-0 left-0 w-full bg-[#2b72ba] rounded-full origin-left"
                style={{ scaleX: railScaleX }}
              />
              {/* 3 node dots */}
              {[0, 0.5, 1].map((pos, i) => (
                <div
                  key={i}
                  className="absolute top-1/2 -translate-y-1/2 w-[9px] h-[9px] rounded-full transition-all duration-300"
                  style={{
                    left: `${pos * 100}%`,
                    transform: `translate(-50%, -50%)`,
                    backgroundColor: activeCard >= i ? '#2b72ba' : '#e2e8f0',
                    boxShadow: activeCard === i ? '0 0 0 3px rgba(43,114,186,0.2)' : 'none',
                  }}
                />
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-col md:flex-row md:items-start" style={{ gap: 'clamp(1.5rem, 3vw, 2.5rem)' }}>

          {/* LEFT — Cards with Progress Rail (55%) */}
          <div className="md:w-[55%] relative">
            {/* Vertical progress rail (desktop only) */}
            {!isMobile && (
              <div className="absolute left-0 top-0 bottom-0 w-[3px] z-10">
                {/* Track background */}
                <div className="absolute inset-0 bg-[#e2e8f0] rounded-full" />
                {/* Fill */}
                <motion.div
                  className="absolute inset-x-0 top-0 h-full bg-[#2b72ba] rounded-full origin-top"
                  style={{ scaleY: railScaleY }}
                />
                {/* 3 node dots */}
                {[16.5, 50, 83.5].map((pos, i) => (
                  <div
                    key={i}
                    className="absolute left-1/2 -translate-x-1/2 w-[11px] h-[11px] rounded-full transition-all duration-300"
                    style={{
                      top: `${pos}%`,
                      backgroundColor: activeCard >= i ? '#2b72ba' : '#e2e8f0',
                      boxShadow: activeCard === i ? '0 0 0 4px rgba(43,114,186,0.2)' : 'none',
                    }}
                  />
                ))}
              </div>
            )}

            {/* Cards */}
            <div
              className="flex flex-col pl-0 md:pl-10"
              style={{ gap: 'clamp(0.75rem, 2vw, 1.5rem)' }}
            >
              {CARDS.map((card, i) => (
                <motion.div
                  key={card.id}
                  animate={{
                    opacity: activeCard === i ? 1 : 0.4,
                    scale: activeCard === i ? 1 : 0.97,
                  }}
                  transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className={`
                    rounded-2xl text-left transition-colors duration-300
                    font-['Bricolage_Grotesque'] text-[#3b4558] leading-relaxed
                    ${activeCard === i
                      ? "bg-white/60 backdrop-blur-sm shadow-[0_4px_24px_-4px_rgba(11,18,32,0.06)]"
                      : "bg-transparent"
                    }
                  `}
                  style={{
                    fontSize: 'clamp(1.05rem, 1.4vw, 1.2rem)',
                    padding: isMobile ? 'clamp(1.25rem, 3vw, 1.5rem)' : 'clamp(1.5rem, 2.5vw, 2.5rem) clamp(2rem, 3vw, 2.5rem)',
                    minHeight: isMobile ? undefined : 'clamp(140px, 18vw, 200px)',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <div>
                    {/* Mobile labels */}
                    {isMobile && (
                      <div className="flex gap-2 mb-3">
                        {MOBILE_LABELS[i].map(label => (
                          <span key={label} className="text-xs px-2.5 py-1 rounded-full bg-[#2b72ba]/10 text-[#235e9a] font-medium">
                            {label}
                          </span>
                        ))}
                      </div>
                    )}
                    {card.body}
                  </div>
                </motion.div>
              ))}

              <div style={{ paddingTop: 'clamp(0.75rem, 1.5vw, 1rem)', paddingLeft: isMobile ? undefined : 'clamp(0rem, 0.5vw, 0.5rem)' }}>
                <RoundedArrowButton>Book a Demo</RoundedArrowButton>
              </div>
            </div>
          </div>

          {/* RIGHT — Sticky Image with Annotation Overlays (45%, desktop only) */}
          {!isMobile && (
            <div className="md:w-[45%] md:sticky md:top-[18vh] self-start">
              <div className="relative rounded-3xl bg-[#f5f7fa] p-3 md:p-4 shadow-sm overflow-visible">
                <div className="relative w-full rounded-2xl overflow-hidden" style={{ aspectRatio: '4/3' }}>
                  <img src={imgCard1} alt="" className="w-full h-full object-cover" />
                </div>

                {/* Annotation overlays */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`annotations-${activeCard}`}
                    className="absolute inset-3 md:inset-4 pointer-events-none"
                  >
                    {ANNOTATION_SETS[activeCard].map((annotation, i) => (
                      <AnnotationChip key={annotation.label} annotation={annotation} index={i} />
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom spacing */}
      <div className="h-8 md:h-12" />
    </section>
  );
}
