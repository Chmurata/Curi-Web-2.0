import { useRef, useState, useEffect, memo } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { RoundedArrowButton } from "./ui/RoundedArrowButton";
import imgStephanie from "../../assets/180d0e4b8fd9cc92290d85c1e7220a60ef007b21.png";
import imgKristen from "../../assets/a87b6e31d19b84d3d28ffafb7c1ff55676d717b3.png";
import imgBelma from "../../assets/e1696e5e1a9d71a1b9a77c99672b7e3a773995fb.png";
import imgGisele from "../../assets/f996cfd275080f9ad778cc0bc158c0ff78e865d2.png";

const TESTIMONIALS = [
  {
    id: "t1",
    preview: "I've worked with too many employees who feel trapped when they're in conflict at work. It affects their mental health, their relationships, and their ability to focus. What struck me about Curi is how it creates a safe space, somewhere they can process their emotions and think through how they want to respond. Giving people the ability to pause, reflect, and prepare before engaging is such a healthy approach.",
    fullText: "I've worked with too many employees who feel trapped when they're in conflict at work. It affects their mental health, their relationships, and their ability to focus. What struck me about Curi is how it creates a safe space, somewhere they can process their emotions and think through how they want to respond. Giving people the ability to pause, reflect, and prepare before engaging is such a healthy approach. This tool is like a lifeline for people who don't know where to turn when work relationships feel too overwhelming.",
    name: "Stephanie Lemek",
    role: "Founder & CEO, The Wounded Workforce",
    image: imgStephanie,
  },
  {
    id: "t2",
    preview: "In my experience, the most successful workplaces are built on strong relationships and proactive communication. Too often, conflict resolution happens after trust has eroded and damage has been done. What I love about Curi is that it takes a preventive approach, equipping people with the tools and confidence to address challenges early—before they escalate.",
    fullText: "In my experience, the most successful workplaces are built on strong relationships and proactive communication. Too often, conflict resolution happens after trust has eroded and damage has been done. What I love about Curi is that it takes a preventive approach, equipping people with the tools and confidence to address challenges early—before they escalate. A tool like this can make all the difference in creating a culture where employees feel safe, supported, and empowered to have the hard conversations that truly drive growth.",
    name: "Kristen Carden",
    role: "Founder, Former SVP, HR, Nordstrom",
    image: imgKristen,
  },
  {
    id: "t3",
    preview: "In my work with clients, I've seen the same pattern over and over again. Leaders think their teams are running smoothly, only to discover that the real issues are being swept under the rug. It's not that people don't care; they just don't have the tools or confidence to navigate tough conversations. Curi immediately stood out to me because it tackles this head-on.",
    fullText: "In my work with clients, I've seen the same pattern over and over again. Leaders think their teams are running smoothly, only to discover that the real issues are being swept under the rug. It's not that people don't care; they just don't have the tools or confidence to navigate tough conversations. Curi immediately stood out to me because it tackles this head-on. It doesn't just help people surface the hard stuff, it gives them a way to address it constructively. I'm so excited to see this solution is available!",
    name: "Belma McCaffrey",
    role: "Principal Consultant, CEO, Executive Coach",
    image: imgBelma,
  },
  {
    id: "t4",
    preview: "Traditional learning has its challenges—getting people to show up, encouraging them to try new skills, and hoping they actually remember anything after the workshop. But learning that's tied to real-life situations, in the moment? That's the future. Imagine having something right in your pocket to guide you through a tough conversation or conflict as it's happening. That's not just innovative—it's practical.",
    fullText: "Traditional learning has its challenges—getting people to show up, encouraging them to try new skills, and hoping they actually remember anything after the workshop. But learning that's tied to real-life situations, in the moment? That's the future. Imagine having something right in your pocket to guide you through a tough conversation or conflict as it's happening. That's not just innovative—it's practical. It's the kind of support that makes learning stick and keeps it relevant. Curi delivers exactly that: relevant, just-in-time learning that employees can actually use.",
    name: "Gisele Gomes",
    role: "Learning Designer Consultant",
    image: imgGisele,
  },
];

function StarIcon() {
  return (
    <svg width="14" height="14" className="md:w-[18px] md:h-[18px]" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9.00045 13.695L3.71036 16.6562L4.89186 10.7099L0.440918 6.59385L6.4612 5.88005L9.00045 0.375L11.5397 5.88005L17.5599 6.59385L13.109 10.7099L14.2905 16.6562L9.00045 13.695Z" fill="#FAB05E" />
    </svg>
  );
}

