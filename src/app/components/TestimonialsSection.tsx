import { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { RoundedArrowButton } from "./ui/RoundedArrowButton";
import imgStephanie from "../../assets/180d0e4b8fd9cc92290d85c1e7220a60ef007b21.png";
import imgKristen from "../../assets/a87b6e31d19b84d3d28ffafb7c1ff55676d717b3.png";
import imgBelma from "../../assets/e1696e5e1a9d71a1b9a77c99672b7e3a773995fb.png";
import imgGisele from "../../assets/f996cfd275080f9ad778cc0bc158c0ff78e865d2.png";

const TESTIMONIALS = [
  {
    id: 1,
    preview: "I've worked with too many employees who feel trapped when they're in conflict at work. It affects their mental health, their...",
    fullText: "I've worked with too many employees who feel trapped when they're in conflict at work. It affects their mental health, their relationships, and their ability to focus. What struck me about Curi is how it creates a safe space, somewhere they can process their emotions and think through how they want to respond. Giving people the ability to pause, reflect, and prepare before engaging is such a healthy approach. This tool is like a lifeline for people who don't know where to turn when work relationships feel too overwhelming.",
    name: "Stephanie Lemek",
    role: "Founder & CEO, The Wounded Workforce",
    image: imgStephanie,
  },
  {
    id: 2,
    preview: "In my experience, the most successful workplaces are built on strong relationships and proactive communication. Too often, conflic...",
    fullText: "In my experience, the most successful workplaces are built on strong relationships and proactive communication. Too often, conflict resolution happens after trust has eroded and damage has been done. What I love about Curi is that it takes a preventive approach, equipping people with the tools and confidence to address challenges early—before they escalate. A tool like this can make all the difference in creating a culture where employees feel safe, supported, and empowered to have the hard conversations that truly drive growth.",
    name: "Kristen Carden",
    role: "Founder, Former SVP, HR, Nordstrom",
    image: imgKristen,
  },
  {
    id: 3,
    preview: "In my work with clients, I've seen the same pattern over and over again. Leaders think their teams are running smoothly, only to...",
    fullText: "In my work with clients, I've seen the same pattern over and over again. Leaders think their teams are running smoothly, only to discover that the real issues are being swept under the rug. It's not that people don't care; they just don't have the tools or confidence to navigate tough conversations. Curi immediately stood out to me because it tackles this head-on. It doesn't just help people surface the hard stuff, it gives them a way to address it constructively. I'm so excited to see this solution is available!",
    name: "Belma McCaffrey",
    role: "Principal Consultant, CEO, Executive Coach",
    image: imgBelma,
  },
  {
    id: 4,
    preview: "Traditional learning has its challenges—getting people to show up, encouraging them to try new skills, and hoping they actual...",
    fullText: "Traditional learning has its challenges—getting people to show up, encouraging them to try new skills, and hoping they actually remember anything after the workshop. But learning that's tied to real-life situations, in the moment? That's the future. Imagine having something right in your pocket to guide you through a tough conversation or conflict as it's happening. That's not just innovative—it's practical. It's the kind of support that makes learning stick and keeps it relevant. Curi delivers exactly that: relevant, just-in-time learning that employees can actually use.",
    name: "Gisele Gomes",
    role: "Learning Designer Consultant",
    image: imgGisele,
  },
];

function StarIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9.00045 13.695L3.71036 16.6562L4.89186 10.7099L0.440918 6.59385L6.4612 5.88005L9.00045 0.375L11.5397 5.88005L17.5599 6.59385L13.109 10.7099L14.2905 16.6562L9.00045 13.695Z" fill="#FAB05E" />
    </svg>
  );
}

export function TestimonialsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [expandedCards, setExpandedCards] = useState<Set<number>>(new Set());

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const toggleCard = (id: number) => {
    setExpandedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const isAnyExpanded = expandedCards.size > 0;

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-gradient-to-r from-[#f2f7fb] to-[#c7ddf3]"
    >
      {/* 
        Container Height: 
        Needs to be tall enough to allow scrolling through the animations.
        4 items * ~30vh each + buffer = ~250vh
      */}
      <div className="h-[250vh] w-full">

        {/* Sticky Viewport */}
        <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden px-4 md:px-8">

          <div className="w-full max-w-7xl mx-auto h-full flex flex-col justify-center relative">

            {/* Heading */}
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-5xl md:text-6xl lg:text-[83px] font-bold text-[#0b1220]/90 font-['Bricolage_Grotesque'] leading-tight">
                HR Pros Get Us.
              </h2>
            </div>

            {/* Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full relative z-10">
              {TESTIMONIALS.map((item, index) => {
                // Calculate animation triggers based on index
                // Range: 0 to 0.7
                const start = index * 0.15;
                const end = start + 0.15;

                const opacity = useTransform(scrollYProgress, [start, end], [0, 1]);
                const y = useTransform(scrollYProgress, [start, end], [50, 0]);
                const scale = useTransform(scrollYProgress, [start, end], [0.9, 1]);

                const isExpanded = expandedCards.has(item.id);

                return (
                  <motion.div
                    key={item.id}
                    style={{ opacity, y, scale }}
                    className="flex flex-col h-full"
                  >
                    <motion.div
                      animate={{
                        height: isExpanded ? "680px" : "340px"
                      }}
                      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                      whileHover={!isExpanded ? { boxShadow: "0px 12px 24px -10px rgba(22,22,19,0.2)" } : {}}
                      className="bg-white rounded-[32px] p-8 shadow-[0px_4px_10px_0px_rgba(22,22,19,0.1)] flex flex-col justify-between relative overflow-hidden"
                    >

                      <div className="flex flex-col gap-6 flex-1">
                        {/* Stars */}
                        <div className="flex gap-1.5 flex-shrink-0">
                          {[...Array(5)].map((_, i) => (
                            <StarIcon key={i} />
                          ))}
                        </div>

                        {/* Quote */}
                        <div className="text-[15px] leading-relaxed text-[#3b4558] font-['Bricolage_Grotesque'] font-normal flex-1">
                          {isExpanded ? item.fullText : item.preview}
                        </div>

                        {/* See More/Less Button */}
                        <button
                          onClick={() => toggleCard(item.id)}
                          className="text-[#235e9a] text-sm font-['Bricolage_Grotesque'] text-left transition-all duration-200 hover:text-[#1a4a7a] hover:translate-x-1 flex-shrink-0"
                        >
                          {isExpanded ? "See Less" : "See More"}
                        </button>
                      </div>

                      {/* Profile */}
                      <div className="flex items-center gap-4 mt-6 flex-shrink-0">
                        <div className="relative w-12 h-12 rounded-[48px] overflow-hidden shrink-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex flex-col">
                          <p className="text-[19px] leading-tight text-[#3b4558] font-['Bricolage_Grotesque']">
                            {item.name}
                          </p>
                          <p className="text-xs text-[#0d0d0d] font-['Bricolage_Grotesque'] leading-tight mt-1">
                            {item.role}
                          </p>
                        </div>
                      </div>

                    </motion.div>
                  </motion.div>
                );
              })}
            </div>

            {/* Request Demo Button - Appears at the end */}
            <motion.div
              style={{
                opacity: useTransform(scrollYProgress, [0.75, 0.85], [0, 1]),
                y: useTransform(scrollYProgress, [0.75, 0.85], [20, 0])
              }}
              className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20"
            >
              <RoundedArrowButton>Request Demo</RoundedArrowButton>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