const TestimonialCard = memo(({
  item,
  index,
  isExpanded,
  onToggle,
  scrollYProgress,
  isMobile
}: {
  item: typeof TESTIMONIALS[0];
  index: number;
  isExpanded: boolean;
  onToggle: (id: string) => void;
  scrollYProgress: any;
  isMobile: boolean;
}) => {
  if (!isMobile) {
    const start = index * 0.15;
    const end = start + 0.15;
    return (
      <div className="flex flex-col transition-all duration-300 ease-out">
        <div
          className="bg-white rounded-[16px] md:rounded-[24px] lg:rounded-[32px] p-4 md:p-6 lg:p-8 shadow-[0px_4px_10px_0px_rgba(22,22,19,0.1)] flex flex-col justify-between hover:shadow-[0px_8px_20px_-8px_rgba(22,22,19,0.15)] transition-all duration-300 ease-out"
        >
          <div className="flex flex-col gap-3 md:gap-4 lg:gap-6 flex-1">
            <div className="flex gap-1 md:gap-1.5 flex-shrink-0">
              {[...Array(5)].map((_, i) => (
                <StarIcon key={i} />
              ))}
            </div>
            <div className="text-[13px] md:text-[14px] lg:text-[15px] leading-relaxed text-[#3b4558] font-['Bricolage_Grotesque'] font-normal flex-1">
              {isExpanded ? item.fullText : item.preview}
            </div>
            <button
              onClick={() => onToggle(item.id)}
              className="text-[#235e9a] text-xs md:text-sm font-['Bricolage_Grotesque'] text-left transition-all duration-200 hover:text-[#1a4a7a] hover:translate-x-1 flex-shrink-0"
            >
              {isExpanded ? "See Less" : "See More"}
            </button>
          </div>
          <div className="flex items-center gap-2 md:gap-3 lg:gap-4 mt-4 md:mt-6 flex-shrink-0">
            <div className="relative w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-full overflow-hidden shrink-0">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <p className="text-sm md:text-base lg:text-[17px] leading-tight text-[#3b4558] font-['Bricolage_Grotesque']">
                {item.name}
              </p>
              <p className="text-[10px] md:text-xs text-[#0d0d0d] font-['Bricolage_Grotesque'] leading-tight mt-0.5 md:mt-1">
                {item.role}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Mobile Stack Logic
  const startOffset = -0.05;
  const cardDuration = 0.15;
  const start = startOffset + (index * cardDuration);
  const end = start + cardDuration;

  const targetY = index * 12;
  const initialY = 400; // Reduced from 800 for better performance

  const yMovement = useTransform(
    scrollYProgress,
    [start, end],
    [initialY, targetY],
    { clamp: true } // Prevents over-animation
  );

  const opacityMovement = useTransform(
    scrollYProgress,
    [start, start + cardDuration * 0.6],
    [0, 1],
    { clamp: true } // Prevents opacity extrapolation
  );

  return (
    <motion.div
      style={{
        y: yMovement,
        opacity: opacityMovement,
        willChange: 'transform, opacity', // GPU acceleration hint
        zIndex: index + 10,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
      }}
      className="w-full bg-white rounded-[24px] p-6 shadow-xl border border-slate-200 flex flex-col min-h-[400px]"
    >
      <div className="flex flex-col gap-4 flex-1">
        <div className="flex gap-1 flex-shrink-0">
          {[...Array(5)].map((_, i) => (
            <StarIcon key={i} />
          ))}
        </div>
        <div className="text-[14px] leading-relaxed text-[#3b4558] font-['Bricolage_Grotesque'] font-normal flex-1">
          {isExpanded ? item.fullText : item.preview}
        </div>
        <button
          onClick={() => onToggle(item.id)}
          className="text-[#235e9a] text-sm font-['Bricolage_Grotesque'] text-left transition-all duration-200 mt-2"
        >
          {isExpanded ? "See Less" : "See More"}
        </button>
      </div>

      <div className="flex items-center gap-3 mt-6 flex-shrink-0 border-t border-slate-100 pt-4">
        <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col">
          <p className="text-base leading-tight text-[#3b4558] font-['Bricolage_Grotesque']">
            {item.name}
          </p>
          <p className="text-[11px] text-[#0d0d0d] font-['Bricolage_Grotesque'] leading-tight mt-1 opacity-70">
            {item.role}
          </p>
        </div>
      </div>
    </motion.div>
  );
}, (prevProps, nextProps) => {
  // Only re-render if props actually change
  return (
    prevProps.index === nextProps.index &&
    prevProps.isExpanded === nextProps.isExpanded &&
    prevProps.isMobile === nextProps.isMobile &&
    prevProps.scrollYProgress === nextProps.scrollYProgress
  );
});

// Desktop/Tablet card component - no animation, static display
// Desktop/Tablet card component - sequential animation
const DesktopTestimonialCard = memo(({
  item,
  index,
  isExpanded,
  onToggle,
  scrollYProgress
}: {
  item: typeof TESTIMONIALS[0];
  index: number;
  isExpanded: boolean;
  onToggle: (id: string) => void;
  scrollYProgress: any;
}) => {
  // Timing distribution for 4 cards
  const startOffset = 0.05;
  const duration = 0.15;
  const start = startOffset + (index * duration);
  const end = start + duration;

  // Slide up
  const yMovement = useTransform(
    scrollYProgress,
    [start, end],
    [600, 0], // Reduced from 1000 for better performance
    { clamp: true }
  );

  // Fade in
  const opacityMovement = useTransform(
    scrollYProgress,
    [start, start + 0.05],
    [0, 1],
    { clamp: true } // Prevents opacity extrapolation
  );

  return (
    <motion.div
      style={{
        y: yMovement,
        opacity: opacityMovement,
        willChange: 'transform, opacity' // GPU acceleration hint
      }}
      className="flex flex-col"
    >
      <div
        className="bg-white shadow-[0px_4px_10px_0px_rgba(22,22,19,0.1)] flex flex-col justify-between"
        style={{
          borderRadius: 'clamp(16px, 2.5vw, 24px)',
          padding: 'clamp(1rem, 2vw, 2rem)'
        }}
      >
        {/* Stars */}
        <div className="flex gap-1 md:gap-1.5 shrink-0" style={{ marginBottom: 'clamp(0.5rem, 1.5vw, 1rem)' }}>
          {[...Array(5)].map((_, i) => (
            <StarIcon key={i} />
          ))}
        </div>

        {/* Text */}
        <p
          className={`leading-relaxed text-[#3b4558] font-['Bricolage_Grotesque'] flex-grow ${isExpanded ? '' : 'line-clamp-3 md:line-clamp-4 lg:line-clamp-5'}`}
          style={{ fontSize: 'clamp(0.9375rem, 1.1vw, 1rem)' }}
        >
          {item.fullText}
        </p>

        {/* See More */}
        <button
          onClick={() => onToggle(item.id)}
          className="text-[#235e9a] text-xs md:text-sm font-['Bricolage_Grotesque'] text-left shrink-0"
          style={{ marginTop: 'clamp(0.5rem, 1.5vw, 0.75rem)' }}
        >
          {isExpanded ? "See Less" : "See More"}
        </button>

        {/* Avatar - pushed to bottom */}
        <div
          className="flex items-center gap-3 border-t border-slate-100 shrink-0"
          style={{ marginTop: 'clamp(0.75rem, 2vw, 1rem)', paddingTop: 'clamp(0.75rem, 2vw, 1rem)' }}
        >
          <img
            src={item.image}
            alt={item.name}
            className="rounded-full object-cover"
            style={{ width: 'clamp(2.5rem, 3vw, 3rem)', height: 'clamp(2.5rem, 3vw, 3rem)' }}
          />
          <div className="min-w-0">
            <p
              className="font-medium text-[#3b4558] font-['Bricolage_Grotesque'] truncate"
              style={{ fontSize: 'clamp(1rem, 1.25vw, 1.125rem)' }}
            >
              {item.name}
            </p>
            <p
              className="text-[#3b4558]/70 font-['Bricolage_Grotesque']"
              style={{ fontSize: 'clamp(0.75rem, 1vw, 0.875rem)' }}
            >
              {item.role}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}, (prevProps, nextProps) => {
  // Only re-render if props actually change
  return (
    prevProps.index === nextProps.index &&
    prevProps.isExpanded === nextProps.isExpanded &&
    prevProps.scrollYProgress === nextProps.scrollYProgress
  );
});

export function TestimonialsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState<string | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    let resizeTimer: NodeJS.Timeout;

    const checkScreen = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        const width = window.innerWidth;
        setIsMobile(width < 640);
        // Extend tablet range to include iPad Pro and small laptops
        setIsTablet(width >= 768 && width < 1280);
      }, 150); // 150ms debounce - reduces updates from 100+/sec to ~6/sec
    };

    checkScreen(); // Initial check
    window.addEventListener("resize", checkScreen);
    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", checkScreen);
    };
  }, []); // Empty deps - effect runs once on mount

  const toggleCard = (id: string) => {
    setActiveId(prev => prev === id ? null : id);
  };

  // Auto-collapse logic on scroll (Mobile only)
  useEffect(() => {
    if (!isMobile || activeId === null) return;

    const unsubscribe = scrollYProgress.on("change", (latest) => {
      // Map string IDs back to index for scroll calculation
      const indexMap: Record<string, number> = { "t1": 0, "t2": 1, "t3": 2, "t4": 3 };
      const index = indexMap[activeId] ?? 0;

      const startOffset = -0.05;
      const cardDuration = 0.15;
      const end = startOffset + (index * cardDuration) + cardDuration;

      if (latest > end + 0.02) {
        setActiveId(null);
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress, isMobile, activeId]);

  // CTA Animation - Synced with last mobile card (index 3: -0.05 + (3 * 0.15) = 0.4 -> 0.55)
  const ctaY = useTransform(scrollYProgress, [0.4, 0.55], [100, -100], { clamp: true });
  const ctaOpacity = useTransform(scrollYProgress, [0.4, 0.55], [0, 1], { clamp: true });
  // Desktop CTA - Sync with last card (index 3: 0.05 + (3 * 0.15) = 0.5 -> 0.65)
  const desktopCtaY = useTransform(scrollYProgress, [0.5, 0.65], [1000, 0], { clamp: true });
  const desktopCtaOpacity = useTransform(scrollYProgress, [0.5, 0.65], [0, 1], { clamp: true });

  return (
    <section
      ref={containerRef}
      className="relative w-full"
    >
      {/* Desktop/Tablet: sequential scroll animation, Mobile: scroll-triggered */}
      <div className={`${isMobile ? 'h-[170vh]' : 'h-[180vh]'} w-full`}>
        <div
          className={`${isMobile ? 'sticky top-0 h-screen overflow-hidden' : 'sticky top-0 h-screen overflow-hidden'} w-full flex flex-col items-center justify-center`}
          style={{
            paddingTop: isMobile ? 'clamp(1.5rem, 4vw, 2rem)' : 0,
            paddingBottom: isMobile ? 'clamp(1.5rem, 4vw, 2rem)' : 0,
            paddingLeft: 'clamp(1rem, 3vw, 2rem)',
            paddingRight: 'clamp(1rem, 3vw, 2rem)'
          }}
        >

          <div className="w-full max-w-7xl mx-auto flex flex-col justify-center relative h-full">

            {/* Heading - Static */}
            {isMobile ? (
              <div
                className="text-center px-4"
                style={{
                  marginTop: 'clamp(4rem, 8vw, 5rem)',
                  marginBottom: 'clamp(1.5rem, 3vw, 2rem)'
                }}
              >
                <h2
                  className="font-bold text-[#0b1220]/90 font-['Bricolage_Grotesque'] leading-tight"
                  style={{ fontSize: 'clamp(2.25rem, 5vw, 3.75rem)' }}
                >
                  HR Pros Get Us.
                </h2>
              </div>
            ) : (
              <div
                className="text-center px-4 sm:px-6"
                style={{ marginBottom: 'clamp(1rem, 2.5vw, 2.5rem)' }}
              >
                <h2
                  className="font-bold text-[#0b1220]/90 font-['Bricolage_Grotesque'] leading-tight"
                  style={{ fontSize: 'clamp(2.25rem, 5vw, 3.75rem)' }}
                >
                  HR Pros Get Us.
                </h2>
              </div>
            )}

            {/* Content Area */}
            {isMobile ? (
              // Mobile Stack with scroll animation
              <div className="relative w-full max-w-sm mx-auto flex-grow">
                <div className="relative w-full h-[600px]">
                  {TESTIMONIALS.map((item, index) => (
                    <TestimonialCard
                      key={item.id}
                      item={item}
                      index={index}
                      isExpanded={activeId === item.id}
                      onToggle={toggleCard}
                      scrollYProgress={scrollYProgress}
                      isMobile={true}
                    />
                  ))}
                </div>

                {/* CTA Button Mobile */}
                <motion.div
                  style={{
                    y: ctaY,
                    opacity: ctaOpacity,
                    willChange: 'transform, opacity' // GPU acceleration hint
                  }}
                  className="flex justify-center absolute bottom-4 inset-x-0 z-[50] px-4"
                >
                  <RoundedArrowButton>Request Demo</RoundedArrowButton>
                </motion.div>
              </div>
            ) : (
              // Desktop/Tablet Static Grid - no animation
              <>
                <div
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 w-full relative z-10 items-start"
                  style={{ gap: 'clamp(1rem, 1.5vw, 1.5rem)' }}
                >
                  {TESTIMONIALS.map((item, index) => (
                    <DesktopTestimonialCard
                      key={item.id}
                      item={item}
                      index={index}
                      isExpanded={activeId === item.id}
                      onToggle={toggleCard}
                      scrollYProgress={scrollYProgress}
                    />
                  ))}
                </div>

                {/* Desktop Demo Button - animated */}
                <motion.div
                  style={{
                    y: desktopCtaY,
                    opacity: desktopCtaOpacity,
                    willChange: 'transform, opacity', // GPU acceleration hint
                    marginTop: 'clamp(1rem, 2.5vw, 2.5rem)'
                  }}
                  className="flex justify-center z-20 px-4 sm:px-6"
                >
                  <RoundedArrowButton>Request Demo</RoundedArrowButton>
                </motion.div>
              </>
            )}

          </div>
        </div>
      </div>
    </section>
  );
}
